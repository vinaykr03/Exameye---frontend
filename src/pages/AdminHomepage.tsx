import { Shield, Lock, ArrowRight, BarChart3, Users, FileText, Eye, Activity, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const AdminHomepage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Eye,
      title: "Live Monitoring",
      description: "Real-time student activity tracking and violation detection",
      color: "text-secondary",
      bgColor: "bg-secondary/10"
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "Comprehensive insights and performance metrics",
      color: "text-secondary",
      bgColor: "bg-secondary/10"
    },
    {
      icon: FileText,
      title: "Detailed Reports",
      description: "Generate comprehensive PDF and CSV reports",
      color: "text-secondary",
      bgColor: "bg-secondary/10"
    },
    {
      icon: Users,
      title: "Student Management",
      description: "Manage subjects, exams, and student data",
      color: "text-secondary",
      bgColor: "bg-secondary/10"
    },
    {
      icon: Activity,
      title: "Real-Time Alerts",
      description: "Instant notifications for violations and events",
      color: "text-secondary",
      bgColor: "bg-secondary/10"
    },
    {
      icon: TrendingUp,
      title: "Performance Metrics",
      description: "Track exam statistics and student performance",
      color: "text-secondary",
      bgColor: "bg-secondary/10"
    }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center shadow-lg">
                <Shield className="w-7 h-7 text-secondary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-extrabold text-foreground tracking-tight">ExamEye Shield</h1>
                <p className="text-sm text-muted-foreground font-medium">Admin Portal</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="w-full max-w-6xl">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-28 h-28 rounded-3xl bg-secondary/10 mb-8 ring-8 ring-secondary/5">
              <Lock className="w-14 h-14 text-secondary" />
            </div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6">
              <span className="bg-gradient-to-r from-secondary to-secondary/70 bg-clip-text text-transparent">
                Administrator Portal
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Comprehensive exam management, real-time monitoring, and detailed analytics. Take full control of your examination system.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card 
                  key={index}
                  className="group border hover:border-secondary/50 transition-all duration-300 hover:shadow-lg hover:shadow-secondary/10 hover:-translate-y-1"
                >
                  <CardContent className="p-6">
                    <div className={`${feature.bgColor} p-4 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300 inline-flex`}>
                      <Icon className={`w-6 h-6 ${feature.color}`} />
                    </div>
                    <h4 className="font-semibold text-lg mb-2">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* CTA Section */}
          <Card className="border-2 border-secondary/20 bg-secondary/5">
            <CardContent className="p-10 text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Lock className="w-5 h-5 text-secondary" />
                <span className="text-sm font-semibold text-secondary uppercase tracking-wider">
                  Secure Access
                </span>
              </div>
              <h3 className="text-3xl font-bold mb-3">
                Access Admin Dashboard
              </h3>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Sign in with your credentials to manage exams, monitor students, and view analytics
              </p>
              <Button 
                className="group relative w-full sm:w-auto min-w-[240px] h-14 text-base font-semibold bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-lg shadow-secondary/30 hover:shadow-xl hover:shadow-secondary/40 transition-all duration-300 hover:scale-105" 
                size="lg"
                onClick={() => navigate("/login")}
              >
                <span className="flex items-center justify-center gap-2">
                  Admin Login
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-card/50 backdrop-blur-sm py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground font-medium">
              © 2025 ExamEye Shield - Admin Portal
            </p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Shield className="w-4 h-4" />
              <span>Enterprise Exam Management System</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AdminHomepage;
