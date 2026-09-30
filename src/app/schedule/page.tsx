import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";

export default function SchedulePage() {
  return (
    <div className="p-6 md:p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Schedule</h1>
        <p className="text-sm text-[hsl(var(--muted-foreground))]">
          Upcoming posts and calendar view
        </p>
      </div>

      <Card className="min-h-[280px] flex flex-col items-center justify-center">
        <CardHeader className="text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[hsl(var(--muted))]">
            <Calendar className="h-6 w-6 text-[hsl(var(--muted-foreground))]" />
          </div>
          <CardTitle className="text-base">No scheduled posts</CardTitle>
          <CardDescription>
            Posts with status <code className="rounded bg-[hsl(var(--muted))] px-1">scheduled</code> will
            appear here. Buffer pending updates can be synced via the client.
          </CardDescription>
        </CardHeader>
        <CardContent />
      </Card>
    </div>
  );
}
