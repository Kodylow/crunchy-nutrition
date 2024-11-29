import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart } from "lucide-react";
import type { Recipe } from "@db/schema";
import { Link } from "wouter";

interface RecipeCardProps {
  recipe: Recipe;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Link href={`/recipe/${recipe.id}`}>
      <Card className="cursor-pointer hover:shadow-lg transition-shadow">
        {recipe.imageUrl && (
          <div className="relative h-48 overflow-hidden rounded-t-lg">
            <img
              src={recipe.imageUrl}
              alt={recipe.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">{recipe.title}</CardTitle>
            <Heart
              className={`h-5 w-5 ${
                recipe.isFavorite ? "fill-primary text-primary" : "text-gray-400"
              }`}
            />
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            {recipe.ingredients.length} ingredients • {recipe.instructions.length} steps
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
