
import express from "express";
import {
  postAnswer,
  getAnswersByQuestionId,
  updateAnswer,
  deleteAnswer,
} from "../Controllers/answerController.js";

const router = express.Router();

// Define routes
router.post("/", postAnswer); // Post a new answer
router.get("/:question_id", getAnswersByQuestionId); // Get answers by question ID
router.put("/:answer_id", updateAnswer); // Update an answer
router.delete("/:answer_id", deleteAnswer); // Delete an answer

export default router;
