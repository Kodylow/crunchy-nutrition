import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { NutritionInfo } from "../lib/nutrition";
import { calculateNutritionScore, getNutritionLabel, getSuggestions } from "../lib/nutrition";

interface NutritionPanelProps {
  nutrition: NutritionInfo;
}

export function NutritionPanel({ nutrition }: NutritionPanelProps) {
  const score = calculateNutritionScore(nutrition);
  const label = getNutritionLabel(score);
  const suggestions = getSuggestions(nutrition);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Nutrition Analysis</CardTitle>
        <CardDescription>Wellness score and recommendations</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <div className="flex justify-between mb-2">
              <span className="font-medium">Wellness Score</span>
              <span className="text-primary">{label}</span>
            </div>
            <Progress value={score} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-sm text-muted-foreground">Calories</span>
              <p className="text-2xl font-semibold">{nutrition.calories}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Protein</span>
              <p className="text-2xl font-semibold">{nutrition.protein}g</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Carbs</span>
              <p className="text-2xl font-semibold">{nutrition.carbs}g</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Fat</span>
              <p className="text-2xl font-semibold">{nutrition.fat}g</p>
            </div>
          </div>

          {suggestions.length > 0 && (
            <div>
              <h4 className="font-medium mb-2">Suggestions</h4>
              <ul className="space-y-2">
                {suggestions.map((suggestion, index) => (
                  <li key={index} className="text-sm text-muted-foreground">
                    • {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
