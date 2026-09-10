import { useState, useEffect, useCallback } from 'react';
import { seedProjects } from '../data/seedData';
import type { PortfolioProject, Intervention, Outcome, InterventionType } from '../types';

const STORAGE_KEY = 'pragati-x-demo-v3';

const LEARNING_SIGNALS: Record<Outcome, string> = {
  'Mitigated': 'Learning signal recorded: Risk mitigation action verified by officer',
  'False alert': 'Verified false alert: Model baseline recalibrated for reporting lag',
  'Confirmed risk': 'Confirmed risk: Priority escalation active in risk queue',
  'Needs monitoring': 'Monitoring active: Follow-up verification scheduled'
};

function loadStoredProjects(): PortfolioProject[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Failed to load local demo state, falling back to seed data.', e);
  }
  return seedProjects;
}

export function usePortfolioStore() {
  const [projects, setProjects] = useState<PortfolioProject[]>(loadStoredProjects);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    } catch (e) {
      console.error('Failed to persist portfolio state to localStorage', e);
    }
  }, [projects]);

  const recordIntervention = useCallback((
    projectId: string,
    type: InterventionType,
    outcome: Outcome,
    note: string,
    officerName: string = 'Officer Review'
  ) => {
    const timestamp = '19 Apr 2026';
    const newIntervention: Intervention = {
      id: `INT-${Math.floor(1000 + Math.random() * 9000)}`,
      type,
      outcome,
      note: note.trim() || 'Officer intervention logged.',
      at: timestamp,
      officerName
    };

    setProjects(prevProjects =>
      prevProjects.map(proj => {
        if (proj.id !== projectId) return proj;

        const isResolved = outcome === 'Mitigated' || outcome === 'False alert';

        return {
          ...proj,
          status: isResolved ? 'Resolved' : 'Monitoring',
          learningState: LEARNING_SIGNALS[outcome],
          interventions: [newIntervention, ...proj.interventions],
          feedback: {
            note: newIntervention.note,
            outcome: newIntervention.outcome,
            at: timestamp
          }
        };
      })
    );
  }, []);

  const resetDemo = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn('Error clearing localStorage', e);
    }
    setProjects(seedProjects);
  }, []);

  return {
    projects,
    recordIntervention,
    resetDemo
  };
}

export function usePortfolio() {
  const { projects, recordIntervention, resetDemo } = usePortfolioStore();

  const update = useCallback((
    id: string,
    intervention: { type: InterventionType; outcome: Outcome; note: string }
  ) => {
    recordIntervention(id, intervention.type, intervention.outcome, intervention.note);
  }, [recordIntervention]);

  return {
    projects,
    update,
    recordIntervention,
    reset: resetDemo
  };
}
