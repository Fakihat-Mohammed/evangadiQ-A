import dbConnection from "../db/dbConfig.js";

// Post a new question
export const postQuestion = async (req, res) => {
  const { user_id, title, body } = req.body;

  try {
    const [result] = await dbConnection.query(
      `INSERT INTO questions (user_id, title, body) VALUES (?, ?, ?)`,
      [user_id, title, body]
    );
    res.status(201).json({ question_id: result.insertId });
  } catch (error) {
    console.error("Error posting question:", error); // Log the error
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllQuestions = async(req,res)=>{
  try {
    const [questions]= await dbConnection.query(`SELECT * FROM questions`);
    res.json(questions)
  } catch (error) {
    res.status(500).json({error:"Internal server error"})
  }
}
export const getQuestionById = async(req,res)=>{
  const{question_id}= req.params;
  try {
    const [question] = await dbConnection.query(
      "SELECT * FROM Questions WHERE question_id = ?",
      [question_id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: "Question not found" });
    }
    res.json(rows[0]);
  } catch (error) {
     res.status(500).json({ error: "Internal server error" });
  }
}
export const updateQuestion = async (req, res) => {
  const { question_id } = req.params;
  const { title, body } = req.body;
  try {
    const [result] = await dbConnection.query(
      "UPDATE Questions SET title = ?, body = ?, updated_at = CURRENT_TIMESTAMP WHERE question_id = ?",
      [title, body, question_id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Question not found" });
    }
    res.json({ message: "Question updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const deleteQuestion = async (req, res) => {
  const { question_id } = req.params;
  try {
    const [result] = await dbConnection.query(
      "DELETE FROM Questions WHERE question_id = ?",
      [question_id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Question not found" });
    }
    res.json({ message: "Question deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};