import type { Express } from "express";
import { db } from "../db";
import { recipes, alternatives } from "@db/schema";
import { eq } from "drizzle-orm";

export function registerRoutes(app: Express) {
  app.post("/api/recipes/parse", async (req, res) => {
    try {
      const { url } = req.body;
      if (!url) {
        return res.status(400).json({ error: "URL is required" });
      }

      const scraper = require('recipe-scraper');
      const scrapedRecipe = await scraper(url);
      
      // Transform scraped data to match our schema
      const recipe = {
        title: scrapedRecipe.name,
        sourceUrl: url,
        ingredients: scrapedRecipe.ingredients,
        instructions: scrapedRecipe.instructions,
        nutritionInfo: {
          calories: scrapedRecipe.calories || 0,
          protein: scrapedRecipe.protein || 0,
          carbs: scrapedRecipe.carbohydrates || 0,
          fat: scrapedRecipe.fat || 0,
          fiber: scrapedRecipe.fiber || 0,
          sugar: scrapedRecipe.sugar || 0
        },
        imageUrl: scrapedRecipe.image,
        isFavorite: false
      };

      // Save to database
      const [savedRecipe] = await db.insert(recipes).values(recipe).returning();
      res.json(savedRecipe);
    } catch (error) {
      console.error('Recipe parsing error:', error);
      res.status(500).json({ error: "Failed to parse recipe. Make sure the URL is from a supported recipe website." });
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

  app.get("/api/recipes/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const recipe = await db.query.recipes.findFirst({
        where: eq(recipes.id, Number(id))
      });
      
      if (!recipe) {
        return res.status(404).json({ error: "Recipe not found" });
      }
      
      res.json(recipe);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch recipe" });
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
