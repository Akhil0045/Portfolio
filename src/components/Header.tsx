import { Menu, X, Bot } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      navigate('/#' + sectionId);
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? 'bg-white/80 backdrop-blur-xl shadow-lg border-b border-gray-100'
        : 'bg-transparent'
        }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-5">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className={`text-2xl font-bold tracking-tight transition-colors ${scrolled ? 'text-gray-900' : 'text-white'
              }`}
          >
            &lt;Akhil/&gt;
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className={`px-4 py-2.5 rounded-lg transition-all ${scrolled
                  ? 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                  : 'text-white/90 hover:text-white hover:bg-white/10'
                  }`}
              >
                {item}
              </button>
            ))}
            <Link
              to="/chat"
              className={`px-4 py-2.5 rounded-lg transition-all flex items-center gap-2.5 ${scrolled
                ? 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
            >
              <Bot size={18} strokeWidth={1.5} className="shrink-0" />
              <span>Assistant</span>
            </Link>
            <a
              href="#contact"
              className={`ml-2 px-6 py-2.5 rounded-lg transition-all font-medium ${scrolled
                ? 'bg-gray-900 text-white hover:bg-gray-800'
                : 'bg-white text-gray-900 hover:bg-gray-100'
                }`}
            >
              Hire Me
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden p-2.5 -m-2.5 rounded-lg hover:bg-white/10 transition-colors ${scrolled ? 'text-gray-900 hover:bg-gray-100' : 'text-white'}`}
          >
            {isMenuOpen ? <X size={22} strokeWidth={2} /> : <Menu size={22} strokeWidth={2} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-6 pb-6 flex flex-col gap-1 bg-white/95 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-gray-100">
            {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-left text-gray-700 hover:text-gray-900 py-3 px-4 rounded-xl hover:bg-gray-100 transition-colors"
              >
                {item}
              </button>
            ))}
            <Link
              to="/chat"
              onClick={() => setIsMenuOpen(false)}
              className="text-left text-gray-700 hover:text-gray-900 py-3 px-4 rounded-xl hover:bg-gray-100 transition-colors flex items-center gap-3"
            >
              <Bot size={18} strokeWidth={1.5} className="shrink-0" />
              <span>Assistant</span>
            </Link>
            <a
              href="#contact"
              onClick={() => setIsMenuOpen(false)}
              className="bg-gray-900 text-white text-center py-3 px-4 rounded-xl hover:bg-gray-800 transition-colors font-medium mt-2"
            >
              Hire Me
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}
