import type { Question } from "../index";

/**
 * EU MDR Full Audit - 50 detaillierte Fragen
 * Umfassende Prüfung aller MDR-Anforderungen
 */
export const questions: Question[] = [
  // Allgemeine Anforderungen
  { id: "f1_classification", text: "Ist die Produktklassifizierung nach Anhang VIII korrekt durchgeführt und dokumentiert?" },
  { id: "f2_classification_justification", text: "Ist die Klassifizierungsbegründung nachvollziehbar dokumentiert?" },
  { id: "f3_intended_purpose", text: "Ist die Zweckbestimmung klar und präzise definiert?" },
  { id: "f4_target_population", text: "Sind Zielpopulation und medizinische Indikationen definiert?" },
  { id: "f5_qms_compliance", text: "Entspricht das QMS den Anforderungen nach Artikel 10?" },
  { id: "f6_person_responsible", text: "Ist eine qualifizierte verantwortliche Person nach Artikel 15 benannt?" },
  { id: "f7_person_qualifications", text: "Erfüllt die verantwortliche Person die Qualifikationsanforderungen?" },

  // Technische Dokumentation (Anhang II & III)
  { id: "f8_tech_doc_structure", text: "Entspricht die Struktur der technischen Dokumentation Anhang II?" },
  { id: "f9_device_description", text: "Ist die Produktbeschreibung vollständig und aktuell?" },
  { id: "f10_design_specifications", text: "Sind Design-Spezifikationen vollständig dokumentiert?" },
  { id: "f11_manufacturing_info", text: "Sind Herstellungsinformationen ausreichend dokumentiert?" },
  { id: "f12_gspr_checklist", text: "Ist eine GSPR-Checkliste (Anhang I) erstellt und aktuell?" },
  { id: "f13_risk_benefit", text: "Ist die Nutzen-Risiko-Analyse vollständig und aktuell?" },
  { id: "f14_product_verification", text: "Sind Produktverifizierungsergebnisse dokumentiert?" },
  { id: "f15_product_validation", text: "Sind Produktvalidierungsergebnisse dokumentiert?" },

  // UDI und Kennzeichnung
  { id: "f16_udi_carrier", text: "Ist der UDI-Träger korrekt auf dem Produkt/Verpackung angebracht?" },
  { id: "f17_udi_database", text: "Sind alle erforderlichen Daten in die UDI-Datenbank eingetragen?" },
  { id: "f18_label_compliance", text: "Entspricht die Kennzeichnung den Anforderungen aus Anhang I?" },
  { id: "f19_symbol_usage", text: "Werden genormte Symbole korrekt verwendet?" },
  { id: "f20_language_requirements", text: "Sind Sprachanforderungen für alle Zielmärkte erfüllt?" },
  { id: "f21_ifu_content", text: "Enthält die Gebrauchsanweisung alle erforderlichen Informationen?" },
  { id: "f22_ifu_availability", text: "Ist die Gebrauchsanweisung in allen erforderlichen Sprachen verfügbar?" },

  // Klinische Bewertung (Artikel 61, Anhang XIV)
  { id: "f23_clinical_plan", text: "Existiert ein Plan für die klinische Bewertung?" },
  { id: "f24_literature_search", text: "Wurde eine systematische Literaturrecherche durchgeführt?" },
  { id: "f25_clinical_data", text: "Sind ausreichend klinische Daten vorhanden?" },
  { id: "f26_equivalence", text: "Ist die Äquivalenz (falls geltend gemacht) ausreichend begründet?" },
  { id: "f27_clinical_evaluation_report", text: "Ist der klinische Bewertungsbericht vollständig und aktuell?" },
  { id: "f28_clinical_conclusions", text: "Sind die klinischen Schlussfolgerungen durch Daten gestützt?" },

  // Post-Market Surveillance (Artikel 83-86)
  { id: "f29_pms_plan", text: "Existiert ein Post-Market Surveillance Plan?" },
  { id: "f30_pms_data_collection", text: "Werden PMS-Daten systematisch gesammelt?" },
  { id: "f31_pms_analysis", text: "Werden PMS-Daten analysiert und bewertet?" },
  { id: "f32_pms_report", text: "Werden PMS-Berichte/PSUR erstellt?" },
  { id: "f33_pmcf_plan", text: "Existiert ein PMCF-Plan (falls erforderlich)?" },
  { id: "f34_pmcf_activities", text: "Werden PMCF-Aktivitäten durchgeführt?" },
  { id: "f35_pmcf_evaluation", text: "Werden PMCF-Ergebnisse in die klinische Bewertung einbezogen?" },

  // Vigilanz (Artikel 87-92)
  { id: "f36_vigilance_system", text: "Ist ein Vigilanzsystem implementiert?" },
  { id: "f37_incident_reporting", text: "Sind Prozesse für die Meldung schwerwiegender Vorkommnisse etabliert?" },
  { id: "f38_trend_reporting", text: "Werden Trends analysiert und berichtet?" },
  { id: "f39_fsca", text: "Sind Prozesse für Sicherheitskorrekturmaßnahmen im Feld (FSCA) etabliert?" },
  { id: "f40_vigilance_timelines", text: "Werden Meldefristen eingehalten?" },

  // EUDAMED und Registrierung
  { id: "f41_actor_registration", text: "Ist der Wirtschaftsakteur in EUDAMED registriert?" },
  { id: "f42_device_registration", text: "Ist das Produkt in EUDAMED registriert?" },
  { id: "f43_certificate_upload", text: "Sind Zertifikate in EUDAMED hochgeladen?" },

  // Konformitätsbewertung
  { id: "f44_conformity_route", text: "Ist der korrekte Konformitätsbewertungsweg gewählt?" },
  { id: "f45_notified_body", text: "Ist die Zusammenarbeit mit der Benannten Stelle etabliert (falls erforderlich)?" },
  { id: "f46_ce_marking", text: "Ist die CE-Kennzeichnung korrekt angebracht?" },
  { id: "f47_eu_doc", text: "Ist die EU-Konformitätserklärung vollständig und aktuell?" },

  // Risikomanagement
  { id: "f48_risk_management_plan", text: "Existiert ein Risikomanagementplan nach ISO 14971?" },
  { id: "f49_risk_management_file", text: "Ist die Risikomanagementakte vollständig?" },
  { id: "f50_residual_risk", text: "Ist das Gesamtrestrisiko akzeptabel und begründet?" }
];
