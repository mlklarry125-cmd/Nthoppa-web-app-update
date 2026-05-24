"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Lock, CheckCircle, Award, ChevronLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Fallback courses data for when API fails
const fallbackCourses = [
  { id: 1, title: "Budgeting Basics", description: "Learn how to create and stick to a budget", requiredScore: 0, coinsReward: 50 },
  { id: 2, title: "Saving Strategies", description: "Different ways to save money effectively", requiredScore: 30, coinsReward: 75 },
  { id: 3, title: "Understanding Credit", description: "How credit scores work and how to build credit", requiredScore: 50, coinsReward: 100 },
  { id: 4, title: "Investment Basics", description: "Introduction to investing for beginners", requiredScore: 70, coinsReward: 150 },
  { id: 5, title: "Debt Management", description: "Strategies to pay off debt faster", requiredScore: 60, coinsReward: 125 },
];

export default function ClientEducationPage() {
  const router = useRouter();
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const literacyScore = 65;

  useEffect(() => {
    fetch('/api/courses')
      .then(res => res.json())
      .then(data => {
        // Check if data is an array, otherwise use fallback
        if (Array.isArray(data)) {
          setCourses(data);
        } else {
          console.warn('API returned non-array data, using fallback courses', data);
          setCourses(fallbackCourses);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch courses:', err);
        setCourses(fallbackCourses);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-gray-500 hover:text-[#FF6B35] font-medium text-sm mb-6 group transition-colors"
        >
          <div className="w-8 h-8 rounded-lg bg-gray-100 group-hover:bg-[#FF6B35]/10 flex items-center justify-center transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </div>
          Back
        </button>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF6B35]"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back Navigation */}
      <button
        onClick={() => router.back()}
        className="inline-flex items-center gap-2 text-gray-500 hover:text-[#FF6B35] font-medium text-sm mb-6 group transition-colors"
      >
        <div className="w-8 h-8 rounded-lg bg-gray-100 group-hover:bg-[#FF6B35]/10 flex items-center justify-center transition-colors">
          <ChevronLeft className="w-4 h-4" />
        </div>
        Back
      </button>

      <div>
        <h1 className="text-2xl font-bold text-black flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-[#FF6B35]" />
          Financial Education
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Literacy Score: <span className="font-semibold text-[#FF6B35]">{literacyScore}%</span>
        </p>
      </div>

      <Card className="border-gray-200 bg-gradient-to-r from-[#FF6B35]/5 to-transparent">
        <CardContent className="p-5 flex items-center justify-between gap-4">
          <div>
            <h3 className="font-semibold text-black">Your Financial Literacy</h3>
            <p className="text-xs text-gray-500 mt-0.5">Complete courses to unlock better loan products</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-[#FF6B35]">{literacyScore}%</p>
            <Progress value={literacyScore} className="h-1 w-24 mt-1" />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {courses.map((c: any) => {
          const available = literacyScore >= (c.requiredScore || 0);
          return (
            <Card key={c.id} className={`border-gray-200 ${!available ? 'opacity-70' : ''}`}>
              <CardContent className="p-5">
                <div className="flex justify-between mb-3">
                  <div className={`p-2 rounded-lg ${available ? 'bg-[#FF6B35]/10' : 'bg-gray-100'}`}>
                    {available ? <BookOpen className="h-5 w-5 text-[#FF6B35]" /> : <Lock className="h-5 w-5 text-gray-400" />}
                  </div>
                  <Badge className="bg-[#FF6B35] text-white">+{c.coinsReward || 50} coins</Badge>
                </div>
                <h3 className="font-semibold text-black mb-1">{c.title}</h3>
                <p className="text-xs text-gray-500 mb-3">{c.description}</p>
                {available ? (
                  <Button 
                    className="w-full bg-[#FF6B35] text-white hover:bg-black text-sm" 
                    onClick={() => toast({ title: "Course Started!", description: `Starting "${c.title}"` })}
                  >
                    Start Course
                  </Button>
                ) : (
                  <p className="text-xs text-yellow-600 flex items-center gap-1">
                    <Lock className="h-3 w-3" />
                    Requires {c.requiredScore}% literacy score
                  </p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}