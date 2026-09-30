import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Activity,
  MessageSquare,
  Send,
  Users,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import { isBufferConfigured } from "@/lib/buffer/client";
import { isProviderConfigured, PROVIDER_LABELS, type OAuthProvider } from "@/lib/oauth/providers";

const stats = [
  { label: "Scheduled", value: "—", icon: Send, hint: "Connect channels to see data" },
  { label: "Unread Inbox", value: "—", icon: MessageSquare, hint: "Unified comments + DMs" },
  { label: "Connected Channels", value: "0", icon: Users, hint: "Buffer + native OAuth" },
  { label: "Published (7d)", value: "—", icon: Activity, hint: "Coming online soon" },
];

const providers: OAuthProvider[] = ["meta", "x", "linkedin", "tiktok"];

export default function CommandCenterPage() {
  const bufferReady = isBufferConfigured();

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Command Center</h1>
          <p className="text-sm text-[hsl(var(--muted-foreground))]">
            DiggerMan Hub · Social War Room
          </p>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline" size="sm">
            <Link href="/inbox">Open Inbox</Link>
          </Button>
          <Button asChild size="sm">
            <Link href="/compose">Compose Post</Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <Card key={s.label}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-[hsl(var(--muted-foreground))]">
                  {s.label}
                </CardTitle>
                <Icon className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{s.value}</div>
                <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">{s.hint}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Buffer Integration</CardTitle>
            <CardDescription>
              Primary scheduling & multi-platform publishing layer
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2 text-sm">
              {bufferReady ? (
                <>
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span>BUFFER_ACCESS_TOKEN detected</span>
                </>
              ) : (
                <>
                  <AlertCircle className="h-4 w-4 text-amber-500" />
                  <span>No Buffer token yet — add to .env</span>
                </>
              )}
            </div>
            <p className="text-xs text-[hsl(var(--muted-foreground))]">
              See <code className="rounded bg-[hsl(var(--muted))] px-1">src/lib/buffer/client.ts</code>{" "}
              and <code className="rounded bg-[hsl(var(--muted))] px-1">.env.example</code>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Native OAuth Providers</CardTitle>
            <CardDescription>
              Direct connections for comments, DMs, and deeper features
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {providers.map((p) => {
                const ready = isProviderConfigured(p);
                return (
                  <li key={p} className="flex items-center justify-between text-sm">
                    <span>{PROVIDER_LABELS[p]}</span>
                    {ready ? (
                      <span className="flex items-center gap-1 text-emerald-500 text-xs">
                        <CheckCircle2 className="h-3.5 w-3.5" /> Ready
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-amber-500 text-xs">
                        <AlertCircle className="h-3.5 w-3.5" /> Needs keys
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Next Steps</CardTitle>
          <CardDescription>Get the war room fully operational</CardDescription>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal list-inside space-y-2 text-sm text-[hsl(var(--muted-foreground))]">
            <li>
              Copy <code className="rounded bg-[hsl(var(--muted))] px-1">.env.example</code> →{" "}
              <code className="rounded bg-[hsl(var(--muted))] px-1">.env</code> and fill tokens
            </li>
            <li>
              Run <code className="rounded bg-[hsl(var(--muted))] px-1">npm install</code> then{" "}
              <code className="rounded bg-[hsl(var(--muted))] px-1">npx prisma db push</code>
            </li>
            <li>
              Start the app with <code className="rounded bg-[hsl(var(--muted))] px-1">npm run dev</code>
            </li>
            <li>Create developer apps for Meta / X / LinkedIn / TikTok when you are ready for native OAuth</li>
            <li>Add a Buffer access token to enable cross-platform scheduling immediately</li>
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}
