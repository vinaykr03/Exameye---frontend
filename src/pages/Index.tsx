import { Shield, User, Lock, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex flex-col">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shadow-lg">
            <Shield className="w-7 h-7 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-foreground tracking-tight">ExamEye Shield</h1>
            <p className="text-sm text-muted-foreground font-medium">AI-Powered Exam Proctoring System</p>
          </div>
        </div>
      </header>

      {/* Main Content - Portal Selection */}
      <main className="flex-1 flex items-center justify-center container mx-auto px-4 py-12">
        <div className="w-full max-w-4xl">
          {/* Welcome Message */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Welcome to ExamEye Shield
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Select your portal to continue
            </p>
          </div>

          {/* Portal Selection Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Student Portal */}
            <Card className="border-2 hover:border-primary transition-all duration-300 hover:shadow-xl cursor-pointer group">
              <CardContent className="p-8">
                <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                  <User className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-center">Student Portal</h3>
                <p className="text-muted-foreground mb-6 text-center">
                  Register and take your proctored exam
                </p>
                <Button 
                  className="w-full group-hover:scale-105 transition-transform" 
                  size="lg"
                  onClick={() => navigate("/student")}
                >
                  Go to Student Portal
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            {/* Admin Portal */}
            <Card className="border-2 hover:border-secondary transition-all duration-300 hover:shadow-xl cursor-pointer group">
              <CardContent className="p-8">
                <div className="w-20 h-20 rounded-2xl bg-secondary/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-secondary/20 transition-colors">
                  <Lock className="w-10 h-10 text-secondary" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-center">Admin Portal</h3>
                <p className="text-muted-foreground mb-6 text-center">
                  Monitor exams and manage system
                </p>
                <Button 
                  className="w-full bg-secondary hover:bg-secondary/90 group-hover:scale-105 transition-transform" 
                  size="lg"
                  onClick={() => navigate("/admin")}
                >
                  Go to Admin Portal
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-card/50 backdrop-blur-sm py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2024 ExamEye Shield - Secure Exam Proctoring System</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
