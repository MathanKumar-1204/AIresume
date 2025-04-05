"use client"

import { useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { NavigationBar } from "@/components/navigation-bar";
import { Briefcase, MapPin, Clock, Upload } from "lucide-react";

interface JobDetails {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
  skills: { name: string; weight: number }[];
  postedAt: string;
}

const mockJob: JobDetails = {
  id: "1",
  title: "Senior Frontend Developer",
  company: "Tech Corp",
  location: "Remote",
  type: "Full-time",
  description: "We are looking for an experienced Frontend Developer...",
  requirements: [
    "5+ years of experience with React",
    "Strong TypeScript skills",
    "Experience with Next.js",
  ],
  skills: [
    { name: "React", weight: 0.8 },
    { name: "TypeScript", weight: 0.7 },
    { name: "Next.js", weight: 0.6 },
  ],
  postedAt: "2 days ago"
};

export default function JobPage() {
  const params = useParams();
  const [resumeScore, setResumeScore] = useState<number | null>(null);
  const [isApplying, setIsApplying] = useState(false);

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Mock resume analysis
      const score = Math.floor(Math.random() * 100);
      setResumeScore(score);
    }
  };

  const handleApply = async () => {
    setIsApplying(true);
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsApplying(false);
    // Show success message
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-4xl mx-auto p-4">
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold mb-2">{mockJob.title}</h1>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Briefcase className="h-4 w-4 mr-1" />
                    {mockJob.company}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {mockJob.location}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {mockJob.postedAt}
                  </div>
                </div>
              </div>
              <Button variant="secondary">{mockJob.type}</Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{mockJob.description}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  {mockJob.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Check Resume Match</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-center border-2 border-dashed border-border rounded-lg p-6">
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        accept=".pdf"
                        className="hidden"
                        onChange={handleResumeUpload}
                      />
                      <div className="flex flex-col items-center">
                        <Upload className="h-8 w-8 mb-2" />
                        <span className="text-sm text-muted-foreground">
                          Upload your resume (PDF)
                        </span>
                      </div>
                    </label>
                  </div>
                  {resumeScore !== null && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Match Score</span>
                        <span>{resumeScore}%</span>
                      </div>
                      <Progress value={resumeScore} />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Button
              className="w-full"
              onClick={handleApply}
              disabled={isApplying}
            >
              {isApplying ? "Applying..." : "Apply Now"}
            </Button>
          </div>
        </div>
      </div>
      <NavigationBar />
    </div>
  );
}