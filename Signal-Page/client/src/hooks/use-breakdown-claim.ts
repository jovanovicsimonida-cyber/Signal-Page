import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

export interface BreakdownClaimData {
  name: string;
  email: string;
  website: string;
  trialAccess: string;
  goal: string;
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
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    },
  });
}
