/**
 * Buffer API Integration Layer
 * Docs: https://buffer.com/developers/api
 *
 * Ready for when you add an official Buffer access token.
 * All methods are stubs that return typed shapes until BUFFER_ACCESS_TOKEN is set.
 */

const BUFFER_API_BASE = "https://api.bufferapp.com/1";

export type BufferProfile = {
  id: string;
  service: string;
  service_username: string;
  service_id: string;
  avatar?: string;
  formatted_username?: string;
};

export type BufferUpdate = {
  id: string;
  text: string;
  profile_ids: string[];
  scheduled_at?: number;
  status?: string;
  media?: { photo?: string; link?: string };
};

function getToken(): string | null {
  return process.env.BUFFER_ACCESS_TOKEN || null;
}

async function bufferFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();
  if (!token) {
    throw new Error(
      "BUFFER_ACCESS_TOKEN is not set. Add it to .env to enable Buffer integration."
    );
  }

  const url = `${BUFFER_API_BASE}${path}${path.includes("?") ? "&" : "?"}access_token=${token}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Buffer API error ${res.status}: ${body}`);
  }

  return res.json() as Promise<T>;
}

export async function getProfiles(): Promise<BufferProfile[]> {
  return bufferFetch<BufferProfile[]>("/profiles.json");
}

export async function createUpdate(params: {
  profile_ids: string[];
  text: string;
  scheduled_at?: number;
  media?: { photo?: string; link?: string };
  now?: boolean;
}): Promise<BufferUpdate> {
  const body = new URLSearchParams();
  body.set("text", params.text);
  params.profile_ids.forEach((id) => body.append("profile_ids[]", id));
  if (params.scheduled_at) body.set("scheduled_at", String(params.scheduled_at));
  if (params.now) body.set("now", "true");
  if (params.media?.photo) body.set("media[photo]", params.media.photo);
  if (params.media?.link) body.set("media[link]", params.media.link);

  const token = getToken();
  if (!token) throw new Error("BUFFER_ACCESS_TOKEN is not set");

  const res = await fetch(
    `${BUFFER_API_BASE}/updates/create.json?access_token=${token}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    }
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Buffer createUpdate failed: ${res.status} ${text}`);
  }

  return res.json() as Promise<BufferUpdate>;
}

export async function getUpdates(
  profileId: string,
  status: "pending" | "sent" = "pending"
): Promise<BufferUpdate[]> {
  return bufferFetch<BufferUpdate[]>(
    `/profiles/${profileId}/updates/${status}.json`
  );
}

export function isBufferConfigured(): boolean {
  return Boolean(getToken());
}
