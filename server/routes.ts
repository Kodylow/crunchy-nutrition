import type { Express } from "express";
import { db } from "../db";
import { recipes, alternatives } from "@db/schema";
import { eq } from "drizzle-orm";

export function registerRoutes(app: Express) {
  app.post("/api/recipes/parse", async (req, res) => {
    try {
      const { url } = req.body;
      // TODO: Implement recipe parsing logic
      const mockRecipe = {
        title: "Sample Recipe",
        ingredients: ["ingredient 1", "ingredient 2"],
        instructions: ["step 1", "step 2"],
        nutritionInfo: {
          calories: 300,
          protein: 20,
          carbs: 30,
          fat: 10
        }
      };
      res.json(mockRecipe);
    } catch (error) {
      res.status(500).json({ error: "Failed to parse recipe" });
    }
  });

  app.get("/api/recipes", async (req, res) => {
    try {
      const allRecipes = await db.select().from(recipes);
      res.json(allRecipes);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch recipes" });
    }
  });

  app.post("/api/recipes", async (req, res) => {
    try {
      const recipe = req.body;
      const inserted = await db.insert(recipes).values(recipe).returning();
      res.json(inserted[0]);
    } catch (error) {
      res.status(500).json({ error: "Failed to save recipe" });
    }
  });

  app.get("/api/alternatives/:ingredient", async (req, res) => {
    try {
      const { ingredient } = req.params;
      const alternatives = await db.select().from(alternatives)
        .where(eq(alternatives.originalIngredient, ingredient));
      res.json(alternatives);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch alternatives" });
    }
  });
}
