export type RiskLevel = 'Critical' | 'High' | 'Watch' | 'Low';

export type ReviewStatus = 'Needs review' | 'In review' | 'Monitoring' | 'Resolved';

export type Outcome = 'Confirmed risk' | 'Mitigated' | 'False alert' | 'Needs monitoring';

export type InterventionType = 'Request recovery plan' | 'Schedule review' | 'Funding review' | 'Field verification';

export interface DataQuality {
  score: number; // e.g. 84 (%)
  freshness: string; // e.g. "Validated 18 Apr 2026"
  dependency: string; // e.g. "1 dependency delayed"
  recordCompleteness: number; // e.g. 92 (%)
}

export interface RiskAssessment {
  score: number; // 0 - 100
  confidence: number; // 0 - 100 (%)
  costVariance: number; // e.g. +14 (%)
  scheduleVariance: number; // e.g. +18 (%)
  progressTrend: string; // e.g. "Below plan for 2 months"
  drivers: string[]; // SHAP-style top contributing drivers
}

export interface OfficerFeedback {
  note: string;
  outcome: Outcome;
  at: string;
}

export interface Intervention {
  id: string;
  type: InterventionType;
  note: string;
  outcome: Outcome;
  at: string;
  officerName?: string;
}

export interface PortfolioProject {
  id: string;
  name: string;
  ministry: string;
  sector: string;
  region: string;
  cost: string;
  risk: RiskLevel;
  status: ReviewStatus;
  milestone: string;
  alertAgeDays: number;
  recommendedAction: string;
  assessment: RiskAssessment;
  quality: DataQuality;
  interventions: Intervention[];
  feedback?: OfficerFeedback;
  learningState?: string;
}
