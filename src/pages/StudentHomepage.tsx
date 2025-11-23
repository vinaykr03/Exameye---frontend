import { Shield, User, ArrowRight, CheckCircle2, Lock, Monitor, Zap, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const StudentHomepage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Lock,
      title: "Secure Verification",
      description: "Advanced face recognition and environment validation for exam integrity",
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-950/20"
    },
    {
      icon: Monitor,
      title: "Real-Time Monitoring",
      description: "AI-powered proctoring system ensures fair and secure examination",
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-950/20"
    },
    {
      icon: Zap,
      title: "Quick Registration",
      description: "Streamlined registration process with your subject code",
      color: "text-amber-600",
      bgColor: "bg-amber-50 dark:bg-amber-950/20"
    },
    {
      icon: Clock,
      title: "System Compatibility",
      description: "Automatic system check ensures smooth exam experience",
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-950/20"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex flex-col">
      {/* Header */}
      <header className="border-b border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/20">
                  <Shield className="w-7 h-7 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-slate-900"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                  ExamEye Shield
                </h1>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Student Portal
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="w-full max-w-5xl">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-28 h-28 rounded-3xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20 mb-8 ring-8 ring-blue-500/5 dark:ring-blue-500/10">
              <User className="w-14 h-14 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                Welcome, Student
              </span>
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Begin your secure, proctored examination journey. Register with your subject code and ensure you have a stable internet connection.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid sm:grid-cols-2 gap-6 mb-12">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card 
                  key={index}
                  className="group border-slate-200/80 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 dark:hover:shadow-blue-500/20 hover:-translate-y-1"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`${feature.bgColor} p-3 rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className={`w-6 h-6 ${feature.color}`} />
                      </div>
                      <div className="flex-1 pt-1">
                        <h4 className="font-semibold text-lg mb-2 text-slate-900 dark:text-slate-100">
                          {feature.title}
                        </h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* CTA Section */}
          <Card className="border-2 border-blue-200/50 dark:border-blue-800/50 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20 shadow-xl shadow-blue-500/10 dark:shadow-blue-500/20">
            <CardContent className="p-10 text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                <span className="text-sm font-semibold text-green-700 dark:text-green-400 uppercase tracking-wider">
                  Ready to Begin
                </span>
              </div>
              <h3 className="text-3xl font-bold mb-3 text-slate-900 dark:text-slate-100">
                Start Your Exam Journey
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-md mx-auto">
                Click below to register and access your proctored examination
              </p>
              <Button 
                className="group relative w-full sm:w-auto min-w-[240px] h-14 text-base font-semibold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 hover:scale-105" 
                size="lg"
                onClick={() => navigate("/register")}
              >
                <span className="flex items-center justify-center gap-2">
                  Register & Login
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200/80 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
              © 2025 ExamEye Shield - Student Portal
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-500">
              <Shield className="w-4 h-4" />
              <span>Secure & Reliable Exam Proctoring</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default StudentHomepage;
