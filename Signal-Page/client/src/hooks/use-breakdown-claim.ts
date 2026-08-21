import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

const ALREADY_CLAIMED = "AlreadyClaimed";

async function readMessage(res: Response): Promise<string | null> {
  try {
    const body = (await res.json()) as { message?: unknown };
    return typeof body.message === "string" ? body.message : null;
  } catch {
    return null;
  }
}

export interface BreakdownClaimData {
  name: string;
  email: string;
  goal?: string;
  /** Honeypot. Hidden from real users; only bots fill it in. */
  website?: string;
}

export function useBreakdownClaim() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: BreakdownClaimData) => {
      const res = await fetch("/api/breakdown-claim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        // A duplicate request comes back as 409 with a message written for the
        // visitor. Anything else stays generic, since those bodies are status
        // text rather than something worth showing.
        if (res.status === 409) {
          const error = new Error(
            (await readMessage(res)) ??
              "You have already requested a breakdown with this email.",
          );
          error.name = ALREADY_CLAIMED;
          throw error;
        }
        throw new Error("Something went wrong. Please try again.");
      }

      return await res.json();
    },
    onSuccess: () => {
      toast({
        variant: "accent",
        title: "You're in!",
        description:
          "I'll take a look at your website and trial offer myself and get back to you within a day or two. Keep an eye on your inbox for a confirmation :)",
      });
    },
    onError: (error: Error) => {
      // Sending twice is not a failure on the visitor's part, so it does not
      // get the red error treatment.
      const duplicate = error.name === ALREADY_CLAIMED;
      toast({
        variant: duplicate ? "accent" : "destructive",
        title: duplicate ? "Already got it" : "Error",
        description: error.message,
      });
    },
  });
}
