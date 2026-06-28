import { useComputed, useSignal } from "@preact/signals";
import { ComponentChildren } from "preact";
import { useEffect, useRef } from "preact/hooks";

interface TinderCardListProps {
    children: ComponentChildren;
    onSwipeLeft?: (index: number) => void;
    onSwipeRight?: (index: number) => void;
    onSwipeUp?: (index: number) => void;
    onEmpty?: () => void;
}

interface CardState {
    x: number;
    y: number;
    rotation: number;
    opacity: number;
    scale: number;
    zIndex: number;
    isAnimating: boolean;
}

export function TinderCardList({
    children,
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onEmpty,
}: TinderCardListProps) {
    const cards = Array.isArray(children) ? children : [children];
    const currentIndex = useSignal(0);
    const totalCards = cards.length;

    const isFinished = useComputed(() => currentIndex.value >= totalCards);

    const handleSwipeLeft = () => {
        onSwipeLeft?.(currentIndex.value);
        currentIndex.value++;
        if (currentIndex.value >= totalCards) {
            onEmpty?.();
        }
    };

    const handleSwipeRight = () => {
        onSwipeRight?.(currentIndex.value);
        currentIndex.value++;
        if (currentIndex.value >= totalCards) {
            onEmpty?.();
        }
    };

    const handleSwipeUp = () => {
        onSwipeUp?.(currentIndex.value);
        currentIndex.value++;
        if (currentIndex.value >= totalCards) {
            onEmpty?.();
        }
    };

    if (isFinished.value) {
        return (
            <div class="flex items-center justify-center h-full">
                <div class="text-center p-8">
                    <div class="text-6xl mb-4">🎉</div>
                    <h2 class="text-2xl font-bold text-gray-800 mb-2">
                        全部完成！
                    </h2>
                    <p class="text-gray-600">没有更多卡片了</p>
                </div>
            </div>
        );
    }

    return (
        <div class="relative w-full h-full flex items-center justify-center">
            {/* Card stack */}
            <div class="relative w-full max-w-md" style="height: 500px;">
                {cards.map((card, index) => {
                    const offset = index - currentIndex.value;
                    if (offset < 0 || offset > 2) return null;

                    return (
                        <TinderCardInternal
                            key={index}
                            offset={offset}
                            isActive={offset === 0}
                            onSwipeLeft={handleSwipeLeft}
                            onSwipeRight={handleSwipeRight}
                            onSwipeUp={handleSwipeUp}
                        >
                            {card}
                        </TinderCardInternal>
                    );
                })}
            </div>

            {/* Action buttons (optional, for non-touch devices) */}
            {currentIndex.value < totalCards && (
                <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-6 z-50">
                    <button
                        onClick={handleSwipeLeft}
                        class="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center text-3xl hover:scale-110 active:scale-95 transition-transform"
                        aria-label="Swipe Left"
                    >
                        ❌
                    </button>
                    <button
                        onClick={handleSwipeUp}
                        class="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center text-3xl hover:scale-110 active:scale-95 transition-transform"
                        aria-label="Super Like"
                    >
                        ⭐
                    </button>
                    <button
                        onClick={handleSwipeRight}
                        class="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center text-3xl hover:scale-110 active:scale-95 transition-transform"
                        aria-label="Swipe Right"
                    >
                        ❤️
                    </button>
                </div>
            )}
        </div>
    );
}

interface TinderCardProps {
    children: ComponentChildren;
    offset: number;
    isActive: boolean;
    onSwipeLeft: () => void;
    onSwipeRight: () => void;
    onSwipeUp: () => void;
}

function TinderCardInternal({
    children,
    offset,
    isActive,
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
}: TinderCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const touchStartX = useSignal(0);
    const touchStartY = useSignal(0);
    const touchStartTime = useSignal(0);
    const isDragging = useSignal(false);

    const x = useSignal(0);
    const y = useSignal(0);
    const rotation = useSignal(0);

    const SWIPE_THRESHOLD = 100;
    const VELOCITY_THRESHOLD = 0.5;

    const likeOpacity = useComputed(() => {
        if (!isActive) return 0;
        return Math.min(Math.max(x.value / 100, 0), 1);
    });

    const nopeOpacity = useComputed(() => {
        if (!isActive) return 0;
        return Math.min(Math.max(-x.value / 100, 0), 1);
    });

    const superLikeOpacity = useComputed(() => {
        if (!isActive) return 0;
        return Math.min(Math.max(-y.value / 100, 0), 1);
    });

    const handleTouchStart = (e: TouchEvent) => {
        if (!isActive) return;
        const touch = e.touches[0];
        touchStartX.value = touch.clientX;
        touchStartY.value = touch.clientY;
        touchStartTime.value = Date.now();
        isDragging.value = true;
    };

    const handleTouchMove = (e: TouchEvent) => {
        if (!isActive || !isDragging.value) return;
        e.preventDefault();
        const touch = e.touches[0];
        const deltaX = touch.clientX - touchStartX.value;
        const deltaY = touch.clientY - touchStartY.value;

        x.value = deltaX;
        y.value = deltaY;
        rotation.value = deltaX * 0.1;
    };

    const handleTouchEnd = () => {
        if (!isActive || !isDragging.value) return;
        isDragging.value = false;

        const deltaTime = Date.now() - touchStartTime.value;
        const velocityX = x.value / deltaTime;
        const velocityY = y.value / deltaTime;

        // Check for swipe up (super like)
        if (
            y.value < -SWIPE_THRESHOLD ||
            (velocityY < -VELOCITY_THRESHOLD && y.value < -50)
        ) {
            animateOut(0, -1000, onSwipeUp);
        } // Check for swipe right (like)
        else if (
            x.value > SWIPE_THRESHOLD ||
            (velocityX > VELOCITY_THRESHOLD && x.value > 50)
        ) {
            animateOut(1000, 0, onSwipeRight);
        } // Check for swipe left (nope)
        else if (
            x.value < -SWIPE_THRESHOLD ||
            (velocityX < -VELOCITY_THRESHOLD && x.value < -50)
        ) {
            animateOut(-1000, 0, onSwipeLeft);
        } // Return to center
        else {
            animateBack();
        }
    };

    const animateOut = (
        targetX: number,
        targetY: number,
        callback: () => void,
    ) => {
        if (!cardRef.current) return;

        const card = cardRef.current;
        card.style.transition =
            "transform 0.3s ease-out, opacity 0.3s ease-out";

        const finalRotation = targetX !== 0 ? targetX * 0.1 : 0;
        card.style.transform =
            `translate(${targetX}px, ${targetY}px) rotate(${finalRotation}deg)`;
        card.style.opacity = "0";

        setTimeout(() => {
            callback();
            resetCard();
        }, 300);
    };

    const animateBack = () => {
        if (!cardRef.current) return;

        const card = cardRef.current;
        card.style.transition = "transform 0.3s ease-out";
        card.style.transform = "translate(0, 0) rotate(0deg)";

        setTimeout(() => {
            card.style.transition = "";
            resetCard();
        }, 300);
    };

    const resetCard = () => {
        x.value = 0;
        y.value = 0;
        rotation.value = 0;
        if (cardRef.current) {
            cardRef.current.style.transform = "";
            cardRef.current.style.transition = "";
            cardRef.current.style.opacity = "";
        }
    };

    useEffect(() => {
        const card = cardRef.current;
        if (!card || !isActive) return;

        card.addEventListener("touchstart", handleTouchStart as any);
        card.addEventListener("touchmove", handleTouchMove as any, {
            passive: false,
        });
        card.addEventListener("touchend", handleTouchEnd);

        return () => {
            card.removeEventListener("touchstart", handleTouchStart as any);
            card.removeEventListener("touchmove", handleTouchMove as any);
            card.removeEventListener("touchend", handleTouchEnd);
        };
    }, [isActive]);

    const cardStyle = {
        transform: isDragging.value
            ? `translate(${x.value}px, ${y.value}px) rotate(${rotation.value}deg) scale(${
                1 - offset * 0.05
            })`
            : `scale(${1 - offset * 0.05}) translateY(${offset * 10}px)`,
        zIndex: 100 - offset,
        opacity: offset === 0 ? 1 : 1 - offset * 0.2,
        transition: isDragging.value ? "none" : "all 0.3s ease-out",
    };

    return (
        <div
            ref={cardRef}
            class="absolute inset-0 cursor-grab active:cursor-grabbing"
            style={cardStyle}
        >
            <div class="relative w-full h-full bg-white rounded-3xl shadow-2xl overflow-hidden">
                {/* Content */}
                <div class="w-full h-full">
                    {children}
                </div>

                {/* Like indicator */}
                {isActive && (
                    <div
                        class="absolute top-8 left-8 px-6 py-3 border-4 border-green-500 rounded-lg transform -rotate-12 pointer-events-none"
                        style={{
                            opacity: likeOpacity.value,
                            transition: "opacity 0.1s",
                        }}
                    >
                        <span class="text-4xl font-bold text-green-500">
                            LIKE
                        </span>
                    </div>
                )}

                {/* Nope indicator */}
                {isActive && (
                    <div
                        class="absolute top-8 right-8 px-6 py-3 border-4 border-red-500 rounded-lg transform rotate-12 pointer-events-none"
                        style={{
                            opacity: nopeOpacity.value,
                            transition: "opacity 0.1s",
                        }}
                    >
                        <span class="text-4xl font-bold text-red-500">
                            NOPE
                        </span>
                    </div>
                )}

                {/* Super Like indicator */}
                {isActive && (
                    <div
                        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-6 py-3 border-4 border-blue-500 rounded-lg pointer-events-none"
                        style={{
                            opacity: superLikeOpacity.value,
                            transition: "opacity 0.1s",
                        }}
                    >
                        <span class="text-4xl font-bold text-blue-500">
                            SUPER LIKE
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}

export function TinderCard({ children }: { children: ComponentChildren }) {
    return <>{children}</>;
}
