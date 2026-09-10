import React, { useState } from 'react';
import { ShieldCheck, TrendingDown, Clock, Calculator, ArrowRight } from 'lucide-react';

export const RoiSavingsCalculator: React.FC = () => {
  const [budget, setBudget] = useState<number>(5000); // in Cr

  const estimatedSavings = Math.round(budget * 0.098); // ~9.8% saved via early intervention
  const timeAdvantageMonths = 4.5;

  return (
    <div className="roi-calculator-card">
      <div className="roi-card-head">
        <div className="roi-title-flex">
          <ShieldCheck size={18} className="icon-mint" />
          <div>
            <b>PUBLIC FUNDS PROTECTION & ROI IMPACT</b>
            <p>Quantifying the economic impact of 4.6-month early risk detection</p>
          </div>
        </div>
        <span className="roi-badge">PAIMANA / CUF IMPACT MODEL</span>
      </div>

      <div className="roi-metrics-row">
        <div className="roi-metric-item">
          <small>Capital Protected</small>
          <b>₹14,280 Cr</b>
          <span>Across 15 portfolio projects</span>
        </div>
        <div className="roi-metric-item">
          <small>Early Warning Lead Time</small>
          <b>4.6 Months</b>
          <span>Ahead of quarterly reviews</span>
        </div>
        <div className="roi-metric-item">
          <small>Cost Overrun Avoidance</small>
          <b>9.8% Avg</b>
          <span>Prevented project budget expansion</span>
        </div>
      </div>

      {/* Interactive Estimator Slider */}
      <div className="roi-interactive-box">
        <div className="roi-interactive-head">
          <Calculator size={15} className="icon-mint" />
          <span>Interactive Savings Estimator for New Infrastructure Projects</span>
        </div>

        <div className="roi-slider-group">
          <div className="roi-slider-label">
            <span>Project Allocation Budget:</span>
            <b>₹{budget.toLocaleString('en-IN')} Cr</b>
          </div>
          <input
            type="range"
            min="500"
            max="25000"
            step="250"
            value={budget}
            onChange={e => setBudget(Number(e.target.value))}
          />
        </div>

        <div className="roi-results-grid">
          <div className="roi-result-item">
            <small>Estimated Capital Protected</small>
            <b className="txt-mint">₹{estimatedSavings.toLocaleString('en-IN')} Cr</b>
            <span>Direct overrun prevention</span>
          </div>
          <div className="roi-result-item">
            <small>Schedule Lead Time Saved</small>
            <b>{timeAdvantageMonths} Months</b>
            <span>Faster bottleneck resolution</span>
          </div>
          <div className="roi-result-item">
            <small>Risk Score Reduction</small>
            <b>-34 Points</b>
            <span>Post-officer intervention</span>
          </div>
        </div>
      </div>
    </div>
  );
};
