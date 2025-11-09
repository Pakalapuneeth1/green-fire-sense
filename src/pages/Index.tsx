import Hero from "@/components/Hero";
import PredictionForm from "@/components/PredictionForm";
import DataVisualization from "@/components/DataVisualization";
import RealtimeMonitoring from "@/components/RealtimeMonitoring";
import CSVUpload from "@/components/CSVUpload";
import LearnMore from "@/components/LearnMore";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <PredictionForm />
      <DataVisualization />
      <RealtimeMonitoring />
      <CSVUpload />
      <LearnMore />
      <Footer />
    </div>
  );
};

export default Index;
