import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { parseRecipeUrl } from "../lib/api";

export function UrlInput() {
  const [url, setUrl] = useState("");
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: parseRecipeUrl,
    onSuccess: () => {
      toast({
        title: "Recipe parsed successfully",
        description: "Your recipe has been analyzed and saved.",
      });
      setUrl("");
    },
    onError: () => {
      toast({
        title: "Error parsing recipe",
        description: "Please check the URL and try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    mutation.mutate(url);
  };

  return (
    <Card className="p-6 bg-white/50 backdrop-blur-sm">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold">Analyze a Recipe</h2>
        <div className="flex gap-2">
          <Input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste a recipe URL here..."
            className="flex-1"
          />
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? "Analyzing..." : "Analyze"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
