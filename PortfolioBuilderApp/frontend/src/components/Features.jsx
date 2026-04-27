import React from 'react';
import { motion } from 'framer-motion';
import { Layout, Link2, Edit3, Cpu, MousePointer2, Zap } from 'lucide-react';

const features = [
  {
    title: 'Multiple Templates',
    description: 'Choose from 50+ professionally designed, conversion-optimized templates for any industry.',
    icon: Layout,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10'
  },
  {
    title: 'Custom Portfolios',
    description: 'Claim your unique link (e.g., portfolio.me/yourname) or connect your own custom domain.',
    icon: Link2,
    color: 'text-purple-500',
    bg: 'bg-purple-500/10'
  },
  {
    title: 'Live Builder',
    description: 'Draggable elements, real-time preview, and intuitive editor. What you see is what you get.',
    icon: Edit3,
    color: 'text-green-500',
    bg: 'bg-green-500/10'
  },
  {
    title: 'AI-Powered Copilot',
    description: 'Let AI generate your bio, optimize your project descriptions, and suggest layouts.',
    icon: Cpu,
    color: 'text-cyan-500',
    bg: 'bg-cyan-500/10'
  },
  {
    title: 'Interactive Elements',
    description: 'Add animations, hover effects, and interactive charts to make your work come alive.',
    icon: MousePointer2,
    color: 'text-orange-500',
    bg: 'bg-orange-500/10'
  },
  {
    title: 'Blazing Fast',
    description: 'Global CDN, image optimization, and next-gen tech ensure your site loads instantly.',
    icon: Zap,
    color: 'text-yellow-500',
    bg: 'bg-yellow-500/10'
  }
];

const FeatureCard = ({ feature, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="glass p-8 rounded-2xl border border-white/5 hover:border-white/20 transition-all duration-300 group"
    >
      <div className={`w-14 h-14 rounded-xl ${feature.bg} flex items-center justify-center mb-6 transition-transform group-hover:scale-110 group-hover:rotate-3`}>
        <feature.icon className={`${feature.color}`} size={28} />
      </div>
      <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{feature.title}</h3>
      <p className="text-gray-400 leading-relaxed">
        {feature.description}
      </p>
    </motion.div>
  );
};

const Features = () => {
  return (
    <section id="features" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-4"
          >
            Everything you need to <span className="text-primary italic">stand out.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            Powerful tools designed for developers, designers, and creatives who want a professional edge.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
