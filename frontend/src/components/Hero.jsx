import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight, Rocket } from 'lucide-react';
import heroImg from '../assets/hero_bg.png';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-secondary/20 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-primary mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span>Next Gen Portfolio Engine</span>
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
              Build a <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Professional</span> Portfolio in Minutes.
            </h1>
            
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto lg:mx-0">
              Create stunning, high-performance portfolios with AI-powered templates and live editing. Stand out from the crowd and land your dream job.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button className="btn-primary flex items-center group">
                Start Building Now
                <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" size={20} />
              </button>
              <button className="px-8 py-3 rounded-full border border-white/20 hover:bg-white/5 transition-all flex items-center">
                Watch Demo
                <ChevronRight className="ml-1" size={20} />
              </button>
            </div>
            
            <div className="mt-8 flex items-center justify-center lg:justify-start space-x-4 text-sm text-gray-500">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-background bg-gray-800" />
                ))}
              </div>
              <p>Trusted by <span className="text-white font-semibold">2,000+</span> developers</p>
            </div>
          </motion.div>

          {/* Visual Piece */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex-1 relative"
          >
            <div className="relative z-10 glass rounded-2xl p-2 shadow-2xl shadow-primary/10">
              <img 
                src={heroImg} 
                alt="Portfolio Builder Preview" 
                className="rounded-xl w-full object-cover shadow-2xl"
              />
              
              {/* Floating Badge */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 glass p-4 rounded-xl shadow-lg border border-white/20 hidden md:block"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center text-accent">
                    <Rocket size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">AI Score</p>
                    <p className="text-lg font-bold">98/100</p>
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Decorative Glow */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-primary/30 to-secondary/30 rounded-[2rem] blur-2xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
