import { useState } from "react";
import { motion } from "framer-motion";
import { Hand, Mail, Lock, User, Eye, EyeOff, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = isLogin
        ? "http://localhost:5000/api/login"
        : "http://localhost:5000/api/register";

      const body = isLogin
        ? { email, password }
        : { name: fullName, email, password };

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      // ✅ LOGIN SUCCESS
      if (isLogin) {
        localStorage.setItem("token", data.token);

        // 🔥 STORE USER NAME (IMPORTANT)
        localStorage.setItem("userName", data.name || fullName);

        toast({ title: "Login successful" });

        navigate("/alphabet");
      } else {
        toast({ title: "Account created!" });
        setIsLogin(true);
      }

    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    toast({ title: "Not supported yet" });
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-hero items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white/20"
              style={{
                width: `${60 + i * 40}px`,
                height: `${60 + i * 40}px`,
                top: `${10 + i * 15}%`,
                left: `${5 + i * 12}%`,
              }}
            />
          ))}
        </div>

        <div className="relative text-center text-primary-foreground max-w-md">
          <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-8">
            <Hand className="w-10 h-10" />
          </div>

          <h2 className="font-display text-4xl font-bold mb-4">SignLingo</h2>

          <p className="text-lg opacity-90">
            Master sign language with interactive lessons, real-time translation, and track your progress every step of the way.
          </p>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            {isLogin ? "Welcome back" : "Create account"}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            )}

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>

            <Button type="submit" disabled={loading} className="w-full">
              {isLogin ? "Sign In" : "Create Account"}
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthPage;