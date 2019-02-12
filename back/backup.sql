--
-- File generated with SQLiteStudio v3.2.1 on Tue Feb 12 15:29:59 2019
--
-- Text encoding used: UTF-8
--
PRAGMA foreign_keys = off;
BEGIN TRANSACTION;

-- Table: answer
CREATE TABLE answer (
    answer_id            INTEGER PRIMARY KEY AUTOINCREMENT,
    answer_text          TEXT,
    question_question_id INTEGER,
    FOREIGN KEY (
        question_question_id
    )
    REFERENCES question (question_id) 
);


-- Table: question
CREATE TABLE question (
    question_id   INTEGER PRIMARY KEY AUTOINCREMENT,
    question_text TEXT,
    question_type TEXT
);

INSERT INTO question (
                         question_id,
                         question_text,
                         question_type
                     )
                     VALUES (
                         4,
                         'question4',
                         'text'
                     );

INSERT INTO question (
                         question_id,
                         question_text,
                         question_type
                     )
                     VALUES (
                         5,
                         'question5',
                         'radio'
                     );

INSERT INTO question (
                         question_id,
                         question_text,
                         question_type
                     )
                     VALUES (
                         6,
                         'question6',
                         'text'
                     );

INSERT INTO question (
                         question_id,
                         question_text,
                         question_type
                     )
                     VALUES (
                         7,
                         NULL,
                         NULL
                     );

INSERT INTO question (
                         question_id,
                         question_text,
                         question_type
                     )
                     VALUES (
                         8,
                         NULL,
                         NULL
                     );

INSERT INTO question (
                         question_id,
                         question_text,
                         question_type
                     )
                     VALUES (
                         9,
                         'question5',
                         'text'
                     );

INSERT INTO question (
                         question_id,
                         question_text,
                         question_type
                     )
                     VALUES (
                         10,
                         '[object Object],[object Object],[object Object],[object Object],[object Object],[object Object]',
                         'undefined'
                     );


-- Table: user
CREATE TABLE user (
    user_id   INTEGER PRIMARY KEY AUTOINCREMENT,
    user_name TEXT
);

INSERT INTO user (
                     user_id,
                     user_name
                 )
                 VALUES (
                     1,
                     'alex'
                 );


-- Table: user_answer
CREATE TABLE user_answer (
    user_answer_id        INTEGER PRIMARY KEY AUTOINCREMENT,
    user_answer_text      TEXT,
    user_question_id      INTEGER,
    user_user_answer_id   INTEGER,
    answer_user_answer_id INTEGER,
    question_answer_id    INTEGER,
    FOREIGN KEY (
        answer_user_answer_id
    )
    REFERENCES answer (answer_id),
    FOREIGN KEY (
        question_answer_id
    )
    REFERENCES question_user (question_user_id),
    FOREIGN KEY (
        user_user_answer_id
    )
    REFERENCES user (user_id) 
);


-- Table: user_question
CREATE TABLE user_question (
    user_question_id     INTEGER PRIMARY KEY AUTOINCREMENT,
    user_question_type   TEXT,
    user_question_data   TEXT,
    question_question_id INTEGER,
    user_id              INTEGER,
    FOREIGN KEY (
        user_id
    )
    REFERENCES user (user_id),
    FOREIGN KEY (
        question_question_id
    )
    REFERENCES question (question_id) 
);


COMMIT TRANSACTION;
PRAGMA foreign_keys = on;
