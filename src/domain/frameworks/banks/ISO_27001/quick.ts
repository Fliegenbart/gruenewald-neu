import type { Question } from "../index";

/**
 * ISO 27001 Quick Audit - 15 Kernfragen
 * Fokus auf die wichtigsten ISMS-Anforderungen
 */
export const questions: Question[] = [
  {
    id: "q1_isms_scope",
    text: "Ist der Geltungsbereich (Scope) des ISMS klar definiert und dokumentiert?"
  },
  {
    id: "q2_context",
    text: "Wurden interne und externe Themen sowie interessierte Parteien identifiziert?"
  },
  {
    id: "q3_policy",
    text: "Existiert eine Informationssicherheitspolitik, die von der Geschäftsleitung freigegeben wurde?"
  },
  {
    id: "q4_roles",
    text: "Sind Rollen und Verantwortlichkeiten für Informationssicherheit klar zugewiesen?"
  },
  {
    id: "q5_risk_assessment",
    text: "Wird eine systematische Risikobewertung durchgeführt und dokumentiert?"
  },
  {
    id: "q6_risk_treatment",
    text: "Existiert ein Risikobehandlungsplan mit definierten Maßnahmen?"
  },
  {
    id: "q7_soa",
    text: "Ist eine Statement of Applicability (SoA) vorhanden und aktuell?"
  },
  {
    id: "q8_awareness",
    text: "Werden Mitarbeiter regelmäßig zu Informationssicherheit geschult?"
  },
  {
    id: "q9_access_control",
    text: "Sind Zugriffskontrollen implementiert und werden diese regelmäßig überprüft?"
  },
  {
    id: "q10_incident",
    text: "Gibt es einen dokumentierten Prozess für Sicherheitsvorfälle?"
  },
  {
    id: "q11_bcp",
    text: "Existiert ein Business Continuity Plan und wird dieser getestet?"
  },
  {
    id: "q12_supplier",
    text: "Werden Lieferanten hinsichtlich Informationssicherheit bewertet?"
  },
  {
    id: "q13_monitoring",
    text: "Werden ISMS-Prozesse überwacht und gemessen?"
  },
  {
    id: "q14_audit",
    text: "Werden interne Audits durchgeführt und dokumentiert?"
  },
  {
    id: "q15_improvement",
    text: "Gibt es einen kontinuierlichen Verbesserungsprozess für das ISMS?"
  }
];
