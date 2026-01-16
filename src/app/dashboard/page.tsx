import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth";
import { prisma } from "@/server/db";
import DashboardClient from "./ui";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return (
      <div className="auth-container">
        <div className="card text-center" style={{ maxWidth: 400 }}>
          <div style={{ fontSize: 48, marginBottom: "var(--space-4)" }}>🔐</div>
          <h2>Dashboard</h2>
          <p style={{ margin: "var(--space-4) 0 var(--space-6)" }}>
            Melden Sie sich an, um Ihre Assessments zu sehen.
          </p>
          <a href="/login" className="btn btn-primary btn-lg">
            Anmelden
          </a>
        </div>
      </div>
    );
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true, email: true, name: true, tier: true }
  });

  return <DashboardClient user={user!} />;
}
