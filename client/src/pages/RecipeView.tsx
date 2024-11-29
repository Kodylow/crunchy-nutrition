import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { getRecipe } from "../lib/api";
import { Button } from "@/components/ui/button";
import { NutritionPanel } from "../components/NutritionPanel";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Heart } from "lucide-react";

export default function RecipeView() {
  const { id } = useParams();
  const { data: recipe, isLoading } = useQuery({
    queryKey: ["recipe", id],
    queryFn: () => getRecipe(Number(id)),
  });

  if (isLoading) {
    return <div className="container mx-auto p-4">Loading...</div>;
  }

  if (!recipe) {
    return <div className="container mx-auto p-4">Recipe not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <Button variant="ghost" className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">{recipe.title}</h1>
            <Button variant="ghost" size="icon">
              <Heart
                className={`h-6 w-6 ${
                  recipe.isFavorite ? "fill-primary text-primary" : ""
                }`}
              />
            </Button>
          </div>

          {recipe.imageUrl && (
            <img
              src={recipe.imageUrl}
              alt={recipe.title}
              className="w-full h-64 object-cover rounded-lg"
            />
          )}

          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Ingredients</h2>
              <ul className="space-y-2">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-center">
                    • {ingredient}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Instructions</h2>
              <ol className="space-y-4">
                {recipe.instructions.map((step, index) => (
                  <li key={index} className="flex">
                    <span className="font-medium mr-4">{index + 1}.</span>
                    {step}
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <NutritionPanel nutrition={recipe.nutritionInfo} />
        </div>
      </div>
    </div>
  );
}
