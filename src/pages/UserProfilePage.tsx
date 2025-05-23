import React, { useState, useEffect } from 'react';
import { User, Mail, Lock, AlertCircle, CheckCircle2 } from 'lucide-react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';

interface ProfileFormData {
  name: string;
  email: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const UserProfilePage: React.FC = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  
  const [formData, setFormData] = useState<ProfileFormData>({
    name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPasswordSection, setShowPasswordSection] = useState(false);
  
  // Set page title
  useEffect(() => {
    document.title = 'Profile - CollegePredict360';
  }, []);
  
  // Set initial form data from user context
  useEffect(() => {
    if (user) {
      setFormData({
        ...formData,
        name: user.name,
        email: user.email,
      });
    }
  }, [user]);
  
  // Password strength indicators
  const hasMinLength = formData.newPassword.length >= 8;
  const hasUppercase = /[A-Z]/.test(formData.newPassword);
  const hasNumber = /[0-9]/.test(formData.newPassword);
  const hasSpecialChar = /[!@#$%^&*]/.test(formData.newPassword);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear error when form is edited
    if (errorMessage) {
      setErrorMessage('');
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email) {
      setErrorMessage('Name and email are required');
      return;
    }
    
    // Validate passwords if changing password
    if (showPasswordSection) {
      if (!formData.currentPassword) {
        setErrorMessage('Current password is required');
        return;
      }
      
      if (formData.newPassword) {
        if (formData.newPassword.length < 8) {
          setErrorMessage('New password must be at least 8 characters long');
          return;
        }
        
        if (formData.newPassword !== formData.confirmPassword) {
          setErrorMessage('New passwords do not match');
          return;
        }
      }
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      showToast('Profile updated successfully!', 'success');
      setIsSubmitting(false);
      
      // Reset password fields
      setFormData({
        ...formData,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      
      setShowPasswordSection(false);
    }, 1500);
  };

  return (
    <DashboardLayout pageTitle="Profile">
      <div className="max-w-3xl mx-auto">
        <Card className="mb-6">
          <form onSubmit={handleSubmit}>
            {errorMessage && (
              <div className="mb-6 p-4 bg-error-50 border border-error-200 rounded-lg flex items-center text-error-700">
                <AlertCircle size={20} className="mr-2 flex-shrink-0" />
                {errorMessage}
              </div>
            )}
            
            <div className="space-y-6">
              <div className="pb-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Profile Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Full Name"
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    leftIcon={<User size={18} className="text-gray-500" />}
                    required
                  />
                  
                  <Input
                    label="Email Address"
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    leftIcon={<Mail size={18} className="text-gray-500" />}
                    required
                  />
                </div>
              </div>
              
              <div className="pb-6 border-b border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Account Details
                  </h3>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-gray-700">Membership Plan</p>
                      <p className="text-gray-600">
                        {user?.isPremium ? 'Premium' : 'Free'}
                      </p>
                    </div>
                    {!user?.isPremium && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.location.href = '/premium'}
                      >
                        Upgrade
                      </Button>
                    )}
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-gray-700">Reports Downloaded</p>
                      <p className="text-gray-600">
                        {user?.isPremium ? '2 reports' : '0 reports'}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.location.href = '/reports'}
                    >
                      View Reports
                    </Button>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Password
                  </h3>
                  
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setShowPasswordSection(!showPasswordSection)}
                  >
                    {showPasswordSection ? 'Cancel' : 'Change Password'}
                  </Button>
                </div>
                
                {showPasswordSection && (
                  <div className="space-y-4">
                    <Input
                      label="Current Password"
                      type="password"
                      id="currentPassword"
                      name="currentPassword"
                      value={formData.currentPassword}
                      onChange={handleInputChange}
                      leftIcon={<Lock size={18} className="text-gray-500" />}
                    />
                    
                    <Input
                      label="New Password"
                      type="password"
                      id="newPassword"
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleInputChange}
                      leftIcon={<Lock size={18} className="text-gray-500" />}
                    />
                    
                    {formData.newPassword && (
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
                      label="Confirm New Password"
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      leftIcon={<Lock size={18} className="text-gray-500" />}
                      error={formData.newPassword && formData.confirmPassword && formData.newPassword !== formData.confirmPassword ? "Passwords don't match" : ""}
                    />
                  </div>
                )}
              </div>
              
              <div className="pt-4 flex justify-end">
                <Button
                  type="submit"
                  variant="primary"
                  isLoading={isSubmitting}
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </form>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default UserProfilePage;