import { Hero } from "../components/Hero";
import { UrlInput } from "../components/UrlInput";
import { RecipeCard } from "../components/RecipeCard";
import { useQuery } from "@tanstack/react-query";
import { getRecipes } from "../lib/api";

export default function Home() {
  const { data: recipes, isLoading } = useQuery({
    queryKey: ["recipes"],
    queryFn: getRecipes
  });

  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <main className="container mx-auto px-4 py-8">
        <UrlInput />
        
        <h2 className="text-2xl font-semibold mt-12 mb-6">Saved Recipes</h2>
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-[300px] bg-muted animate-pulse rounded-lg" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes?.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
