import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  FileText, 
  Award, 
  LifeBuoy, 
  ArrowRight, 
  File, 
  BarChart
} from 'lucide-react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useAuth } from '../contexts/AuthContext';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  // Set page title
  useEffect(() => {
    document.title = 'Dashboard - CollegePredict360';
  }, []);

  // Dashboard stats
  const stats = [
    {
      title: 'Predictions Made',
      value: '3',
      icon: <BarChart size={24} className="text-primary-500" />,
      change: '+2 this week',
      positive: true
    },
    {
      title: 'Reports Downloaded',
      value: user?.isPremium ? '2' : '0',
      icon: <File size={24} className="text-secondary-500" />,
      change: user?.isPremium ? '+1 this week' : 'Upgrade to access',
      positive: user?.isPremium
    }
  ];

  // Quick action cards
  const actions = [
    {
      title: 'Start Prediction',
      description: 'Enter your rank and preferences to find matching colleges',
      icon: <GraduationCap size={28} className="text-primary-600" />,
      path: '/predictor',
      color: 'bg-primary-50'
    },
    {
      title: 'My PDF Reports',
      description: 'View and download your saved college predictions',
      icon: <FileText size={28} className="text-secondary-600" />,
      path: '/reports',
      color: 'bg-secondary-50'
    },
    {
      title: 'Upgrade to Premium',
      description: 'Get full access to all features and unlimited predictions',
      icon: <Award size={28} className="text-accent-600" />,
      path: '/premium',
      color: 'bg-accent-50'
    },
    {
      title: 'Contact Support',
      description: 'Need help? Our support team is ready to assist you',
      icon: <LifeBuoy size={28} className="text-success-600" />,
      path: '/support',
      color: 'bg-success-50'
    }
  ];

  return (
    <DashboardLayout pageTitle="Dashboard">
      <div className="space-y-8">
        {/* Welcome section */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Hi, {user?.name} 👋</h2>
              <p className="text-gray-600 mt-1">
                Welcome to your CollegePredict360 dashboard
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Link to="/predictor">
                <Button variant="primary">
                  Start New Prediction
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="flex items-start">
              <div className="mr-4 p-3 rounded-lg bg-gray-100">
                {stat.icon}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
                <p className={`text-sm ${stat.positive ? 'text-success-600' : 'text-gray-500'} mt-1`}>
                  {stat.change}
                </p>
              </div>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {actions.map((action, index) => (
              <Link to={action.path} key={index} className="block">
                <Card 
                  className="h-full hover:shadow-md transition-shadow duration-300"
                  hover
                >
                  <div className={`${action.color} p-3 rounded-lg inline-block mb-4`}>
                    {action.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{action.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{action.description}</p>
                  <div className="flex items-center text-primary-600 text-sm font-medium">
                    Get Started <ArrowRight size={16} className="ml-1" />
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity (or Premium Upgrade) */}
        {!user?.isPremium ? (
          <Card className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h3 className="text-xl font-bold mb-2">Upgrade to Premium</h3>
                <p className="opacity-90">
                  Get access to all 60 college matches, PDF downloads, and more.
                </p>
              </div>
              <Link to="/premium">
                <Button 
                  className="bg-white text-primary-600 hover:bg-gray-100"
                >
                  View Premium Plans
                </Button>
              </Link>
            </div>
          </Card>
        ) : (
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
            <Card>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="mr-4 p-2 rounded-full bg-primary-100 text-primary-600">
                    <GraduationCap size={20} />
                  </div>
                  <div>
                    <p className="font-medium">College prediction created</p>
                    <p className="text-sm text-gray-500">
                      EAMCET Rank 4512, CSE preference - April 25, 2025
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mr-4 p-2 rounded-full bg-secondary-100 text-secondary-600">
                    <FileText size={20} />
                  </div>
                  <div>
                    <p className="font-medium">PDF report downloaded</p>
                    <p className="text-sm text-gray-500">
                      EAMCET_4512_Report.pdf - April 25, 2025
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;