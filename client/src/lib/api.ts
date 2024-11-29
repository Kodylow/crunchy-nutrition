import type { Recipe } from "@db/schema";

export async function getRecipes(): Promise<Recipe[]> {
  const response = await fetch("/api/recipes");
  if (!response.ok) throw new Error("Failed to fetch recipes");
  return response.json();
}

export async function parseRecipeUrl(url: string) {
  const response = await fetch("/api/recipes/parse", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url }),
  });
  if (!response.ok) throw new Error("Failed to parse recipe");
  return response.json();
}

export async function getRecipe(id: number): Promise<Recipe> {
  const response = await fetch(`/api/recipes/${id}`);
  if (!response.ok) throw new Error("Failed to fetch recipe");
  return response.json();
}

export async function getAlternatives(ingredient: string) {
  const response = await fetch(`/api/alternatives/${ingredient}`);
  if (!response.ok) throw new Error("Failed to fetch alternatives");
  return response.json();
}
