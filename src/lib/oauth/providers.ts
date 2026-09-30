/**
 * OAuth provider stubs for Meta, X, LinkedIn, TikTok.
 * You will need to create developer apps and fill in the env vars.
 * These helpers prepare the authorization URLs and token exchange shapes.
 */

export type OAuthProvider = "meta" | "x" | "linkedin" | "tiktok";

export type OAuthConfig = {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  authUrl: string;
  tokenUrl: string;
  scopes: string[];
};

const configs: Record<OAuthProvider, () => OAuthConfig | null> = {
  meta: () => {
    const clientId = process.env.META_APP_ID;
    const clientSecret = process.env.META_APP_SECRET;
    const redirectUri = process.env.META_REDIRECT_URI;
    if (!clientId || !clientSecret || !redirectUri) return null;
    return {
      clientId,
      clientSecret,
      redirectUri,
      authUrl: "https://www.facebook.com/v21.0/dialog/oauth",
      tokenUrl: "https://graph.facebook.com/v21.0/oauth/access_token",
      scopes: ["pages_show_list", "pages_read_engagement", "pages_manage_posts", "instagram_basic", "instagram_content_publish"],
    };
  },
  x: () => {
    const clientId = process.env.X_CLIENT_ID;
    const clientSecret = process.env.X_CLIENT_SECRET;
    const redirectUri = process.env.X_REDIRECT_URI;
    if (!clientId || !clientSecret || !redirectUri) return null;
    return {
      clientId,
      clientSecret,
      redirectUri,
      authUrl: "https://twitter.com/i/oauth2/authorize",
      tokenUrl: "https://api.twitter.com/2/oauth2/token",
      scopes: ["tweet.read", "tweet.write", "users.read", "offline.access", "dm.read", "dm.write"],
    };
  },
  linkedin: () => {
    const clientId = process.env.LINKEDIN_CLIENT_ID;
    const clientSecret = process.env.LINKEDIN_CLIENT_SECRET;
    const redirectUri = process.env.LINKEDIN_REDIRECT_URI;
    if (!clientId || !clientSecret || !redirectUri) return null;
    return {
      clientId,
      clientSecret,
      redirectUri,
      authUrl: "https://www.linkedin.com/oauth/v2/authorization",
      tokenUrl: "https://www.linkedin.com/oauth/v2/accessToken",
      scopes: ["openid", "profile", "w_member_social"],
    };
  },
  tiktok: () => {
    const clientId = process.env.TIKTOK_CLIENT_KEY;
    const clientSecret = process.env.TIKTOK_CLIENT_SECRET;
    const redirectUri = process.env.TIKTOK_REDIRECT_URI;
    if (!clientId || !clientSecret || !redirectUri) return null;
    return {
      clientId,
      clientSecret,
      redirectUri,
      authUrl: "https://www.tiktok.com/v2/auth/authorize",
      tokenUrl: "https://open.tiktokapis.com/v2/oauth/token/",
      scopes: ["user.info.basic", "video.publish", "video.list"],
    };
  },
};

export function getProviderConfig(provider: OAuthProvider): OAuthConfig | null {
  return configs[provider]();
}

export function buildAuthUrl(
  provider: OAuthProvider,
  state: string
): string | null {
  const cfg = getProviderConfig(provider);
  if (!cfg) return null;

  const params = new URLSearchParams({
    client_id: cfg.clientId,
    redirect_uri: cfg.redirectUri,
    response_type: "code",
    scope: cfg.scopes.join(provider === "x" || provider === "tiktok" ? " " : ","),
    state,
  });

  if (provider === "x") {
    params.set("code_challenge", "challenge");
    params.set("code_challenge_method", "plain");
  }

  return `${cfg.authUrl}?${params.toString()}`;
}

export function isProviderConfigured(provider: OAuthProvider): boolean {
  return getProviderConfig(provider) !== null;
}

export const PROVIDER_LABELS: Record<OAuthProvider, string> = {
  meta: "Meta (Facebook / Instagram)",
  x: "X (Twitter)",
  linkedin: "LinkedIn",
  tiktok: "TikTok",
};
