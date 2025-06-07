import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import * as z from "zod";

// Schema for validation
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

// Ensure environment variables are defined
const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_APP_PASSWORD;
const emailFrom = process.env.EMAIL_FROM;
const emailTo = process.env.EMAIL_TO;

if (!emailUser || !emailPass || !emailTo) {
  console.error(
    "Missing required environment variables: EMAIL_USER, EMAIL_APP_PASSWORD, or EMAIL_TO."
  );
}

// Configure email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: emailUser,
    pass: emailPass,
  },
});

export async function POST(request: Request) {
  console.log("API route hit");

  try {
    const body = await request.json();
    console.log("Received data:", body);

    const result = formSchema.safeParse(body);

    if (!result.success) {
      console.log("Validation failed:", result.error.flatten().fieldErrors);
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }
    console.log("EMAIL_USER:", emailUser);
    console.log("EMAIL_APP_PASSWORD:", emailPass ? "Loaded" : "Missing");
    console.log("EMAIL_FROM:", emailFrom);
    console.log("EMAIL_TO:", emailTo);

    const { name, email, subject, message } = result.data;

    console.log("Preparing to send email with:", {
      from: emailFrom,
      to: emailTo,
      using: emailUser,
    });

    await transporter.sendMail({
      from: emailFrom || email,
      to: emailTo,
      subject: `New Contact Form Submission: ${subject}`,
      text: `
          Name: ${name}
          Email: ${email}
          Message: ${message}
        `,
      html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <h3>Message:</h3>
          <p>${message.replace(/\n/g, "<br>")}</p>
        `,
    });

    console.log("Email sent successfully");

    return NextResponse.json({
      success: true,
      message: "Message sent successfully!",
    });
  } catch (error) {
    console.error("Contact form error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to send email. Please try again later.",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
