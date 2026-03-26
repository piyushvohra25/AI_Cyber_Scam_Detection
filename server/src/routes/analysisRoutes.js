import { Router } from "express";
import {
  analyzeMessage,
  analyzeUrl,
  healthCheck,
} from "../controllers/analysisController.js";

const router = Router();

router.get("/health", healthCheck);
router.post("/analyze-message", analyzeMessage);
router.post("/analyze-url", analyzeUrl);

export default router;
