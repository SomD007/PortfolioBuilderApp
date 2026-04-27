import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Drasner',
    role: 'Senior Developer',
    content: 'The fastest way to build a professional site. I was able to customize every detail without writing a single line of CSS.',
    avatar: 'https://i.pravatar.cc/100?u=sarah'
  },
  {
    name: 'Alex Rivera',
    role: 'UX Designer',
    content: 'The glassmorphism templates are absolutely stunning. My portfolio finally looks as modern as the apps I design.',
    avatar: 'https://i.pravatar.cc/100?u=alex'
  },
  {
    name: 'Jordan Smith',
    role: 'Freelance Engineer',
    content: 'AI features saved me hours of writing. It generated a bio that actually sounds like me, but better!',
    avatar: 'https://i.pravatar.cc/100?u=jordan'
  }
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 bg-gradient-to-b from-transparent to-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Loved by <span className="text-secondary">Community.</span></h2>
          <p className="text-gray-400 text-lg">See what other professionals are saying about PortfolioBuilder.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass p-8 rounded-2xl relative border border-white/5"
            >
              <Quote className="absolute top-6 right-8 text-primary/20" size={40} />
              
              <div className="flex mb-4 text-secondary">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>

              <p className="text-gray-300 italic mb-8 relative z-10">
                "{testimonial.content}"
              </p>

              <div className="flex items-center gap-4">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full ring-2 ring-primary/30"
                />
                <div>
                  <h4 className="font-bold text-white">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
