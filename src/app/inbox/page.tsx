import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";

export default function InboxPage() {
  return (
    <div className="p-6 md:p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Unified Inbox</h1>
        <p className="text-sm text-[hsl(var(--muted-foreground))]">
          Comments + DMs from all connected platforms in one place
        </p>
      </div>

      <Card className="min-h-[320px] flex flex-col items-center justify-center">
        <CardHeader className="text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[hsl(var(--muted))]">
            <MessageSquare className="h-6 w-6 text-[hsl(var(--muted-foreground))]" />
          </div>
          <CardTitle className="text-base">Inbox is empty</CardTitle>
          <CardDescription className="max-w-sm">
            Connect channels and enable comment / DM sync. Real-time updates can be added later
            via Supabase Realtime or Pusher.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-[hsl(var(--muted-foreground))] text-center">
            Schema ready: <code className="rounded bg-[hsl(var(--muted))] px-1">Conversation</code> +{" "}
            <code className="rounded bg-[hsl(var(--muted))] px-1">Message</code> models in Prisma
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
