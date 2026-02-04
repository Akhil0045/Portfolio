import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/80 backdrop-blur-xl shadow-lg border-b border-gray-100' 
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 py-5">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => scrollToSection('home')}
            className={`text-2xl font-bold tracking-tight transition-colors ${
              scrolled ? 'text-gray-900' : 'text-white'
            }`}
          >
            &lt;Akhil/&gt;
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className={`px-4 py-2 rounded-lg transition-all ${
                  scrolled
                    ? 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
              >
                {item}
              </button>
            ))}
            <a
              href="#contact"
              className={`ml-4 px-6 py-2 rounded-lg transition-all ${
                scrolled
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
            className={`md:hidden ${scrolled ? 'text-gray-900' : 'text-white'}`}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-6 pb-6 flex flex-col gap-3 bg-white/95 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-gray-100">
            {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-left text-gray-700 hover:text-gray-900 py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {item}
              </button>
            ))}
            <a
              href="#contact"
              className="bg-gray-900 text-white text-center py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Hire Me
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}
