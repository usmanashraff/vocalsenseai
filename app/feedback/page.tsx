"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import emailjs from "emailjs-com";
import {Send} from 'lucide-react'

export default function Feedback() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
      });
      const [isSubmitting, setIsSubmitting] = useState(false); // State for tracking submission status
      const { toast } = useToast();
    
      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true); // Set loading state to true before submitting
    
        // Sending the feedback using EmailJS
        emailjs
          .send(
            "service_r95zt7g", // Replace with your EmailJS service ID
            "template_f1983u9", // Replace with your EmailJS template ID
            {
              from_name: formData.name || "Anonymous",
              reply_to: formData.email || "Not provided",
              message: formData.message,
            },
            "tAhPha0UA8ykco8rP" // Replace with your EmailJS user ID
          )
          .then(
            (response) => {
              setIsSubmitting(false); // Reset loading state
              toast({
                title: "Thank you for your feedback!",
                description: "We appreciate your input and will review it carefully.",
              });
              setFormData({ name: "", email: "", message: "" });
            },
            (error) => {
              setIsSubmitting(false); // Reset loading state
              toast({
                title: "Error sending feedback",
                description: "Something went wrong, please try again later.",
                variant: "destructive",
              });
            }
          );
      };

  return (
    <main className="container mx-auto px-6 py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Share Your Feedback</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-12">
          We value your input! Help us improve VocalsenseAI by sharing your thoughts and experiences.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Name (optional)
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Lucia"
            />
          </div>



          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email (optional)
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="lucia@gmail.com"
            />
          </div>


          <div>
            <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Your Feedback
            </label>
            <Textarea
                id="message"
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Share your thoughts with us..."
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                aria-required
              />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-all flex items-center justify-center space-x-2"
            disabled={isSubmitting}>

            {isSubmitting ? "Submitting..." : "Submit Feedback"} {/* Show loading text when submitting */}
            <Send className="h-5 ml-2 w-5" />
          </button>
        </form>
      </div>
    </main>
  );
}