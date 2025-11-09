import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart, Bar, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";

const DataVisualization = () => {
  const featureImportance = [
    { feature: "Temperature", importance: 0.35 },
    { feature: "Humidity", importance: 0.30 },
    { feature: "Wind Speed", importance: 0.20 },
    { feature: "Rainfall", importance: 0.15 },
  ];

  const sampleData = [
    { temperature: 20, humidity: 70, risk: "Low" },
    { temperature: 25, humidity: 60, risk: "Low" },
    { temperature: 30, humidity: 40, risk: "Moderate" },
    { temperature: 35, humidity: 30, risk: "High" },
    { temperature: 38, humidity: 20, risk: "High" },
    { temperature: 22, humidity: 65, risk: "Low" },
    { temperature: 28, humidity: 45, risk: "Moderate" },
    { temperature: 33, humidity: 35, risk: "High" },
  ];

  const getColor = (risk: string) => {
    switch (risk) {
      case "High":
        return "hsl(0, 72%, 51%)";
      case "Moderate":
        return "hsl(45, 93%, 47%)";
      case "Low":
        return "hsl(145, 60%, 45%)";
      default:
        return "hsl(145, 60%, 45%)";
    }
  };

  const COLORS = ["hsl(28, 85%, 55%)", "hsl(145, 60%, 35%)", "hsl(28, 75%, 50%)", "hsl(145, 50%, 45%)"];

  return (
    <section className="py-20 bg-background">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">Data Insights</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Visualize how environmental factors influence fire risk predictions
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle>Feature Importance</CardTitle>
              <CardDescription>Impact of each environmental factor on predictions</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={featureImportance}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="feature" 
                    tick={{ fill: 'hsl(var(--foreground))' }}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis tick={{ fill: 'hsl(var(--foreground))' }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="importance" radius={[8, 8, 0, 0]}>
                    {featureImportance.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle>Temperature vs Humidity</CardTitle>
              <CardDescription>Correlation between key environmental factors</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <ScatterChart>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    type="number" 
                    dataKey="temperature" 
                    name="Temperature" 
                    unit="°C"
                    tick={{ fill: 'hsl(var(--foreground))' }}
                  />
                  <YAxis 
                    type="number" 
                    dataKey="humidity" 
                    name="Humidity" 
                    unit="%"
                    tick={{ fill: 'hsl(var(--foreground))' }}
                  />
                  <Tooltip 
                    cursor={{ strokeDasharray: '3 3' }}
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                  <Scatter name="Risk Level" data={sampleData} fill="hsl(var(--primary))">
                    {sampleData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={getColor(entry.risk)} />
                    ))}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default DataVisualization;
