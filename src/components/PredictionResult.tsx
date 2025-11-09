import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, CheckCircle, AlertCircle } from "lucide-react";
import { PredictionResponse } from "./PredictionForm";

interface PredictionResultProps {
  prediction: PredictionResponse;
}

const PredictionResult = ({ prediction }: PredictionResultProps) => {
  const getRiskColor = () => {
    switch (prediction.risk) {
      case "High Risk":
        return "text-destructive";
      case "Moderate Risk":
        return "text-warning";
      case "Low Risk":
        return "text-success";
      default:
        return "text-foreground";
    }
  };

  const getRiskIcon = () => {
    switch (prediction.risk) {
      case "High Risk":
        return <AlertTriangle className="w-12 h-12 text-destructive" />;
      case "Moderate Risk":
        return <AlertCircle className="w-12 h-12 text-warning" />;
      case "Low Risk":
        return <CheckCircle className="w-12 h-12 text-success" />;
      default:
        return null;
    }
  };

  const getRiskBg = () => {
    switch (prediction.risk) {
      case "High Risk":
        return "bg-destructive/10 border-destructive/30";
      case "Moderate Risk":
        return "bg-warning/10 border-warning/30";
      case "Low Risk":
        return "bg-success/10 border-success/30";
      default:
        return "bg-muted";
    }
  };

  return (
    <Card className="shadow-medium animate-in fade-in slide-in-from-right duration-500">
      <CardHeader>
        <CardTitle>Prediction Result</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className={`p-6 rounded-lg border-2 ${getRiskBg()} transition-all`}>
          <div className="flex items-center justify-center mb-4">
            {getRiskIcon()}
          </div>
          <h3 className={`text-3xl font-bold text-center mb-2 ${getRiskColor()}`}>
            {prediction.risk}
          </h3>
          <p className="text-center text-muted-foreground">
            Probability: {(prediction.probability * 100).toFixed(1)}%
          </p>
        </div>

        <div className="space-y-3">
          <h4 className="font-semibold text-sm text-muted-foreground">Input Features</h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Temperature</p>
              <p className="text-lg font-semibold">{prediction.features.temperature}°C</p>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Humidity</p>
              <p className="text-lg font-semibold">{prediction.features.humidity}%</p>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Wind Speed</p>
              <p className="text-lg font-semibold">{prediction.features.windSpeed} km/h</p>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Rainfall</p>
              <p className="text-lg font-semibold">{prediction.features.rainfall} mm</p>
            </div>
          </div>
        </div>

        {prediction.risk === "High Risk" && (
          <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg">
            <p className="text-sm text-destructive font-medium">
              ⚠️ Immediate action recommended. Contact local fire authorities and monitor the area closely.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PredictionResult;
