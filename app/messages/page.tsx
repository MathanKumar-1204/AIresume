"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { NavigationBar } from "@/components/navigation-bar";
import { Search, Send } from "lucide-react";

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
}

interface Chat {
  id: string;
  userId: string;
  userName: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
}

const mockChats: Chat[] = [
  {
    id: "1",
    userId: "user1",
    userName: "John Doe",
    lastMessage: "Thanks for considering my application",
    timestamp: "2 hours ago",
    unread: true,
  },
];

const mockMessages: Message[] = [
  {
    id: "1",
    senderId: "user1",
    senderName: "John Doe",
    content: "Hi, I'm interested in the position",
    timestamp: "2 hours ago",
  },
];

export default function MessagesPage() {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Handle sending message
      setNewMessage("");
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-4xl mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-1 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                className="pl-10"
                placeholder="Search messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              {mockChats.map((chat) => (
                <Card
                  key={chat.id}
                  className={`cursor-pointer hover:bg-accent transition-colors ${
                    selectedChat === chat.id ? "bg-accent" : ""
                  }`}
                  onClick={() => setSelectedChat(chat.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{chat.userName}</h3>
                        <p className="text-sm text-muted-foreground truncate">
                          {chat.lastMessage}
                        </p>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {chat.timestamp}
                        {chat.unread && (
                          <div className="w-2 h-2 bg-primary rounded-full mt-1 ml-auto" />
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            {selectedChat ? (
              <div className="h-[calc(100vh-12rem)] flex flex-col">
                <div className="flex-1 overflow-y-auto space-y-4 p-4">
                  {mockMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.senderId === "user1"
                          ? "justify-start"
                          : "justify-end"
                      }`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg p-3 ${
                          message.senderId === "user1"
                            ? "bg-accent"
                            : "bg-primary text-primary-foreground"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <span className="text-xs text-muted-foreground block mt-1">
                          {message.timestamp}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 border-t">
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          handleSendMessage();
                        }
                      }}
                    />
                    <Button onClick={handleSendMessage}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-[calc(100vh-12rem)] flex items-center justify-center text-muted-foreground">
                Select a chat to start messaging
              </div>
            )}
          </div>
        </div>
      </div>
      <NavigationBar />
    </div>
  );
}