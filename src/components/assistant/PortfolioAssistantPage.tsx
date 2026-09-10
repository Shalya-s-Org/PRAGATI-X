import React, { useState } from 'react';
import { BrainCircuit, Sparkles, ArrowRight, CheckCircle2, AlertTriangle, ShieldCheck, Info } from 'lucide-react';
import { Header } from '../common/Header';
import type { PortfolioProject } from '../../types';

interface PortfolioAssistantPageProps {
  projects: PortfolioProject[];
  onResetDemo: () => void;
  onToggleMobileNav?: () => void;
}

export const PortfolioAssistantPage: React.FC<PortfolioAssistantPageProps> = ({
  projects,
  onResetDemo,
  onToggleMobileNav
}) => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>(projects[0]?.id || '');
  const [query, setQuery] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');
  const [askedQuestion, setAskedQuestion] = useState<string>('');

  const samplePrompts = [
    'Why is Eastern Freight Corridor Phase II flagged as Critical?',
    'Which projects have been resolved by officer intervention?',
    'What is the recommended intervention for Green Hydrogen Hub?',
    'Summarize high-risk projects in the Transport sector.'
  ];

  const handleAsk = (promptText?: string) => {
    const textToAsk = promptText || query;
    if (!textToAsk.trim()) return;

    setAskedQuestion(textToAsk);

    // Find targeted project or default to selected / highest risk
    const targetProject = projects.find(p =>
      textToAsk.toLowerCase().includes(p.name.toLowerCase()) ||
      textToAsk.toLowerCase().includes(p.id.toLowerCase())
    ) || projects.find(p => p.id === selectedProjectId) || [...projects].sort((a, b) => b.assessment.score - a.assessment.score)[0];

    let responseText = '';

    if (textToAsk.toLowerCase().includes('resolved')) {
      const resolvedList = projects.filter(p => p.status === 'Resolved');
      if (resolvedList.length > 0) {
        responseText = `There are currently ${resolvedList.length} resolved projects in the portfolio: ${resolvedList.map(p => p.name).join(', ')}. Officer interventions have successfully updated their status to Resolved, recalibrating the model learning signals.`;
      } else {
        responseText = 'No projects have been marked as Resolved yet. Open a project from the Risk Queue and record a "Mitigated" or "False alert" outcome to resolve it.';
      }
    } else if (textToAsk.toLowerCase().includes('transport') || textToAsk.toLowerCase().includes('sector')) {
      const sectorProjects = projects.filter(p => p.sector.toLowerCase() === 'transport');
      responseText = `In the Transport sector, ${sectorProjects.length} projects are being monitored. High risk projects include ${sectorProjects.map(p => `${p.name} (Score: ${p.assessment.score})`).join(', ')}. Primary risk drivers relate to land acquisition ROW delays and subcontractor mobilization.`;
    } else {
      // Direct project query response
      const driversList = targetProject.assessment.drivers.map(d => `• ${d}`).join('\n');
      const priorInterventions = targetProject.interventions.length > 0
        ? `Prior officer intervention: "${targetProject.interventions[0].type}" resulted in "${targetProject.interventions[0].outcome}".`
        : 'No prior officer intervention recorded.';

      responseText = `${targetProject.name} (${targetProject.ministry}) currently has a risk score of ${targetProject.assessment.score}/100 with ${targetProject.assessment.confidence}% confidence.\n\nSimulated model indicators:\n- Cost Variance: +${targetProject.assessment.costVariance}%\n- Schedule Variance: +${targetProject.assessment.scheduleVariance}%\n- Physical Progress Trend: ${targetProject.assessment.progressTrend}\n\nTop SHAP Contributing Drivers:\n${driversList}\n\nRecommended Action: ${targetProject.recommendedAction}\n\n${priorInterventions}\n\n[Disclaimer: All numerical risk predictions are computed by the deterministic local risk engine. This assistant synthesizes curated evidence only.]`;
    }

    setAnswer(responseText);
  };

  return (
    <div className="assistant-page-view">
      <Header
        title="Portfolio AI assistant"
        subtitle="Evidence-bound explanations only. Synthesizes curated snapshot data, risk drivers, and officer feedback."
        onReset={onResetDemo}
        onToggleMobileNav={onToggleMobileNav}
      />

      {/* Model Constraint Disclaimer Banner */}
      <div className="assistant-disclaimer-banner">
        <Info size={18} className="banner-icon" />
        <div>
          <b>CONSTRAINED EXPLANATORY MODEL</b>
          <p>
            The assistant is strictly bounded by curated local snapshot evidence.
            It provides transparent narrative explanations of model inputs and officer outcomes, and never claims to generate numerical predictions directly.
          </p>
        </div>
      </div>

      <div className="ai-layout">
        {/* Main Chat Interface */}
        <section className="ai-chat">
          <div className="ai-start">
            <span className="bot-icon">
              <BrainCircuit size={24} />
            </span>
            <div>
              <h2>Ask about portfolio risks & evidence</h2>
              <p>Answers cite curated project context, SHAP drivers, and officer feedback.</p>
            </div>
          </div>

          {/* Project Selector for Context */}
          <div className="context-selector-row">
            <label htmlFor="proj-select">Focus Project Context:</label>
            <select
              id="proj-select"
              value={selectedProjectId}
              onChange={e => setSelectedProjectId(e.target.value)}
            >
              {projects.map(p => (
                <option key={p.id} value={p.id}>
                  {p.id} — {p.name} ({p.risk} Risk, Score: {p.assessment.score})
                </option>
              ))}
            </select>
          </div>

          {/* Conversation history */}
          {askedQuestion && (
            <div className="question">
              <p>{askedQuestion}</p>
            </div>
          )}

          {answer && (
            <div className="answer">
              <Sparkles size={16} className="icon-mint" />
              <div className="answer-content">
                <p className="answer-text">{answer}</p>
                <small className="citation-tag">
                  Sources: Curated PAIMANA/CUF demo snapshot · SHAP risk drivers · Officer intervention log
                </small>
              </div>
            </div>
          )}

          {/* Sample Prompts */}
          <div className="prompt-set">
            <p className="prompt-set-label">Suggested queries:</p>
            {samplePrompts.map(prompt => (
              <button
                key={prompt}
                onClick={() => {
                  setQuery(prompt);
                  handleAsk(prompt);
                }}
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Row */}
          <div className="ask">
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleAsk()}
              placeholder="Ask about project risks, drivers, or intervention outcomes..."
            />
            <button onClick={() => handleAsk()} aria-label="Send prompt">
              <ArrowRight size={16} />
            </button>
          </div>
        </section>

        {/* Authorized Context Panel */}
        <aside className="ai-context">
          <p className="px-kicker">AUTHORIZED CONTEXT</p>
          <h3>Bounded Grounding</h3>

          <div className="context-item">
            <CheckCircle2 size={16} />
            <div>
              <b>Curated Portfolio Snapshot</b>
              <small>15 Projects · Apr 2026</small>
            </div>
          </div>

          <div className="context-item">
            <CheckCircle2 size={16} />
            <div>
              <b>SHAP Risk Drivers</b>
              <small>Cost & schedule variances</small>
            </div>
          </div>

          <div className="context-item">
            <CheckCircle2 size={16} />
            <div>
              <b>Officer Intervention Log</b>
              <small>Dated audit trail & feedback</small>
            </div>
          </div>

          <hr />

          <div className="guardrail-box">
            <AlertTriangle size={15} className="guardrail-icon" />
            <p>
              <b>Strict Guardrails Active</b>
              <small>Assistant will refuse to speculate outside curated evidence or invent numerical scores.</small>
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
};
