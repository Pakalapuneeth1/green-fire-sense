import { Button } from "@/components/ui/button";
import { ArrowRight, Flame } from "lucide-react";
import forestHero from "@/assets/forest-hero.jpg";

const Hero = () => {
  const scrollToPredict = () => {
    document.getElementById("predict-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(20, 83, 45, 0.7), rgba(20, 83, 45, 0.85)), url(${forestHero})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      <div className="container relative z-10 px-4 py-20 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-primary/20 backdrop-blur-sm border border-primary-foreground/20 animate-float">
          <Flame className="w-4 h-4 text-secondary" />
          <span className="text-sm font-medium text-primary-foreground">AI-Powered Forest Protection</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
          Forest Fire Detection
          <br />
          <span className="bg-gradient-to-r from-success to-secondary bg-clip-text text-transparent">
            ML System
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto mb-8 leading-relaxed">
          Advanced machine learning technology to predict and prevent forest fires. 
          Monitor environmental conditions in real-time and get instant risk assessments.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            onClick={scrollToPredict}
            className="bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-glow-warning group"
          >
            Start Prediction
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            onClick={() => document.getElementById("learn-section")?.scrollIntoView({ behavior: "smooth" })}
            className="bg-primary-foreground/10 backdrop-blur-sm border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/20"
          >
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
