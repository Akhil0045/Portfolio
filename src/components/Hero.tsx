import { Github, Linkedin, Mail, ArrowDown, Download } from 'lucide-react';
import { ThreeBackground } from './ThreeBackground';
import { motion } from 'motion/react';

export function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Three.js Background */}
      <ThreeBackground />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-gray-900/60 to-black/60"></div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm mb-6 border border-white/20">
              👋 Welcome to my portfolio
            </div>

            <h1 className="text-5xl md:text-7xl mb-6 text-white font-bold tracking-tight">
              Hi, I'm <br />
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Akhil
              </span>
            </h1>

            <p className="text-2xl md:text-3xl text-white/90 mb-4">
              Computer Science Engineering Student
            </p>
            <p className="text-lg text-white/70 mb-8 max-w-xl">
              Passionate about building innovative solutions with clean code and modern technologies. 
              Currently in my third year, specializing in full-stack development.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-8">
              <button
                onClick={() => scrollToSection('projects')}
                className="px-8 py-4 bg-white text-gray-900 rounded-xl hover:bg-gray-100 transition-all hover:scale-105 shadow-xl font-medium"
              >
                View My Work
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl hover:bg-white/20 transition-all border border-white/20 hover:scale-105 font-medium"
              >
                Hire Me
              </button>
              <a
                href="#"
                download
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl hover:bg-white/20 transition-all border border-white/20 hover:scale-105 font-medium flex items-center gap-2"
              >
                <Download size={20} />
                <span>Resume</span>
              </a>
            </div>

            <div className="flex items-center gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white/20 transition-all border border-white/20 hover:scale-110"
              >
                <Github size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white/20 transition-all border border-white/20 hover:scale-110"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="mailto:akhil87901@gmail.com"
                className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white/20 transition-all border border-white/20 hover:scale-110"
              >
                <Mail size={20} />
              </a>
            </div>
          </motion.div>

          {/* Right Side - Profile Photo */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Animated border */}
              <div className="absolute -inset-4 bg-gradient-to-r from-gray-600 via-gray-400 to-gray-600 rounded-full opacity-75 blur-2xl animate-pulse"></div>
              
              {/* Photo container */}
              <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-white/20 backdrop-blur-sm bg-white/5">
                {/* Placeholder - Replace with your photo */}
                <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-8xl mb-4">👨‍💻</div>
                    <p className="text-white/70 text-sm px-6">
                      Replace this with your profile photo
                    </p>
                  </div>
                </div>
                {/* Uncomment and use this when you add your photo */}
                {/* <img 
                  src="/path-to-your-photo.jpg" 
                  alt="Akhil" 
                  className="w-full h-full object-cover"
                /> */}
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 px-6 py-3 bg-white rounded-full shadow-2xl">
                <p className="text-gray-900 font-medium">Available for Internship</p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          onClick={() => scrollToSection('about')}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-white/70 hover:text-white transition-all animate-bounce"
        >
          <ArrowDown size={32} />
        </motion.button>
      </div>
    </section>
  );
}
