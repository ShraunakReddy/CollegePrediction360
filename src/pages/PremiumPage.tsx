import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Check, X, CreditCard, LucideIcon } from 'lucide-react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';

interface PlanFeature {
  name: string;
  isIncluded: {
    free: boolean;
    premium: boolean;
  };
}

const planFeatures: PlanFeature[] = [
  {
    name: 'Top 5 Colleges',
    isIncluded: {
      free: true,
      premium: true
    }
  },
  {
    name: 'Full 60 College List',
    isIncluded: {
      free: false,
      premium: true
    }
  },
  {
    name: 'PDF Download',
    isIncluded: {
      free: false,
      premium: true
    }
  },
  {
    name: 'Risk Level Tagging',
    isIncluded: {
      free: true,
      premium: true
    }
  },
  {
    name: 'Unlimited Predictions',
    isIncluded: {
      free: false,
      premium: true
    }
  },
  {
    name: 'Advanced Filtering',
    isIncluded: {
      free: false,
      premium: true
    }
  }
];

// const plans = [
//   {
//     id: 'basic',
//     name: 'Basic',
//     price: '₹49',
//     description: 'Perfect for one-time use',
//     features: ['1 PDF Report', '60 College Matches', 'Risk Level Analysis', 'One-time Payment'],
//     cta: 'Choose Basic',
//     popular: false,
//     reports: 1
//   },
//   {
//     id: 'pro',
//     name: 'Pro',
//     price: '₹99',
//     description: 'Best for college seekers',
//     features: ['Unlimited PDF Reports', '60 College Matches', 'Risk Level Analysis', 'Advanced Filtering', 'Unlimited Predictions'],
//     cta: 'Choose Pro',
//     popular: true,
//     reports: 'unlimited'
//   }
// ];

const plans = [
  // {
  //   id: 'basic',
  //   name: 'Basic',
  //   price: '₹49',
  //   description: 'Perfect for one-time use',
  //   features: ['1 PDF Report', '60 College Matches', 'Risk Level Analysis', 'One-time Payment'],
  //   cta: 'Choose Basic',
  //   popular: false,
  //   reports: 1
  // },
  {
    id: 'pro',
    name: 'Pro',
    price: '₹69', // updated from ₹99
    description: 'Best for college seekers',
    features: [
      '3 PDF Reports', // updated from Unlimited
      '60 College Matches',
      'Risk Level Analysis',
      'Advanced Filtering',
      'Unlimited Predictions'
    ],
    cta: 'Choose Pro',
    popular: true,
    reports: 3 // updated from 'unlimited'
  }
];


const PremiumPage: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<string>('pro');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const { user, upgradeAccount } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  
  // Set page title
  useEffect(() => {
    document.title = 'Premium Plans - CollegePredict360';
  }, []);
  
  // const handleUpgrade = () => {
  //   setIsProcessing(true);
    
  //   // Simulate payment processing
  //   setTimeout(() => {
  //     upgradeAccount();
  //     showToast('Congratulations! You are now a premium member.', 'success');
  //     setIsProcessing(false);
  //     navigate('/dashboard');
  //   }, 2000);
  // };

  const handleUpgrade = async () => {
  setIsProcessing(true);
//const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/payment/create-order`, {
  try {
    const res = await fetch(`http://localhost:4000/api/payment/create-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ amount: 69 })
    });

    const order = await res.json();
      //key: import.meta.env.VITE_RAZORPAY_KEY_ID, //*************************************************** */
    const options = {
      key: 'rzp_test_Xq2DEua96W6DvU',
      amount: order.amount,
      currency: order.currency,
      name: 'CollegePredict360',
      description: `${selectedPlan} Plan Purchase`,
      order_id: order.id,
      handler: async function (response: any) {
        try {
          const verifyRes = await fetch(`http://localhost:4000/api/payment/verify`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              razorpay_order_id: order.id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });

          const verifyData = await verifyRes.json();

          if (verifyRes.ok) {
            upgradeAccount();
            showToast('Payment verified successfully! You are now a premium member.', 'success');
            navigate('/dashboard');
          } else {
            showToast(`Verification failed: ${verifyData.error}`, 'error');
          }
        } catch (error) {
          showToast('Something went wrong during verification. Please try again.', 'error');
        }
      },
      prefill: {
        name: user?.name || '',
        email: user?.email || ''
      },
      theme: {
        color: '#6366f1'
      }
    };

    const rzp = new (window as any).Razorpay(options);
        rzp.open();
      } catch (err) {
        showToast('Payment failed. Please try again.', 'error');
      } finally {
        setIsProcessing(false);
      }
    };

  
  // Feature check/cross icon component
  const FeatureIcon: React.FC<{ included: boolean }> = ({ included }) => {
    return included ? (
      <Check size={18} className="text-success-600" />
    ) : (
      <X size={18} className="text-error-600" />
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="pt-32 flex-grow py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Upgrade to Premium
            </h1>
            <p className="text-xl text-gray-600">
              Get full access to all features and unlock your perfect college match
            </p>
          </div>
          
          {user?.isPremium ? (
            <Card className="max-w-3xl mx-auto p-8 text-center">
              <div className="mb-6 mx-auto w-16 h-16 rounded-full bg-success-100 flex items-center justify-center">
                <Check size={32} className="text-success-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                You're already a Premium member!
              </h2>
              <p className="text-gray-600 mb-6">
                You have access to all premium features, including unlimited college predictions and PDF downloads.
              </p>
              <Link to="/dashboard">
                <Button variant="primary">
                  Return to Dashboard
                </Button>
              </Link>
            </Card>
          ) : (
            <>
              {/* Feature comparison table */}
              <div className="max-w-3xl mx-auto mb-12 overflow-hidden rounded-xl shadow-sm">
                <table className="w-full bg-white">
                  <thead>
                    <tr>
                      <th className="px-6 py-5 text-left text-sm font-medium text-gray-500 bg-gray-100">Features</th>
                      <th className="px-6 py-5 text-center text-sm font-medium text-gray-500 bg-gray-100">Free</th>
                      <th className="px-6 py-5 text-center text-sm font-medium text-primary-700 bg-primary-50">Premium</th>
                    </tr>
                  </thead>
                  <tbody>
                    {planFeatures.map((feature, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-6 py-4 text-sm text-gray-700">{feature.name}</td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex justify-center">
                            <FeatureIcon included={feature.isIncluded.free} />
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center bg-primary-50">
                          <div className="flex justify-center">
                            <FeatureIcon included={feature.isIncluded.premium} />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Pricing cards */}
              {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"> */}
              <div className="flex justify-center mx-auto px-4">
                {plans.map((plan) => (
                  <div 
                    key={plan.id}
                    className={`
                      relative rounded-2xl overflow-hidden transition-all duration-300 w-full max-w-sm
                      ${selectedPlan === plan.id ? 'ring-2 ring-primary-500 transform scale-[1.02]' : 'ring-1 ring-gray-200'}
                      ${plan.popular ? 'transform md:scale-[1.03] z-10' : ''}
                    `}
                  >
                    {plan.popular && (
                      <div className="absolute top-0 right-0 bg-primary-500 text-white px-4 py-1 text-sm font-medium">
                        Popular
                      </div>
                    )}
                    
                    <Card className="h-full flex flex-col justify-between p-8">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                        <p className="text-gray-500 text-sm mb-4">{plan.description}</p>
                        
                        <div className="mb-6">
                          <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                          <span className="text-gray-500 ml-2">one-time</span>
                        </div>
                        
                        <ul className="space-y-3 mb-8">
                          {plan.features.map((feature, index) => (
                            <li key={index} className="flex items-center text-gray-700">
                              <Check size={18} className="text-success-500 mr-2 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <Button
                        variant={plan.popular ? 'primary' : 'outline'}
                        fullWidth
                        onClick={() => setSelectedPlan(plan.id)}
                        className={selectedPlan === plan.id ? '' : 'opacity-80'}
                      >
                        {selectedPlan === plan.id ? 'Selected' : plan.cta}
                      </Button>
                    </Card>
                  </div>
                ))}
              </div>
              
              {/* Payment section */}
              <div className="max-w-2xl mx-auto mt-12">
                <Card>
                  <div className="mb-6 border-b border-gray-200 pb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      Payment Details
                    </h3>
                    <p className="text-gray-600 text-sm">
                      You'll be charged a one-time payment of ₹69 for the Pro plan.
                    </p>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Card Information
                    </label>
                    <div className="border border-gray-300 rounded-lg p-4 flex items-center justify-between">
                      <div className="flex items-center">
                        <CreditCard size={20} className="text-gray-500 mr-2" />
                        <span className="text-gray-700">Credit / Debit Card</span>
                      </div>
                      <div className="flex space-x-2">
                        <img src="https://cdn-icons-png.flaticon.com/128/196/196578.png" alt="Visa" className="h-6" />
                        <img src="https://cdn-icons-png.flaticon.com/128/196/196561.png" alt="MasterCard" className="h-6" />
                        <img src="https://cdn-icons-png.flaticon.com/128/196/196539.png" alt="American Express" className="h-6" />
                      </div>
                    </div>
                  </div>
                  
                  {/* <div className="mb-8 bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between mb-3">
                      <span className="text-gray-600">Plan</span>
                      <span className="font-medium">{selectedPlan === 'basic' ? 'Basic' : 'Pro'}</span>
                    </div>
                    <div className="flex justify-between mb-3">
                      <span className="text-gray-600">Reports</span>
                      <span className="font-medium">{selectedPlan === 'basic' ? '1 report' : 'Unlimited'}</span>
                    </div>
                    <div className="flex justify-between pt-3 border-t border-gray-200">
                      <span className="font-medium">Total (One-time)</span>
                      <span className="font-bold text-lg">{selectedPlan === 'basic' ? '₹49' : '₹99'}</span>
                    </div>
                  </div> */}

                  <div className="mb-8 bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between mb-3">
                      <span className="text-gray-600">Plan</span>
                      <span className="font-medium">'Pro'</span>
                    </div>
                    <div className="flex justify-between mb-3">
                      <span className="text-gray-600">Reports</span>
                      <span className="font-medium">3 reports</span>
                    </div>
                    <div className="flex justify-between pt-3 border-t border-gray-200">
                      <span className="font-medium">Total (One-time)</span>
                      <span className="font-bold text-lg">₹69</span>
                    </div>
                  </div>
                  
                  <Button
                    variant="primary"
                    fullWidth
                    onClick={handleUpgrade}
                    isLoading={isProcessing}
                  >
                    Upgrade Now
                  </Button>
                  
                  <p className="text-xs text-gray-500 mt-4 text-center">
                    By upgrading, you agree to our <Link to="/terms" className="text-primary-600">Terms of Service</Link> and <Link to="/privacy" className="text-primary-600">Privacy Policy</Link>.
                  </p>
                </Card>
              </div>
            </>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default PremiumPage;