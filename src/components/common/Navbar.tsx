import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, GraduationCap } from 'lucide-react'; //************ */
import { useAuth } from '../../contexts/AuthContext';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || location.pathname !== '/' 
          ? 'bg-white shadow-md' 
          : 'bg-transparent'
      }`}
    >
      <div className="container-custom">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <GraduationCap 
              size={32} 
              className={`${
                isScrolled || location.pathname !== '/' 
                  ? 'text-primary-600' 
                  : 'text-white'
              }`}
            />
            <span 
              className={`text-xl font-bold ${
                isScrolled || location.pathname !== '/' 
                  ? 'text-gray-800' 
                  : 'text-white'
              }`}
            >
              CollegePredict360
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              state={{ scrollTo: 'home' }}
              className={`font-medium transition-colors duration-300 ${
                isScrolled || location.pathname !== '/' 
                  ? 'text-gray-600 hover:text-primary-600' 
                  : 'text-white hover:text-primary-200'
              }`}
            >
              Home
            </Link>
            <Link to="/" state={{ scrollTo: 'features' }}  className={`font-medium transition-colors duration-300 ${
                isScrolled || location.pathname !== '/' 
                  ? 'text-gray-600 hover:text-primary-600' 
                  : 'text-white hover:text-primary-200'
              }`}>Features</Link>
            {/* <Link 
              to="#features" 
              className={`font-medium transition-colors duration-300 ${
                isScrolled || location.pathname !== '/' 
                  ? 'text-gray-600 hover:text-primary-600' 
                  : 'text-white hover:text-primary-200'
              }`}
            >
              Features
            </Link> */}
            <Link 
              to="/premium" 
              className={`font-medium transition-colors duration-300 ${
                isScrolled || location.pathname !== '/' 
                  ? 'text-gray-600 hover:text-primary-600' 
                  : 'text-white hover:text-primary-200'
              }`}
            >
              Pricing
            </Link>
            
            {isAuthenticated ? (
              <div className="relative group">
                <button 
                  className={`flex items-center font-medium transition-colors duration-300 ${
                    isScrolled || location.pathname !== '/' 
                      ? 'text-gray-600 hover:text-primary-600' 
                      : 'text-white hover:text-primary-200'
                  }`}
                >
                  Account <ChevronDown size={16} className="ml-1" />
                </button>
                <div className="absolute right-0 w-48 mt-2 bg-white rounded-lg shadow-lg py-2 z-20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <Link to="/dashboard" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Dashboard</Link>
                  <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Profile</Link>
                  <Link to="/reports" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">My Reports</Link>
                  <button 
                    onClick={logout} 
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/login" 
                  className={`font-medium transition-colors duration-300 ${
                    isScrolled || location.pathname !== '/' 
                      ? 'text-gray-600 hover:text-primary-600' 
                      : 'text-white hover:text-primary-200'
                  }`}
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="btn btn-primary"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button 
            onClick={toggleMenu} 
            className="md:hidden"
          >
            {isMenuOpen ? (
              <X size={24} className={isScrolled || location.pathname !== '/' ? 'text-gray-800' : 'text-white'} />
            ) : (
              <Menu size={24} className={isScrolled || location.pathname !== '/' ? 'text-gray-800' : 'text-white'} />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white py-4 px-2 rounded-lg shadow-lg animate-fade-in">
            <Link 
              to="/" 
              onClick={closeMenu}
              className="block py-3 px-4 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              Home
            </Link>
            <Link 
              to="/#features" 
              onClick={closeMenu}
              className="block py-3 px-4 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              Features
            </Link>
            <Link 
              to="/premium" 
              onClick={closeMenu}
              className="block py-3 px-4 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              Pricing
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link 
                  to="/dashboard" 
                  onClick={closeMenu}
                  className="block py-3 px-4 text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  Dashboard
                </Link>
                <Link 
                  to="/profile" 
                  onClick={closeMenu}
                  className="block py-3 px-4 text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  Profile
                </Link>
                <Link 
                  to="/reports" 
                  onClick={closeMenu}
                  className="block py-3 px-4 text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  My Reports
                </Link>
                <button 
                  onClick={() => {
                    logout();
                    closeMenu();
                  }} 
                  className="w-full text-left py-3 px-4 text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="space-y-3 mt-3">
                <Link 
                  to="/login" 
                  onClick={closeMenu}
                  className="block w-full py-3 px-4 text-center text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  onClick={closeMenu}
                  className="block w-full py-3 px-4 text-center bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;