export interface AnalysisResult {
  summary: string[];
  risks: RiskItem[];
  safetyRating: 'safe' | 'suspicious';
  confidence: number;
}

export interface RiskItem {
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
}

export interface AnalysisRequest {
  content: string;
  source?: string;
}