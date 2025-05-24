// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { 
//   Search, 
//   Filter, 
//   FileDown, 
//   ChevronDown, 
//   Download, 
//   Lock, 
//   CheckCircle, 
//   AlertCircle 
// } from 'lucide-react';
// import DashboardLayout from '../components/dashboard/DashboardLayout';
// import Card from '../components/ui/Card';
// import Button from '../components/ui/Button';
// import Input from '../components/ui/Input';
// import { useAuth } from '../contexts/AuthContext';
// import { useToast } from '../contexts/ToastContext';

// // Mock data for college predictions
// interface College {
//   id: number;
//   name: string;
//   branch: string;
//   region: string;
//   rankRange: string;
//   type: 'Govt' | 'Private';
//   riskLevel: 'Safe' | 'Moderate' | 'Risky';
// }

// const generateMockColleges = (rank: number): College[] => {
//   const colleges: College[] = [];
//   const collegeNames = [
//     'Osmania University College of Engineering',
//     'Jawaharlal Nehru Technological University',
//     'Chaitanya Bharathi Institute of Technology',
//     'Vasavi College of Engineering',
//     'VNR Vignana Jyothi Institute of Engineering',
//     'Gokaraju Rangaraju Institute of Engineering',
//     'CVR College of Engineering',
//     'Mahatma Gandhi Institute of Technology',
//     'Sreenidhi Institute of Science and Technology',
//     'Vardhaman College of Engineering',
//     'Geethanjali College of Engineering',
//     'Muffakham Jah College of Engineering',
//     'Matrusri Engineering College',
//     'G Narayanamma Institute of Technology',
//     'KG Reddy College of Engineering',
//     'Sree Vidyanikethan Engineering College',
//     'SRM University',
//     'Amrita Vishwa Vidyapeetham',
//     'Keshav Memorial Institute of Technology',
//     'Guru Nanak Institutions Technical Campus'
//   ];
  
//   const branches = [
//     'Computer Science Engineering (CSE)',
//     'Electronics & Communication (ECE)',
//     'Electrical & Electronics (EEE)',
//     'Mechanical Engineering',
//     'Civil Engineering',
//     'Information Technology (IT)',
//     'Artificial Intelligence & ML',
//     'Data Science'
//   ];
  
//   const regions = ['OU', 'AU', 'SVU'];
//   const types: ('Govt' | 'Private')[] = ['Govt', 'Private'];
  
//   // Generate 60 college entries
//   for (let i = 0; i < 60; i++) {
//     const rankOffset = Math.floor(Math.random() * 500) - 250;
//     const minRank = Math.max(100, rank + rankOffset - 200);
//     const maxRank = minRank + Math.floor(Math.random() * 800) + 200;
    
//     let riskLevel: 'Safe' | 'Moderate' | 'Risky';
    
//     if (rank <= minRank) {
//       riskLevel = 'Safe';
//     } else if (rank <= maxRank) {
//       riskLevel = 'Moderate';
//     } else {
//       riskLevel = 'Risky';
//     }
    
//     colleges.push({
//       id: i + 1,
//       name: collegeNames[Math.floor(Math.random() * collegeNames.length)],
//       branch: branches[Math.floor(Math.random() * branches.length)],
//       region: regions[Math.floor(Math.random() * regions.length)],
//       rankRange: `${minRank}–${maxRank}`,
//       type: types[Math.floor(Math.random() * types.length)],
//       riskLevel: riskLevel
//     });
//   }
  
//   // Sort by risk level (Safe first, then Moderate, then Risky)
//   return colleges.sort((a, b) => {
//     const riskOrder = { 'Safe': 0, 'Moderate': 1, 'Risky': 2 };
//     return riskOrder[a.riskLevel] - riskOrder[b.riskLevel];
//   });
// };

// interface FormData {
//   examType: string;
//   rank: string;
//   category: string;
//   gender: string;
//   region: string;
//   branches: string[];
//   preferredColleges: string;
//   academicYear: string;
//   email: string;
// }

// const PredictionResults: React.FC = () => {
//   const [formData, setFormData] = useState<FormData | null>(null);
//   const [colleges, setColleges] = useState<College[]>([]);
//   const [filteredColleges, setFilteredColleges] = useState<College[]>([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedBranch, setSelectedBranch] = useState('All');
//   const [selectedRisk, setSelectedRisk] = useState('All');
//   const [isPDFModalOpen, setIsPDFModalOpen] = useState(false);
//   const [reportName, setReportName] = useState('');
//   const [isDownloading, setIsDownloading] = useState(false);
  
//   const { user } = useAuth();
//   const { showToast } = useToast();
//   const navigate = useNavigate();
  
//   // Get unique branches from colleges
//   const uniqueBranches = ['All', ...new Set(colleges.map(college => college.branch))];
  
//   // Set page title
//   useEffect(() => {
//     document.title = 'College Predictions - CollegePredict360';
//   }, []);
  
//   // Load prediction data from session storage
//   useEffect(() => {
//     const storedData = sessionStorage.getItem('predictionData');
    
//     if (!storedData) {
//       navigate('/predictor');
//       return;
//     }
    
//     const parsedData = JSON.parse(storedData) as FormData;
//     setFormData(parsedData);
    
//     // Set default report name
//     setReportName(`${parsedData.examType}_${parsedData.rank}_Report`);
    
//     // Generate mock college predictions based on the rank
//     const allColleges = generateMockColleges(Number(parsedData.rank));
//     setColleges(allColleges);
//     setFilteredColleges(allColleges);
    
//   }, [navigate]);
  
//   // Filter colleges based on search term, branch and risk level
//   useEffect(() => {
//     if (colleges.length === 0) return;
    
//     let filtered = [...colleges];
    
//     // Filter by search term
//     if (searchTerm) {
//       filtered = filtered.filter(college => 
//         college.name.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }
    
//     // Filter by branch
//     if (selectedBranch !== 'All') {
//       filtered = filtered.filter(college => college.branch === selectedBranch);
//     }
    
//     // Filter by risk level
//     if (selectedRisk !== 'All') {
//       filtered = filtered.filter(college => college.riskLevel === selectedRisk);
//     }
    
//     setFilteredColleges(filtered);
//   }, [searchTerm, selectedBranch, selectedRisk, colleges]);
  
//   // If not premium, show only top 5 colleges
//   const displayedColleges = user?.isPremium 
//     ? filteredColleges 
//     : filteredColleges.slice(0, 5);
  
//   const handleDownloadPDF = () => {
//     if (!user?.isPremium) {
//       showToast('Please upgrade to Premium to download PDF reports', 'warning');
//       setIsPDFModalOpen(false);
//       navigate('/premium');
//       return;
//     }
    
//     setIsDownloading(true);
    
//     // Simulate PDF generation and download
//     setTimeout(() => {
//       showToast('PDF Report downloaded successfully!', 'success');
//       setIsDownloading(false);
//       setIsPDFModalOpen(false);
//     }, 2000);
//   };
  
//   // Risk level badge component
//   const RiskBadge: React.FC<{ level: 'Safe' | 'Moderate' | 'Risky' }> = ({ level }) => {
//     switch (level) {
//       case 'Safe':
//         return (
//           <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success-100 text-success-800">
//             <CheckCircle size={12} className="mr-1" /> Safe
//           </span>
//         );
//       case 'Moderate':
//         return (
//           <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-warning-100 text-warning-800">
//             <AlertCircle size={12} className="mr-1" /> Moderate
//           </span>
//         );
//       case 'Risky':
//         return (
//           <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-error-100 text-error-800">
//             <AlertCircle size={12} className="mr-1" /> Risky
//           </span>
//         );
//     }
//   };

//   if (!formData) {
//     return (
//       <DashboardLayout pageTitle="Loading Predictions...">
//         <div className="flex justify-center items-center h-64">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
//         </div>
//       </DashboardLayout>
//     );
//   }

//   return (
//     <DashboardLayout pageTitle="College Predictions">
//       <div className="space-y-6">
//         {/* Result summary */}
//         <Card className="flex flex-col md:flex-row justify-between items-start md:items-center bg-primary-50 border border-primary-100">
//           <div>
//             <h2 className="text-xl font-bold text-gray-800 mb-2">
//               🎓 Your Top 60 College Matches
//             </h2>
//             <p className="text-gray-600">
//               Based on {formData.examType} Rank: <span className="font-semibold">{formData.rank}</span>,
//               Category: <span className="font-semibold">{formData.category}</span>,
//               Region: <span className="font-semibold">{formData.region}</span>
//             </p>
//           </div>
//           <div className="mt-4 md:mt-0">
//             <Button 
//               onClick={() => setIsPDFModalOpen(true)}
//               variant="primary"
//               className="flex items-center"
//             >
//               <FileDown size={18} className="mr-2" />
//               Download PDF Report
//             </Button>
//           </div>
//         </Card>

//         {/* Filters */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           {/* Search */}
//           <div>
//             <Input
//               placeholder="Search college name..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               leftIcon={<Search size={18} className="text-gray-500" />}
//             />
//           </div>
          
//           {/* Branch filter */}
//           <div>
//             <div className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent relative">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center">
//                   <Filter size={18} className="text-gray-500 mr-2" />
//                   <select 
//                     value={selectedBranch}
//                     onChange={(e) => setSelectedBranch(e.target.value)}
//                     className="appearance-none bg-transparent focus:outline-none w-full"
//                   >
//                     {uniqueBranches.map((branch) => (
//                       <option key={branch} value={branch}>
//                         {branch === 'All' ? 'All Branches' : branch}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 <ChevronDown size={18} className="text-gray-500" />
//               </div>
//             </div>
//           </div>
          
//           {/* Risk level filter */}
//           <div>
//             <div className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent relative">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center">
//                   <AlertCircle size={18} className="text-gray-500 mr-2" />
//                   <select 
//                     value={selectedRisk}
//                     onChange={(e) => setSelectedRisk(e.target.value)}
//                     className="appearance-none bg-transparent focus:outline-none w-full"
//                   >
//                     <option value="All">All Risk Levels</option>
//                     <option value="Safe">Safe Only</option>
//                     <option value="Moderate">Moderate Only</option>
//                     <option value="Risky">Risky Only</option>
//                   </select>
//                 </div>
//                 <ChevronDown size={18} className="text-gray-500" />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Results Table */}
//         <Card className="overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     College Name
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Branch
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Region
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Rank Range
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Type
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Risk Level
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {displayedColleges.map((college) => (
//                   <tr key={college.id} className="hover:bg-gray-50">
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm font-medium text-gray-900">{college.name}</div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-500">{college.branch}</div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-500">{college.region}</div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-500">{college.rankRange}</div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-500">{college.type}</div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <RiskBadge level={college.riskLevel} />
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
          
//           {/* Premium Upgrade Banner */}
//           {!user?.isPremium && (
//             <div className="p-6 bg-gradient-to-r from-primary-50 to-secondary-50 border-t border-primary-100">
//               <div className="flex flex-col md:flex-row justify-between items-center">
//                 <div className="flex items-center mb-4 md:mb-0">
//                   <Lock size={24} className="text-primary-600 mr-3" />
//                   <div>
//                     <h3 className="text-lg font-semibold text-gray-800">Unlock Full Results</h3>
//                     <p className="text-gray-600">
//                       Upgrade to Premium to see all 60 college matches and download PDF reports.
//                     </p>
//                   </div>
//                 </div>
//                 <Link to="/premium">
//                   <Button variant="primary">
//                     Upgrade to Premium
//                   </Button>
//                 </Link>
//               </div>
//             </div>
//           )}
//         </Card>
//       </div>
      
//       {/* PDF Download Modal */}
//       {isPDFModalOpen && (
//         <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
//           <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
//             <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            
//             <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
//             <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
//               <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
//                 <div className="sm:flex sm:items-start">
//                   <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-primary-100 sm:mx-0 sm:h-10 sm:w-10">
//                     <FileDown size={20} className="text-primary-600" />
//                   </div>
//                   <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
//                     <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
//                       Download Prediction Report
//                     </h3>
//                     <div className="mt-4">
//                       <Input
//                         label="Report Name"
//                         type="text"
//                         value={reportName}
//                         onChange={(e) => setReportName(e.target.value)}
//                       />
                      
//                       {!user?.isPremium ? (
//                         <div className="mt-4 p-3 bg-warning-50 rounded-lg text-warning-800 text-sm flex items-start">
//                           <AlertCircle size={18} className="mr-2 flex-shrink-0 mt-0.5" />
//                           <p>
//                             PDF download is a premium feature. Upgrade to download this report and unlock all 60 college matches.
//                           </p>
//                         </div>
//                       ) : (
//                         <div className="mt-4 bg-gray-100 rounded-lg p-4">
//                           <div className="flex items-center justify-between">
//                             <div className="flex items-center">
//                               <div className="bg-primary-600 h-12 w-10 flex items-center justify-center text-white rounded-l-lg">
//                                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
//                                   <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
//                                   <polyline points="14 2 14 8 20 8"></polyline>
//                                   <line x1="16" y1="13" x2="8" y2="13"></line>
//                                   <line x1="16" y1="17" x2="8" y2="17"></line>
//                                   <polyline points="10 9 9 9 8 9"></polyline>
//                                 </svg>
//                               </div>
//                               <div className="border-t border-r border-b rounded-r-lg py-2 px-3 w-52 bg-white">
//                                 <p className="text-sm font-medium truncate">{reportName}.pdf</p>
//                                 <p className="text-xs text-gray-500">PDF Report</p>
//                               </div>
//                             </div>
//                             <Download size={20} className="text-gray-600" />
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
//                 {user?.isPremium ? (
//                   <Button 
//                     variant="primary"
//                     onClick={handleDownloadPDF}
//                     isLoading={isDownloading}
//                   >
//                     Download PDF
//                   </Button>
//                 ) : (
//                   <Link to="/premium">
//                     <Button variant="primary">
//                       Upgrade to Premium
//                     </Button>
//                   </Link>
//                 )}
//                 <button
//                   type="button"
//                   onClick={() => setIsPDFModalOpen(false)}
//                   className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </DashboardLayout>
//   );
// };

// export default PredictionResults;


//*********************************/

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  Filter,
  FileDown,
  ChevronDown,
  Download,
  Lock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';


interface College {
  college: string;
  branch: string;
  branchCode: string;
  closingRank: number;
}

interface FormData {
  examType: string;
  rank: string;
  category: string;
  gender: string;
  region: string;
  branches: string[];
  preferredColleges: string;
  academicYear: string;
  email: string;
}


const PredictionResults: React.FC = () => {
  const [formData, setFormData] = useState<FormData | null>(null);
  const [colleges, setColleges] = useState<College[]>([]);
  const [filteredColleges, setFilteredColleges] = useState<College[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isPDFModalOpen, setIsPDFModalOpen] = useState(false);
  const [reportName, setReportName] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);

  const { user } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const generatePDF = () => {
  if (filteredColleges.length === 0) {
    showToast("No data available to export", "warning");
    return;
  }

  const doc = new jsPDF();
  doc.setFontSize(14);
  doc.text('College Prediction Report', 14, 20);
  doc.setFontSize(10);

  const tableData = displayedColleges.map((college) => [
    college.college,
    college.branch,
    college.branchCode,
    college.closingRank.toString()
  ]);

  autoTable(doc, {
    startY: 30,
    head: [['College Name', 'Branch', 'Branch Code', 'Closing Rank']],
    body: tableData,
    styles: { fontSize: 9 },
    headStyles: { fillColor: [100, 149, 237] },
  });

  doc.save(`${reportName}.pdf`);
  };

  useEffect(() => {
    document.title = 'College Predictions - CollegePredict360';
  }, []);

  useEffect(() => {
    const storedData = sessionStorage.getItem('predictionData');

    if (!storedData) {
      navigate('/predictor');
      return;
    }

    const parsedData = JSON.parse(storedData) as FormData;
    setFormData(parsedData);
    setReportName(`${parsedData.examType}_${parsedData.rank}_Report`);

    const fetchPredictedColleges = async () => {
      try {
        const res = await fetch(
          `http://localhost:4000/api/predict?rank=${parsedData.rank}&category=${parsedData.category}&branchCode=${parsedData.branches?.[0] || 'CSE'}`
        );
        const data = await res.json();
        console.log("Fetched colleges:", data);  // <--- Debug here
        setColleges(data);
        setFilteredColleges(data);
      } catch (err) {
        console.error("Prediction fetch failed", err);
        showToast("Failed to fetch college predictions", "error");
      }
    };
    

    fetchPredictedColleges();
  }, [navigate]);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredColleges(colleges);
    } else {
      const filtered = colleges.filter(college =>
        college.college.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredColleges(filtered);
    }
  }, [searchTerm, colleges]);

  const displayedColleges = user?.isPremium
    ? filteredColleges
    : filteredColleges.slice(0, 5);

  return (
    <DashboardLayout pageTitle="College Predictions">
      <div className="space-y-6">
        <Card className="flex flex-col md:flex-row justify-between items-start md:items-center bg-primary-50 border border-primary-100">
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              🎓 Your Top Predicted Colleges
            </h2>
            {formData && (
              <p className="text-gray-600">
                Based on {formData.examType} Rank: <span className="font-semibold">{formData.rank}</span>,
                Category: <span className="font-semibold">{formData.category}</span>,
                Region: <span className="font-semibold">{formData.region}</span>
              </p>
            )}
          </div>
          <div className="mt-4 md:mt-0">
            {/* <Button
              onClick={() => setIsPDFModalOpen(true)}
              variant="primary"
              className="flex items-center"
            >
              <FileDown size={18} className="mr-2" />
              Download PDF Report
            </Button> */}

            <Button
            onClick={generatePDF}
            variant="primary"
            className="flex items-center"
            >
            <FileDown size={18} className="mr-2" />
                Download PDF Report
            </Button>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            placeholder="Search college name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            leftIcon={<Search size={18} className="text-gray-500" />}
          />
        </div>

        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    College Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Branch
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Branch Code
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Closing Rank
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {displayedColleges.map((college, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{college.college}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{college.branch}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{college.branchCode}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{college.closingRank}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default PredictionResults;