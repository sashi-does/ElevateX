import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Contact = () => {
  return (
    <section className="relative w-full min-h-screen py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.02),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]"></div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <p className="text-cyan-400 text-sm font-medium tracking-wider uppercase mb-3">Get in Touch</p>
          <h2 className="text-white font-black md:text-6xl sm:text-5xl text-4xl leading-tight">
            Book a Meeting
          </h2>
        </motion.div>

        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative w-full max-w-[600px]"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600/30 via-cyan-600/30 to-blue-600/30 rounded-2xl blur opacity-20"></div>
            
            <div className="relative bg-slate-900/40 backdrop-blur-xl p-8 rounded-2xl">
              <h3 className="text-white text-2xl font-bold mb-6 text-center">Schedule a One-on-One Call</h3>
              
              <div className="space-y-6">
                <p className="text-slate-300/90 text-center">
                  Let's discuss how we can help transform your digital presence. Choose a convenient time for a personalized consultation.
                </p>
                
                <div className="flex flex-col items-center space-y-4">
                  <Link to="/schedule" onClick={() => window.scrollTo(0, 0)}>
                    <button className="bg-cyan-500/20 hover:bg-cyan-500/30 w-full max-w-[400px] py-4 px-8 rounded-xl text-cyan-400 font-bold border border-cyan-500/30 transition-colors">
                      Schedule Now
                    </button>
                  </Link>
                  
                  <p className="text-slate-400 text-sm">
                    Available Monday to Friday, 9 AM - 5 PM EST
                  </p>
                </div>
                
                <div className="border-t border-slate-800 pt-6 mt-6">
                  <p className="text-white text-center font-medium mb-2">
                    Prefer email?
                  </p>
                  <Link
                    to="/contact-form"
                    onClick={() => window.scrollTo(0, 0)}
                    className="text-cyan-400 hover:text-cyan-300 block text-center transition-colors"
                  >
                    contact@digitalagency.com
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;