require("dotenv").config();

const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Serve your website
app.use(express.static(__dirname));

// 📩 EMAIL CONFIG (FIXED SMTP)
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER, // your gmail
    pass: process.env.EMAIL_PASS  // app password
  }
});

// 📩 SEND EMAIL ROUTE
app.post("/send-email", async (req, res) => {
  console.log("📩 Request received:", req.body);

  const { name, email, message } = req.body;

  try {
    await transporter.sendMail({
      from: `Boostra <${process.env.EMAIL_USER}>`, // ✅ FIXED
      replyTo: email, // ✅ allows replying to client
      to: process.env.EMAIL_USER, // ✅ you receive email
      subject: "New Contact from Boostra",
      html: `
        <h2>📩 New Contact Message</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b> ${message}</p>
      `
    });

    console.log("✅ Email sent successfully");
    res.json({ success: true });

  } catch (error) {
    console.log("❌ ERROR:", error);
    res.json({ success: false });
  }
});

// ✅ Fix homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "boostra.html"));
});

// 🚀 Start server
app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});