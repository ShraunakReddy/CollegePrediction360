import React, { ReactNode, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  GraduationCap, 
  FileText, 
  User, 
  LifeBuoy, 
  LogOut, 
  Menu, 
  X,
  ChevronRight,
  Bell 
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface DashboardLayoutProps {
  children: ReactNode;
  pageTitle: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ 
  children, 
  pageTitle 
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { logout, user } = useAuth();
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const navItems = [
    { 
      name: 'Dashboard', 
      icon: <LayoutDashboard size={20} />, 
      path: '/dashboard',
      active: location.pathname === '/dashboard' 
    },
    { 
      name: 'College Predictor', 
      icon: <GraduationCap size={20} />, 
      path: '/predictor',
      active: location.pathname === '/predictor' 
    },
    { 
      name: 'My Reports', 
      icon: <FileText size={20} />, 
      path: '/reports',
      active: location.pathname === '/reports' 
    },
    { 
      name: 'Profile', 
      icon: <User size={20} />, 
      path: '/profile',
      active: location.pathname === '/profile' 
    },
    { 
      name: 'Support', 
      icon: <LifeBuoy size={20} />, 
      path: '/support',
      active: location.pathname === '/support' 
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar for desktop */}
      <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-gray-900 text-white">
        <div className="flex-1 flex flex-col min-h-0">
          <div className="flex items-center h-16 px-4 bg-gray-800">
            <Link to="/" className="flex items-center">
              <GraduationCap size={28} className="text-primary-400" />
              <span className="ml-2 text-lg font-semibold">CollegePredict360</span>
            </Link>
          </div>
          
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <nav className="mt-5 flex-1 px-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`
                    group flex items-center px-4 py-3 text-sm font-medium rounded-lg
                    ${item.active 
                      ? 'bg-gray-800 text-white' 
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'}
                  `}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          
          <div className="p-4 border-t border-gray-700">
            <button
              onClick={logout}
              className="flex items-center px-4 py-3 text-sm font-medium rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white w-full"
            >
              <LogOut size={20} className="mr-3" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64 flex flex-col flex-1 w-full">
        {/* Top navbar */}
        <div className="sticky top-0 z-10 bg-white shadow-sm lg:shadow-none">
          <div className="flex justify-between items-center h-16 px-4 lg:px-8">
            <div className="flex items-center">
              <button
                onClick={toggleSidebar}
                className="lg:hidden text-gray-600 focus:outline-none"
              >
                {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <h1 className="text-xl font-semibold text-gray-800 ml-4">{pageTitle}</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-gray-700 relative">
                <Bell size={22} />
                <span className="absolute -top-1 -right-1 bg-primary-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                  2
                </span>
              </button>
              
              <div className="flex items-center">
                <div className="mr-3 text-right hidden sm:block">
                  <p className="text-sm font-medium text-gray-700">
                    {user?.name || 'User'}
                  </p>
                  <p className="text-xs text-gray-500">
                    {user?.isPremium ? 'Premium' : 'Free'}
                  </p>
                </div>
                <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-semibold">
                  {user?.name?.charAt(0) || 'U'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile sidebar */}
        {isSidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-40 flex">
            <div 
              className="fixed inset-0 bg-gray-600 bg-opacity-75"
              onClick={closeSidebar}
            ></div>
            
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-gray-900 transform transition-all ease-in-out duration-300">
              <div className="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  onClick={closeSidebar}
                >
                  <span className="sr-only">Close sidebar</span>
                  <X size={24} className="text-white" />
                </button>
              </div>
              
              <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                <div className="flex items-center px-4">
                  <GraduationCap size={28} className="text-primary-400" />
                  <span className="ml-2 text-lg font-semibold text-white">CollegePredict360</span>
                </div>
                
                <nav className="mt-8 px-3 space-y-1">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={`
                        group flex items-center px-4 py-3 text-sm font-medium rounded-lg
                        ${item.active 
                          ? 'bg-gray-800 text-white' 
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white'}
                      `}
                      onClick={closeSidebar}
                    >
                      <span className="mr-3">{item.icon}</span>
                      {item.name}
                      <ChevronRight size={16} className="ml-auto" />
                    </Link>
                  ))}
                </nav>
              </div>
              
              <div className="p-4 border-t border-gray-700">
                <button
                  onClick={() => {
                    logout();
                    closeSidebar();
                  }}
                  className="flex items-center px-4 py-3 text-sm font-medium rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white w-full"
                >
                  <LogOut size={20} className="mr-3" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;