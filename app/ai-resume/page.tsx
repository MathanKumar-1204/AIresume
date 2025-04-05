"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { NavigationBar } from "@/components/navigation-bar";
import { Upload, CheckCircle, XCircle } from "lucide-react";

interface SkillMatch {
  skill: string;
  score: number;
}

export default function AIResumePage() {
  const [file, setFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState<{
    atsScore: number;
    skillMatches: SkillMatch[];
    suggestions: string[];
  } | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
    }
  };

  const analyzeResume = async () => {
    setAnalyzing(true);
    // Mock analysis
    await new Promise(resolve => setTimeout(resolve, 2000));
    setResults({
      atsScore: 85,
      skillMatches: [
        { skill: "React", score: 90 },
        { skill: "TypeScript", score: 85 },
        { skill: "Next.js", score: 75 },
      ],
      suggestions: [
        "Add more specific achievements with metrics",
        "Include relevant certifications",
        "Highlight leadership experience",
      ],
    });
    setAnalyzing(false);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-4xl mx-auto p-4">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>AI Resume Analyzer</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center justify-center border-2 border-dashed border-border rounded-lg p-8">
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept=".pdf"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                  <div className="flex flex-col items-center">
                    <Upload className="h-12 w-12 mb-4" />
                    <span className="text-lg mb-2">
                      {file ? file.name : "Upload your resume"}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      PDF format only
                    </span>
                  </div>
                </label>
              </div>

              {file && !analyzing && !results && (
                <Button
                  className="w-full"
                  onClick={analyzeResume}
                >
                  Analyze Resume
                </Button>
              )}

              {analyzing && (
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                  <p>Analyzing your resume...</p>
                </div>
              )}

              {results && (
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>ATS Compatibility Score</span>
                      <span>{results.atsScore}%</span>
                    </div>
                    <Progress value={results.atsScore} />
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">Skill Matches</h3>
                    <div className="space-y-4">
                      {results.skillMatches.map((match, index) => (
                        <div key={index}>
                          <div className="flex justify-between mb-2">
                            <span>{match.skill}</span>
                            <span>{match.score}%</span>
                          </div>
                          <Progress value={match.score} />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">Suggestions</h3>
                    <ul className="space-y-2">
                      {results.suggestions.map((suggestion, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          {suggestion.startsWith("Add") ? (
                            <Plus className="h-5 w-5 text-green-500 flex-shrink-0" />
                          ) : (
                            <CheckCircle className="h-5 w-5 text-yellow-500 flex-shrink-0" />
                          )}
                          <span>{suggestion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setFile(null);
                      setResults(null);
                    }}
                  >
                    Analyze Another Resume
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      <NavigationBar />
    </div>
  );
}