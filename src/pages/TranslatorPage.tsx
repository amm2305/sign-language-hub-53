import { motion } from "framer-motion";
import { Camera, CameraOff, RefreshCw, Hand } from "lucide-react";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";

const TranslatorPage = () => {
  const [cameraOn, setCameraOn] = useState(false);
  const [detectedSign, setDetectedSign] = useState<string | null>(null);

  const simulateDetection = () => {
    const signs = ["Hello", "Thank you", "Yes", "No", "Please", "Sorry", "Help", "Love"];
    setDetectedSign(signs[Math.floor(Math.random() * signs.length)]);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">Real-Time Translator</h1>
          <p className="text-muted-foreground">Use your camera to detect and translate sign language</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Camera feed */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card rounded-2xl border border-border overflow-hidden shadow-card"
          >
            <div className="aspect-video bg-foreground/5 flex items-center justify-center relative">
              {cameraOn ? (
                <div className="absolute inset-0 bg-foreground/90 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto rounded-full border-4 border-primary border-t-transparent animate-spin mb-4" />
                    <p className="text-primary-foreground font-medium">Camera Active</p>
                    <p className="text-primary-foreground/60 text-sm">Show a sign to translate</p>
                  </div>
                </div>
              ) : (
                <div className="text-center p-8">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-muted flex items-center justify-center mb-4">
                    <Camera className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <p className="font-display font-semibold text-foreground mb-1">Camera Off</p>
                  <p className="text-sm text-muted-foreground">Enable camera to start translating</p>
                </div>
              )}
            </div>
            <div className="p-4 flex gap-3">
              <Button
                onClick={() => setCameraOn(!cameraOn)}
                variant={cameraOn ? "destructive" : "default"}
                className="flex-1"
              >
                {cameraOn ? <CameraOff className="w-4 h-4 mr-2" /> : <Camera className="w-4 h-4 mr-2" />}
                {cameraOn ? "Stop Camera" : "Start Camera"}
              </Button>
              <Button
                onClick={simulateDetection}
                variant="outline"
                className="flex-1"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Simulate
              </Button>
            </div>
          </motion.div>

          {/* Translation output */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-card rounded-2xl border border-border p-6 shadow-card flex flex-col"
          >
            <h2 className="font-display text-lg font-semibold text-card-foreground mb-4">Translation Output</h2>
            <div className="flex-1 flex items-center justify-center min-h-[200px]">
              {detectedSign ? (
                <motion.div
                  key={detectedSign}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center"
                >
                  <div className="w-24 h-24 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                    <Hand className="w-12 h-12 text-primary" />
                  </div>
                  <p className="font-display text-4xl font-bold text-foreground mb-2">{detectedSign}</p>
                  <p className="text-sm text-muted-foreground">Detected sign language gesture</p>
                </motion.div>
              ) : (
                <div className="text-center">
                  <p className="text-muted-foreground">No sign detected yet</p>
                  <p className="text-sm text-muted-foreground/60 mt-1">Start camera or simulate a detection</p>
                </div>
              )}
            </div>

            {/* History */}
            <div className="mt-4 pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground font-medium mb-2 uppercase tracking-wider">Recent Detections</p>
              <div className="flex gap-2 flex-wrap">
                {["Hello", "Thank you", "Yes"].map((sign) => (
                  <span key={sign} className="px-3 py-1.5 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium">
                    {sign}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TranslatorPage;
