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

    const video = videoRef.current;
    if (video) {
      video.pause();
      video.srcObject = null;
    }

    setCameraOn(false);
    setStarting(false);
    setVideoReady(false);
    setError(null);
  };

  const attachStreamToVideo = async (stream: MediaStream) => {
    const video = videoRef.current;
    if (!video) return;

    video.srcObject = stream;

    const playVideo = async () => {
      try {
        await video.play();
        setVideoReady(true);
      } catch {
        setError("Camera started, but the live preview could not play. Please tap Start Camera again.");
      }
    };

    if (video.readyState >= 1) {
      await playVideo();
      return;
    }

    video.onloadedmetadata = () => {
      video.onloadedmetadata = null;
      void playVideo();
    };
  };

  const startCamera = async () => {
    if (starting) return;

    setError(null);
    setStarting(true);
    setVideoReady(false);

    try {
      if (!navigator.mediaDevices?.getUserMedia) {
        throw new Error("Camera API not supported in this browser");
      }

      let stream: MediaStream;

      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: { ideal: "user" },
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
          audio: false,
        });
      } catch (primaryError: any) {
        if (["NotAllowedError", "NotFoundError", "NotReadableError", "SecurityError"].includes(primaryError?.name)) {
          throw primaryError;
        }

        stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      }

      streamRef.current = stream;
      setCameraOn(true);
      await attachStreamToVideo(stream);
    } catch (err: any) {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }

      setCameraOn(false);
      setVideoReady(false);

      const msg =
        err?.name === "NotAllowedError"
          ? "Camera permission denied. Please allow access in your browser."
          : err?.name === "NotFoundError"
            ? "No camera detected on this device."
            : err?.name === "NotReadableError"
              ? "Your camera is already in use by another app."
              : err?.message || "Could not start camera.";

      setError(msg);
      toast({ title: "Camera error", description: msg, variant: "destructive" });
    } finally {
      setStarting(false);
    }
  };

  useEffect(() => {
    if (!cameraOn || !streamRef.current || !videoRef.current) return;

    if (videoRef.current.srcObject !== streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
    }

    if (videoRef.current.paused) {
      void videoRef.current.play().then(() => setVideoReady(true)).catch(() => null);
    }
  }, [cameraOn]);

  useEffect(() => {
    return () => stopCamera();
  }, []);

  const simulateDetection = () => {
    const signs = ["Hello", "Thank you", "Yes", "No", "Please", "Sorry", "Help", "Love"];
    const pick = signs[Math.floor(Math.random() * signs.length)];
    setDetectedSign(pick);
    setHistory((current) => [pick, ...current.filter((sign) => sign !== pick)].slice(0, 6));
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
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card rounded-2xl border border-border overflow-hidden shadow-card"
          >
            <div className="aspect-video bg-foreground/5 flex items-center justify-center relative">
              <video
                ref={videoRef}
                playsInline
                muted
                autoPlay
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
                  cameraOn && videoReady ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
                style={{ transform: "scaleX(-1)" }}
              />

              {!cameraOn && !starting && (
                <div className="text-center p-8 relative z-10">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-muted flex items-center justify-center mb-4">
                    <Camera className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <p className="font-display font-semibold text-foreground mb-1">Camera Off</p>
                  <p className="text-sm text-muted-foreground">Enable camera to start translating</p>
                </div>
              )}

              {(starting || (cameraOn && !videoReady && !error)) && (
                <div className="absolute inset-0 bg-background/60 backdrop-blur-sm flex items-center justify-center z-10">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto rounded-full border-4 border-primary border-t-transparent animate-spin mb-3" />
                    <p className="text-sm text-foreground">Preparing live preview…</p>
                  </div>
                </div>
              )}

              {cameraOn && (
                <div className="absolute top-3 left-3 z-20 flex items-center gap-2 px-3 py-1 rounded-full bg-background/80 backdrop-blur border border-border">
                  <span className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
                  <span className="text-xs font-medium text-foreground">LIVE</span>
                </div>
              )}
            </div>

            {error && (
              <div className="px-4 pt-3 flex items-start gap-2 text-sm text-destructive">
                <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="p-4 flex gap-3">
              <Button
                onClick={cameraOn ? stopCamera : startCamera}
                variant={cameraOn ? "destructive" : "default"}
                className="flex-1"
                disabled={starting}
              >
                {cameraOn ? <CameraOff className="w-4 h-4 mr-2" /> : <Camera className="w-4 h-4 mr-2" />}
                {cameraOn ? "Stop Camera" : starting ? "Starting…" : "Start Camera"}
              </Button>
              <Button onClick={simulateDetection} variant="outline" className="flex-1">
                <RefreshCw className="w-4 h-4 mr-2" />
                Simulate
              </Button>
            </div>
          </motion.div>

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

            <div className="mt-4 pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground font-medium mb-2 uppercase tracking-wider">Recent Detections</p>
              <div className="flex gap-2 flex-wrap">
                {(history.length ? history : ["Hello", "Thank you", "Yes"]).map((sign) => (
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
