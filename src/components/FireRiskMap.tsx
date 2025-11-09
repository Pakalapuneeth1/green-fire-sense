import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Circle, Popup, useMap } from "react-leaflet";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, AlertTriangle, CheckCircle, AlertCircle } from "lucide-react";
import "leaflet/dist/leaflet.css";
import type { LatLngExpression } from "leaflet";

interface ForestRegion {
  id: number;
  name: string;
  position: LatLngExpression;
  risk: "low" | "moderate" | "high";
  temperature: number;
  humidity: number;
  lastUpdated: string;
}

const MapUpdater = ({ regions }: { regions: ForestRegion[] }) => {
  const map = useMap();
  
  useEffect(() => {
    if (regions.length > 0) {
      const bounds = regions.map(r => r.position as [number, number]);
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [regions, map]);
  
  return null;
};

const FireRiskMap = () => {
  const [regions, setRegions] = useState<ForestRegion[]>([
    {
      id: 1,
      name: "Sequoia National Forest",
      position: [36.4864, -118.5658],
      risk: "high",
      temperature: 35,
      humidity: 25,
      lastUpdated: "2 mins ago",
    },
    {
      id: 2,
      name: "Yosemite Valley",
      position: [37.8651, -119.5383],
      risk: "moderate",
      temperature: 28,
      humidity: 45,
      lastUpdated: "5 mins ago",
    },
    {
      id: 3,
      name: "Redwood Forest",
      position: [41.2132, -124.0046],
      risk: "low",
      temperature: 22,
      humidity: 70,
      lastUpdated: "1 min ago",
    },
    {
      id: 4,
      name: "Angeles National Forest",
      position: [34.3705, -118.1510],
      risk: "high",
      temperature: 38,
      humidity: 20,
      lastUpdated: "3 mins ago",
    },
    {
      id: 5,
      name: "Sierra National Forest",
      position: [37.2283, -119.2095],
      risk: "moderate",
      temperature: 30,
      humidity: 40,
      lastUpdated: "4 mins ago",
    },
    {
      id: 6,
      name: "Tahoe National Forest",
      position: [39.4553, -120.6453],
      risk: "low",
      temperature: 24,
      humidity: 65,
      lastUpdated: "2 mins ago",
    },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRegions(prev => prev.map(region => {
        const tempChange = (Math.random() - 0.5) * 3;
        const humidityChange = (Math.random() - 0.5) * 5;
        const newTemp = Math.max(15, Math.min(40, region.temperature + tempChange));
        const newHumidity = Math.max(15, Math.min(85, region.humidity + humidityChange));
        
        const riskScore = (newTemp / 40) * 50 + ((100 - newHumidity) / 100) * 50;
        let newRisk: "low" | "moderate" | "high";
        
        if (riskScore > 60) {
          newRisk = "high";
        } else if (riskScore > 35) {
          newRisk = "moderate";
        } else {
          newRisk = "low";
        }
        
        return {
          ...region,
          temperature: parseFloat(newTemp.toFixed(1)),
          humidity: parseFloat(newHumidity.toFixed(1)),
          risk: newRisk,
          lastUpdated: "Just now",
        };
      }));
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "high":
        return "#ef4444"; // destructive red
      case "moderate":
        return "#eab308"; // warning yellow
      case "low":
        return "#22c55e"; // success green
      default:
        return "#22c55e";
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case "high":
        return <AlertTriangle className="w-4 h-4" />;
      case "moderate":
        return <AlertCircle className="w-4 h-4" />;
      case "low":
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <MapPin className="w-4 h-4" />;
    }
  };

  const getRiskBadgeVariant = (risk: string) => {
    switch (risk) {
      case "high":
        return "destructive";
      case "moderate":
        return "secondary";
      case "low":
        return "default";
      default:
        return "default";
    }
  };

  return (
    <section className="py-20 bg-background">
      <div className="container px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-full bg-primary/10 border border-primary/20">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Live Fire Risk Zones</span>
          </div>
          <h2 className="text-4xl font-bold text-foreground mb-4">Interactive Fire Risk Map</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real-time visualization of forest regions with color-coded fire risk indicators
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          <div className="lg:col-span-2">
            <Card className="shadow-medium overflow-hidden">
              <CardContent className="p-0">
                <div className="h-[600px] w-full relative">
                  <MapContainer
                    center={[37.5, -119.5]}
                    zoom={6}
                    className="h-full w-full"
                    style={{ background: "hsl(var(--muted))" }}
                  >
                    <>
                      <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                      <MapUpdater regions={regions} />
                      {regions.map((region) => (
                        <Circle
                          key={region.id}
                          center={region.position}
                          radius={15000}
                          pathOptions={{
                            color: getRiskColor(region.risk),
                            fillColor: getRiskColor(region.risk),
                            fillOpacity: 0.5,
                            weight: 2,
                          }}
                        >
                          <Popup>
                            <div className="p-2 min-w-[200px]">
                              <h3 className="font-semibold text-base mb-2">{region.name}</h3>
                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <Badge variant={getRiskBadgeVariant(region.risk)} className="capitalize">
                                    {region.risk} Risk
                                  </Badge>
                                </div>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                  <div>
                                    <p className="text-muted-foreground text-xs">Temperature</p>
                                    <p className="font-semibold">{region.temperature}°C</p>
                                  </div>
                                  <div>
                                    <p className="text-muted-foreground text-xs">Humidity</p>
                                    <p className="font-semibold">{region.humidity}%</p>
                                  </div>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                  Updated {region.lastUpdated}
                                </p>
                              </div>
                            </div>
                          </Popup>
                        </Circle>
                      ))}
                    </>
                  </MapContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="text-lg">Risk Legend</CardTitle>
                <CardDescription>Color-coded risk zones</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-destructive/10 border border-destructive/30">
                  <div className="w-4 h-4 rounded-full bg-destructive" />
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-destructive">High Risk</p>
                    <p className="text-xs text-muted-foreground">Immediate attention required</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-warning/10 border border-warning/30">
                  <div className="w-4 h-4 rounded-full bg-warning" />
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-warning">Moderate Risk</p>
                    <p className="text-xs text-muted-foreground">Monitor conditions closely</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-success/10 border border-success/30">
                  <div className="w-4 h-4 rounded-full bg-success" />
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-success">Low Risk</p>
                    <p className="text-xs text-muted-foreground">Conditions are favorable</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="text-lg">Active Regions</CardTitle>
                <CardDescription>Click markers for details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 max-h-[400px] overflow-y-auto">
                {regions.map((region) => (
                  <div
                    key={region.id}
                    className="flex items-center gap-3 p-3 rounded-lg bg-muted hover:bg-muted/70 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-center w-8 h-8 rounded-full" 
                         style={{ backgroundColor: `${getRiskColor(region.risk)}20`, color: getRiskColor(region.risk) }}>
                      {getRiskIcon(region.risk)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm truncate">{region.name}</p>
                      <p className="text-xs text-muted-foreground">{region.lastUpdated}</p>
                    </div>
                    <Badge variant={getRiskBadgeVariant(region.risk)} className="capitalize text-xs">
                      {region.risk}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FireRiskMap;
