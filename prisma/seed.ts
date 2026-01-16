import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const frameworks = [
    {
      key: "ISO_27001",
      name: "ISO 27001 (ISMS)",
      description:
        "Informationssicherheits-Managementsystem: Controls, Risiko, SoA, Audits."
    },
    {
      key: "ISO_13485",
      name: "ISO 13485 (Medizintechnik QMS)",
      description:
        "Qualitätsmanagement für Medizinprodukte: Dokumentation, CAPA, Risikomanagement, Audit Readiness."
    },
    {
      key: "EU_MDR",
      name: "EU MDR (2017/745)",
      description:
        "EU Medical Device Regulation: technische Dokumentation, PMS/PMCF, Vigilanz, UDI."
    },
    {
      key: "EU_GMP_ANNEX_11",
      name: "EU GMP Annex 11 (Computerised Systems)",
      description:
        "GMP Annex 11: Validierung, Datenintegrität, Change Control, Audit Trail, Part 11 Nähe."
    }
  ];

  for (const f of frameworks) {
    await prisma.framework.upsert({
      where: { key: f.key },
      update: { name: f.name, description: f.description },
      create: f
    });
  }

  console.log("Seeded frameworks:", frameworks.map((f) => f.key).join(", "));
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
