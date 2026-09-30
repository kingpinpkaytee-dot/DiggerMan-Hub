import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ComposePage() {
  return (
    <div className="p-6 md:p-8 max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Compose</h1>
        <p className="text-sm text-[hsl(var(--muted-foreground))]">
          Draft and schedule posts across connected channels
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">New Post</CardTitle>
          <CardDescription>
            Buffer API + native platform clients will power this form
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <textarea
            className="w-full min-h-[140px] rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-3 py-2 text-sm placeholder:text-[hsl(var(--muted-foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))]"
            placeholder="What's the move?"
            disabled
          />
          <div className="flex flex-wrap gap-2 text-xs text-[hsl(var(--muted-foreground))]">
            <span className="rounded-full border border-[hsl(var(--border))] px-2.5 py-1">X</span>
            <span className="rounded-full border border-[hsl(var(--border))] px-2.5 py-1">Meta</span>
            <span className="rounded-full border border-[hsl(var(--border))] px-2.5 py-1">LinkedIn</span>
            <span className="rounded-full border border-[hsl(var(--border))] px-2.5 py-1">TikTok</span>
            <span className="rounded-full border border-[hsl(var(--border))] px-2.5 py-1">+ Buffer channels</span>
          </div>
          <div className="flex gap-2">
            <Button disabled size="sm">
              Schedule
            </Button>
            <Button disabled variant="secondary" size="sm">
              Publish now
            </Button>
            <Button disabled variant="outline" size="sm">
              Save draft
            </Button>
          </div>
          <p className="text-xs text-[hsl(var(--muted-foreground))]">
            Wire up Buffer <code className="rounded bg-[hsl(var(--muted))] px-1">createUpdate</code> and
            platform clients in the next iteration.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
