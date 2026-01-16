import type { Question } from "../index";

/**
 * EU GMP Annex 11 Quick Audit - 15 Kernfragen
 * Fokus auf die wichtigsten Anforderungen für computergestützte Systeme
 */
export const questions: Question[] = [
  {
    id: "q1_risk_assessment",
    text: "Wurde eine Risikobeurteilung für das computergestützte System durchgeführt?"
  },
  {
    id: "q2_validation",
    text: "Ist das System gemäß risikobasiertem Ansatz validiert?"
  },
  {
    id: "q3_supplier_qualification",
    text: "Sind Lieferanten/Dienstleister qualifiziert und werden Vereinbarungen eingehalten?"
  },
  {
    id: "q4_access_control",
    text: "Sind Zugriffskontrollen implementiert und werden diese regelmäßig überprüft?"
  },
  {
    id: "q5_audit_trail",
    text: "Ist ein Audit Trail aktiviert und werden Änderungen aufgezeichnet?"
  },
  {
    id: "q6_data_integrity",
    text: "Werden die ALCOA+-Prinzipien für Datenintegrität eingehalten?"
  },
  {
    id: "q7_backup",
    text: "Existieren Backup- und Recovery-Verfahren und werden diese getestet?"
  },
  {
    id: "q8_change_control",
    text: "Ist ein Change-Control-Prozess für Systemänderungen etabliert?"
  },
  {
    id: "q9_electronic_signature",
    text: "Entsprechen elektronische Unterschriften den regulatorischen Anforderungen?"
  },
  {
    id: "q10_printout",
    text: "Können Daten klar und lesbar gedruckt oder exportiert werden?"
  },
  {
    id: "q11_periodic_review",
    text: "Werden periodische Reviews des validierten Zustands durchgeführt?"
  },
  {
    id: "q12_documentation",
    text: "Ist die Systemdokumentation vollständig und aktuell?"
  },
  {
    id: "q13_training",
    text: "Sind Anwender angemessen geschult und dokumentiert?"
  },
  {
    id: "q14_incident",
    text: "Gibt es einen Prozess für die Behandlung von Systemvorfällen?"
  },
  {
    id: "q15_business_continuity",
    text: "Existieren Maßnahmen zur Geschäftskontinuität bei Systemausfall?"
  }
];
