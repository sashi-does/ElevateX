import express from "express";
import { sendOTP, verifyOTPHandler, sendMeetingConfirmation } from "../controllers/EmailController.js";

const EmailRouter = express.Router();

EmailRouter.post("/send-otp", sendOTP);
EmailRouter.post("/verify-otp", verifyOTPHandler);
EmailRouter.post("/send-meeting-confirmation", sendMeetingConfirmation);

export default EmailRouter;
