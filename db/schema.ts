import { pgTable, text, integer, jsonb, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const recipes = pgTable("recipes", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: text("title").notNull(),
  sourceUrl: text("source_url").notNull(),
  ingredients: jsonb("ingredients").notNull().$type<string[]>(),
  instructions: jsonb("instructions").notNull().$type<string[]>(),
  nutritionInfo: jsonb("nutrition_info").notNull(),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  isFavorite: boolean("is_favorite").default(false).notNull()
});

export const alternatives = pgTable("alternatives", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  originalIngredient: text("original_ingredient").notNull(),
  alternativeIngredient: text("alternative_ingredient").notNull(),
  healthBenefit: text("health_benefit").notNull()
});

export const insertRecipeSchema = createInsertSchema(recipes);
export const selectRecipeSchema = createSelectSchema(recipes);
export type InsertRecipe = z.infer<typeof insertRecipeSchema>;
export type Recipe = z.infer<typeof selectRecipeSchema>;

export const insertAlternativeSchema = createInsertSchema(alternatives);
export const selectAlternativeSchema = createSelectSchema(alternatives);
export type InsertAlternative = z.infer<typeof insertAlternativeSchema>;
export type Alternative = z.infer<typeof selectAlternativeSchema>;
