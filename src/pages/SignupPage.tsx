// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { User, Mail, Lock, AlertCircle, CheckCircle2 } from 'lucide-react';
// import Navbar from '../components/common/Navbar';
// import Footer from '../components/common/Footer';
// import Button from '../components/ui/Button';
// import Input from '../components/ui/Input';
// import { useAuth } from '../contexts/AuthContext';
// import { useToast } from '../contexts/ToastContext';

// const SignupPage: React.FC = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [error, setError] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);
  
//   const { signup, isAuthenticated } = useAuth();
//   const { showToast } = useToast();
//   const navigate = useNavigate();

//   // Set page title
//   useEffect(() => {
//     document.title = 'Sign Up - CollegePredict360';
//   }, []);

//   // Redirect if already logged in
//   useEffect(() => {
//     if (isAuthenticated) {
//       navigate('/dashboard');
//     }
//   }, [isAuthenticated, navigate]);

//   // Password strength indicators
//   const hasMinLength = password.length >= 8;
//   const hasUppercase = /[A-Z]/.test(password);
//   const hasNumber = /[0-9]/.test(password);
//   const hasSpecialChar = /[!@#$%^&*]/.test(password);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     // Form validation
//     if (!name || !email || !password || !confirmPassword) {
//       setError('Please fill in all fields');
//       return;
//     }
    
//     if (password !== confirmPassword) {
//       setError('Passwords do not match');
//       return;
//     }
    
//     if (password.length < 8) {
//       setError('Password must be at least 8 characters long');
//       return;
//     }
    
//     setError('');
//     setIsSubmitting(true);
    
//     try {
//       await signup(name, email, password);
//       showToast('Account created successfully!', 'success');
//       navigate('/dashboard');
//     } catch (err) {
//       const message = err instanceof Error ? err.message : 'Signup failed. Please try again.';
//       setError(message);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col">
//       <Navbar />
      
//       <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
//         <div className="max-w-md w-full space-y-8 animate-fade-in">
//           <div className="text-center">
//             <h1 className="text-3xl font-bold text-gray-900">Create Your Account</h1>
//             <p className="mt-2 text-gray-600">
//               Join CollegePredict360 and find your perfect college
//             </p>
//           </div>
          
//           <div className="bg-white p-8 rounded-xl shadow-sm">
//             {error && (
//               <div className="mb-4 p-4 bg-error-50 border border-error-200 rounded-lg flex items-center text-error-700">
//                 <AlertCircle size={20} className="mr-2 flex-shrink-0" />
//                 {error}
//               </div>
//             )}
            
//             <form className="space-y-6" onSubmit={handleSubmit}>
//               <Input
//                 label="Full Name"
//                 type="text"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 placeholder="Enter your full name"
//                 leftIcon={<User size={18} className="text-gray-500" />}
//                 required
//               />
              
//               <Input
//                 label="Email Address"
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Enter your email"
//                 leftIcon={<Mail size={18} className="text-gray-500" />}
//                 required
//               />
              
//               <Input
//                 label="Password"
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="Create a password"
//                 leftIcon={<Lock size={18} className="text-gray-500" />}
//                 required
//               />
              
//               {password && (
//                 <div className="mt-2 space-y-2">
//                   <p className="text-sm font-medium text-gray-700">Password requirements:</p>
//                   <div className="grid grid-cols-2 gap-2">
//                     <div className={`text-xs flex items-center ${hasMinLength ? 'text-success-600' : 'text-gray-500'}`}>
//                       {hasMinLength ? <CheckCircle2 size={14} className="mr-1" /> : <span className="h-3.5 w-3.5 mr-1 rounded-full border border-gray-300" />}
//                       8+ characters
//                     </div>
//                     <div className={`text-xs flex items-center ${hasUppercase ? 'text-success-600' : 'text-gray-500'}`}>
//                       {hasUppercase ? <CheckCircle2 size={14} className="mr-1" /> : <span className="h-3.5 w-3.5 mr-1 rounded-full border border-gray-300" />}
//                       Uppercase letter
//                     </div>
//                     <div className={`text-xs flex items-center ${hasNumber ? 'text-success-600' : 'text-gray-500'}`}>
//                       {hasNumber ? <CheckCircle2 size={14} className="mr-1" /> : <span className="h-3.5 w-3.5 mr-1 rounded-full border border-gray-300" />}
//                       Number
//                     </div>
//                     <div className={`text-xs flex items-center ${hasSpecialChar ? 'text-success-600' : 'text-gray-500'}`}>
//                       {hasSpecialChar ? <CheckCircle2 size={14} className="mr-1" /> : <span className="h-3.5 w-3.5 mr-1 rounded-full border border-gray-300" />}
//                       Special character
//                     </div>
//                   </div>
//                 </div>
//               )}
              
//               <Input
//                 label="Confirm Password"
//                 type="password"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 placeholder="Confirm your password"
//                 leftIcon={<Lock size={18} className="text-gray-500" />}
//                 error={password && confirmPassword && password !== confirmPassword ? "Passwords don't match" : ""}
//                 required
//               />
              
//               <div className="flex items-center">
//                 <input
//                   id="terms"
//                   name="terms"
//                   type="checkbox"
//                   className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
//                   required
//                 />
//                 <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
//                   I agree to the{' '}
//                   <Link to="/terms" className="font-medium text-primary-600 hover:text-primary-500">
//                     Terms of Service
//                   </Link>
//                   {' '}and{' '}
//                   <Link to="/privacy" className="font-medium text-primary-600 hover:text-primary-500">
//                     Privacy Policy
//                   </Link>
//                 </label>
//               </div>
              
//               <Button
//                 type="submit"
//                 variant="primary"
//                 fullWidth
//                 isLoading={isSubmitting}
//               >
//                 Create Account
//               </Button>
              
//               <div className="relative mt-6">
//                 <div className="absolute inset-0 flex items-center">
//                   <div className="w-full border-t border-gray-300"></div>
//                 </div>
//                 <div className="relative flex justify-center text-sm">
//                   <span className="px-2 bg-white text-gray-500">Or continue with</span>
//                 </div>
//               </div>
              
//               <button
//                 type="button"
//                 className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
//               >
//                 <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
//                   <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
//                     <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
//                     <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
//                     <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
//                     <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
//                   </g>
//                 </svg>
//                 Continue with Google
//               </button>
//             </form>
            
//             <div className="mt-6 text-center">
//               <p className="text-sm text-gray-600">
//                 Already have an account?{' '}
//                 <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
//                   Sign in
//                 </Link>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
      
//       <Footer />
//     </div>
//   );
// };

// export default SignupPage;

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, AlertCircle, CheckCircle2 } from 'lucide-react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';

const SignupPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { signup, isAuthenticated } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Sign Up - CollegePredict360';
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*]/.test(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Trim inputs
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName || !trimmedEmail || !password || !confirmPassword) {
      setError('Please fill in all fields');
      showToast('Please fill in all fields', 'error');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      showToast('Passwords do not match', 'error');
      return;
    }

    if (!hasMinLength) {
      setError('Password must be at least 8 characters long');
      showToast('Password must be at least 8 characters long', 'error');
      return;
    }

    setError('');
    setIsSubmitting(true);

    try {
      await signup(trimmedName, trimmedEmail, password);
      showToast('Account created successfully!', 'success');
      navigate('/dashboard');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Signup failed. Please try again.';
      setError(message);
      showToast(message, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-md w-full space-y-8 animate-fade-in">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">Create Your Account</h1>
            <p className="mt-2 text-gray-600">Join CollegePredict360 and find your perfect college</p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm">
            {error && (
              <div className="mb-4 p-4 bg-error-50 border border-error-200 rounded-lg flex items-center text-error-700">
                <AlertCircle size={20} className="mr-2 flex-shrink-0" />
                {error}
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit} noValidate>
              <Input
                label="Full Name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                leftIcon={<User size={18} className="text-gray-500" />}
                required
              />

              <Input
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                leftIcon={<Mail size={18} className="text-gray-500" />}
                required
              />

              <Input
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                leftIcon={<Lock size={18} className="text-gray-500" />}
                required
              />

              {password && (
                <div className="mt-2 space-y-2">
                  <p className="text-sm font-medium text-gray-700">Password requirements:</p>
                  <div className="grid grid-cols-2 gap-2">
                    <div className={`text-xs flex items-center ${hasMinLength ? 'text-success-600' : 'text-gray-500'}`}>
                      {hasMinLength ? <CheckCircle2 size={14} className="mr-1" /> : <span className="h-3.5 w-3.5 mr-1 rounded-full border border-gray-300" />}
                      8+ characters
                    </div>
                    <div className={`text-xs flex items-center ${hasUppercase ? 'text-success-600' : 'text-gray-500'}`}>
                      {hasUppercase ? <CheckCircle2 size={14} className="mr-1" /> : <span className="h-3.5 w-3.5 mr-1 rounded-full border border-gray-300" />}
                      Uppercase letter
                    </div>
                    <div className={`text-xs flex items-center ${hasNumber ? 'text-success-600' : 'text-gray-500'}`}>
                      {hasNumber ? <CheckCircle2 size={14} className="mr-1" /> : <span className="h-3.5 w-3.5 mr-1 rounded-full border border-gray-300" />}
                      Number
                    </div>
                    <div className={`text-xs flex items-center ${hasSpecialChar ? 'text-success-600' : 'text-gray-500'}`}>
                      {hasSpecialChar ? <CheckCircle2 size={14} className="mr-1" /> : <span className="h-3.5 w-3.5 mr-1 rounded-full border border-gray-300" />}
                      Special character
                    </div>
                  </div>
                </div>
              )}

              <Input
                label="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                leftIcon={<Lock size={18} className="text-gray-500" />}
                error={password && confirmPassword && password !== confirmPassword ? "Passwords don't match" : ""}
                required
              />

              <div className="flex items-center">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  required
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                  I agree to the{' '}
                  <Link to="/terms" className="font-medium text-primary-600 hover:text-primary-500">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="font-medium text-primary-600 hover:text-primary-500">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              <Button type="submit" variant="primary" fullWidth isLoading={isSubmitting}>
                Create Account
              </Button>

              <div className="relative mt-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              <button
                type="button"
                className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                    <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z" />
                    <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z" />
                    <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z" />
                    <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z" />
                  </g>
                </svg>
                Continue with Google
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SignupPage;
