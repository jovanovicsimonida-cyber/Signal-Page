import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

export interface ContactFormData {
  name: string;
  email: string;
  conversionRate: string;
  espTool: string;
}

export function useCreateContact() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: ContactFormData) => {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Failed to send message");
      }

      return await res.json();
    },
    onSuccess: () => {
      toast({
        variant: "accent",
        title: "Got it, thanks!",
        description:
          "I'll take a look at what you shared and get back to you within 48 hours to set up a short call :)",
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
