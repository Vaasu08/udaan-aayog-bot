import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, IndianRupee, Calendar } from "lucide-react";

interface BusinessCardProps {
  business: string;
  skill: string;
  investment: number;
  monthlyIncome: number;
  breakeven: number;
  skillLevel: string;
}

const BusinessCard = ({ business, skill, investment, monthlyIncome, breakeven, skillLevel }: BusinessCardProps) => {
  return (
    <Card className="hover:shadow-[var(--shadow-card)] transition-all duration-300 border-2 hover:border-primary/50">
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-xl">{business}</CardTitle>
          <Badge variant="secondary" className="ml-2">{skillLevel}</Badge>
        </div>
        <CardDescription>Required skill: {skill}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-3">
          <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
            <IndianRupee className="w-5 h-5 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Investment Required</p>
              <p className="font-semibold">₹{investment.toLocaleString()}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-3 rounded-lg bg-accent/10">
            <TrendingUp className="w-5 h-5 text-accent" />
            <div>
              <p className="text-xs text-muted-foreground">Monthly Income</p>
              <p className="font-semibold text-accent">₹{monthlyIncome.toLocaleString()}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-3 rounded-lg bg-secondary/10">
            <Calendar className="w-5 h-5 text-secondary" />
            <div>
              <p className="text-xs text-muted-foreground">Breakeven Period</p>
              <p className="font-semibold">{breakeven} weeks</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BusinessCard;
