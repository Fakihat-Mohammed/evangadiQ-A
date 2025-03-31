import dbConnection from "../db/dbConfig.js";

// Post a new answer
export const postAnswer = async (req, res) => {
  const { question_id, user_id, body } = req.body;
  try {
    const [result] = await dbConnection.query(
      "INSERT INTO Answers (question_id, user_id, body) VALUES (?, ?, ?)",
      [question_id, user_id, body]
    );
    res.status(201).json({ answer_id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all answers for a question
export const getAnswersByQuestionId = async (req, res) => {
  const { question_id } = req.params;
  try {
    const [rows] = await dbConnection.query(
      "SELECT * FROM Answers WHERE question_id = ?",
      [question_id]
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an answer
export const updateAnswer = async (req, res) => {
  const { answer_id } = req.params;
  const { body } = req.body;
  try {
    const [result] = await dbConnection.query(
      "UPDATE Answers SET body = ?, updated_at = CURRENT_TIMESTAMP WHERE answer_id = ?",
      [body, answer_id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Answer not found" });
    }
    res.json({ message: "Answer updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete an answer
export const deleteAnswer = async (req, res) => {
  const { answer_id } = req.params;
  try {
    const [result] = await dbConnection.query(
      "DELETE FROM Answers WHERE answer_id = ?",
      [answer_id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Answer not found" });
    }
    res.json({ message: "Answer deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
