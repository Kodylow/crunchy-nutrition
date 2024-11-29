import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <div className="relative h-[500px] overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1475855664010-a869729f42c3"
        alt="Healthy food arrangement"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          Wellness Recipe Analyzer
        </h1>
        <p className="text-xl text-white/90 mb-8 max-w-2xl">
          Transform any recipe into a wellness-focused meal with our nutritional insights
          and healthy alternatives.
        </p>
        <Button className="w-fit" size="lg">
          Get Started
        </Button>
      </div>
    </div>
  );
}
