const transporter = require("../config/mailer");
const { createInquiry } = require("../services/inquiryService");

exports.sendInquiry = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 1️⃣ Save inquiry to DB
    await createInquiry({ name, email, phone, message });

    // 2️⃣ Email to admin
    const mailOptions = {
      from: `"Inquiry Form" <${process.env.EMAIL_USER}>`,
      to: "applatus.radhika@gmail.com",
      subject: "New Landing Page Inquiry",
      html: `
        <h2>New Inquiry</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Message:</b> ${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      message: "Inquiry submitted successfully",
    });
  } catch (error) {
    console.error("Email / DB Error:", error);
    res.status(500).json({
      message: "Failed to submit inquiry",
    });
  }
};
