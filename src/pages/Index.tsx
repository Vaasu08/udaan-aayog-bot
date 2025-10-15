import { useState } from "react";
import { Sparkles, Target, TrendingUp } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";
import SkillForm, { FormData } from "@/components/SkillForm";
import BusinessCard from "@/components/BusinessCard";
import KnittingAnimation from "@/components/KnittingAnimation";
import { businessData, upskillSuggestions } from "@/data/businessData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  const [recommendations, setRecommendations] = useState<typeof businessData>([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState("");

  const handleFormSubmit = (formData: FormData) => {
    // Filter businesses based on skill and budget
    const filtered = businessData
      .filter(b => 
        b.skill === formData.skill && 
        b.investment <= formData.budget
      )
      .sort((a, b) => b.monthlyIncome - a.monthlyIncome)
      .slice(0, 3);

    setRecommendations(filtered);
    setSelectedSkill(formData.skill);
    setShowResults(true);
  };

  const handleReset = () => {
    setShowResults(false);
    setRecommendations([]);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section 
        className="relative min-h-[600px] flex items-center justify-center bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(30, 20, 10, 0.85), rgba(140, 60, 40, 0.75)), url(${heroImage})`
        }}
      >
        <KnittingAnimation />
        <div className="container mx-auto px-4 py-20 text-center text-primary-foreground relative z-10">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 backdrop-blur-sm border border-primary-foreground/20">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">AI-Powered Income Optimizer</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Transform Your Skills Into <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Income</span>
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-2xl mx-auto">
              Discover personalized business opportunities designed for rural women entrepreneurs. Get data-backed recommendations in seconds.
            </p>
            <div className="flex flex-wrap gap-4 justify-center pt-6">
              <Button 
                variant="hero" 
                size="lg"
                onClick={() => document.getElementById('form-section')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Start Your Journey
              </Button>
              <Button variant="outline" size="lg" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="border-2 hover:border-primary/50 transition-all">
              <CardHeader>
                <Target className="w-12 h-12 text-primary mb-4" />
                <CardTitle>Personalized Matches</CardTitle>
                <CardDescription>
                  AI analyzes your skills, location, and budget to find perfect opportunities
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-2 hover:border-accent/50 transition-all">
              <CardHeader>
                <TrendingUp className="w-12 h-12 text-accent mb-4" />
                <CardTitle>Profit Predictions</CardTitle>
                <CardDescription>
                  See realistic income estimates and breakeven timelines before you start
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-2 hover:border-secondary/50 transition-all">
              <CardHeader>
                <Sparkles className="w-12 h-12 text-secondary mb-4" />
                <CardTitle>Upskilling Paths</CardTitle>
                <CardDescription>
                  Get recommendations for courses that can boost your earning potential
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Form and Results Section */}
      <section id="form-section" className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          {!showResults ? (
            <SkillForm onSubmit={handleFormSubmit} />
          ) : (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold">Your Personalized Opportunities</h2>
                  <p className="text-muted-foreground mt-2">Top {recommendations.length} recommendations based on your profile</p>
                </div>
                <Button onClick={handleReset} variant="outline">
                  Start Over
                </Button>
              </div>

              {recommendations.length > 0 ? (
                <>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {recommendations.map((business, index) => (
                      <BusinessCard key={index} {...business} />
                    ))}
                  </div>

                  {/* Upskilling Section */}
                  <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5 border-2 border-secondary/30">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Sparkles className="w-6 h-6 text-secondary" />
                        Recommended Skills to Boost Your Income
                      </CardTitle>
                      <CardDescription>
                        Consider these courses to increase your earning potential
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {upskillSuggestions[selectedSkill]?.map((suggestion, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-secondary mt-1">•</span>
                            <span>{suggestion}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </>
              ) : (
                <Card className="p-12 text-center">
                  <CardContent>
                    <p className="text-lg text-muted-foreground mb-4">
                      No businesses match your current budget and skills.
                    </p>
                    <p className="mb-6">
                      Consider upskilling or increasing your budget to unlock more opportunities.
                    </p>
                    <Button onClick={handleReset} variant="hero">
                      Try Again
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Index;
