import { motion } from 'framer-motion';
import { Tilt } from 'react-tilt';
import { useInView } from 'react-intersection-observer';
import { Code2, Video, Palette, Share2 } from 'lucide-react';

const services = [
  {
    title: "Web Development",
    icon: Code2,
    description: "Transform your digital vision into reality with our expert web development services. We specialize in creating fast, secure, and scalable web applications that deliver exceptional user experiences.",
    features: [
      "Full-stack Development",
      "Progressive Web Apps",
      "Performance Optimization",
      "API Integration & Development"
    ]
  },
  {
    title: "Video Editing",
    icon: Video,
    description: "Elevate your storytelling with our professional video editing services. We combine technical expertise with creative vision to produce compelling content that captivates your audience.",
    features: [
      "Cinematic Editing",
      "Advanced Color Grading",
      "Custom Motion Graphics",
      "Professional Sound Design"
    ]
  },
  {
    title: "Thumbnail Design",
    icon: Palette,
    description: "Stand out in the crowded digital space with our strategic thumbnail design services. We create visually compelling thumbnails that drive engagement and increase click-through rates.",
    features: [
      "Strategic Visual Design",
      "Conversion Optimization",
      "Brand Consistency",
      "Multi-Platform Optimization"
    ]
  },
  {
    title: "Social Media Management",
    icon: Share2,
    description: "Build a powerful social media presence with our comprehensive management services. We help you connect with your audience, build brand loyalty, and drive meaningful engagement.",
    features: [
      "Content Strategy & Planning",
      "Engagement Optimization",
      "Performance Analytics",
      "Brand Voice Development"
    ]
  }
];

const ServiceCard = ({ title, description, icon: Icon, features, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <Tilt
      options={{
        max: 15,
        scale: 1.02,
        speed: 450,
        transition: true,
        easing: "cubic-bezier(.03,.98,.52,.99)",
      }}
      className="w-full sm:w-[300px]"
    >
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.2 }}
        className="relative group"
      >
        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600/30 via-cyan-600/30 to-blue-600/30 rounded-2xl blur opacity-20 group-hover:opacity-100 transition duration-1000"></div>
        
        <div className="relative bg-slate-900/40 backdrop-blur-xl rounded-2xl py-8 px-7 min-h-[420px] flex flex-col">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(56,189,248,0.03),transparent_50%)] rounded-2xl"></div>
          
          <div className="absolute -bottom-4 -right-4 opacity-0 group-hover:opacity-5 transition-all duration-500">
            <Icon className="w-32 h-32 text-white" />
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-xl border border-white/5 shadow-inner transform group-hover:scale-110 transition-transform duration-300">
                <Icon className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-white text-xl font-bold tracking-tight">{title}</h3>
            </div>
            
            <p className="text-slate-400 text-[15px] leading-relaxed">{description}</p>
            
            <div className="mt-8 flex-grow">
              <ul className="space-y-3">
                {features.map((feature, idx) => (
                  <li 
                    key={idx} 
                    className="text-slate-500 text-[14px] flex items-center space-x-2 group-hover:text-slate-400 transition-colors duration-300"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/50"></span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-slate-900/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
      </motion.div>
    </Tilt>
  );
};

function Services() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section className="relative w-full min-h-screen bg-gradient-to-b from-[#04060A] to-bg-slate-950 py-24 overflow-hidden">
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
          <p className="text-cyan-400 text-sm font-medium tracking-wider uppercase mb-3">What We Offer</p>
          <h2 className="text-white font-black md:text-6xl sm:text-5xl text-4xl leading-tight mb-6">
            Our Services
          </h2>
          <div className="mt-4 max-w-2xl mx-auto">
            <p className="text-slate-400 text-lg">
              Elevate your digital presence with our comprehensive suite of professional services
            </p>
          </div>
        </motion.div>

        <div className="mt-20 flex flex-wrap gap-8 justify-center">
          {services.map((service, index) => (
            <ServiceCard key={service.title} index={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;