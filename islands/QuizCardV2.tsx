import { useComputed, useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import { Quiz } from "../utils/quizData.ts";
import { api } from "../client.ts";
import { ulid } from "@std/ulid";

interface QuizCardProps {
    data: Quiz;
    onNext?: () => void;
    className?: string;
}

const QuizCard = (
    { data, onNext, className = "" }: QuizCardProps,
) => {
    // Signals for local state management
    const selectedOption = useSignal<number | null>(null);
    const isSubmitted = useSignal<boolean>(false);

    // Computed state for UI logic
    const isCorrect = useComputed(() => {
        return selectedOption.value === data.answer;
    });

    // Reset state when the question ID changes (recycling the component)
    useEffect(() => {
        selectedOption.value = null;
        isSubmitted.value = false;
    }, [data.id]);

    const handleOptionClick = async (index: number) => {
        if (isSubmitted.value) return;

        selectedOption.value = index;
        isSubmitted.value = true;

        if (selectedOption.value != data.answer) {
            await api.record_wrong_answer.mutate({
                id: ulid(),
                quiz_id: data.id,
                your_answer: index,
                created_at: new Date().toISOString(),
            });
        }

        console.log(index);
    };

    // Helper for badge colors
    const getTypeColor = (type: string) => {
        switch (type) {
            case "kanji":
                return "bg-pink-100 text-pink-800 border-pink-200";
            case "grammar":
                return "bg-blue-100 text-blue-800 border-blue-200";
            case "vocabulary":
                return "bg-green-100 text-green-800 border-green-200";
            default:
                return "bg-gray-100 text-gray-800 border-gray-200";
        }
    };

    return (
        <div
            className={`w-full max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 ${className}`}
        >
            {/* Header / Meta Info */}
            <div className="px-6 py-4 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
                <span
                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${
                        getTypeColor(data.type)
                    }`}
                >
                    {data.type}
                </span>
                <span className="text-slate-400 text-xs font-mono">
                    ID: {data.id.slice(0, 8)}...
                </span>
            </div>

            {/* Question Body */}
            <div className="p-6 md:p-8">
                <h2 className="text-2xl font-bold text-slate-800 mb-8 leading-relaxed">
                    {data.question}
                </h2>

                {/* Options Grid */}
                <div className="grid grid-cols-1 gap-3">
                    {data.options.map((option, index) => {
                        // Determine styling based on state
                        let buttonStyle =
                            "border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 text-slate-600";

                        if (isSubmitted.value) {
                            if (index === data.answer) {
                                // Always highlight the correct answer in green after submit
                                buttonStyle =
                                    "border-green-500 bg-green-50 text-green-700 font-bold ring-2 ring-green-100";
                            } else if (
                                index === selectedOption.value &&
                                index !== data.answer
                            ) {
                                // Highlight wrong selection in red
                                buttonStyle =
                                    "border-red-500 bg-red-50 text-red-700 ring-2 ring-red-100";
                            } else {
                                // Fade out other options
                                buttonStyle =
                                    "border-slate-100 bg-slate-50 text-slate-300 opacity-60";
                            }
                        } else if (selectedOption.value === index) {
                            // Active selection (pre-submit state if you wanted a separate submit button)
                            buttonStyle =
                                "border-indigo-500 bg-indigo-50 text-indigo-700 ring-2 ring-indigo-200";
                        }

                        return (
                            <button
                                key={index}
                                onClick={() => handleOptionClick(index)}
                                disabled={isSubmitted.value}
                                className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between group ${buttonStyle}`}
                            >
                                <span className="text-lg">{option}</span>

                                {/* Status Icons */}
                                {isSubmitted.value &&
                                    index === data.answer && (
                                    <span className="text-green-600 text-xl">
                                        ✓
                                    </span>
                                )}
                                {isSubmitted.value &&
                                    index === selectedOption.value &&
                                    index !== data.answer && (
                                    <span className="text-red-500 text-xl">
                                        ✕
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Explanation / Feedback Footer */}
            {isSubmitted.value && (
                <div className="bg-slate-50 border-t border-slate-100 p-6 animate-in slide-in-from-bottom-4 duration-300">
                    <div
                        className={`mb-4 flex items-center gap-2 font-bold ${
                            isCorrect.value ? "text-green-600" : "text-red-500"
                        }`}
                    >
                        {isCorrect.value
                            ? (
                                <>
                                    <span>Correct!</span>{" "}
                                    <span className="text-2xl">🎉</span>
                                </>
                            )
                            : (
                                <>
                                    <span>Incorrect</span>{" "}
                                    <span className="text-2xl">😢</span>
                                </>
                            )}
                    </div>

                    <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm mb-4">
                        <p className="text-xs font-bold text-slate-400 uppercase mb-1">
                            Explanation
                        </p>
                        <p className="text-slate-700 leading-relaxed text-sm">
                            {data.explanation}
                        </p>
                    </div>

                    {onNext && (
                        <button
                            onClick={onNext}
                            className="w-full py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-colors shadow-lg shadow-indigo-200"
                        >
                            Next Question →
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default QuizCard;
