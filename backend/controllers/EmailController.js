import { generateOTP, verifyOTP } from "../services/OtpService.js";
import { sendEmail } from "../services/EmailSender.js";

export const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    const otp = generateOTP(email);

    try {
      await sendEmail(
        email,
        "Your OTP Code",
        `Your OTP is ${otp}. It is valid for 10 minutes.`,
        `<h2>Your OTP: ${otp}</h2><p>Valid for 10 minutes.</p>`
      );
      console.log(`OTP sent successfully to ${email}`);
      res.status(200).json({ success: true, message: "OTP sent successfully" });
    } catch (emailError) {
      console.error(`Error sending OTP email: ${emailError.message}`);
      res.status(500).json({ success: false, message: "Failed to send OTP email" });
    }
  } catch (error) {
    console.error(`Error in sendOTP function: ${error.message}`);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const verifyOTPHandler = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ success: false, message: "Email and OTP are required" });
    }

    if (verifyOTP(email, otp)) {
      console.log(`OTP verified successfully for ${email}`);
      return res.status(200).json({ success: true, message: "OTP verified successfully" });
    } else {
      console.warn(`OTP verification failed for ${email}`);
      return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
    }
  } catch (error) {
    console.error(`Error in verifyOTPHandler: ${error.message}`);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const sendMeetingConfirmation = async (req, res) => {
    try {
      const { fullname, email, meetDateTime } = req.body;
  
      // Validate inputs
      if (!fullname || !email || !meetDateTime) {
        return res.status(400).json({ 
          success: false, 
          message: "Full name, email, and meeting date/time are required" 
        });
      }
  
      // Parse and validate date
      const dateTimeObj = new Date(meetDateTime);
      if (isNaN(dateTimeObj.getTime())) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid date/time format" 
        });
      }
  
      // Format date and time for better readability
      const meetingDate = dateTimeObj.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      const meetingTime = dateTimeObj.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      });
  
      // Email content
      const subject = "Meeting Confirmation";
      const textContent = `Hey ${fullname}, Your meeting is scheduled on ${meetingDate} at ${meetingTime}.`;
      const htmlContent = `
        <h2>Meeting Confirmation</h2>
        <p>Hey ${fullname},</p>
        <p>Your meeting is scheduled on <b>${meetingDate}</b> at <b>${meetingTime}</b>.</p>
        <p>We look forward to speaking with you!</p>
      `;
  
      try {
        await sendEmail(email, subject, textContent, htmlContent);
        console.log(`Meeting confirmation sent to ${email}`);
        return res.status(200).json({ 
          success: true, 
          message: "Meeting confirmation sent" 
        });
      } catch (emailError) {
        console.error(`Error sending email: ${emailError.message}`);
        return res.status(500).json({ 
          success: false, 
          message: "Failed to send meeting confirmation" 
        });
      }
    } catch (error) {
      console.error(`Error in sendMeetingConfirmation: ${error.message}`);
      return res.status(500).json({ 
        success: false, 
        message: "Internal server error" 
      });
    }
  };
