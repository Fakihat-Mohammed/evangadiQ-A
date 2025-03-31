import express from 'express';
import {
  postQuestion,
  getAllQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
} from "../Controllers/questionController.js";
const router = express.Router()
router.post('/question',postQuestion)
router.get("/questions", getAllQuestions);
router.get("/questions/:question_id", getQuestionById);
router.put("/questions/:question_id", updateQuestion);
router.delete("/questions/:question_id", deleteQuestion);
export default router;