import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ToastProvider } from './contexts/ToastContext';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import PredictorInputForm from './pages/PredictorInputForm';
import PredictionResults from './pages/PredictionResults';
import MyReportsPage from './pages/MyReportsPage';
import UserProfilePage from './pages/UserProfilePage';
import SupportPage from './pages/SupportPage';
import PremiumPage from './pages/PremiumPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ToastProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/premium" element={<PremiumPage />} />
            
            {/* Protected Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } />
            <Route path="/predictor" element={
              <ProtectedRoute>
                <PredictorInputForm />
              </ProtectedRoute>
            } />
            <Route path="/results" element={
              <ProtectedRoute>
                <PredictionResults />
              </ProtectedRoute>
            } />
            <Route path="/reports" element={
              <ProtectedRoute>
                <MyReportsPage />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <UserProfilePage />
              </ProtectedRoute>
            } />
            <Route path="/support" element={
              <ProtectedRoute>
                <SupportPage />
              </ProtectedRoute>
            } />
          </Routes>
        </ToastProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;