export interface NutritionInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber?: number;
  sugar?: number;
}

export function calculateNutritionScore(nutrition: NutritionInfo): number {
  const score = (nutrition.protein * 4) + (nutrition.fiber || 0) * 2 - (nutrition.sugar || 0);
  return Math.max(0, Math.min(100, score));
}

export function getNutritionLabel(score: number): string {
  if (score >= 80) return "Excellent";
  if (score >= 60) return "Good";
  if (score >= 40) return "Moderate";
  return "Could be better";
}

export function getSuggestions(nutrition: NutritionInfo): string[] {
  const suggestions: string[] = [];
  
  if (nutrition.fiber && nutrition.fiber < 5) {
    suggestions.push("Consider adding more fiber-rich ingredients");
  }
  
  if (nutrition.sugar && nutrition.sugar > 10) {
    suggestions.push("Try reducing added sugars");
  }
  
  if (nutrition.protein < 15) {
    suggestions.push("Add more protein sources for better balance");
  }
  
  return suggestions;
}
