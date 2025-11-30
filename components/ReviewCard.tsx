import { Quiz, QuizAttempt } from "../api/types.ts";
import { QuizCardHeader, WrongAnswerCard } from "./QuizCard.tsx";

export interface ReviewCardProps {
    quiz: Quiz;
    attempts: QuizAttempt[];
}

export function ReviewCard({ quiz, attempts }: ReviewCardProps) {
    const optionLabels = ["A", "B", "C", "D"];

    return (
        <div class="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow overflow-hidden">
            {/* Card Body */}
            <WrongAnswerCard quiz={quiz} attempt={attempts[0]}>
                {attempts.length > 0 && (
                    <div class="mt-4 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-xl">
                        <div class="flex items-start gap-2">
                            <span class="text-red-600 font-semibold text-sm mt-0.5">
                                📋
                            </span>
                            <div class="flex-1">
                                <p class="text-sm font-semibold text-red-900 mb-2">
                                    答错记录 ({attempts.length}次)
                                </p>
                                <div class="space-y-1.5">
                                    {attempts.map((attempt) => (
                                        <div
                                            key={attempt.id}
                                            class="flex items-center justify-between text-sm"
                                        >
                                            <div class="flex items-center gap-2">
                                                <span class="text-red-700">
                                                    选择了 {optionLabels[
                                                        attempt.user_choice
                                                    ]}
                                                </span>
                                                <span class="text-red-600">
                                                    {quiz
                                                        .options[
                                                            attempt.user_choice
                                                        ]}
                                                </span>
                                            </div>
                                            <span class="text-red-500 text-xs">
                                                {formatDate(attempt.created_at)}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </WrongAnswerCard>
        </div>
    );
}

const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
        vocabulary: "词汇",
        grammar: "语法",
        reading: "阅读",
        kanji: "汉字",
    };
    return labels[type] || type;
};

const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
        vocabulary: "from-blue-500 to-blue-600",
        grammar: "from-green-500 to-green-600",
        reading: "from-purple-500 to-purple-600",
        kanji: "from-orange-500 to-orange-600",
    };
    return colors[type] || "from-gray-500 to-gray-600";
};

const formatDate = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "刚刚";
    if (diffMins < 60) return `${diffMins}分钟前`;
    if (diffHours < 24) return `${diffHours}小时前`;
    if (diffDays < 7) return `${diffDays}天前`;

    return date.toLocaleDateString("zh-CN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    });
};
