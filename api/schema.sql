CREATE TABLE quizzes (
    id TEXT PRIMARY KEY,
    type TEXT NOT NULL,
    level TEXT,
    question TEXT NOT NULL,
    options TEXT NOT NULL,
    answer INTEGER NOT NULL,
    explanation TEXT NOT NULL
);

CREATE INDEX idx_quizzes_type ON quizzes(type);
CREATE INDEX idx_quizzes_level ON quizzes(level);

CREATE TABLE IF NOT exists wrong_answers (
    id TEXT PRIMARY KEY,
    quiz_id TEXT NOT NULL,
    your_answer INTEGER NOT NULL CHECK (your_answer >= 0),
    created_at TEXT NOT NULL
);
CREATE INDEX IF NOT exists idx_wrong_answers_quiz_id ON wrong_answers(quiz_id);
CREATE INDEX IF NOT exists idx_wrong_answers_created_at ON wrong_answers(created_at);
