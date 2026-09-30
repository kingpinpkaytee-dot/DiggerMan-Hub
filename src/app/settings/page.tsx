import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function SettingsPage() {
  return (
    <div className="p-6 md:p-8 max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-sm text-[hsl(var(--muted-foreground))]">
          Workspace preferences and integrations
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Environment</CardTitle>
          <CardDescription>Local development uses SQLite via Prisma</CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-[hsl(var(--muted-foreground))] space-y-2">
          <p>
            Database: <code className="rounded bg-[hsl(var(--muted))] px-1">file:./dev.db</code>
          </p>
          <p>
            Switch to Postgres later by updating{" "}
            <code className="rounded bg-[hsl(var(--muted))] px-1">prisma/schema.prisma</code> provider
            and <code className="rounded bg-[hsl(var(--muted))] px-1">DATABASE_URL</code>.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Real-time</CardTitle>
          <CardDescription>Live inbox updates</CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-[hsl(var(--muted-foreground))]">
          Structure is ready for Supabase Realtime or Pusher. Add when you need live comment/DM
          streaming.
        </CardContent>
      </Card>
    </div>
  );
}
