import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-primary py-20 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto bg-tertiary rounded-2xl p-8"
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-white">Contact Us</h2>
          <Link to="/" className="text-secondary hover:text-white transition-colors">
            ← Back to Home
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-white font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-[#1d1836] text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#804dee]"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-white font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-[#1d1836] text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#804dee]"
              required
            />
          </div>

          <div>
            <label htmlFor="subject" className="block text-white font-medium mb-2">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full bg-[#1d1836] text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#804dee]"
              required
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-white font-medium mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="6"
              className="w-full bg-[#1d1836] text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#804dee]"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-[#804dee] hover:bg-[#6d3acf] text-white font-bold py-4 rounded-xl transition-colors"
          >
            Send Message
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default ContactForm;