"use client"

import { useState } from "react";
import { useAuth } from "@/components/auth-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NavigationBar } from "@/components/navigation-bar";
import { Plus, Minus } from "lucide-react";

interface Experience {
  title: string;
  company: string;
  duration: string;
  description: string;
}

interface Education {
  degree: string;
  institution: string;
  year: string;
}

export default function ProfilePage() {
  const { user } = useAuth();
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [education, setEducation] = useState<Education[]>([]);

  const handleAddExperience = () => {
    setExperiences([
      ...experiences,
      { title: "", company: "", duration: "", description: "" },
    ]);
  };

  const handleAddEducation = () => {
    setEducation([...education, { degree: "", institution: "", year: "" }]);
  };

  const handleRemoveExperience = (index: number) => {
    setExperiences(experiences.filter((_, i) => i !== index));
  };

  const handleRemoveEducation = (index: number) => {
    setEducation(education.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-4xl mx-auto p-4">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Input placeholder="Full Name" />
                <Input placeholder="Email" value={user?.email} disabled />
                <Input placeholder="Location" />
                <Textarea placeholder="Bio" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Experience</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleAddExperience}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Experience
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {experiences.map((exp, index) => (
                  <div key={index} className="space-y-4 p-4 border rounded-lg">
                    <div className="flex justify-end">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRemoveExperience(index)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                    </div>
                    <Input placeholder="Job Title" />
                    <Input placeholder="Company" />
                    <Input placeholder="Duration" />
                    <Textarea placeholder="Description" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Education</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleAddEducation}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Education
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <div key={index} className="space-y-4 p-4 border rounded-lg">
                    <div className="flex justify-end">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRemoveEducation(index)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                    </div>
                    <Input placeholder="Degree" />
                    <Input placeholder="Institution" />
                    <Input placeholder="Year" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Button className="w-full">Save Profile</Button>
        </div>
      </div>
      <NavigationBar />
    </div>
  );
}