import React, { useState, useEffect } from 'react';
import { Eye, Download, Clock, FileText } from 'lucide-react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

// Mock report data
interface Report {
  id: string;
  date: string;
  exam: string;
  rank: string;
  category: string;
}

const MyReportsPage: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const { user } = useAuth();
  
  // Set page title
  useEffect(() => {
    document.title = 'My Reports - CollegePredict360';
  }, []);
  
  // Generate mock reports for demonstration
  useEffect(() => {
    const mockReports: Report[] = [
      {
        id: '1',
        date: 'May 20, 2025',
        exam: 'EAMCET',
        rank: '4512',
        category: 'BC-B'
      },
      {
        id: '2',
        date: 'May 15, 2025',
        exam: 'JEE Mains',
        rank: '12458',
        category: 'OC'
      }
    ];
    
    setReports(mockReports);
  }, []);

  return (
    <DashboardLayout pageTitle="My Reports">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-1">
              My PDF Reports
            </h2>
            <p className="text-gray-600">
              View and download your saved college prediction reports
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link to="/predictor">
              <Button variant="primary">
                Create New Prediction
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Reports list */}
        <Card>
          {reports.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Report Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Exam
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rank
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {reports.map((report) => (
                    <tr key={report.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Clock size={16} className="text-gray-400 mr-2" />
                          <span className="text-sm text-gray-900">{report.date}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{report.exam}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{report.rank}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{report.category}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="flex justify-center space-x-3">
                          <button 
                            className="text-primary-600 hover:text-primary-800 transition-colors"
                            title="View Report"
                          >
                            <Eye size={18} />
                          </button>
                          {user?.isPremium ? (
                            <button 
                              className="text-secondary-600 hover:text-secondary-800 transition-colors"
                              title="Download Report"
                            >
                              <Download size={18} />
                            </button>
                          ) : (
                            <Link 
                              to="/premium"
                              className="text-gray-400 hover:text-gray-600 transition-colors"
                              title="Upgrade to Download"
                            >
                              <Download size={18} />
                            </Link>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="mx-auto h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <FileText size={24} className="text-gray-500" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No reports yet</h3>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">
                You haven't created any prediction reports yet. Start by making a new college prediction.
              </p>
              <Link to="/predictor">
                <Button variant="primary">
                  Create New Prediction
                </Button>
              </Link>
            </div>
          )}
          
          {/* Premium Upgrade Banner (If not premium) */}
          {!user?.isPremium && reports.length > 0 && (
            <div className="mt-6 p-6 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg border border-primary-100">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">Upgrade to Download Reports</h3>
                  <p className="text-gray-600">
                    Get full access to download PDF reports and unlock all premium features.
                  </p>
                </div>
                <Link to="/premium">
                  <Button variant="primary">
                    Upgrade to Premium
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default MyReportsPage;