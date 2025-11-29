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

CREATE TABLE IF NOT exists quiz_attempts (
    id TEXT PRIMARY KEY,
    quiz_id TEXT NOT NULL,
    user_choice INTEGER NOT NULL CHECK (user_choice >= 0),
    created_at TEXT NOT NULL
);
CREATE INDEX IF NOT exists idx_quiz_attempts_quiz_id ON quiz_attempts(quiz_id);
CREATE INDEX IF NOT exists idx_quiz_attempts_created_at ON quiz_attempts(created_at);
