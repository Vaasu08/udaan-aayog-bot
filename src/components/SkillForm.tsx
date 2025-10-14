import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface SkillFormProps {
  onSubmit: (data: FormData) => void;
}

export interface FormData {
  skill: string;
  location: string;
  budget: number;
}

const SkillForm = ({ onSubmit }: SkillFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    skill: "",
    location: "",
    budget: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card className="shadow-[var(--shadow-card)] border-2">
      <CardHeader>
        <CardTitle>Tell Us About Yourself</CardTitle>
        <CardDescription>Help us find the perfect business opportunity for you</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="skill">Your Primary Skill</Label>
            <Select onValueChange={(value) => setFormData({ ...formData, skill: value })}>
              <SelectTrigger id="skill">
                <SelectValue placeholder="Select your skill" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tailoring">Tailoring</SelectItem>
                <SelectItem value="cooking">Cooking</SelectItem>
                <SelectItem value="management">Management</SelectItem>
                <SelectItem value="handicrafts">Handicrafts</SelectItem>
                <SelectItem value="agriculture">Agriculture</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Your State</Label>
            <Select onValueChange={(value) => setFormData({ ...formData, location: value })}>
              <SelectTrigger id="location">
                <SelectValue placeholder="Select your state" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="MP">Madhya Pradesh</SelectItem>
                <SelectItem value="UP">Uttar Pradesh</SelectItem>
                <SelectItem value="MH">Maharashtra</SelectItem>
                <SelectItem value="RJ">Rajasthan</SelectItem>
                <SelectItem value="Bihar">Bihar</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="budget">Available Budget (₹)</Label>
            <Input
              id="budget"
              type="number"
              placeholder="Enter amount in rupees"
              min="0"
              value={formData.budget || ""}
              onChange={(e) => setFormData({ ...formData, budget: Number(e.target.value) })}
            />
          </div>

          <Button type="submit" variant="hero" size="lg" className="w-full">
            Find My Opportunities
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SkillForm;
