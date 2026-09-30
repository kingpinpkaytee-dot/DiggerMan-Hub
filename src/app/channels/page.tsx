import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Radio, Plus } from "lucide-react";
import { PROVIDER_LABELS, type OAuthProvider, isProviderConfigured } from "@/lib/oauth/providers";
import { isBufferConfigured } from "@/lib/buffer/client";

const providers: OAuthProvider[] = ["meta", "x", "linkedin", "tiktok"];

export default function ChannelsPage() {
  return (
    <div className="p-6 md:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Channels</h1>
          <p className="text-sm text-[hsl(var(--muted-foreground))]">
            Connected accounts via Buffer and native OAuth
          </p>
        </div>
        <Button size="sm" disabled>
          <Plus className="h-4 w-4" />
          Connect channel
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Radio className="h-4 w-4" />
              Buffer
            </CardTitle>
            <CardDescription>Multi-platform scheduling hub</CardDescription>
          </CardHeader>
          <CardContent>
            {isBufferConfigured() ? (
              <p className="text-sm text-emerald-500">Token configured — profiles will load here</p>
            ) : (
              <p className="text-sm text-[hsl(var(--muted-foreground))]">
                Add <code className="rounded bg-[hsl(var(--muted))] px-1">BUFFER_ACCESS_TOKEN</code> to
                enable
              </p>
            )}
          </CardContent>
        </Card>

        {providers.map((p) => (
          <Card key={p}>
            <CardHeader>
              <CardTitle className="text-base">{PROVIDER_LABELS[p]}</CardTitle>
              <CardDescription>Native OAuth connection</CardDescription>
            </CardHeader>
            <CardContent>
              {isProviderConfigured(p) ? (
                <p className="text-sm text-emerald-500">Keys present — ready to authorize</p>
              ) : (
                <p className="text-sm text-[hsl(var(--muted-foreground))]">
                  Create a developer app and add credentials to .env
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
