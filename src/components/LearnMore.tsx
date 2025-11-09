import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Shield, Lightbulb, TreePine } from "lucide-react";

const LearnMore = () => {
  return (
    <section id="learn-section" className="py-20 bg-gradient-earth">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">Learn More</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Understanding our ML model and forest fire prevention
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
          <Card className="shadow-medium hover:shadow-strong transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-6 h-6 text-primary" />
                Machine Learning Model
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Our system uses an ensemble of Random Forest and Gradient Boosting algorithms trained on 
                historical fire data from multiple regions.
              </p>
              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Key Features:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Temperature and humidity analysis</li>
                  <li>Wind speed and direction patterns</li>
                  <li>Rainfall and drought indicators</li>
                  <li>Seasonal and geographical factors</li>
                </ul>
              </div>
              <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                <p className="text-sm font-medium text-primary">
                  Model Accuracy: 92.5% on validation data
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-medium hover:shadow-strong transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-6 h-6 text-secondary" />
                Preventive Measures
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Effective forest fire prevention requires proactive monitoring and immediate response to 
                high-risk conditions.
              </p>
              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Recommended Actions:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Install early warning systems</li>
                  <li>Create firebreaks in high-risk areas</li>
                  <li>Conduct controlled burns during safe periods</li>
                  <li>Educate communities about fire safety</li>
                  <li>Maintain rapid response teams</li>
                </ul>
              </div>
              <div className="p-4 bg-secondary/10 rounded-lg border border-secondary/20">
                <p className="text-sm font-medium text-secondary">
                  Early detection can reduce damage by up to 80%
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Card className="shadow-medium text-center">
            <CardContent className="pt-6">
              <Lightbulb className="w-12 h-12 text-warning mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Early Detection</h3>
              <p className="text-sm text-muted-foreground">
                Monitor environmental conditions 24/7 for instant alerts
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-medium text-center">
            <CardContent className="pt-6">
              <TreePine className="w-12 h-12 text-success mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Forest Conservation</h3>
              <p className="text-sm text-muted-foreground">
                Protect biodiversity and maintain ecological balance
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-medium text-center">
            <CardContent className="pt-6">
              <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Community Safety</h3>
              <p className="text-sm text-muted-foreground">
                Safeguard lives and property in forest-adjacent areas
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default LearnMore;
