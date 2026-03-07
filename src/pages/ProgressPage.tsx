import { motion } from "framer-motion";
import { Trophy, Flame, Target, BookOpen, TrendingUp } from "lucide-react";
import Navbar from "@/components/Navbar";

const stats = [
  { label: "Day Streak", value: "7", icon: Flame, color: "text-accent" },
  { label: "Signs Learned", value: "42", icon: Target, color: "text-primary" },
  { label: "Lessons Done", value: "12", icon: BookOpen, color: "text-success" },
  { label: "Total XP", value: "860", icon: Trophy, color: "text-warning" },
];

const weeklyData = [
  { day: "Mon", xp: 120 },
  { day: "Tue", xp: 80 },
  { day: "Wed", xp: 150 },
  { day: "Thu", xp: 60 },
  { day: "Fri", xp: 200 },
  { day: "Sat", xp: 90 },
  { day: "Sun", xp: 160 },
];

const maxXp = Math.max(...weeklyData.map((d) => d.xp));

const achievements = [
  { title: "First Sign", description: "Learned your first sign", earned: true },
  { title: "Alphabet Master", description: "Complete all 26 letters", earned: false, progress: 65 },
  { title: "Week Warrior", description: "7-day learning streak", earned: true },
  { title: "Quick Learner", description: "Complete 5 lessons in a day", earned: false, progress: 40 },
  { title: "Social Signer", description: "Learn 20 common phrases", earned: false, progress: 25 },
];

const ProgressPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">Your Progress</h1>
          <p className="text-muted-foreground">Track your sign language learning journey</p>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-2xl border border-border p-5 shadow-card text-center"
            >
              <stat.icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
              <p className="font-display text-3xl font-bold text-card-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Weekly activity chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card rounded-2xl border border-border p-6 shadow-card"
          >
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-5 h-5 text-primary" />
              <h2 className="font-display text-lg font-semibold text-card-foreground">Weekly Activity</h2>
            </div>
            <div className="flex items-end gap-3 h-48">
              {weeklyData.map((day, i) => (
                <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(day.xp / maxXp) * 100}%` }}
                    transition={{ delay: 0.3 + i * 0.05, duration: 0.8, ease: "easeOut" }}
                    className="w-full rounded-lg bg-gradient-hero min-h-[4px]"
                  />
                  <span className="text-xs text-muted-foreground font-medium">{day.day}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card rounded-2xl border border-border p-6 shadow-card"
          >
            <div className="flex items-center gap-2 mb-6">
              <Trophy className="w-5 h-5 text-warning" />
              <h2 className="font-display text-lg font-semibold text-card-foreground">Achievements</h2>
            </div>
            <div className="space-y-4">
              {achievements.map((a) => (
                <div key={a.title} className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    a.earned ? "bg-warning/10" : "bg-muted"
                  }`}>
                    <Trophy className={`w-5 h-5 ${a.earned ? "text-warning" : "text-muted-foreground"}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium ${a.earned ? "text-card-foreground" : "text-muted-foreground"}`}>
                      {a.title}
                    </p>
                    <p className="text-xs text-muted-foreground">{a.description}</p>
                    {!a.earned && a.progress !== undefined && (
                      <div className="h-1.5 rounded-full bg-muted mt-1.5 overflow-hidden">
                        <div className="h-full rounded-full bg-gradient-hero" style={{ width: `${a.progress}%` }} />
                      </div>
                    )}
                  </div>
                  {a.earned && <span className="text-xs font-medium text-success">✓ Earned</span>}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProgressPage;
