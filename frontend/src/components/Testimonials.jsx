import { motion } from 'framer-motion';

const testimonials = [
  {
    name: "Sarah Johnson",
    position: "CEO, TechStart",
    testimonial: "Working with this agency has transformed our online presence. Their web development and social media management services are top-notch.",
    image: "https://placehold.co/100x100/252945/white?text=SJ"
  },
  {
    name: "Michael Chen",
    position: "Content Creator",
    testimonial: "Their video editing and thumbnail design services have significantly improved my channel's performance. Highly recommended!",
    image: "https://placehold.co/100x100/252945/white?text=MC"
  },
  {
    name: "Emily Rodriguez",
    position: "Marketing Director",
    testimonial: "The team's creativity and attention to detail in our social media campaign exceeded our expectations. Outstanding results!",
    image: "https://placehold.co/100x100/252945/white?text=ER"
  }
];

const TestimonialCard = ({ testimonial, name, position, image, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="p-10 rounded-3xl w-full sm:w-[360px] shine-effect card-hover"
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600/30 via-cyan-600/30 to-blue-600/30 rounded-2xl blur opacity-20"></div>
      <p className="text-white font-black text-[48px]">"</p>
      <div className="mt-1">
        <p className="text-white tracking-wider text-[18px]">{testimonial}</p>
        <div className="mt-7 flex justify-between items-center gap-1">
          <div className="flex-1 flex flex-col">
            <p className="text-white font-medium text-[16px]">
              <span className="violet-gradient">@</span> {name}
            </p>
            <p className="mt-1 text-secondary text-[12px]">{position}</p>
          </div>
          <img
            src={image}
            alt={`feedback-by-${name}`}
            className="w-10 h-10 rounded-full object-cover"
          />
        </div>
      </div>
    </motion.div>
  );
};

const Testimonials = () => {
  return (
    <section className="relative w-full min-h-screen mx-auto py-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-20"
        >
          <p className="text-secondary uppercase tracking-wider text-center">What Others Say</p>
          <h2 className="text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px] text-center">
            Testimonials
          </h2>
        </motion.div>

        <div className="flex flex-wrap gap-7 justify-center">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={testimonial.name} index={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

