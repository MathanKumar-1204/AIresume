"use client"

import { useState } from "react";
import { useAuth } from "@/components/auth-provider";
import { Card, CardContent } from "@/components/ui/card";
import { NavigationBar } from "@/components/navigation-bar";
import { Bell, CheckCircle, XCircle, User } from "lucide-react";
import Link from "next/link";

interface Notification {
  id: string;
  type: "application" | "status";
  jobTitle: string;
  company: string;
  status?: "accepted" | "rejected" | "pending";
  applicant?: {
    name: string;
    matchScore: number;
  };
  timestamp: string;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "application",
    jobTitle: "Senior Frontend Developer",
    company: "Tech Corp",
    applicant: {
      name: "John Doe",
      matchScore: 85,
    },
    timestamp: "2 hours ago",
  },
  {
    id: "2",
    type: "status",
    jobTitle: "Full Stack Developer",
    company: "Innovation Labs",
    status: "accepted",
    timestamp: "1 day ago",
  },
];

export default function NotificationsPage() {
  const { user } = useAuth();
  const [notifications] = useState<Notification[]>(mockNotifications);

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-4xl mx-auto p-4">
        <div className="space-y-4">
          {notifications.map((notification) => (
            <Link
              key={notification.id}
              href={
                notification.type === "application"
                  ? `/applications/${notification.id}`
                  : `/job/${notification.id}`
              }
            >
              <Card className="hover:bg-accent transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-4">
                    <div className="rounded-full bg-primary/10 p-2">
                      {notification.type === "application" ? (
                        <User className="h-5 w-5" />
                      ) : notification.status === "accepted" ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : notification.status === "rejected" ? (
                        <XCircle className="h-5 w-5 text-red-500" />
                      ) : (
                        <Bell className="h-5 w-5" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">
                            {notification.type === "application"
                              ? `New application for ${notification.jobTitle}`
                              : `Application ${notification.status} for ${notification.jobTitle}`}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {notification.company}
                          </p>
                          {notification.applicant && (
                            <p className="text-sm mt-2">
                              Applicant: {notification.applicant.name} (
                              {notification.applicant.matchScore}% match)
                            </p>
                          )}
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {notification.timestamp}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
      <NavigationBar />
    </div>
  );
}