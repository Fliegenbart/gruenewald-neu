import type { Question } from "../index";

/**
 * EU MDR Quick Audit - 15 Kernfragen
 * Fokus auf die wichtigsten Anforderungen der Medizinprodukteverordnung
 */
export const questions: Question[] = [
  {
    id: "q1_classification",
    text: "Ist die Klassifizierung des Medizinprodukts nach MDR Anhang VIII korrekt durchgeführt?"
  },
  {
    id: "q2_tech_documentation",
    text: "Entspricht die technische Dokumentation den Anforderungen aus Anhang II und III?"
  },
  {
    id: "q3_udi",
    text: "Ist das UDI-System (Unique Device Identification) implementiert?"
  },
  {
    id: "q4_qms",
    text: "Ist das QMS gemäß Artikel 10 etabliert und dokumentiert?"
  },
  {
    id: "q5_person_responsible",
    text: "Ist eine verantwortliche Person für die Regulierungskonformität benannt?"
  },
  {
    id: "q6_clinical_evaluation",
    text: "Liegt eine aktuelle klinische Bewertung gemäß Artikel 61 vor?"
  },
  {
    id: "q7_pms",
    text: "Ist ein Post-Market Surveillance System implementiert?"
  },
  {
    id: "q8_pmcf",
    text: "Wird Post-Market Clinical Follow-up (PMCF) durchgeführt?"
  },
  {
    id: "q9_vigilance",
    text: "Sind Vigilanz-Prozesse für die Meldung schwerwiegender Vorkommnisse etabliert?"
  },
  {
    id: "q10_labeling",
    text: "Entspricht die Kennzeichnung den Anforderungen aus Anhang I?"
  },
  {
    id: "q11_ifu",
    text: "Sind Gebrauchsanweisungen vollständig und in den erforderlichen Sprachen verfügbar?"
  },
  {
    id: "q12_eudamed",
    text: "Sind alle erforderlichen Registrierungen in EUDAMED erfolgt?"
  },
  {
    id: "q13_notified_body",
    text: "Ist die Zusammenarbeit mit der Benannten Stelle etabliert (falls erforderlich)?"
  },
  {
    id: "q14_risk_benefit",
    text: "Ist eine Nutzen-Risiko-Analyse dokumentiert?"
  },
  {
    id: "q15_gspr",
    text: "Werden die grundlegenden Sicherheits- und Leistungsanforderungen (GSPR) erfüllt?"
  }
];
