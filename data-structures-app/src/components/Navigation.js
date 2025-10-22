import React, { useState, useEffect } from 'react';
import './Navigation.css';

const Navigation = ({ activePage, onPageChange, theme, onThemeToggle }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`main-navigation ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-content">
        <a href="/" className="nav-logo">
          CodeReady
        </a>
        
        <button 
          className="burger-menu"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2">
            {isMenuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <button 
            className={`nav-btn ${activePage === 'home' ? 'active' : ''}`}
            onClick={() => onPageChange('home')}
          >
            <span>🏠</span> Home
          </button>
          <button 
            className={`nav-btn ${activePage === 'datastructures' ? 'active' : ''}`}
            onClick={() => onPageChange('datastructures')}
          >
            <span>📚</span> Data Structures
          </button>
          <button 
            className={`nav-btn ${activePage === 'algorithms' ? 'active' : ''}`}
            onClick={() => onPageChange('algorithms')}
          >
            <span>🔧</span> Algorithms
          </button>
          <button 
            className={`nav-btn ${activePage === 'concepts' ? 'active' : ''}`}
            onClick={() => onPageChange('concepts')}
          >
            <span>💡</span> Programming Languages
          </button>
        </div>

        <button 
          className="theme-toggle"
          onClick={onThemeToggle}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? '🌙' : '☀️'}
        </button>
      </div>
    </nav>
  );
};

export default Navigation;