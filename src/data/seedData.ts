import type { PortfolioProject } from '../types';

export const seedProjects: PortfolioProject[] = [
  {
    id: 'PX-001',
    name: 'Eastern Freight Corridor Phase II',
    ministry: 'Ministry of Railways',
    sector: 'Transport',
    region: 'East',
    cost: '₹18,420 Cr',
    risk: 'Critical',
    status: 'Needs review',
    milestone: 'Land & ROW package 4B clearance',
    alertAgeDays: 45,
    recommendedAction: 'Schedule joint field verification with District Collector for ROW package 4B.',
    assessment: {
      score: 88,
      confidence: 92,
      costVariance: 19,
      scheduleVariance: 16,
      progressTrend: 'Physical progress below plan by 5.4% over last 2 quarters',
      drivers: [
        'Certified expenditure remains 19% below planned baseline curve',
        'State forest & land clearance pending for 120+ days (ROW Package 4B)',
        'Track laying contractor mobilization delayed by 6 weeks in Sonnagar sector'
      ]
    },
    quality: {
      score: 88,
      freshness: 'Validated 18 Apr 2026',
      dependency: '2 dependencies delayed (Forest clearance & State ROW)',
      recordCompleteness: 94
    },
    interventions: []
  },
  {
    id: 'PX-002',
    name: 'National Water Grid Link 4',
    ministry: 'Jal Shakti',
    sector: 'Water',
    region: 'North',
    cost: '₹7,860 Cr',
    risk: 'High',
    status: 'Needs review',
    milestone: 'Canal lining package B approval',
    alertAgeDays: 32,
    recommendedAction: 'Request recovery plan from State Water Resources Department.',
    assessment: {
      score: 74,
      confidence: 85,
      costVariance: 14,
      scheduleVariance: 12,
      progressTrend: 'Flattening earthwork excavation trend',
      drivers: [
        'Monsoon canal lining delays created 8-week backlog',
        'Cost overrun reported in pump station civil works (+14%)',
        'Vendor payment delays reported at sub-contractor level'
      ]
    },
    quality: {
      score: 82,
      freshness: 'Validated 16 Apr 2026',
      dependency: '1 dependency delayed (Pumping machinery dispatch)',
      recordCompleteness: 88
    },
    interventions: []
  },
  {
    id: 'PX-003',
    name: 'Solar Park Cluster, Kutch',
    ministry: 'MNRE',
    sector: 'Energy',
    region: 'West',
    cost: '₹3,140 Cr',
    risk: 'Watch',
    status: 'Monitoring',
    milestone: 'Substation bay 2 commissioning',
    alertAgeDays: 18,
    recommendedAction: 'Funding review for Grid Interconnect transformer procurement.',
    assessment: {
      score: 49,
      confidence: 88,
      costVariance: 4,
      scheduleVariance: 3,
      progressTrend: 'On track with slight transformer delivery lead time gap',
      drivers: [
        'High-voltage transformer dispatch delayed by 2 weeks from manufacturer',
        'Minor land boundary verification gap in grid substation extension'
      ]
    },
    quality: {
      score: 95,
      freshness: 'Validated 19 Apr 2026',
      dependency: 'No unresolved core dependency',
      recordCompleteness: 96
    },
    interventions: [
      {
        id: 'INT-003-01',
        type: 'Schedule review',
        outcome: 'Needs monitoring',
        note: 'State transmission corporation committed transformer arrival by end of April.',
        at: '12 Apr 2026',
        officerName: 'Anil Kumar (Deputy Secretary)'
      }
    ],
    learningState: 'Monitoring active: Transformer shipment tracked daily'
  },
  {
    id: 'PX-004',
    name: 'North East Highway Package 7',
    ministry: 'MoRTH',
    sector: 'Roads',
    region: 'North East',
    cost: '₹5,920 Cr',
    risk: 'Watch',
    status: 'In review',
    milestone: 'Hill slope stabilization km 42-58',
    alertAgeDays: 14,
    recommendedAction: 'Schedule field verification of hill slope stabilization safety measures.',
    assessment: {
      score: 42,
      confidence: 79,
      costVariance: 6,
      scheduleVariance: 4,
      progressTrend: 'Slight deceleration due to early seasonal rainfall',
      drivers: [
        'Geotechnical inspection required for landslide prone sector km 44',
        'Heavy equipment transport restricted due to weight limit bridge repair'
      ]
    },
    quality: {
      score: 80,
      freshness: 'Validated 15 Apr 2026',
      dependency: '1 dependency pending (NHIDCL structural clearance)',
      recordCompleteness: 82
    },
    interventions: []
  },
  {
    id: 'PX-005',
    name: 'Metro Corridor Extension 3',
    ministry: 'MoHUA',
    sector: 'Urban',
    region: 'South',
    cost: '₹6,400 Cr',
    risk: 'High',
    status: 'In review',
    milestone: 'Underground tunneling section 2',
    alertAgeDays: 28,
    recommendedAction: 'Request recovery plan for TBM cutterhead replacement delay.',
    assessment: {
      score: 79,
      confidence: 90,
      costVariance: 16,
      scheduleVariance: 14,
      progressTrend: 'Tunnel Boring Machine advance rate 20% below monthly targets',
      drivers: [
        'Geological strata harder than initial survey baseline causing TBM wear',
        'Traffic diversion permission delayed in central city segment'
      ]
    },
    quality: {
      score: 90,
      freshness: 'Validated 17 Apr 2026',
      dependency: '1 dependency delayed (Municipal traffic clearance)',
      recordCompleteness: 92
    },
    interventions: []
  },
  {
    id: 'PX-006',
    name: 'River Link Canal Package A',
    ministry: 'Jal Shakti',
    sector: 'Water',
    region: 'Central',
    cost: '₹4,280 Cr',
    risk: 'High',
    status: 'Needs review',
    milestone: 'Aqueduct 3 structural concrete phase',
    alertAgeDays: 21,
    recommendedAction: 'Funding review & milestone release for cement supplier payments.',
    assessment: {
      score: 68,
      confidence: 81,
      costVariance: 11,
      scheduleVariance: 9,
      progressTrend: 'Slowing structural pour rates',
      drivers: [
        'Delayed milestone release to main civil engineering contractor',
        'Environmental flow compliance check pending from Central Water Commission'
      ]
    },
    quality: {
      score: 84,
      freshness: 'Validated 14 Apr 2026',
      dependency: '1 dependency delayed (CWC hydrology signoff)',
      recordCompleteness: 85
    },
    interventions: []
  },
  {
    id: 'PX-007',
    name: 'National Health Lab Network',
    ministry: 'MoHFW',
    sector: 'Health',
    region: 'North',
    cost: '₹2,190 Cr',
    risk: 'Low',
    status: 'Resolved',
    milestone: 'BSL-3 facility equipment installation',
    alertAgeDays: 5,
    recommendedAction: 'No immediate escalation needed.',
    assessment: {
      score: 28,
      confidence: 94,
      costVariance: 2,
      scheduleVariance: 0,
      progressTrend: 'Meeting or exceeding all milestone targets',
      drivers: [
        'All equipment procurement cycles completed within budget',
        'State site readiness signoff completed 10 days ahead of schedule'
      ]
    },
    quality: {
      score: 96,
      freshness: 'Validated 19 Apr 2026',
      dependency: 'All dependencies resolved',
      recordCompleteness: 98
    },
    interventions: [
      {
        id: 'INT-007-01',
        type: 'Field verification',
        outcome: 'Mitigated',
        note: 'Field inspection confirmed BSL-3 HVAC compliance and equipment calibration.',
        at: '10 Apr 2026',
        officerName: 'Dr. Priya Sharma'
      }
    ],
    learningState: 'Learning signal recorded: Verification confirmed baseline performance'
  },
  {
    id: 'PX-008',
    name: 'Port Modernisation, Paradip',
    ministry: 'Ministry of Ports',
    sector: 'Ports',
    region: 'East',
    cost: '₹3,860 Cr',
    risk: 'Watch',
    status: 'In review',
    milestone: 'Coal berth 2 dredging & quay wall',
    alertAgeDays: 16,
    recommendedAction: 'Schedule review with Maritime Board regarding dredging vessel availability.',
    assessment: {
      score: 46,
      confidence: 83,
      costVariance: 5,
      scheduleVariance: 2,
      progressTrend: 'Dredging volume behind schedule by 8%',
      drivers: [
        'Dredging vessel maintenance breakdown lost 10 operational days',
        'Customs clearance delay for port crane replacement parts'
      ]
    },
    quality: {
      score: 86,
      freshness: 'Validated 16 Apr 2026',
      dependency: '1 dependency pending (Customs spare parts clearance)',
      recordCompleteness: 89
    },
    interventions: []
  },
  {
    id: 'PX-009',
    name: 'Green Hydrogen Hub, Vizag',
    ministry: 'MNRE',
    sector: 'Energy',
    region: 'South',
    cost: '₹8,950 Cr',
    risk: 'Critical',
    status: 'Needs review',
    milestone: 'Electrolyzer plant land allotment',
    alertAgeDays: 52,
    recommendedAction: 'Schedule high-level inter-ministerial intervention with State Industrial Board.',
    assessment: {
      score: 84,
      confidence: 89,
      costVariance: 18,
      scheduleVariance: 22,
      progressTrend: 'Progress stagnant for 3 consecutive monthly cycles',
      drivers: [
        'Coastal Regulation Zone (CRZ) clearance stuck in multi-departmental loop',
        'Freshwater pipeline allocation agreement unexecuted',
        'Anchor technology partner contract renegotiation pending'
      ]
    },
    quality: {
      score: 78,
      freshness: 'Validated 15 Apr 2026',
      dependency: '3 critical dependencies unresolved (CRZ, Water, Power)',
      recordCompleteness: 80
    },
    interventions: []
  },
  {
    id: 'PX-010',
    name: 'Border Roads Package 11',
    ministry: 'MoD',
    sector: 'Defense',
    region: 'North',
    cost: '₹2,740 Cr',
    risk: 'High',
    status: 'In review',
    milestone: 'High-altitude tunnel portal south',
    alertAgeDays: 25,
    recommendedAction: 'Field verification of snow clearance & winter working protocols.',
    assessment: {
      score: 71,
      confidence: 86,
      costVariance: 13,
      scheduleVariance: 11,
      progressTrend: 'Winter stoppage extended beyond planned resumption date',
      drivers: [
        'Extreme weather delayed spring tunnel excavation reopening',
        'Specialized high-altitude concrete mix supply chain bottleneck'
      ]
    },
    quality: {
      score: 87,
      freshness: 'Validated 17 Apr 2026',
      dependency: '1 dependency delayed (BORDER-SUPPLY portal clearance)',
      recordCompleteness: 90
    },
    interventions: []
  },
  {
    id: 'PX-011',
    name: 'Smart Irrigation Cluster',
    ministry: 'Agriculture',
    sector: 'Irrigation',
    region: 'West',
    cost: '₹1,880 Cr',
    risk: 'Low',
    status: 'Resolved',
    milestone: 'Drip grid network automation phase 1',
    alertAgeDays: 3,
    recommendedAction: 'Regular monitoring; target performance met.',
    assessment: {
      score: 24,
      confidence: 96,
      costVariance: 0,
      scheduleVariance: 0,
      progressTrend: '100% of physical targets achieved for Q1',
      drivers: [
        'IoT sensor deployment completed ahead of scheduled window',
        'Farmer cooperative training workshops successfully concluded'
      ]
    },
    quality: {
      score: 97,
      freshness: 'Validated 19 Apr 2026',
      dependency: 'All dependencies resolved',
      recordCompleteness: 99
    },
    interventions: [
      {
        id: 'INT-011-01',
        type: 'Field verification',
        outcome: 'False alert',
        note: 'Flagged delay was a reporting lag in state portal; physical telemetry confirms full deployment.',
        at: '08 Apr 2026',
        officerName: 'Sujata Rao (Director)'
      }
    ],
    learningState: 'Verified false alert: Telemetry integration updated'
  },
  {
    id: 'PX-012',
    name: 'Freight Terminal, Nagpur',
    ministry: 'Ministry of Railways',
    sector: 'Transport',
    region: 'Central',
    cost: '₹2,360 Cr',
    risk: 'Watch',
    status: 'In review',
    milestone: 'Gantry crane rail installation',
    alertAgeDays: 12,
    recommendedAction: 'Schedule review with CONCOR logistics teams.',
    assessment: {
      score: 53,
      confidence: 84,
      costVariance: 7,
      scheduleVariance: 5,
      progressTrend: 'Slight delay in rail yard signaling integration',
      drivers: [
        'Signal interlocking software safety certification pending',
        'Yard electrical feeder line connection approval awaited'
      ]
    },
    quality: {
      score: 91,
      freshness: 'Validated 18 Apr 2026',
      dependency: '1 dependency pending (Safety Commissioner certificate)',
      recordCompleteness: 93
    },
    interventions: []
  },
  {
    id: 'PX-013',
    name: 'High-Speed Fiber Backbone Phase 3',
    ministry: 'Ministry of Telecom',
    sector: 'Telecom',
    region: 'South',
    cost: '₹4,500 Cr',
    risk: 'High',
    status: 'Needs review',
    milestone: 'Optical fiber ducting along NH-44',
    alertAgeDays: 30,
    recommendedAction: 'Schedule joint meeting between Telecom Dept and Highway Authority.',
    assessment: {
      score: 76,
      confidence: 87,
      costVariance: 15,
      scheduleVariance: 13,
      progressTrend: 'Right of Way (ROW) permission bottleneck slowing cable laying',
      drivers: [
        'Highway widening work damaged pre-laid optical fiber ducts',
        'ROW compensation rate dispute between state telecom & highway authority'
      ]
    },
    quality: {
      score: 83,
      freshness: 'Validated 15 Apr 2026',
      dependency: '2 dependencies delayed (NHAI ROW permission & State approval)',
      recordCompleteness: 86
    },
    interventions: []
  },
  {
    id: 'PX-014',
    name: 'Specialized Steel Plant Expansion',
    ministry: 'Ministry of Steel',
    sector: 'Steel',
    region: 'East',
    cost: '₹9,200 Cr',
    risk: 'Watch',
    status: 'In review',
    milestone: 'Blast Furnace 4 relining & automation',
    alertAgeDays: 19,
    recommendedAction: 'Funding review for refractories procurement.',
    assessment: {
      score: 47,
      confidence: 82,
      costVariance: 5,
      scheduleVariance: 4,
      progressTrend: 'Refractory brick installation progressing steadily',
      drivers: [
        'Imported refractory brick shipment delayed by maritime congestion',
        'Gas cleaning plant testing required prior to hot commissioning'
      ]
    },
    quality: {
      score: 89,
      freshness: 'Validated 17 Apr 2026',
      dependency: '1 dependency pending (Port import release)',
      recordCompleteness: 91
    },
    interventions: []
  },
  {
    id: 'PX-015',
    name: 'Ultra Mega Thermal-Solar Hybrid',
    ministry: 'Ministry of Power',
    sector: 'Energy',
    region: 'West',
    cost: '₹11,300 Cr',
    risk: 'Critical',
    status: 'Needs review',
    milestone: '765kV Pooling Substation synchronization',
    alertAgeDays: 38,
    recommendedAction: 'Request urgent recovery plan from Power Grid Corporation.',
    assessment: {
      score: 86,
      confidence: 91,
      costVariance: 21,
      scheduleVariance: 18,
      progressTrend: 'Severe cost expansion and grid sync delay',
      drivers: [
        '765kV transmission tower foundation affected by unseasonal soil erosion',
        'Substation automation contractor financial distress reported',
        'Cost overrun exceeds 20% threshold triggering Cabinet Committee review'
      ]
    },
    quality: {
      score: 81,
      freshness: 'Validated 18 Apr 2026',
      dependency: '2 dependencies delayed (PGCIL grid sync & Safety clearance)',
      recordCompleteness: 87
    },
    interventions: []
  }
];

export const seed = seedProjects;
