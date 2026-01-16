import type { FrameworkKey } from "./index";

/**
 * Minimal question sets to get you started.
 * Replace with full expert-grade question banks and branching logic.
 */
export type Question = {
  id: string;
  text: string;
  help?: string;
  weight?: number; // optional scoring weight
};

export const QUESTIONS: Record<FrameworkKey, Question[]> = {
  ISO_27001: [
    { id: "isms_scope", text: "Gibt es einen definierten ISMS-Scope (Geltungsbereich)?" },
    { id: "risk_mgmt", text: "Gibt es ein dokumentiertes Risikomanagement (Bewertung, Behandlung, Review)?" },
    { id: "soa", text: "Existiert eine Statement of Applicability (SoA) und ist sie aktuell?" }
  ],
  ISO_13485: [
    { id: "qms_docs", text: "Sind QMS-Dokumente (SOPs, Arbeitsanweisungen) vollständig und versioniert?" },
    { id: "capa", text: "Gibt es einen CAPA-Prozess mit Wirksamkeitsprüfung?" },
    { id: "supplier", text: "Werden Lieferanten qualifiziert und überwacht (Supplier Controls)?" }
  ],
  EU_MDR: [
    { id: "tech_doc", text: "Ist die technische Dokumentation vollständig und MDR-konform?" },
    { id: "pms", text: "Existiert ein PMS-Plan inkl. KPIs und Reporting?" },
    { id: "vigilance", text: "Sind Vigilanz- und Meldeprozesse definiert und getestet?" }
  ],
  EU_GMP_ANNEX_11: [
    { id: "validation", text: "Ist die Validierung (CSV) dokumentiert und risikobasiert?" },
    { id: "data_integrity", text: "Sind Data-Integrity Controls (ALCOA+) implementiert?" },
    { id: "audit_trail", text: "Gibt es Audit-Trail/Logs und regelmäßige Reviews?" }
  ]
};
