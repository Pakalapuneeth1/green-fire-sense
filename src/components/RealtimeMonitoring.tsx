import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Activity, TrendingUp, TrendingDown } from "lucide-react";

interface DataPoint {
  time: string;
  temperature: number;
  humidity: number;
  risk: number;
}

const RealtimeMonitoring = () => {
  const [data, setData] = useState<DataPoint[]>([]);
  const [currentRisk, setCurrentRisk] = useState<number>(0);

  useEffect(() => {
    const initialData: DataPoint[] = Array.from({ length: 10 }, (_, i) => ({
      time: `${i}:00`,
      temperature: 20 + Math.random() * 15,
      humidity: 40 + Math.random() * 40,
      risk: 20 + Math.random() * 40,
    }));
    setData(initialData);

    const interval = setInterval(() => {
      setData(prevData => {
        const newData = [...prevData.slice(1)];
        const lastTime = parseInt(prevData[prevData.length - 1].time.split(":")[0]);
        const newTemp = 20 + Math.random() * 15;
        const newHumidity = 40 + Math.random() * 40;
        const newRisk = (newTemp / 35) * 50 + ((100 - newHumidity) / 100) * 50;
        
        newData.push({
          time: `${lastTime + 1}:00`,
          temperature: newTemp,
          humidity: newHumidity,
          risk: newRisk,
        });
        
        setCurrentRisk(newRisk);
        return newData;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getRiskLevel = () => {
    if (currentRisk > 60) return { text: "High", color: "text-destructive", bg: "bg-destructive/10" };
    if (currentRisk > 40) return { text: "Moderate", color: "text-warning", bg: "bg-warning/10" };
    return { text: "Low", color: "text-success", bg: "bg-success/10" };
  };

  const riskLevel = getRiskLevel();

  return (
    <section className="py-20 bg-gradient-earth">
      <div className="container px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-full bg-primary/10 border border-primary/20">
            <Activity className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-sm font-medium text-primary">Live Simulation</span>
          </div>
          <h2 className="text-4xl font-bold text-foreground mb-4">Real-Time Monitoring</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Simulated environmental data updates showing dynamic risk assessment
          </p>
        </div>

        <div className="max-w-6xl mx-auto space-y-6">
          <div className="grid md:grid-cols-3 gap-4">
            <Card className={`${riskLevel.bg} border-2 shadow-medium`}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Current Risk</p>
                    <p className={`text-3xl font-bold ${riskLevel.color}`}>{riskLevel.text}</p>
                  </div>
                  {currentRisk > 50 ? (
                    <TrendingUp className={`w-8 h-8 ${riskLevel.color}`} />
                  ) : (
                    <TrendingDown className="w-8 h-8 text-success" />
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-medium">
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground mb-1">Temperature</p>
                <p className="text-3xl font-bold text-secondary">
                  {data[data.length - 1]?.temperature.toFixed(1)}°C
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-medium">
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground mb-1">Humidity</p>
                <p className="text-3xl font-bold text-primary">
                  {data[data.length - 1]?.humidity.toFixed(1)}%
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle>Environmental Trends</CardTitle>
              <CardDescription>Last 10 data points updated every 3 seconds</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="time" 
                    tick={{ fill: 'hsl(var(--foreground))' }}
                  />
                  <YAxis tick={{ fill: 'hsl(var(--foreground))' }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="temperature" 
                    stroke="hsl(28, 85%, 55%)" 
                    strokeWidth={2}
                    dot={{ fill: "hsl(28, 85%, 55%)" }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="humidity" 
                    stroke="hsl(145, 60%, 35%)" 
                    strokeWidth={2}
                    dot={{ fill: "hsl(145, 60%, 35%)" }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="risk" 
                    stroke="hsl(0, 72%, 51%)" 
                    strokeWidth={2}
                    dot={{ fill: "hsl(0, 72%, 51%)" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default RealtimeMonitoring;
