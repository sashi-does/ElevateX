import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative w-full h-screen mx-auto overflow-hidden">
      <video
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: "brightness(0.3)" }}
      >
        <source
          src="https://res.cloudinary.com/dvukdxs2m/video/upload/v1741709112/4K_Planet_Earth_Spinning_in_Space___Free_HD_Videos_-_No_Copyright_cfknp1.mp4"
          type="video/mp4"
        />
      </video>
      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 flex flex-col items-center justify-center h-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl px-4 py-5 font-bold bg-gradient-to-r from-cyan-300 to-[#182436] text-transparent bg-clip-text mb-6 leading-tight">
            Transforming Ideas Into
            <span className="block mt-2">Digital Excellence</span>
          </h1>

          <p className="text-gray-400 text-base sm:text-lg md:text-xl max-w-2xl mb-8 font-light">
            We craft stunning websites, create engaging videos, design
            eye-catching thumbnails, and manage your social media presence to
            help your brand stand out in the digital world.
          </p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link to="/schedule" onClick={() => window.scrollTo(0, 0)}>
              <button className="relative text-cyan-200 px-8 py-3 rounded-xl font-medium border border-cyan-500/30 bg-transparent overflow-hidden group hover:border-cyan-500/50 hover:text-cyan-100 transition-all duration-300 ease-in-out">
                <span className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-cyan-500/40 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -translate-x-full group-hover:translate-x-0"></span>

                <span className="relative z-10">Book a demo call</span>
              </button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
      <div className="absolute bottom-10 w-full flex justify-center">
        <motion.div
          animate={{
            y: [0, 24, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "loop",
          }}
        >
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-cyan-500/50 flex justify-center items-start p-2">
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-3 h-3 rounded-full bg-cyan-500 mb-1"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
