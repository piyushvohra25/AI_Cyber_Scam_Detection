import mongoose from "mongoose";

const ruleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    reason: { type: String, required: true },
  },
  { _id: false }
);

const keywordSchema = new mongoose.Schema(
  {
    word: { type: String, required: true },
    severity: { type: String, required: true },
  },
  { _id: false }
);

const analysisRecordSchema = new mongoose.Schema(
  {
    analysisType: {
      type: String,
      enum: ["message", "url"],
      required: true,
    },
    input: {
      type: String,
      required: true,
      trim: true,
    },
    result: {
      score: { type: Number, required: true },
      riskLevel: { type: String, required: true },
      classification: { type: String, required: true },
      recommendation: { type: String, required: true },
      reasoning: [{ type: String }],
      triggeredRules: [ruleSchema],
      highlightedKeywords: [keywordSchema],
      extractedFeatures: { type: mongoose.Schema.Types.Mixed },
      graphAnalysis: { type: mongoose.Schema.Types.Mixed },
    },
  },
  { timestamps: true }
);

export const AnalysisRecord = mongoose.model("AnalysisRecord", analysisRecordSchema);
