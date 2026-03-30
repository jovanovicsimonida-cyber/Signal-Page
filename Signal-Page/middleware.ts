/**
 * Rate limiting middleware for API routes.
 *
 * Requires two environment variables on Vercel:
 *   UPSTASH_REDIS_REST_URL   — from your Upstash Redis database page
 *   UPSTASH_REDIS_REST_TOKEN — from your Upstash Redis database page
 *
 * Free tier at https://upstash.com is more than sufficient for this site.
 *
 * Limit: 5 subscription attempts per IP per hour (sliding window).
 */

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, "1 h"),
  analytics: true,
  prefix: "signal:rl",
});

export async function middleware(req: Request): Promise<Response | undefined> {
  const ip =
    (req.headers as Headers).get("x-forwarded-for")?.split(",")[0].trim() ??
    "anonymous";

  const { success } = await ratelimit.limit(ip);

  if (!success) {
    return new Response("Too Many Requests", {
      status: 429,
      headers: { "Retry-After": "3600" },
    });
  }
}

export const config = {
  matcher: ["/api/subscribe", "/api/subscribe-leak-finder"],
};
