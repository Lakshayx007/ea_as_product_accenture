export const eaimm = {
  baseline: {
    score: 9,
    level: 'Level 1: Initial',
    date: '2026-01-15',
    dimensions: {
      dataFreshness: {
        current: 1,
        target: 5,
        description: 'Data updated 4-8 weeks after source change',
        targetDescription: 'Data updated within 4 hours'
      },
      integrationCoverage: {
        current: 2,
        target: 4,
        description: '40% of enterprise applications integrated',
        targetDescription: '95%+ of applications integrated'
      },
      governanceMaturity: {
        current: 2,
        target: 5,
        description: 'Ad-hoc, no formal stewardship',
        targetDescription: 'Formal stewards, SLAs, ARB oversight'
      },
      traceabilityDepth: {
        current: 2,
        target: 4,
        description: 'Apps not linked to capabilities',
        targetDescription: '92% of apps linked to capabilities'
      },
      automationLevel: {
        current: 2,
        target: 4,
        description: '0% automated, 100% manual surveys',
        targetDescription: '90%+ of updates automated'
      }
    }
  },
  target: {
    score: 22,
    level: 'Level 4: Governed',
    date: '2026-06-20',
    dimensions: {
      dataFreshness: {
        current: 5,
        target: 5,
        description: 'Data updated within 4 hours',
        targetDescription: 'Data updated within 4 hours'
      },
      integrationCoverage: {
        current: 4,
        target: 4,
        description: '95%+ of applications integrated',
        targetDescription: '95%+ of applications integrated'
      },
      governanceMaturity: {
        current: 5,
        target: 5,
        description: 'Formal stewards, SLAs, ARB oversight',
        targetDescription: 'Formal stewards, SLAs, ARB oversight'
      },
      traceabilityDepth: {
        current: 4,
        target: 4,
        description: '92% of apps linked to capabilities',
        targetDescription: '92% of apps linked to capabilities'
      },
      automationLevel: {
        current: 4,
        target: 4,
        description: '90%+ of updates automated',
        targetDescription: '90%+ of updates automated'
      }
    }
  }
};
