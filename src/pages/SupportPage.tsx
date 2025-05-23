import React, { useState, useEffect } from 'react';
import { Mail, MessageSquare, AlertCircle, HelpCircle, FileText, Lightbulb } from 'lucide-react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: 'How accurate are the college predictions?',
    answer: 'Our predictions are based on historical cutoff data from previous years. We analyze trends and patterns to provide the most accurate recommendations. However, cutoffs can vary each year, so we recommend using the predictions as a guide rather than a guarantee.'
  },
  {
    question: 'What is the risk level indicator?',
    answer: 'The risk level indicator (Safe, Moderate, or Risky) shows how likely you are to get admission to a particular college based on your rank. Safe means your rank is better than the typical cutoff, Moderate means your rank is close to the cutoff, and Risky means your rank is below the typical cutoff.'
  },
  {
    question: 'Can I download my prediction report?',
    answer: 'Yes, Premium users can download their prediction reports as PDFs. Free users can view their top 5 college matches online but need to upgrade to Premium to access the full 60 college list and PDF download feature.'
  },
  {
    question: 'How do I upgrade to Premium?',
    answer: 'You can upgrade to Premium by visiting the Premium page from your dashboard or by clicking on the "Upgrade to Premium" button available throughout the application. We offer one-time payment options for different levels of access.'
  },
  {
    question: 'Can I make multiple predictions with different ranks?',
    answer: 'Free users can make up to 3 predictions. Premium users can make unlimited predictions with different ranks, categories, or preferences to explore various scenarios.'
  }
];

const SupportPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  
  const { user } = useAuth();
  const { showToast } = useToast();
  
  // Set page title
  useEffect(() => {
    document.title = 'Support - TechM4India';
  }, []);
  
  // Set initial values from user context
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!name || !email || !subject || !message) {
      setError('Please fill in all fields');
      return;
    }
    
    setError('');
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      showToast('Your message has been sent. We\'ll get back to you soon!', 'success');
      setIsSubmitting(false);
      setSubject('');
      setMessage('');
    }, 1500);
  };
  
  const toggleFaq = (index: number) => {
    if (openFaqIndex === index) {
      setOpenFaqIndex(null);
    } else {
      setOpenFaqIndex(index);
    }
  };

  return (
    <DashboardLayout pageTitle="Support">
      <div className="space-y-8">
        {/* Support options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="flex flex-col items-center text-center p-6">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
              <Mail size={24} className="text-primary-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Email Support</h3>
            <p className="text-gray-600 mb-4">
              Email us at TechM4India@gmaail.com for any queries or issues.
            </p>
            <a
              href="mailto:support@collegepredict360.com"
              className="text-primary-600 font-medium hover:text-primary-700"
            >
              Send Email
            </a>
          </Card>
          
          <Card className="flex flex-col items-center text-center p-6">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
              <FileText size={24} className="text-primary-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Knowledge Base</h3>
            <p className="text-gray-600 mb-4">
              Browse our help articles to find quick answers to common questions.
            </p>
            <a
              href="#faq"
              className="text-primary-600 font-medium hover:text-primary-700"
            >
              View Articles
            </a>
          </Card>
          
          <Card className="flex flex-col items-center text-center p-6">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
              <MessageSquare size={24} className="text-primary-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Live Chat</h3>
            <p className="text-gray-600 mb-4">
              Chat with our support team in real-time during business hours.
            </p>
            <button
              onClick={() => showToast('Live chat coming soon!', 'info')}
              className="text-primary-600 font-medium hover:text-primary-700"
            >
              Start Chat
            </button>
          </Card>
        </div>
        
        {/* FAQ Section */}
        <div id="faq">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-4 text-left font-medium focus:outline-none"
                >
                  <div className="flex items-center">
                    <HelpCircle size={20} className="text-primary-600 mr-3 flex-shrink-0" />
                    <span>{faq.question}</span>
                  </div>
                  <svg
                    className={`h-5 w-5 text-gray-500 transform transition-transform ${openFaqIndex === index ? 'rotate-180' : ''}`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                {openFaqIndex === index && (
                  <div className="px-4 pb-4 text-gray-600">
                    <div className="pl-8">{faq.answer}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Quick Tips */}
        <Card className="bg-primary-50 border border-primary-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Lightbulb size={20} className="text-primary-600 mr-2" />
            Quick Tips
          </h3>
          
          <div className="space-y-3">
            <div className="flex items-start">
              <span className="bg-primary-100 text-primary-800 font-medium rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
                1
              </span>
              <p className="text-gray-700">
                For the most accurate predictions, provide your exact rank and select specific branch preferences.
              </p>
            </div>
            <div className="flex items-start">
              <span className="bg-primary-100 text-primary-800 font-medium rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
                2
              </span>
              <p className="text-gray-700">
                Filter your college results by risk level to see colleges where you have a high chance of admission.
              </p>
            </div>
            <div className="flex items-start">
              <span className="bg-primary-100 text-primary-800 font-medium rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
                3
              </span>
              <p className="text-gray-700">
                Upgrade to Premium to download PDF reports that you can share with parents and counselors.
              </p>
            </div>
          </div>
        </Card>
        
        {/* Contact Form */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Contact Us
          </h2>
          
          <Card>
            <form onSubmit={handleSubmit}>
              {error && (
                <div className="mb-6 p-4 bg-error-50 border border-error-200 rounded-lg flex items-center text-error-700">
                  <AlertCircle size={20} className="mr-2 flex-shrink-0" />
                  {error}
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <Input
                  label="Name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  required
                />
                
                <Input
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  required
                />
              </div>
              
              <div className="mb-6">
                <Input
                  label="Subject"
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="How can we help you?"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Please describe your issue or question in detail"
                  required
                ></textarea>
              </div>
              
              <div className="flex justify-end">
                <Button
                  type="submit"
                  variant="primary"
                  isLoading={isSubmitting}
                >
                  Submit Request
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SupportPage;