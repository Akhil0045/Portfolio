import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { Code2, Database, Globe, BookOpen,Terminal, Wrench, Gamepad } from 'lucide-react';

export function Skills() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const skillCategories = [
    {
      title: 'Frontend Development',
      icon: Globe,
      skills: ['React', 'TypeScript', 'JavaScript', 'HTML/CSS', 'Tailwind CSS',  'Redux']
    },
    {
      title: 'Backend Development',
      icon: Terminal,
      skills: ['Node.js', 'Express',  'RESTful APIs']
    },
    {
      title: 'Database',
      icon: Database,
      skills: ['MongoDB', 'PostgreSQL', 'MySQL', 'Firebase', 'Supabase']
    },
     {
      title: 'Game Development',
      icon: Gamepad,
      skills: ['Unity', 'Blender', 'Vuforia']
    },

    {
      title: 'Programming Languages',
      icon: Code2,
      skills: ['C++', 'Python', 'Java', 'JavaScript', 'TypeScript', 'SQL']
    },
    {
      title: 'Tools & Technologies',
      icon: Wrench,
      skills: ['Git', 'GitHub', 'VS Code',  'Postman', 'Figma']
     }
     //,
    // {
    //   title: 'Core Concepts',
    //   icon: BookOpen,
    //   skills: ['Data Structures', 'Algorithms', 'OOP', 'DBMS', 'OS', 'Computer Networks']
    // }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section id="skills" className="py-32 px-6 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          ref={ref}
          className="text-center mb-20"
        >
          <div className="inline-block px-5 py-2 bg-gray-900 text-white rounded-full text-sm mb-6 font-medium">
            My Expertise
          </div>
          <h2 className="text-5xl md:text-6xl mb-6 text-gray-900 font-bold">
            Skills & <span className="text-gray-600">Technologies</span>
          </h2>
          <div className="w-24 h-1.5 bg-gray-900 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A comprehensive overview of my technical skills and areas of expertise
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={index}
                variants={item}
                className="group relative"
              >
                <div className="relative bg-white p-8 rounded-3xl border-2 border-gray-200 h-full hover:shadow-2xl hover:border-gray-900 transition-all">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gray-900 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="text-white" size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{category.title}</h3>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-4 py-2 bg-gray-50 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-900 hover:text-white transition-colors border border-gray-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
