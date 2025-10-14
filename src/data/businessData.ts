export interface Business {
  business: string;
  skill: string;
  investment: number;
  monthlyIncome: number;
  breakeven: number;
  region: string;
  skillLevel: string;
}

export const businessData: Business[] = [
  {
    business: "Tailoring School Uniforms",
    skill: "tailoring",
    investment: 3000,
    monthlyIncome: 7200,
    breakeven: 3,
    region: "MP",
    skillLevel: "Beginner"
  },
  {
    business: "Custom Dress Making",
    skill: "tailoring",
    investment: 4500,
    monthlyIncome: 9500,
    breakeven: 4,
    region: "UP",
    skillLevel: "Intermediate"
  },
  {
    business: "Traditional Pickle Making",
    skill: "cooking",
    investment: 2500,
    monthlyIncome: 6000,
    breakeven: 2,
    region: "UP",
    skillLevel: "Beginner"
  },
  {
    business: "Homemade Snacks Business",
    skill: "cooking",
    investment: 3500,
    monthlyIncome: 8000,
    breakeven: 3,
    region: "MH",
    skillLevel: "Beginner"
  },
  {
    business: "Catering Services",
    skill: "cooking",
    investment: 5000,
    monthlyIncome: 12000,
    breakeven: 4,
    region: "MH",
    skillLevel: "Intermediate"
  },
  {
    business: "Dairy Product Reselling",
    skill: "management",
    investment: 4000,
    monthlyIncome: 8500,
    breakeven: 4,
    region: "MH",
    skillLevel: "Intermediate"
  },
  {
    business: "Local Grocery Store",
    skill: "management",
    investment: 6000,
    monthlyIncome: 10000,
    breakeven: 5,
    region: "MP",
    skillLevel: "Beginner"
  },
  {
    business: "Handmade Jewelry",
    skill: "handicrafts",
    investment: 2000,
    monthlyIncome: 5500,
    breakeven: 2,
    region: "RJ",
    skillLevel: "Beginner"
  },
  {
    business: "Embroidered Handicrafts",
    skill: "handicrafts",
    investment: 3000,
    monthlyIncome: 7000,
    breakeven: 3,
    region: "UP",
    skillLevel: "Intermediate"
  },
  {
    business: "Organic Vegetable Farming",
    skill: "agriculture",
    investment: 5000,
    monthlyIncome: 9000,
    breakeven: 5,
    region: "MP",
    skillLevel: "Beginner"
  },
  {
    business: "Mushroom Cultivation",
    skill: "agriculture",
    investment: 4000,
    monthlyIncome: 10000,
    breakeven: 4,
    region: "UP",
    skillLevel: "Intermediate"
  }
];

export const upskillSuggestions: Record<string, string[]> = {
  tailoring: [
    "Advanced Pattern Making Course",
    "Embroidery and Design Workshop",
    "Fashion Design Basics"
  ],
  cooking: [
    "Food Safety & Hygiene Certification",
    "Professional Cooking Techniques",
    "Food Packaging & Preservation"
  ],
  management: [
    "Basic Accounting & Book-keeping",
    "Customer Service Excellence",
    "Digital Marketing Basics"
  ],
  handicrafts: [
    "Advanced Craft Techniques",
    "Product Photography for Sales",
    "E-commerce Platform Training"
  ],
  agriculture: [
    "Modern Farming Techniques",
    "Organic Farming Certification",
    "Agricultural Marketing"
  ]
};
