import { QUESTIONS } from "@/domain/frameworks/questions";
import { FRAMEWORKS, type FrameworkKey } from "@/domain/frameworks";
import NewAssessmentClient from "./ui";

export default function NewAssessmentPage({ searchParams }: { searchParams: { framework?: string } }) {
  const frameworkKey = (searchParams.framework ?? "ISO_27001") as FrameworkKey;
  const questions = QUESTIONS[frameworkKey] ?? QUESTIONS.ISO_27001;
  const framework = FRAMEWORKS.find(f => f.key === frameworkKey);

  return (
    <div className="section">
      <div className="container container-md">
        <div className="text-center mb-8 animate-fade-in">
          <p className="text-caption">QuickCheck</p>
          <h1>{framework?.short || frameworkKey}</h1>
          <p style={{ maxWidth: 480, margin: "var(--space-4) auto 0" }}>
            Beantworten Sie die folgenden Fragen, um Ihren Compliance-Status zu ermitteln.
          </p>
        </div>

        <NewAssessmentClient frameworkKey={frameworkKey} questions={questions} />
      </div>
    </div>
  );
}
