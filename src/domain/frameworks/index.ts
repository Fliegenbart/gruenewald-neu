export type FrameworkKey = "ISO_27001" | "ISO_13485" | "EU_MDR" | "EU_GMP_ANNEX_11";

export const FRAMEWORKS: Array<{
  key: FrameworkKey;
  name: string;
  short: string;
}> = [
  { key: "ISO_27001", name: "ISO 27001 (ISMS)", short: "ISO 27001" },
  { key: "ISO_13485", name: "ISO 13485 (MedTech QMS)", short: "ISO 13485" },
  { key: "EU_MDR", name: "EU MDR (2017/745)", short: "EU MDR" },
  { key: "EU_GMP_ANNEX_11", name: "EU GMP Annex 11", short: "Annex 11" }
];
