import { motion } from "framer-motion";
import { Play, Clock, Star, Lock, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";

interface Lesson {
  id: number;
  title: string;
  description: string;
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  completed: boolean;
  locked: boolean;
}

const lessons: Lesson[] = [
  { id: 1, title: "Introduction to ASL", description: "Learn the basics of American Sign Language and its history", duration: "5 min", difficulty: "Beginner", completed: true, locked: false },
  { id: 2, title: "Fingerspelling A-M", description: "Master the first half of the ASL alphabet", duration: "8 min", difficulty: "Beginner", completed: true, locked: false },
  { id: 3, title: "Fingerspelling N-Z", description: "Complete the ASL alphabet with letters N through Z", duration: "8 min", difficulty: "Beginner", completed: false, locked: false },
  { id: 4, title: "Common Greetings", description: "Learn hello, goodbye, thank you, and more", duration: "10 min", difficulty: "Beginner", completed: false, locked: false },
  { id: 5, title: "Numbers 1-20", description: "Count from 1 to 20 in sign language", duration: "7 min", difficulty: "Beginner", completed: false, locked: false },
  { id: 6, title: "Family Signs", description: "Learn signs for family members", duration: "12 min", difficulty: "Intermediate", completed: false, locked: true },
  { id: 7, title: "Emotions & Feelings", description: "Express emotions through sign language", duration: "10 min", difficulty: "Intermediate", completed: false, locked: true },
  { id: 8, title: "Everyday Phrases", description: "Common phrases for daily conversations", duration: "15 min", difficulty: "Intermediate", completed: false, locked: true },
  { id: 9, title: "Question Words", description: "Who, what, where, when, why, how in ASL", duration: "10 min", difficulty: "Advanced", completed: false, locked: true },
];

const difficultyColors = {
  Beginner: "bg-success/10 text-success",
  Intermediate: "bg-warning/10 text-warning",
  Advanced: "bg-accent/10 text-accent",
};

const LessonsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">Video Lessons</h1>
          <p className="text-muted-foreground">Structured learning path from basics to fluency</p>
        </motion.div>

        <div className="space-y-4">
          {lessons.map((lesson, i) => (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`group bg-card rounded-2xl border border-border p-5 shadow-card transition-all ${
                lesson.locked ? "opacity-60" : "hover:shadow-card-hover cursor-pointer"
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                  lesson.completed
                    ? "bg-success/10"
                    : lesson.locked
                    ? "bg-muted"
                    : "bg-primary/10"
                }`}>
                  {lesson.completed ? (
                    <CheckCircle2 className="w-6 h-6 text-success" />
                  ) : lesson.locked ? (
                    <Lock className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <Play className="w-5 h-5 text-primary" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-display font-semibold text-card-foreground truncate">
                      {lesson.title}
                    </h3>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium shrink-0 ${difficultyColors[lesson.difficulty]}`}>
                      {lesson.difficulty}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{lesson.description}</p>
                </div>
                <div className="hidden sm:flex items-center gap-4 text-sm text-muted-foreground shrink-0">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" /> {lesson.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="w-4 h-4" /> {lesson.id * 10} XP
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LessonsPage;
