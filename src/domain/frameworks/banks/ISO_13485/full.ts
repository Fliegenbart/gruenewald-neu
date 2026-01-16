import type { Question } from "../index";

/**
 * ISO 13485 Full Audit - 50 detaillierte Fragen
 * Umfassende Prüfung aller QMS-Anforderungen für Medizinprodukte
 */
export const questions: Question[] = [
  // QMS Allgemein (Kapitel 4)
  { id: "f1_qms_scope", text: "Ist der QMS-Geltungsbereich klar definiert und alle Ausschlüsse begründet?" },
  { id: "f2_process_approach", text: "Werden Prozesse und deren Wechselwirkungen identifiziert und gesteuert?" },
  { id: "f3_outsourced_processes", text: "Werden ausgelagerte Prozesse kontrolliert und dokumentiert?" },
  { id: "f4_qm_manual", text: "Enthält das QM-Handbuch alle erforderlichen Elemente?" },
  { id: "f5_document_control", text: "Ist die Dokumentenlenkung wirksam implementiert?" },
  { id: "f6_document_approval", text: "Werden Dokumente vor Freigabe angemessen überprüft und genehmigt?" },
  { id: "f7_record_control", text: "Werden Aufzeichnungen ordnungsgemäß gelenkt und aufbewahrt?" },
  { id: "f8_retention_periods", text: "Sind Aufbewahrungsfristen definiert und werden diese eingehalten?" },

  // Management-Verantwortung (Kapitel 5)
  { id: "f9_management_commitment", text: "Zeigt die Geschäftsleitung nachweisbares Engagement für das QMS?" },
  { id: "f10_customer_focus", text: "Werden Kundenanforderungen ermittelt und erfüllt?" },
  { id: "f11_regulatory_compliance", text: "Werden regulatorische Anforderungen systematisch ermittelt?" },
  { id: "f12_quality_policy", text: "Ist die Qualitätspolitik angemessen und kommuniziert?" },
  { id: "f13_quality_objectives", text: "Sind messbare Qualitätsziele auf relevanten Ebenen etabliert?" },
  { id: "f14_qms_planning", text: "Ist die QMS-Planung dokumentiert und wird diese aufrechterhalten?" },
  { id: "f15_responsibilities", text: "Sind Verantwortlichkeiten und Befugnisse definiert und kommuniziert?" },
  { id: "f16_management_representative", text: "Ist ein Beauftragter der obersten Leitung benannt?" },
  { id: "f17_internal_communication", text: "Ist die interne Kommunikation zur QMS-Wirksamkeit etabliert?" },
  { id: "f18_management_review", text: "Werden Management Reviews planmäßig durchgeführt?" },
  { id: "f19_review_inputs", text: "Werden alle erforderlichen Eingaben für das Review berücksichtigt?" },
  { id: "f20_review_outputs", text: "Werden Maßnahmen aus dem Review dokumentiert und verfolgt?" },

  // Ressourcenmanagement (Kapitel 6)
  { id: "f21_resource_provision", text: "Werden erforderliche Ressourcen ermittelt und bereitgestellt?" },
  { id: "f22_competence", text: "Ist die erforderliche Kompetenz für qualitätsrelevante Tätigkeiten definiert?" },
  { id: "f23_training", text: "Werden Schulungen durchgeführt und deren Wirksamkeit bewertet?" },
  { id: "f24_training_records", text: "Werden Ausbildungs- und Schulungsnachweise geführt?" },
  { id: "f25_infrastructure", text: "Ist die erforderliche Infrastruktur bereitgestellt und gewartet?" },
  { id: "f26_work_environment", text: "Ist die Arbeitsumgebung für die Produktkonformität geeignet?" },
  { id: "f27_contamination_control", text: "Sind Maßnahmen zur Kontaminationskontrolle implementiert (falls erforderlich)?" },

  // Produktrealisierung (Kapitel 7)
  { id: "f28_realization_planning", text: "Wird die Produktrealisierung geplant und dokumentiert?" },
  { id: "f29_customer_requirements", text: "Werden Kundenanforderungen vor Annahme geprüft?" },
  { id: "f30_customer_communication", text: "Sind Kommunikationsprozesse mit Kunden etabliert?" },
  { id: "f31_design_planning", text: "Wird Design und Entwicklung geplant und die Planung aktualisiert?" },
  { id: "f32_design_inputs", text: "Werden Design-Eingaben ermittelt und dokumentiert?" },
  { id: "f33_design_outputs", text: "Erfüllen Design-Ergebnisse die Eingabeanforderungen?" },
  { id: "f34_design_review", text: "Werden Design-Reviews in geeigneten Phasen durchgeführt?" },
  { id: "f35_design_verification", text: "Wird die Design-Verifizierung durchgeführt und dokumentiert?" },
  { id: "f36_design_validation", text: "Wird die Design-Validierung durchgeführt und dokumentiert?" },
  { id: "f37_design_transfer", text: "Ist der Design-Transfer dokumentiert und kontrolliert?" },
  { id: "f38_design_changes", text: "Werden Design-Änderungen kontrolliert und bewertet?" },
  { id: "f39_purchasing_control", text: "Werden Beschaffungsprozesse kontrolliert?" },
  { id: "f40_supplier_evaluation", text: "Werden Lieferanten bewertet und überwacht?" },
  { id: "f41_purchased_verification", text: "Werden beschaffte Produkte verifiziert?" },
  { id: "f42_production_control", text: "Wird die Produktion unter kontrollierten Bedingungen durchgeführt?" },
  { id: "f43_process_validation", text: "Werden spezielle Prozesse validiert?" },
  { id: "f44_identification", text: "Ist die Produktidentifikation während der Realisierung sichergestellt?" },
  { id: "f45_traceability", text: "Ist die Rückverfolgbarkeit gewährleistet und dokumentiert?" },
  { id: "f46_customer_property", text: "Wird Kundeneigentum angemessen behandelt?" },
  { id: "f47_product_preservation", text: "Wird das Produkt während der Realisierung erhalten?" },

  // Messung, Analyse, Verbesserung (Kapitel 8)
  { id: "f48_monitoring_planning", text: "Sind Überwachungs- und Messprozesse geplant?" },
  { id: "f49_feedback_system", text: "Ist ein System zur Erfassung von Rückmeldungen etabliert?" },
  { id: "f50_capa", text: "Ist der CAPA-Prozess wirksam implementiert?" }
];
