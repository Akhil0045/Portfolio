import { ExternalLink, Github } from 'lucide-react';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';

export function Projects() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const projects = [
    {
      title: 'Safe-Shore',
      description: 'A crowdsourced hazard monitoring system that uses sentiment analysis to analyze public reports and social data. It automatically tags and detects emergencies like floods, generates live severity-based reports, and enables faster, real-time disaster awareness and response for authorities and communities.'
,
      technologies: ['React-Native', 'Node.js', 'Supabase', 'Restful-api', 'Capacitor'],
      github: 'https://github.com',
      demo: '#'
    },
    {
      title: 'Ouick-Show',
      description: 'A scalable and dynamic movie booking website designed to handle multiple concurrent user sessions efficiently. The platform allows users to browse movies, view showtimes, select seats in real time, and complete bookings seamlessly. It ensures secure transactions, accurate seat availability, and a smooth, responsive experience across devices.'
,
      technologies: ['React', 'Node.js', 'Clerk', 'MongoDB'],
      github: 'https://github.com',
      demo: '#'
    },
    {
      title: 'Weather Dashboard',
      description: 'Interactive weather application with location-based forecasts, interactive charts, and detailed weather metrics.',
      technologies: ['JavaScript', 'OpenWeather API', 'Chart.js', 'CSS'],
      github: 'https://github.com',
      demo: '#'
    },
    {
      title: 'Real-Time Chat App',
      description: 'Modern chat application featuring multiple chat rooms, user authentication, message history, and real-time notifications.',
      technologies: ['React', 'Socket.io', 'Node.js', 'MongoDB'],
      github: 'https://github.com',
      demo: '#'
    },
    {
      title: 'AI Content Generator',
      description: 'AI-powered content creation tool that generates text, code snippets, and creative content using advanced language models.',
      technologies: ['React', 'Python', 'OpenAI API', 'FastAPI'],
      github: 'https://github.com',
      demo: '#'
    },
    {
      title: 'Social Media Analytics',
      description: 'Analytics dashboard for tracking social media metrics, engagement rates, and performance insights with beautiful visualizations.',
      technologies: ['Next.js', 'PostgreSQL', 'Prisma', 'Recharts'],
      github: 'https://github.com',
      demo: '#'
    }
  ];

// const projects = [
//   {
//     title: 'Safe-Shore',
//     description:
//       'A crowdsourced hazard monitoring system that uses sentiment analysis...',
//     technologies: ['React-Native', 'Node.js', 'Supabase', 'RESTful-api', 'Capacitor'],
//     github: 'https://github.com',
//     demo: '#',
//     image: 'https://picsum.photos/600/400?random=1',
//   },
//   {
//     title: 'Task Management System',
//     description:
//       'Collaborative project management tool with real-time updates...',
//     technologies: ['React', 'TypeScript', 'Firebase', 'Redux'],
//     github: 'https://github.com',
//     demo: '#',
//     image: 'https://picsum.photos/600/400?random=2',
//   },
//   {
//     title: 'Weather Dashboard',
//     description:
//       'Interactive weather application with location-based forecasts...',
//     technologies: ['JavaScript', 'OpenWeather API', 'Chart.js', 'CSS'],
//     github: 'https://github.com',
//     demo: '#',
//     image: 'https://picsum.photos/600/400?random=3',
//   },
//   {
//     title: 'Real-Time Chat App',
//     description:
//       'Modern chat application featuring multiple chat rooms...',
//     technologies: ['React', 'Socket.io', 'Node.js', 'MongoDB'],
//     github: 'https://github.com',
//     demo: '#',
//     image: 'https://picsum.photos/600/400?random=4',
//   },
//   {
//     title: 'AI Content Generator',
//     description:
//       'AI-powered content creation tool that generates text and code...',
//     technologies: ['React', 'Python', 'OpenAI API', 'FastAPI'],
//     github: 'https://github.com',
//     demo: '#',
//     image: 'https://picsum.photos/600/400?random=5',
//   },
//   {
//     title: 'Social Media Analytics',
//     description:
//       'Analytics dashboard for tracking social media metrics...',
//     technologies: ['Next.js', 'PostgreSQL', 'Prisma', 'Recharts'],
//     github: 'https://github.com',
//     demo: '#',
//     image: 'https://picsum.photos/600/400?random=6',
//   },
// ];

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

  return (
    <section id="projects" className="py-32 px-6 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          ref={ref}
          className="text-center mb-20"
        >
          <div className="inline-block px-4 py-2 bg-gray-900 text-white rounded-full text-sm mb-4 font-medium">
            My Work
          </div>
          <h2 className="text-5xl md:text-6xl mb-6 text-gray-900 font-bold">Featured Projects</h2>
          <div className="w-24 h-1 bg-gray-900 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Here are some of my recent projects that showcase my skills and experience
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={item}
              className="group relative"
            >
              <div className="relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-gray-200 h-full flex flex-col">
                {/* Gradient Header */}
                <div className="h-48 bg-gradient-to-br from-gray-800 to-gray-950 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <span className="text-white text-4xl">💻</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="text-2xl mb-3 text-gray-900 font-bold">{project.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed flex-1">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4 pt-4 border-t border-gray-100">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors font-medium"
                    >
                      <Github size={20} />
                      <span>Code</span>
                    </a>
                    <a
                      href={project.demo}
                      className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors font-medium"
                    >
                      <ExternalLink size={20} />
                      <span>Live Demo</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
