import { motion } from "framer-motion";
import { Camera, CameraOff, RefreshCw, Hand, AlertCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const TranslatorPage = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [cameraOn, setCameraOn] = useState(false);
  const [starting, setStarting] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [detectedSign, setDetectedSign] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.srcObject = null;
    }

    setCameraOn(false);
    setStarting(false);
    setVideoReady(false);
    setError(null);
  };

  const startCamera = async () => {
    if (starting) return;

    setError(null);
    setStarting(true);
    setVideoReady(false);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;

        videoRef.current.onloadedmetadata = async () => {
          try {
            await videoRef.current?.play();
            setVideoReady(true);
          } catch {
            setError("Camera started but video cannot play.");
          }
        };
      }

      setCameraOn(true);
    } catch (err: any) {
      setError(err.message || "Camera error");
      toast({
        title: "Camera error",
        description: err.message,
        variant: "destructive",
      });
      setCameraOn(false);
    } finally {
      setStarting(false);
    }
  };

  useEffect(() => {
    return () => stopCamera();
  }, []);

  const simulateDetection = () => {
    const signs = ["Hello", "Thank you", "Yes", "No", "Please", "Sorry", "Help", "Love"];
    const pick = signs[Math.floor(Math.random() * signs.length)];

    setDetectedSign(pick);
    setHistory((prev) => [pick, ...prev.slice(0, 5)]);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-3xl font-bold mb-2">Real-Time Translator</h1>
          <p className="text-muted-foreground">
            Use your camera to detect and translate sign language
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mt-8">
          {/* CAMERA */}
          <div className="bg-card rounded-2xl border overflow-hidden shadow-card">
            <div className="aspect-video bg-black relative flex items-center justify-center">
              <video
                ref={videoRef}
                playsInline
                muted
                autoPlay
                className={`w-full h-full object-cover ${cameraOn ? "block" : "hidden"}`}
              />

              {!cameraOn && (
                <div className="text-center p-8">
                  <Camera className="w-10 h-10 mx-auto mb-3 text-muted-foreground" />
                  <p className="font-semibold">Camera Off</p>
                  <p className="text-sm text-muted-foreground">
                    Start camera to begin translation
                  </p>
                </div>
              )}

              {starting && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </div>

            {error && (
              <div className="p-3 text-red-500 flex items-center gap-2 text-sm">
                <AlertCircle className="w-4 h-4" />
                {error}
              </div>
            )}

            <div className="p-4 flex gap-3">
              <Button
                onClick={cameraOn ? stopCamera : startCamera}
                className="flex-1"
                variant={cameraOn ? "destructive" : "default"}
                disabled={starting}
              >
                {cameraOn ? <CameraOff className="w-4 h-4 mr-2" /> : <Camera className="w-4 h-4 mr-2" />}
                {cameraOn ? "Stop Camera" : starting ? "Starting..." : "Start Camera"}
              </Button>

              <Button onClick={simulateDetection} variant="outline" className="flex-1">
                <RefreshCw className="w-4 h-4 mr-2" />
                Simulate
              </Button>
            </div>
          </div>

          {/* OUTPUT */}
          <div className="bg-card rounded-2xl border p-6 shadow-card">
            <h2 className="font-semibold mb-4">Translation Output</h2>

            {detectedSign ? (
              <div className="text-center">
                <Hand className="w-12 h-12 mx-auto mb-3 text-primary" />
                <p className="text-3xl font-bold">{detectedSign}</p>
              </div>
            ) : (
              <p className="text-muted-foreground text-center">
                No sign detected yet
              </p>
            )}

            <div className="mt-6">
              <p className="text-xs uppercase text-muted-foreground mb-2">
                Recent
              </p>

              <div className="flex flex-wrap gap-2">
                {(history.length ? history : ["Hello", "Thank you", "Yes"]).map((s) => (
                  <span
                    key={s}
                    className="px-3 py-1 text-sm bg-secondary rounded-lg"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TranslatorPage;