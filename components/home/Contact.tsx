import React, { useState } from "react";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import { toast } from "sonner";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setStatus("sending");
    try {
      console.log("Starting fetch request to /api/contact");
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log("Response status:", response.status);

      // Handle non-JSON responses gracefully
      let responseData;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        responseData = await response.json();
        console.log("Response data:", responseData);
      } else {
        const textResponse = await response.text();
        console.log("Non-JSON response:", textResponse);
        responseData = { message: "Received non-JSON response" };
      }

      if (!response.ok) {
        throw new Error(responseData?.message || `Error: ${response.status}`);
      }

      toast.custom((t) => (
        <div className="flex items-center gap-2">
          <CheckCircle size={20} />
          <span>Message sent successfully!</span>
        </div>
      ));
      setStatus("success");

      setTimeout(() => setStatus("idle"), 3000);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Error details:", error);
      toast.custom((t) => (
        <div className="flex items-center gap-2">
          <AlertCircle size={20} />
          <span>
            Error: {error instanceof Error ? error.message : "Unknown error"}
          </span>
        </div>
      ));
      setStatus("error");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-light mb-4">Get In Touch</h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            I'd love to hear from you. Send me a message and I'll respond as
            soon as possible.
          </p>
        </div>

        {/* Contact Form */}
        <div className="rounded-2xl shadow-sm border p-8 sm:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name and Email Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg placeholder-neutral-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent ${
                    errors.name ? "border-red-300 bg-red-50" : ""
                  }`}
                  placeholder="Your name"
                />
                {errors.name && (
                  <p className="text-red-600 text-sm flex items-center gap-1">
                    <AlertCircle size={14} />
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg placeholder-neutral-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent ${
                    errors.email ? "border-red-300 bg-red-50" : ""
                  }`}
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p className="text-red-600 text-sm flex items-center gap-1">
                    <AlertCircle size={14} />
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            {/* Subject */}
            <div className="space-y-2">
              <label htmlFor="subject" className="block text-sm font-medium">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg placeholder-neutral-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent ${
                  errors.subject ? "border-red-300 bg-red-50" : ""
                }`}
                placeholder="What's this about?"
              />
              {errors.subject && (
                <p className="text-red-600 text-sm flex items-center gap-1">
                  <AlertCircle size={14} />
                  {errors.subject}
                </p>
              )}
            </div>

            {/* Message */}
            <div className="space-y-2">
              <label htmlFor="message" className="block text-sm font-medium">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={6}
                className={`w-full px-4 py-3 border rounded-lg placeholder-neutral-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent resize-none ${
                  errors.message ? "border-red-300 bg-red-50" : ""
                }`}
                placeholder="Tell me about your project, idea, or just say hello..."
              />
              {errors.message && (
                <p className="text-red-600 text-sm flex items-center gap-1">
                  <AlertCircle size={14} />
                  {errors.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={status === "sending"}
                className={`w-full px-8 py-4 bg-primary text-primary-foreground rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                  status === "sending"
                    ? "text-muted-foreground cursor-not-allowed"
                    : status === "success"
                      ? "bg-green-600 hover:bg-green-700"
                      : "hover:shadow-lg transform hover:-translate-y-0.5"
                }`}
              >
                {status === "sending" && (
                  <>
                    <div className="w-4 h-4 border-2 border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </>
                )}
                {status === "success" && (
                  <>
                    <CheckCircle size={18} />
                    Message Sent!
                  </>
                )}
                {status === "idle" && (
                  <>
                    <Send size={18} />
                    Send Message
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Success Message */}
          {status === "success" && (
            <div className="mt-6 p-4 bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-800 rounded-lg">
              <p className="text-green-800 dark:text-green-200 text-center">
                Thank you for your message! I'll get back to you soon.
              </p>
            </div>
          )}
        </div>

        {/* Additional Contact Info */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            You can also reach me directly at{" "}
            <a
              href="mailto:contact@sanjid.in"
              className="hover:underline font-medium"
            >
              contact@sanjid.in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
