import type { Question } from "../index";

/**
 * ISO 13485 Quick Audit - 15 Kernfragen
 * Fokus auf die wichtigsten QMS-Anforderungen für Medizinprodukte
 */
export const questions: Question[] = [
  {
    id: "q1_qms_scope",
    text: "Ist der Geltungsbereich des QMS für Medizinprodukte klar definiert?"
  },
  {
    id: "q2_qm_manual",
    text: "Existiert ein Qualitätsmanagementhandbuch mit allen erforderlichen Dokumenten?"
  },
  {
    id: "q3_management_commitment",
    text: "Zeigt die Geschäftsleitung nachweisbares Engagement für das QMS?"
  },
  {
    id: "q4_regulatory",
    text: "Werden regulatorische Anforderungen systematisch ermittelt und erfüllt?"
  },
  {
    id: "q5_risk_management",
    text: "Ist ein Risikomanagement nach ISO 14971 implementiert?"
  },
  {
    id: "q6_design_control",
    text: "Gibt es einen dokumentierten Design- und Entwicklungsprozess?"
  },
  {
    id: "q7_supplier_control",
    text: "Werden Lieferanten qualifiziert und regelmäßig überwacht?"
  },
  {
    id: "q8_production",
    text: "Sind Produktionsprozesse validiert und kontrolliert?"
  },
  {
    id: "q9_traceability",
    text: "Ist eine vollständige Rückverfolgbarkeit der Produkte gewährleistet?"
  },
  {
    id: "q10_capa",
    text: "Existiert ein funktionierender CAPA-Prozess?"
  },
  {
    id: "q11_complaint",
    text: "Werden Kundenbeschwerden systematisch erfasst und bearbeitet?"
  },
  {
    id: "q12_internal_audit",
    text: "Werden regelmäßige interne Audits durchgeführt?"
  },
  {
    id: "q13_training",
    text: "Sind Schulungsanforderungen definiert und werden diese erfüllt?"
  },
  {
    id: "q14_document_control",
    text: "Ist die Dokumentenlenkung effektiv implementiert?"
  },
  {
    id: "q15_management_review",
    text: "Finden regelmäßige Management Reviews statt?"
  }
];
