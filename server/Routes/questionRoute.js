import express from 'express';
import {
  postQuestion,
  getAllQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
} from "../Controllers/questionController.js";
import { authMiddleware } from '../middleware/authMiddleware.js';
const router = express.Router()
router.post("/question", authMiddleware,postQuestion);
router.get("/questions", getAllQuestions);
router.get("/questions/:question_id", getQuestionById);
router.put("/questions/:question_id", authMiddleware, updateQuestion);
router.delete("/questions/:question_id", authMiddleware, deleteQuestion);
export default router;