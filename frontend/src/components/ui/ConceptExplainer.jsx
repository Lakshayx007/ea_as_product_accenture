import React from 'react';
import Tooltip from './Tooltip';
import { eaimm } from '../../data/mockEAIMM'; 

// Temporary local glossary since we didn't export the full glossary.ts yet
export const EAGlossary = {
  dataMesh: {
    title: "Data Mesh",
    description: "A decentralized data architecture where data is treated as a product, owned by domain teams rather than a central IT team.",
    context: "In this project, instead of a central EA team managing all architecture data, the teams that own SAP, ServiceNow, etc., are responsible for their data's quality and SLAs."
  },
  canonicalSchema: {
    title: "Canonical Data Model",
    description: "A standard, unified way of representing data across the enterprise so different systems can communicate without confusion.",
    context: "Every source system defines an 'Application' differently. The Canonical Schema enforces one consistent definition that all data must map to before entering the EA repository."
  },
  dora: {
    title: "DORA (Digital Operational Resilience Act)",
    description: "European Union regulation requiring financial entities to demonstrate complete traceability and resilience of their IT assets.",
    context: "Accenture advises clients on DORA, so this EA platform ensures Accenture's own internal architecture is DORA-compliant via automated, real-time audit trails."
  },
  eaimm: {
    title: "EAIMM (EA Integration Maturity Model)",
    description: "A 5-level scoring framework created for this project to measure how well enterprise architecture data is integrated, governed, and automated.",
    context: "This project moves Accenture from Level 1 (Initial, manual surveys) to Level 5 (Optimised, fully automated event-driven syncs)."
  },
  webhook: {
    title: "Event-Driven Webhook",
    description: "A method where a system sends real-time data to another system immediately when an event occurs, rather than waiting to be asked.",
    context: "Used here (Pattern A) for ServiceNow CMDB so that the EA platform updates within minutes of an application change, ensuring data freshness."
  },
  archimate: {
    title: "ArchiMate 3.2",
    description: "An open standard visual modeling language used to describe and analyze enterprise architecture.",
    context: "Provides a common vocabulary across Business, Application, and Technology layers. All architecture diagrams in this project conform to this standard."
  },
  greatExpectations: {
    title: "Great Expectations (Data Quality)",
    description: "An open-source Python-based data validation framework.",
    context: "Used as the engine to automatically check incoming data against our Canonical Schema rules (e.g., ensuring an app has a valid owner) before it enters the EA repository."
  }
};

export default function ConceptExplainer({ termKey, children, position = 'top', className = '' }) {
  const concept = EAGlossary[termKey];

  if (!concept) {
    return <span className={className}>{children}</span>;
  }

  const tooltipContent = (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2 border-b border-surface-700/50 pb-2">
        <strong className="text-surface-50 font-semibold">{concept.title}</strong>
      </div>
      <p className="text-surface-300">{concept.description}</p>
      {concept.context && (
        <div className="mt-1 p-2 rounded bg-primary/10 border border-primary/20">
          <p className="text-primary-light italic">" {concept.context} "</p>
        </div>
      )}
    </div>
  );

  return (
    <Tooltip content={tooltipContent} position={position} className={`inline-flex ${className}`}>
      <span className="relative inline-flex items-center group cursor-help text-emerald-400 font-medium hover:text-emerald-300 transition-colors">
        {children}
        <span className="absolute -bottom-0.5 left-0 w-full h-[1px] bg-emerald-400/50 border-dashed border-b border-emerald-400 group-hover:bg-emerald-300 transition-colors" />
      </span>
    </Tooltip>
  );
}
