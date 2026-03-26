import { AnalysisRecord } from "../models/AnalysisRecord.js";
import { predictMessage, predictUrl } from "../services/aiService.js";

const buildPersistencePayload = (analysisType, input, result) => ({
  analysisType,
  input,
  result: {
    score: result.score,
    riskLevel: result.risk_level,
    classification: result.classification,
    recommendation: result.recommendation,
    reasoning: result.reasoning,
    triggeredRules: result.triggered_rules,
    highlightedKeywords: result.highlighted_keywords,
    extractedFeatures: result.extracted_features,
    graphAnalysis: result.graph_analysis,
  },
});

export const analyzeMessage = async (req, res, next) => {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ error: "Message input is required." });
    }

    const trimmedMessage = message.trim();
    const result = await predictMessage(trimmedMessage);
    const savedRecord = await AnalysisRecord.create(
      buildPersistencePayload("message", trimmedMessage, result)
    );

    return res.status(200).json({
      id: savedRecord._id,
      type: "message",
      input: trimmedMessage,
      result,
      createdAt: savedRecord.createdAt,
    });
  } catch (error) {
    return next(error);
  }
};

export const analyzeUrl = async (req, res, next) => {
  try {
    const { url } = req.body;

    if (!url || !url.trim()) {
      return res.status(400).json({ error: "URL input is required." });
    }

    const trimmedUrl = url.trim();
    const result = await predictUrl(trimmedUrl);
    const savedRecord = await AnalysisRecord.create(
      buildPersistencePayload("url", trimmedUrl, result)
    );

    return res.status(200).json({
      id: savedRecord._id,
      type: "url",
      input: trimmedUrl,
      result,
      createdAt: savedRecord.createdAt,
    });
  } catch (error) {
    return next(error);
  }
};

export const healthCheck = (_req, res) => {
  res.json({
    status: "ok",
    service: "node-api",
    timestamp: new Date().toISOString(),
  });
};
