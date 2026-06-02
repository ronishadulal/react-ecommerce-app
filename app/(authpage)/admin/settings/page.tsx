"use client";

import {
  Bell,
  Lock,
  Palette,
  Shield,
  User,
  Database,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";

export default function Settings() {
  const settings = [
    {
      icon: User,
      title: "Profile Settings",
      description: "Manage your personal information and account details.",
    },
    {
      icon: Lock,
      title: "Change Password",
      description: "Update your password and account credentials.",
    },
    {
      icon: Bell,
      title: "Notifications",
      description: "Configure email, system and push notifications.",
    },
    {
      icon: Shield,
      title: "Security",
      description: "Manage 2FA and login security settings.",
    },
    {
      icon: Palette,
      title: "Appearance",
      description: "Customize theme and layout preferences.",
    },
    {
      icon: Database,
      title: "System Settings",
      description: "Application configuration and maintenance.",
    },
  ];

  return (
    <div className="w-full space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account and system preferences.
        </p>
      </div>

     
      <div className="space-y-4">
        {settings.map((item) => {
          const Icon = item.icon;

          return (
            <Item
              key={item.title}
              variant="outline"
              className="w-full flex items-center justify-between hover:shadow-sm transition"
            >
             
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted">
                  <Icon className="h-5 w-5" />
                </div>

                <div>
                  <ItemTitle>{item.title}</ItemTitle>
                  <ItemDescription>{item.description}</ItemDescription>
                </div>
              </div>

             
              <Button variant="outline" className="ml-auto">
                Manage
              </Button>
            </Item>
          );
        })}
      </div>
    </div>
  );
}