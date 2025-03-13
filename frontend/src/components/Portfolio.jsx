import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const categories = [
  { id: 'web', name: 'Web Development' },
  { id: 'video', name: 'Video Editing' },
  { id: 'thumbnail', name: 'Thumbnails' },
  { id: 'social', name: 'Social Media' }
];

const projects = {
  web: [
    {
      title: "E-Commerce Platform",
      description: "Modern e-commerce platform with seamless payment integration",
      image: "https://placehold.co/600x400/252945/white?text=E-Commerce"
    },
    {
      title: "Portfolio Website",
      description: "Responsive portfolio website with modern animations",
      image: "https://placehold.co/600x400/252945/white?text=Portfolio"
    }
  ],
  video: [
    {
      title: "Corporate Video",
      description: "Professional corporate video with dynamic transitions",
      image: "https://placehold.co/600x400/252945/white?text=Corporate+Video"
    },
    {
      title: "Event Highlights",
      description: "Engaging event highlight reel with custom effects",
      image: "https://placehold.co/600x400/252945/white?text=Event"
    }
  ],
  thumbnail: [
    {
      title: "YouTube Thumbnails",
      description: "Eye-catching YouTube thumbnail designs",
      image: "https://placehold.co/600x400/252945/white?text=YouTube"
    },
    {
      title: "Course Thumbnails",
      description: "Professional course thumbnail series",
      image: "https://placehold.co/600x400/252945/white?text=Course"
    }
  ],
  social: [
    {
      title: "Instagram Campaign",
      description: "Cohesive Instagram content strategy and design",
      image: "https://placehold.co/600x400/252945/white?text=Instagram"
    },
    {
      title: "LinkedIn Branding",
      description: "Professional LinkedIn company branding",
      image: "https://placehold.co/600x400/252945/white?text=LinkedIn"
    }
  ]
};

const ProjectCard = ({ title, description, image }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5 }}
      className="relative w-full sm:w-[360px]"
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600/30 via-cyan-600/30 to-blue-600/30 rounded-2xl blur opacity-20"></div>
      
      <div className="relative bg-slate-900/40 backdrop-blur-xl p-5 rounded-2xl">
        <div className="relative h-[230px] rounded-xl overflow-hidden mb-4">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-transparent"></div>
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="space-y-3">
          <h3 className="text-white font-bold text-2xl">{title}</h3>
          <p className="text-slate-300/90 text-sm leading-relaxed">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState('web');
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section className="relative w-full min-h-screen py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.02),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]"></div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-20">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <p className="text-cyan-400 text-sm font-medium tracking-wider uppercase mb-3">Our Work</p>
          <h2 className="text-white font-black md:text-6xl sm:text-5xl text-4xl leading-tight mb-6">
            Portfolio
          </h2>
        </motion.div>

        <div className="flex justify-center mt-10 mb-12 gap-4 flex-wrap">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                  : 'bg-slate-900/40 text-slate-400 border border-slate-800 hover:border-slate-700 hover:text-slate-300'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <div className="mt-12 flex flex-wrap gap-7 justify-center">
            {projects[activeCategory].map((project) => (
              <ProjectCard key={project.title} {...project} />
            ))}
          </div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Portfolio;