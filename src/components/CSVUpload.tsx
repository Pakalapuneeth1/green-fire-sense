import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Upload, Download, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CSVResult {
  temperature: number;
  humidity: number;
  windSpeed: number;
  rainfall: number;
  risk: string;
  probability: number;
}

const CSVUpload = () => {
  const { toast } = useToast();
  const [results, setResults] = useState<CSVResult[]>([]);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    
    try {
      // Simulate CSV processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate mock results
      const mockResults: CSVResult[] = Array.from({ length: 5 }, () => {
        const temp = 20 + Math.random() * 20;
        const humidity = 30 + Math.random() * 50;
        const windSpeed = 5 + Math.random() * 20;
        const rainfall = Math.random() * 15;
        const riskScore = (temp * 0.3) + ((100 - humidity) * 0.3) + (windSpeed * 0.2) - (rainfall * 0.2);
        
        let risk: string;
        let probability: number;
        
        if (riskScore > 50) {
          risk = "High Risk";
          probability = 0.8 + Math.random() * 0.15;
        } else if (riskScore > 30) {
          risk = "Moderate Risk";
          probability = 0.5 + Math.random() * 0.2;
        } else {
          risk = "Low Risk";
          probability = 0.15 + Math.random() * 0.2;
        }
        
        return {
          temperature: parseFloat(temp.toFixed(1)),
          humidity: parseFloat(humidity.toFixed(1)),
          windSpeed: parseFloat(windSpeed.toFixed(1)),
          rainfall: parseFloat(rainfall.toFixed(1)),
          risk,
          probability: parseFloat(probability.toFixed(3)),
        };
      });
      
      setResults(mockResults);
      toast({
        title: "CSV Processed",
        description: `${mockResults.length} predictions completed successfully.`,
      });
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: "Please check your CSV format and try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const downloadSample = () => {
    const csvContent = "temperature,humidity,windSpeed,rainfall\n25,50,10,5\n30,40,15,3\n20,70,8,10";
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sample_data.csv";
    a.click();
  };

  const getRiskColor = (risk: string) => {
    if (risk === "High Risk") return "text-destructive font-semibold";
    if (risk === "Moderate Risk") return "text-warning font-semibold";
    return "text-success font-semibold";
  };

  return (
    <section className="py-20 bg-background">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">Batch Prediction</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Upload CSV files for bulk predictions and analysis
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle>Upload CSV File</CardTitle>
              <CardDescription>
                File should contain columns: temperature, humidity, windSpeed, rainfall
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    type="file"
                    accept=".csv"
                    onChange={handleFileUpload}
                    disabled={loading}
                    className="cursor-pointer"
                  />
                </div>
                <Button
                  variant="outline"
                  onClick={downloadSample}
                  className="whitespace-nowrap"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Sample CSV
                </Button>
              </div>
              
              {loading && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Upload className="h-4 w-4 animate-pulse" />
                  Processing your file...
                </div>
              )}
            </CardContent>
          </Card>

          {results.length > 0 && (
            <Card className="shadow-medium animate-in fade-in slide-in-from-bottom duration-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Prediction Results
                </CardTitle>
                <CardDescription>{results.length} records processed</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Temp (°C)</TableHead>
                        <TableHead>Humidity (%)</TableHead>
                        <TableHead>Wind (km/h)</TableHead>
                        <TableHead>Rain (mm)</TableHead>
                        <TableHead>Risk Level</TableHead>
                        <TableHead>Probability</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {results.map((result, index) => (
                        <TableRow key={index}>
                          <TableCell>{result.temperature}</TableCell>
                          <TableCell>{result.humidity}</TableCell>
                          <TableCell>{result.windSpeed}</TableCell>
                          <TableCell>{result.rainfall}</TableCell>
                          <TableCell className={getRiskColor(result.risk)}>
                            {result.risk}
                          </TableCell>
                          <TableCell>{(result.probability * 100).toFixed(1)}%</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
};

export default CSVUpload;
