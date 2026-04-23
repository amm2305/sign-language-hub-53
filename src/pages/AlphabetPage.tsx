import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const handDescriptions: Record<string, string> = {
  A: "Make a fist with thumb resting on the side",
  B: "Flat hand, fingers together, thumb tucked in",
  C: "Curve fingers and thumb into a C shape",
  D: "Index finger up, others touch thumb",
  E: "Curl fingers down, thumb tucked under",
  F: "Thumb and index make circle, others up",
  G: "Index and thumb point sideways",
  H: "Index and middle finger point sideways",
  I: "Pinky finger extended, fist closed",
  J: "Pinky up, trace a J in the air",
  K: "Index up, middle up, thumb between",
  L: "L shape with index and thumb",
  M: "Three fingers over thumb in fist",
  N: "Two fingers over thumb in fist",
  O: "Fingers and thumb form an O",
  P: "K hand pointing downward",
  Q: "G hand pointing downward",
  R: "Cross index and middle finger",
  S: "Fist with thumb over fingers",
  T: "Thumb between index and middle",
  U: "Index and middle together, pointing up",
  V: "Peace sign / Victory",
  W: "Three fingers up, spread apart",
  X: "Index finger hooked / bent",
  Y: "Thumb and pinky extended (hang loose)",
  Z: "Index finger traces Z in the air",
};

const AlphabetPage = () => {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">ASL Alphabet</h1>
          <p className="text-muted-foreground">Tap a letter to see how to sign it</p>
        </motion.div>

        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-13 gap-3 mb-8">
          {alphabet.map((letter, i) => (
            <motion.button
              key={letter}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.02 }}
              onClick={() => setSelected(selected === letter ? null : letter)}
              className={`aspect-square rounded-xl font-display text-2xl font-bold flex items-center justify-center transition-all border ${
                selected === letter
                  ? "bg-primary text-primary-foreground border-primary shadow-elevated scale-110"
                  : "bg-card text-card-foreground border-border shadow-card hover:shadow-card-hover hover:scale-105"
              }`}
            >
              {letter}
            </motion.button>
          ))}
        </div>

        {selected && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-card rounded-2xl border border-border p-8 shadow-card">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-40 h-40 rounded-2xl bg-secondary flex items-center justify-center">
                  <span className="font-display text-7xl font-bold text-primary">{selected}</span>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                    Letter {selected}
                  </h2>
                  <p className="text-lg text-muted-foreground mb-4">
                    {handDescriptions[selected]}
                  </p>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-success/10 text-success text-sm font-medium">
                    💡 Practice this sign in the Translator module
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AlphabetPage;
