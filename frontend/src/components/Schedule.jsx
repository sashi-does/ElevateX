import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { X, CheckCircle } from "lucide-react";
import dayjs from "dayjs";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const timeSlots = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
];

const Schedule = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    otp: "",
  });
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const today = dayjs().startOf("day");

  const shouldDisableDate = (date) => {
    return date.isBefore(today, "day");
  };

  const handleConfirmBooking = async () => {
    try {
      const url = import.meta.env.VITE_OTP_URL+"/add-booking";
      
      console.log(url)
      const bookingData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        meetingTime: selectedDate.format("YYYY-MM-DD") + " " + selectedTime,
      };
      console.log(bookingData);
      await axios.post(url, bookingData);
      const emailUrl = import.meta.env.VITE_OTP_URL+"/send-meeting-confirmation";
      console.log(emailUrl)
      await axios.post(emailUrl, {fullname: bookingData.name, email: bookingData.email, meetDateTime: bookingData.meetingTime});
      setShowPopup(true);
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const sendOTP = async () => {
    setIsLoading(true);
    try {
      const url = import.meta.env.VITE_OTP_URL+"/send-otp";
      const email = { email: formData.email };
      const response = await axios.post(url, email);

      if (response.data.success) {
        setOtpSent(true);
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetOTP = () => {
    sendOTP();
  };

  const verifyOTP = async () => {
    setIsVerifying(true);
    setOtpError("");
    try {
      const url = import.meta.env.VITE_OTP_URL+"/verify-otp";
      const emailOTP = { email: formData.email, otp: formData.otp };
      const response = await axios.post(url, emailOTP);

      if (response.data.success) {
        setOtpVerified(true);
        setOtpSent(false);
      } else {
        setOtpError("Invalid OTP. Please try again.");
      }
    } catch (error) {
      setOtpError("Error verifying OTP. Please try again.");
      console.error("Error verifying OTP:", error);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleVerifyOTP = () => {
    if (formData.otp.length === 6) {
      verifyOTP();
    } else {
      setOtpError("Please enter a 6-digit OTP");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setShowSuccess(true);
    setTimeout(() => {
      setShowPopup(false);
      setShowSuccess(false);
      setFormData({ name: "", email: "", phone: "", otp: "" });
      setOtpVerified(false);
    }, 2000);
  };

  const isFormComplete =
    formData.name.trim() !== "" &&
    formData.email.trim() !== "" &&
    formData.phone.trim() !== "" &&
    otpVerified;

  return (
    <div className="bg-primary min-h-screen relative overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-65"
      >
        <source
          src="https://res.cloudinary.com/dvukdxs2m/video/upload/v1741800942/72540-543403669_gfsrfb.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-5"></div>
      <div className="relative z-10">
        <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

        <div className="pt-24 pb-20 px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-7xl mx-auto"
          >
            <div className="text-center mb-16">
              <h1 className="text-5xl sm:text-6xl md:text-7xl px-4 py-5 font-bold bg-gradient-to-tr from-[#fccb7ce6] to-[#ceb30500] text-transparent bg-clip-text mb-6 leading-tight">
                Schedule Your
                <span className="block mt-2">Strategy Session</span>
              </h1>
              <p className="text-secondary text-lg max-w-2xl mx-auto">
                Book a personalized consultation with our digital experts to
                discuss your project needs and goals.
              </p>
            </div>

            <div className="bg-[#00000093] rounded-2xl p-4 sm:p-8 w-full max-w-4xl mx-auto overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
        <div className="bg-[#1b150065] rounded-xl p-4 sm:p-6 overflow-x-auto">
          <h3 className="text-lg sm:text-xl font-semibold text-white mb-4">
            Select Date
          </h3>
          <div className="min-w-[280px]">
            <ThemeProvider theme={darkTheme}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar
                  value={selectedDate}
                  onChange={(newValue) => setSelectedDate(newValue)}
                  className="text-white"
                  disablePast
                  shouldDisableDate={shouldDisableDate}
                  minDate={today}
                />
              </LocalizationProvider>
            </ThemeProvider>
          </div>
        </div>

        <div className="bg-[#291e0042] rounded-xl p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-semibold text-white mb-4">
            Select Time
          </h3>
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            {timeSlots.map((time) => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`p-2 sm:p-3 rounded-lg text-sm font-medium transition-colors ${
                  selectedTime === time
                    ? "bg-[#ac632e5c] text-white"
                    : "bg-[#42400021] text-secondary hover:bg-[#ac632e5c] hover:text-white"
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 sm:mt-8">
        <div className="max-w-md mx-auto text-center">
          <button
            onClick={() => setShowPopup(true)}
            disabled={!selectedDate || !selectedTime}
            className={`w-full sm:w-[300px] py-3 sm:py-4 rounded-tl-[20px] rounded-br-[20px] font-bold text-white transition-colors ${
              selectedDate && selectedTime
                ? "border border-[#cfac3a39] bg-[#ffe81a2e] hover:bg-[#a86e04] hover:text-white"
                : "bg-gray-600 cursor-not-allowed"
            }`}
          >
            Confirm Consultation
          </button>
          <p className="mt-3 sm:mt-4 text-secondary text-xs sm:text-sm px-4">
            {selectedDate && selectedTime
              ? `Selected: ${selectedDate.format("MMMM D, YYYY")} at ${selectedTime}`
              : "Please select both date and time"}
          </p>
        </div>
      </div>
    </div>

            <div className="mt-16 bg-[#f8ff9607] border border-[#cfac3a39] bg rounded-2xl p-8 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">
                What to Expect
              </h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <ul className="space-y-4 text-secondary">
                    <li className="flex items-start">
                      <span className="text-[#fccb7c] mr-2">✓</span>
                      30-minute personalized consultation
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#fccb7c] mr-2">✓</span>
                      Project scope discussion
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#fccb7c] mr-2">✓</span>
                      Timeline and budget planning
                    </li>
                  </ul>
                </div>
                <div>
                  <ul className="space-y-4 text-secondary">
                    <li className="flex items-start">
                      <span className="text-[#fccb7c] mr-2">✓</span>
                      Expert recommendations
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#fccb7c] mr-2">✓</span>
                      Custom solution proposal
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#fccb7c] mr-2">✓</span>
                      Next steps action plan
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <Footer theme="schedule"/>

        <AnimatePresence>
          {showPopup && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center px-4"
            >
              <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={() => setShowPopup(false)}
              />
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="relative bg-[#1a1a1a] rounded-2xl p-8 w-full max-w-lg"
              >
                <button
                  onClick={() => setShowPopup(false)}
                  className="absolute right-4 top-4 text-gray-400 hover:text-white"
                >
                  <X size={24} />
                </button>

                <h3 className="text-2xl font-bold text-white mb-6">
                  Complete Your Booking
                </h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-[#2a2a2a] border border-gray-600 text-white focus:outline-none focus:border-[#fccb7c]"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        disabled={otpVerified}
                        className="flex-1 px-4 py-3 rounded-lg bg-[#2a2a2a] border border-gray-600 text-white focus:outline-none focus:border-[#fccb7c]"
                        placeholder="Enter your email"
                      />
                      <button
                        type="button"
                        onClick={handleGetOTP}
                        disabled={!formData.email || otpVerified || isLoading}
                        className={`px-4 py-2 rounded-lg font-medium ${
                          otpVerified
                            ? "bg-green-600 text-white cursor-not-allowed"
                            : "bg-[#a86e04] text-white hover:bg-[#8c5a03]"
                        }`}
                      >
                        {isLoading ? (
                          <div className="flex items-center">
                            <svg
                              className="animate-spin h-5 w-5 mr-2 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Sending...
                          </div>
                        ) : otpVerified ? (
                          "Verified"
                        ) : (
                          "Get OTP"
                        )}
                      </button>
                    </div>
                    {otpSent && !otpVerified && (
                      <p className="mt-2 text-sm text-green-500">
                        OTP sent successfully! Check your email.
                      </p>
                    )}
                    {otpVerified && (
                      <p className="mt-2 text-sm text-green-500">
                        Email verified successfully!
                      </p>
                    )}
                  </div>

                  <AnimatePresence>
                    {otpSent && !otpVerified && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Enter OTP
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            name="otp"
                            value={formData.otp}
                            onChange={handleInputChange}
                            maxLength={6}
                            className="flex-1 px-4 py-3 rounded-lg bg-[#2a2a2a] border border-gray-600 text-white focus:outline-none focus:border-[#fccb7c]"
                            placeholder="Enter 6-digit OTP"
                          />
                          <button
                            type="button"
                            onClick={handleVerifyOTP}
                            disabled={isVerifying}
                            className={`px-4 py-2 rounded-lg font-medium ${
                              isVerifying
                                ? "bg-gray-600 cursor-not-allowed"
                                : "bg-[#a86e04] text-white hover:bg-[#8c5a03]"
                            }`}
                          >
                            {isVerifying ? (
                              <div className="flex items-center">
                                <svg
                                  className="animate-spin h-5 w-5 mr-2 text-white"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                  ></circle>
                                  <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                  ></path>
                                </svg>
                                Verifying...
                              </div>
                            ) : (
                              "Verify"
                            )}
                          </button>
                        </div>
                        {otpError && (
                          <p className="mt-2 text-sm text-red-500">
                            {otpError}
                          </p>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-[#2a2a2a] border border-gray-600 text-white focus:outline-none focus:border-[#fccb7c]"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  {isFormComplete && (
                    <button
                      onClick={handleConfirmBooking}
                      type="submit"
                      className="w-full py-4 rounded-lg font-bold text-white bg-[#a86e04] hover:bg-[#8c5a03] transition-colors"
                    >
                      Confirm Booking
                    </button>
                  )}
                </form>
                <AnimatePresence>
                  {showSuccess && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="absolute inset-0 flex items-center justify-center bg-black/80 rounded-2xl"
                    >
                      <div className="text-center">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 20,
                          }}
                        >
                          <CheckCircle
                            size={64}
                            className="text-green-500 mx-auto mb-4"
                          />
                        </motion.div>
                        <h3 className="text-2xl font-bold text-white">
                          Booking Confirmed!
                        </h3>
                        <p className="text-gray-300 mt-2">
                          We'll see you soon!
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Schedule;