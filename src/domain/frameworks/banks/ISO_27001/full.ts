import type { Question } from "../index";

/**
 * ISO 27001 Full Audit - 50 detaillierte Fragen
 * Umfassende Prüfung aller ISMS-Anforderungen
 */
export const questions: Question[] = [
  // Kontext der Organisation (Kapitel 4)
  { id: "f1_context_internal", text: "Wurden interne Themen (Kultur, Struktur, Ressourcen) identifiziert und dokumentiert?" },
  { id: "f2_context_external", text: "Wurden externe Themen (regulatorisch, technologisch, Markt) analysiert?" },
  { id: "f3_stakeholders", text: "Sind alle relevanten interessierten Parteien identifiziert?" },
  { id: "f4_stakeholder_requirements", text: "Wurden die Anforderungen der interessierten Parteien ermittelt?" },
  { id: "f5_scope_definition", text: "Ist der ISMS-Scope präzise definiert und begründet?" },
  { id: "f6_scope_boundaries", text: "Sind die Grenzen und Schnittstellen des ISMS klar dokumentiert?" },
  { id: "f7_isms_processes", text: "Sind alle erforderlichen ISMS-Prozesse etabliert und dokumentiert?" },

  // Führung (Kapitel 5)
  { id: "f8_leadership_commitment", text: "Zeigt die Geschäftsleitung nachweisbares Engagement für das ISMS?" },
  { id: "f9_policy_content", text: "Enthält die Informationssicherheitspolitik alle erforderlichen Elemente?" },
  { id: "f10_policy_communication", text: "Wurde die Sicherheitspolitik allen relevanten Parteien kommuniziert?" },
  { id: "f11_roles_defined", text: "Sind alle ISMS-relevanten Rollen klar definiert?" },
  { id: "f12_responsibilities", text: "Sind Verantwortlichkeiten und Befugnisse zugewiesen und dokumentiert?" },
  { id: "f13_management_review_input", text: "Werden alle erforderlichen Inputs für das Management Review bereitgestellt?" },

  // Planung (Kapitel 6)
  { id: "f14_risk_criteria", text: "Sind Risikoakzeptanzkriterien definiert und genehmigt?" },
  { id: "f15_risk_methodology", text: "Ist eine Methodik zur Risikobewertung etabliert und dokumentiert?" },
  { id: "f16_risk_identification", text: "Werden Risiken systematisch identifiziert?" },
  { id: "f17_risk_analysis", text: "Werden Risiken nach Wahrscheinlichkeit und Auswirkung analysiert?" },
  { id: "f18_risk_evaluation", text: "Werden Risiken gegen die definierten Kriterien bewertet?" },
  { id: "f19_risk_treatment_plan", text: "Existiert ein genehmigter Risikobehandlungsplan?" },
  { id: "f20_risk_owners", text: "Sind Risikoverantwortliche (Risk Owner) benannt?" },
  { id: "f21_soa_complete", text: "Ist die SoA vollständig und alle Controls begründet?" },
  { id: "f22_objectives", text: "Sind messbare Informationssicherheitsziele definiert?" },
  { id: "f23_objectives_planning", text: "Ist geplant, wie die Ziele erreicht werden sollen?" },

  // Unterstützung (Kapitel 7)
  { id: "f24_resources", text: "Sind ausreichende Ressourcen für das ISMS bereitgestellt?" },
  { id: "f25_competence", text: "Ist die erforderliche Kompetenz für ISMS-Rollen definiert?" },
  { id: "f26_training_records", text: "Werden Schulungsnachweise geführt und aufbewahrt?" },
  { id: "f27_awareness_program", text: "Existiert ein Awareness-Programm für alle Mitarbeiter?" },
  { id: "f28_internal_communication", text: "Sind interne Kommunikationswege für ISMS-Themen etabliert?" },
  { id: "f29_external_communication", text: "Ist geregelt, wann und wie extern kommuniziert wird?" },
  { id: "f30_document_control", text: "Ist die Dokumentenlenkung wirksam implementiert?" },
  { id: "f31_record_management", text: "Werden Nachweise ordnungsgemäß aufbewahrt?" },

  // Betrieb (Kapitel 8)
  { id: "f32_operational_planning", text: "Ist die operative Planung für ISMS-Prozesse dokumentiert?" },
  { id: "f33_risk_assessment_execution", text: "Werden Risikobewertungen planmäßig durchgeführt?" },
  { id: "f34_risk_treatment_execution", text: "Wird der Risikobehandlungsplan umgesetzt?" },
  { id: "f35_change_management", text: "Werden Änderungen kontrolliert und bewertet?" },
  { id: "f36_outsourced_processes", text: "Werden ausgelagerte Prozesse kontrolliert?" },

  // Bewertung der Leistung (Kapitel 9)
  { id: "f37_monitoring_defined", text: "Ist definiert, was überwacht und gemessen werden soll?" },
  { id: "f38_monitoring_methods", text: "Sind Methoden für Überwachung und Messung festgelegt?" },
  { id: "f39_monitoring_frequency", text: "Sind Zeitpunkte und Häufigkeit der Messungen definiert?" },
  { id: "f40_monitoring_results", text: "Werden Überwachungsergebnisse analysiert und bewertet?" },
  { id: "f41_audit_program", text: "Existiert ein internes Auditprogramm?" },
  { id: "f42_audit_criteria", text: "Sind Auditkriterien und -umfang definiert?" },
  { id: "f43_auditor_objectivity", text: "Ist die Objektivität und Unparteilichkeit der Auditoren sichergestellt?" },
  { id: "f44_audit_reporting", text: "Werden Auditergebnisse an das Management berichtet?" },
  { id: "f45_management_review", text: "Finden Management Reviews in geplanten Abständen statt?" },
  { id: "f46_review_outputs", text: "Werden Entscheidungen und Maßnahmen aus Reviews dokumentiert?" },

  // Verbesserung (Kapitel 10)
  { id: "f47_nonconformity", text: "Werden Nichtkonformitäten erfasst und behandelt?" },
  { id: "f48_corrective_action", text: "Werden Korrekturmaßnahmen eingeleitet und verfolgt?" },
  { id: "f49_effectiveness_review", text: "Wird die Wirksamkeit von Korrekturmaßnahmen überprüft?" },
  { id: "f50_continual_improvement", text: "Wird das ISMS kontinuierlich verbessert?" }
];
