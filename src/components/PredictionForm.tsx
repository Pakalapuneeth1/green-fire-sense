import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, CloudRain, Wind, Thermometer, Droplets } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import PredictionResult from "./PredictionResult";

export interface PredictionData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  rainfall: number;
}

export interface PredictionResponse {
  risk: "Low Risk" | "Moderate Risk" | "High Risk";
  probability: number;
  features: PredictionData;
}

const PredictionForm = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<PredictionData>({
    temperature: 25,
    humidity: 50,
    windSpeed: 10,
    rainfall: 5,
  });
  const [prediction, setPrediction] = useState<PredictionResponse | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call - will be replaced with actual backend call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simple rule-based prediction logic for demonstration
      const { temperature, humidity, windSpeed, rainfall } = formData;
      const riskScore = (temperature * 0.3) + ((100 - humidity) * 0.3) + (windSpeed * 0.2) - (rainfall * 0.2);
      
      let risk: "Low Risk" | "Moderate Risk" | "High Risk";
      let probability: number;
      
      if (riskScore > 50) {
        risk = "High Risk";
        probability = Math.min(0.85 + Math.random() * 0.1, 0.95);
      } else if (riskScore > 30) {
        risk = "Moderate Risk";
        probability = 0.5 + Math.random() * 0.2;
      } else {
        risk = "Low Risk";
        probability = 0.15 + Math.random() * 0.15;
      }

      setPrediction({
        risk,
        probability,
        features: formData,
      });

      toast({
        title: "Prediction Complete",
        description: `Risk Level: ${risk}`,
      });
    } catch (error) {
      toast({
        title: "Prediction Failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof PredictionData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0,
    }));
  };

  return (
    <section id="predict-section" className="py-20 bg-gradient-earth">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">Predict Forest Fire Risk</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Enter environmental parameters to get an instant fire risk assessment
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle>Environmental Data</CardTitle>
              <CardDescription>Input current environmental conditions</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="temperature" className="flex items-center gap-2">
                    <Thermometer className="w-4 h-4 text-secondary" />
                    Temperature (°C)
                  </Label>
                  <Input
                    id="temperature"
                    type="number"
                    step="0.1"
                    value={formData.temperature}
                    onChange={(e) => handleInputChange("temperature", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="humidity" className="flex items-center gap-2">
                    <Droplets className="w-4 h-4 text-primary" />
                    Humidity (%)
                  </Label>
                  <Input
                    id="humidity"
                    type="number"
                    step="0.1"
                    min="0"
                    max="100"
                    value={formData.humidity}
                    onChange={(e) => handleInputChange("humidity", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="windSpeed" className="flex items-center gap-2">
                    <Wind className="w-4 h-4 text-muted-foreground" />
                    Wind Speed (km/h)
                  </Label>
                  <Input
                    id="windSpeed"
                    type="number"
                    step="0.1"
                    value={formData.windSpeed}
                    onChange={(e) => handleInputChange("windSpeed", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rainfall" className="flex items-center gap-2">
                    <CloudRain className="w-4 h-4 text-primary" />
                    Rainfall (mm)
                  </Label>
                  <Input
                    id="rainfall"
                    type="number"
                    step="0.1"
                    value={formData.rainfall}
                    onChange={(e) => handleInputChange("rainfall", e.target.value)}
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-forest hover:opacity-90"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    "Predict Risk"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {prediction && <PredictionResult prediction={prediction} />}
        </div>
      </div>
    </section>
  );
};

export default PredictionForm;
