import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

type FullAnswer = { status: "none" | "partial" | "full"; comment?: string };
type Answers = Record<string, boolean> | Record<string, FullAnswer>;

interface QuestionDetail {
  id: string;
  text: string;
  status: "full" | "partial" | "none" | "yes" | "no";
  comment?: string;
}

export async function buildAssessmentPdf(input: {
  frameworkName: string;
  assessmentType: string;
  score: number;
  gapsCount: number;
  compliantCount: number;
  partialCount: number;
  totalQuestions: number;
  createdAtISO: string;
  questions: QuestionDetail[];
}) {
  const {
    frameworkName,
    assessmentType,
    score,
    gapsCount,
    compliantCount,
    partialCount,
    totalQuestions,
    createdAtISO,
    questions
  } = input;

  const pdfDoc = await PDFDocument.create();
  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const pageWidth = 595.28; // A4
  const pageHeight = 841.89;
  const margin = 50;
  const contentWidth = pageWidth - 2 * margin;

  let page = pdfDoc.addPage([pageWidth, pageHeight]);
  let y = pageHeight - margin;

  const createdDate = new Date(createdAtISO).toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });

  // Helper to add new page if needed
  function ensureSpace(needed: number) {
    if (y - needed < margin) {
      page = pdfDoc.addPage([pageWidth, pageHeight]);
      y = pageHeight - margin;
    }
  }

  // Header
  page.drawText("GRUNEWALD COMPLIANCE OS", {
    x: margin,
    y,
    size: 10,
    font: helveticaBold,
    color: rgb(0.4, 0.4, 0.4)
  });
  y -= 30;

  // Title
  page.drawText("Compliance Assessment Report", {
    x: margin,
    y,
    size: 24,
    font: helveticaBold,
    color: rgb(0.1, 0.1, 0.1)
  });
  y -= 25;

  // Framework and type
  page.drawText(`${frameworkName} - ${assessmentType === "FULL" ? "Full Audit" : "Quick Audit"}`, {
    x: margin,
    y,
    size: 14,
    font: helvetica,
    color: rgb(0, 0.48, 1)
  });
  y -= 18;

  // Date
  page.drawText(`Erstellt am ${createdDate}`, {
    x: margin,
    y,
    size: 10,
    font: helvetica,
    color: rgb(0.5, 0.5, 0.5)
  });
  y -= 40;

  // Score box
  page.drawRectangle({
    x: margin,
    y: y - 80,
    width: contentWidth,
    height: 80,
    color: rgb(0, 0.48, 1)
  });

  page.drawText(`${score}%`, {
    x: margin + contentWidth / 2 - 40,
    y: y - 55,
    size: 48,
    font: helveticaBold,
    color: rgb(1, 1, 1)
  });

  page.drawText("Compliance Score", {
    x: margin + contentWidth / 2 - 45,
    y: y - 72,
    size: 12,
    font: helvetica,
    color: rgb(1, 1, 1)
  });

  y -= 100;

  // Stats
  y -= 30;
  const isFullAudit = assessmentType === "FULL";
  const statCols = isFullAudit ? 4 : 3;
  const colWidth = contentWidth / statCols;

  const stats = isFullAudit
    ? [
        { label: "Vollstandig", value: compliantCount, color: rgb(0.2, 0.78, 0.35) },
        { label: "Teilweise", value: partialCount, color: rgb(1, 0.58, 0) },
        { label: "Gaps", value: gapsCount, color: rgb(1, 0.23, 0.19) },
        { label: "Gesamt", value: totalQuestions, color: rgb(0.3, 0.3, 0.3) }
      ]
    : [
        { label: "Erfullt", value: compliantCount, color: rgb(0.2, 0.78, 0.35) },
        { label: "Gaps", value: gapsCount, color: rgb(1, 0.23, 0.19) },
        { label: "Gesamt", value: totalQuestions, color: rgb(0.3, 0.3, 0.3) }
      ];

  stats.forEach((stat, i) => {
    const x = margin + i * colWidth + colWidth / 2;

    page.drawText(String(stat.value), {
      x: x - 10,
      y,
      size: 24,
      font: helveticaBold,
      color: stat.color
    });

    page.drawText(stat.label, {
      x: x - 25,
      y: y - 18,
      size: 10,
      font: helvetica,
      color: rgb(0.5, 0.5, 0.5)
    });
  });

  y -= 60;

  // Divider
  page.drawLine({
    start: { x: margin, y },
    end: { x: pageWidth - margin, y },
    thickness: 1,
    color: rgb(0.9, 0.9, 0.9)
  });
  y -= 30;

  // Questions section title
  page.drawText("Detaillierte Ergebnisse", {
    x: margin,
    y,
    size: 16,
    font: helveticaBold,
    color: rgb(0.1, 0.1, 0.1)
  });
  y -= 25;

  // Questions list
  questions.forEach((q, i) => {
    // Calculate space needed
    const textLines = wrapText(q.text, contentWidth - 100, helvetica, 10);
    const commentLines = q.comment ? wrapText(`Kommentar: ${q.comment}`, contentWidth - 20, helvetica, 9) : [];
    const neededHeight = 25 + textLines.length * 14 + (commentLines.length > 0 ? commentLines.length * 12 + 10 : 0);

    ensureSpace(neededHeight);

    // Question number and status
    let statusText: string;
    let statusColor: [number, number, number];

    if (q.status === "full" || q.status === "yes") {
      statusText = q.status === "full" ? "Vollstandig" : "Ja";
      statusColor = [0.2, 0.78, 0.35];
    } else if (q.status === "partial") {
      statusText = "Teilweise";
      statusColor = [1, 0.58, 0];
    } else {
      statusText = q.status === "none" ? "Nicht umgesetzt" : "Nein";
      statusColor = [1, 0.23, 0.19];
    }

    // Question number
    page.drawText(`${i + 1}.`, {
      x: margin,
      y,
      size: 10,
      font: helveticaBold,
      color: rgb(0.5, 0.5, 0.5)
    });

    // Status on the right
    page.drawText(statusText, {
      x: pageWidth - margin - 70,
      y,
      size: 10,
      font: helveticaBold,
      color: rgb(...statusColor)
    });

    y -= 14;

    // Question text
    textLines.forEach(line => {
      page.drawText(line, {
        x: margin + 20,
        y,
        size: 10,
        font: helvetica,
        color: rgb(0.2, 0.2, 0.2)
      });
      y -= 14;
    });

    // Comment if present
    if (commentLines.length > 0) {
      y -= 5;
      commentLines.forEach(line => {
        page.drawText(line, {
          x: margin + 20,
          y,
          size: 9,
          font: helvetica,
          color: rgb(0.5, 0.5, 0.5)
        });
        y -= 12;
      });
    }

    y -= 10;
  });

  // Footer on last page
  ensureSpace(60);
  y = margin + 30;
  page.drawLine({
    start: { x: margin, y },
    end: { x: pageWidth - margin, y },
    thickness: 1,
    color: rgb(0.9, 0.9, 0.9)
  });
  y -= 15;

  page.drawText("Generiert von Grunewald Compliance OS | www.gruenewald-gmbh.de", {
    x: margin,
    y,
    size: 8,
    font: helvetica,
    color: rgb(0.6, 0.6, 0.6)
  });

  return await pdfDoc.save();
}

// Helper function to wrap text
function wrapText(text: string, maxWidth: number, font: any, fontSize: number): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let currentLine = "";

  // Approximate character width (Helvetica at given size)
  const charWidth = fontSize * 0.5;
  const maxChars = Math.floor(maxWidth / charWidth);

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    if (testLine.length > maxChars) {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }
  if (currentLine) lines.push(currentLine);

  return lines;
}
