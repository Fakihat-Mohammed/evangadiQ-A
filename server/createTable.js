import dbConnection from "./db/dbConfig.js";

// -- User table to store user information
const createUsersTable = `
CREATE TABLE IF NOT EXISTS Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);`;

// -- Question table to store questions posted by users
const createQuestionsTable = `
CREATE TABLE IF NOT EXISTS Questions (
    question_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    views INT DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);`;

// -- Answer table to store answers to questions
const createAnswersTable = `
CREATE TABLE IF NOT EXISTS Answers (
    answer_id INT AUTO_INCREMENT PRIMARY KEY,
    question_id INT NOT NULL,
    user_id INT NOT NULL,
    body TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_accepted BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (question_id) REFERENCES Questions(question_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);`;

// -- Optional: Votes table for question/answer voting system
const createVotesTable = `
CREATE TABLE IF NOT EXISTS Votes (
    vote_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    answer_id INT,
    question_id INT,
    vote_value TINYINT NOT NULL, -- 1 for upvote, -1 for downvote
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (answer_id) REFERENCES Answers(answer_id) ON DELETE CASCADE,
    FOREIGN KEY (question_id) REFERENCES Questions(question_id) ON DELETE CASCADE,
    CONSTRAINT chk_vote_value CHECK (vote_value IN (-1, 1)),
    CONSTRAINT chk_vote_target CHECK (
        (answer_id IS NOT NULL AND question_id IS NULL) OR 
        (answer_id IS NULL AND question_id IS NOT NULL)
    )
);`;

// Function to create tables
async function createTables() {
  try {
    await dbConnection.query("SELECT 'test'"); // Check DB connection
    console.log("Database connection successful.");

    await dbConnection.query(createUsersTable);
    console.log("Users table created.");

    await dbConnection.query(createQuestionsTable);
    console.log("Questions table created.");

    await dbConnection.query(createAnswersTable);
    console.log("Answers table created.");

    await dbConnection.query(createVotesTable);
    console.log("Votes table created.");
  } catch (error) {
    console.error("Error creating tables: ", error.message);
  } finally {
    await dbConnection.end();
  }
}

createTables();
