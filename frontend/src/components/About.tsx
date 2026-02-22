import { GraduationCap, Code, Rocket, Award, Briefcase, Target } from 'lucide-react';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';

export function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const stats = [
    { label: 'Year of Study', value: 'Third Year' },
    { label: 'Projects Completed', value: '10+' },
    { label: 'Technologies', value: '15+' },
    { label: 'GitHub Repos', value: '20+' },
  ];

  return (
    <section id="about" className="py-32 px-6 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gray-50 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          ref={ref}
          className="text-center mb-20"
        >
          <div className="inline-block px-5 py-2 bg-gray-900 text-white rounded-full text-sm mb-6 font-medium">
            About Me
          </div>
          <h2 className="text-5xl md:text-6xl mb-6 text-gray-900 font-bold">
            Know Who <span className="text-gray-600">I Am</span>
          </h2>
          <div className="w-24 h-1.5 bg-gray-900 mx-auto"></div>
        </motion.div>

        {/* Stats Section */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        >
          {stats.map((stat, index) => (
            <div key={index} className="bg-gray-900 p-6 rounded-2xl text-center hover:scale-105 transition-transform">
              <p className="text-4xl font-bold text-white mb-2">{stat.value}</p>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </div>
          ))}
        </motion.div> */}

        <div className="grid lg:grid-cols-2 gap-16 items-start mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-6">My Journey</h3>
            <div className="space-y-4">
              <p className="text-lg text-gray-700 leading-relaxed">
                I'm a passionate third-year Computer Science Engineering student with a strong 
                foundation in software development and a keen interest in creating impactful 
                digital solutions that solve real-world problems.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                My journey in tech has been driven by curiosity and a commitment to continuous 
                learning. I thrive on challenges and enjoy transforming complex problems into 
                elegant, user-friendly applications that make a difference.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                I'm actively seeking internship opportunities where I can contribute to 
                meaningful projects, collaborate with experienced developers, and grow 
                professionally in a dynamic environment while making real impact.
              </p>
            </div>

            <div className="mt-8 p-6 bg-gray-50 rounded-2xl border-l-4 border-gray-900">
              <p className="text-gray-700 italic">
                "Code is like humor. When you have to explain it, it's bad."
              </p>
              <p className="text-gray-600 text-sm mt-2">- Cory House</p>
            </div>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="grid sm:grid-cols-2 gap-6"
          >
            <motion.div variants={item} className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl shadow-xl group hover:-translate-y-2 transition-all">
              <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <GraduationCap className="text-white" size={28} />
              </div>
              <h3 className="text-xl mb-3 text-white font-bold">Education</h3>
              <p className="text-gray-300 leading-relaxed">
                B.Tech in Computer Science<br />
                <span className="text-sm text-gray-400">Third Year Student</span>
              </p>
            </motion.div>

            <motion.div variants={item} className="bg-gradient-to-br from-gray-800 to-gray-700 p-8 rounded-2xl shadow-xl group hover:-translate-y-2 transition-all">
              <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Code className="text-white" size={28} />
              </div>
              <h3 className="text-xl mb-3 text-white font-bold">Development</h3>
              <p className="text-gray-300 leading-relaxed">
                Full Stack Developer<br />
                <span className="text-sm text-gray-400">Modern Web Apps</span>
              </p>
            </motion.div>

            <motion.div variants={item} className="bg-gradient-to-br from-gray-700 to-gray-600 p-8 rounded-2xl shadow-xl group hover:-translate-y-2 transition-all">
              <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Rocket className="text-white" size={28} />
              </div>
              <h3 className="text-xl mb-3 text-white font-bold">Innovation</h3>
              <p className="text-gray-300 leading-relaxed">
                Problem Solver<br />
                <span className="text-sm text-gray-400">Creative Solutions</span>
              </p>
            </motion.div>

            <motion.div variants={item} className="bg-gradient-to-br from-gray-600 to-gray-500 p-8 rounded-2xl shadow-xl group hover:-translate-y-2 transition-all">
              <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Target className="text-white" size={28} />
              </div>
              <h3 className="text-xl mb-3 text-white font-bold">Goal</h3>
              <p className="text-gray-300 leading-relaxed">
                Career Growth<br />
                <span className="text-sm text-gray-400">Seeking Internship</span>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
