import { PDFDocument, StandardFonts } from "pdf-lib";

export async function buildAssessmentPdf(input: {
  frameworkName: string;
  score: number;
  gapsCount: number;
  createdAtISO: string;
}) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595.28, 841.89]); // A4
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const { frameworkName, score, gapsCount, createdAtISO } = input;
  const lines = [
    "Grünewald Compliance OS — Assessment Report (Placeholder)",
    "",
    `Framework: ${frameworkName}`,
    `Score: ${score}`,
    `Gaps: ${gapsCount}`,
    `Created: ${createdAtISO}`,
    "",
    "Next: Replace this placeholder with your branded report template,",
    "including gap details, evidence links and action plan."
  ];

  let y = 780;
  for (const line of lines) {
    page.drawText(line, { x: 50, y, size: 12, font });
    y -= 18;
  }

  return await pdfDoc.save();
}
