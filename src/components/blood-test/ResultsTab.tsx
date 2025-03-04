
import React from 'react';
import HormonePanel from './HormonePanel';
import MetabolicPanel from './MetabolicPanel';

const ResultsTab = () => {
  return (
    <div className="space-y-6">
      <HormonePanel />
      <MetabolicPanel />
    </div>
  );
};

export default ResultsTab;
