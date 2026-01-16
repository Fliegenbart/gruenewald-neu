import type { Question } from "../index";

/**
 * EU GMP Annex 11 Full Audit - 50 detaillierte Fragen
 * Umfassende Prüfung aller Anforderungen für computergestützte Systeme
 */
export const questions: Question[] = [
  // Risikomanagement
  { id: "f1_risk_assessment", text: "Wurde eine dokumentierte Risikobeurteilung für das System durchgeführt?" },
  { id: "f2_risk_criteria", text: "Sind Kriterien für die Risikobewertung definiert?" },
  { id: "f3_risk_mitigation", text: "Sind Risikominderungsmaßnahmen dokumentiert und umgesetzt?" },
  { id: "f4_risk_review", text: "Wird die Risikobeurteilung regelmäßig überprüft?" },

  // Personal und Schulung
  { id: "f5_roles_defined", text: "Sind Rollen und Verantwortlichkeiten klar definiert?" },
  { id: "f6_training_program", text: "Existiert ein Schulungsprogramm für Systemanwender?" },
  { id: "f7_training_records", text: "Werden Schulungsnachweise geführt und aufbewahrt?" },
  { id: "f8_qualification_it", text: "Ist das IT-Personal für die Systembetreuung qualifiziert?" },
  { id: "f9_qualification_qa", text: "Ist das QA-Personal für die Systemvalidierung qualifiziert?" },

  // Lieferanten und Dienstleister
  { id: "f10_supplier_assessment", text: "Wurden Lieferanten/Dienstleister bewertet und qualifiziert?" },
  { id: "f11_supplier_audit", text: "Werden Lieferanten-Audits durchgeführt (falls erforderlich)?" },
  { id: "f12_sla", text: "Existieren Service Level Agreements mit Dienstleistern?" },
  { id: "f13_quality_agreement", text: "Sind Qualitätsvereinbarungen mit Lieferanten abgeschlossen?" },
  { id: "f14_supplier_monitoring", text: "Werden Lieferantenleistungen überwacht?" },

  // Validierung
  { id: "f15_validation_plan", text: "Existiert ein Validierungsplan für das System?" },
  { id: "f16_urs", text: "Sind User Requirement Specifications (URS) dokumentiert?" },
  { id: "f17_fs", text: "Sind Functional Specifications (FS) dokumentiert?" },
  { id: "f18_ds", text: "Sind Design Specifications (DS) dokumentiert?" },
  { id: "f19_iq", text: "Wurde eine Installation Qualification (IQ) durchgeführt?" },
  { id: "f20_oq", text: "Wurde eine Operational Qualification (OQ) durchgeführt?" },
  { id: "f21_pq", text: "Wurde eine Performance Qualification (PQ) durchgeführt?" },
  { id: "f22_traceability_matrix", text: "Existiert eine Rückverfolgbarkeitsmatrix (Requirements to Tests)?" },
  { id: "f23_validation_report", text: "Ist ein Validierungsbericht mit Freigabe vorhanden?" },
  { id: "f24_validation_status", text: "Wird der validierte Zustand aufrechterhalten?" },

  // Betrieb
  { id: "f25_sop", text: "Existieren Standard Operating Procedures für den Systembetrieb?" },
  { id: "f26_access_control", text: "Sind Zugriffskontrollen implementiert und dokumentiert?" },
  { id: "f27_user_management", text: "Ist ein User-Management-Prozess etabliert?" },
  { id: "f28_password_policy", text: "Ist eine Passwortrichtlinie implementiert?" },
  { id: "f29_segregation", text: "Ist eine angemessene Funktionstrennung sichergestellt?" },

  // Datenintegrität
  { id: "f30_alcoa_attributable", text: "Sind Daten eindeutig einer Person zuordenbar (Attributable)?" },
  { id: "f31_alcoa_legible", text: "Sind Daten lesbar und permanent (Legible)?" },
  { id: "f32_alcoa_contemporaneous", text: "Werden Daten zeitnah erfasst (Contemporaneous)?" },
  { id: "f33_alcoa_original", text: "Werden Originaldaten aufbewahrt (Original)?" },
  { id: "f34_alcoa_accurate", text: "Sind Daten korrekt und vollständig (Accurate)?" },
  { id: "f35_audit_trail", text: "Ist ein Audit Trail aktiviert und konfiguriert?" },
  { id: "f36_audit_trail_review", text: "Werden Audit Trails regelmäßig überprüft?" },
  { id: "f37_electronic_signature", text: "Entsprechen elektronische Signaturen den Anforderungen?" },

  // Backup und Recovery
  { id: "f38_backup_procedure", text: "Ist ein Backup-Verfahren dokumentiert und implementiert?" },
  { id: "f39_backup_frequency", text: "Ist die Backup-Frequenz angemessen?" },
  { id: "f40_backup_verification", text: "Werden Backups auf Vollständigkeit überprüft?" },
  { id: "f41_recovery_procedure", text: "Ist ein Recovery-Verfahren dokumentiert?" },
  { id: "f42_recovery_test", text: "Werden Recovery-Tests regelmäßig durchgeführt?" },

  // Change Control
  { id: "f43_change_procedure", text: "Ist ein Change-Control-Verfahren dokumentiert?" },
  { id: "f44_change_assessment", text: "Werden Änderungen auf ihre Auswirkungen bewertet?" },
  { id: "f45_change_testing", text: "Werden Änderungen vor Implementierung getestet?" },
  { id: "f46_change_approval", text: "Werden Änderungen vor Implementierung genehmigt?" },

  // Periodische Reviews
  { id: "f47_periodic_review", text: "Werden periodische Reviews des validierten Zustands durchgeführt?" },
  { id: "f48_review_criteria", text: "Sind Kriterien für periodische Reviews definiert?" },

  // Business Continuity
  { id: "f49_bc_plan", text: "Existiert ein Business Continuity Plan für das System?" },
  { id: "f50_bc_test", text: "Wird der Business Continuity Plan regelmäßig getestet?" }
];
