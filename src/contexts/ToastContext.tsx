import React, { createContext, useContext, useState, ReactNode } from 'react';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
  id: string;
  type: ToastType;
  message: string;
}

interface ToastContextType {
  toasts: Toast[];
  showToast: (message: string, type: ToastType) => void;
  hideToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: ToastType = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prevToasts) => [...prevToasts, { id, type, message }]);

    // Auto-remove toast after 5 seconds
    setTimeout(() => {
      hideToast(id);
    }, 5000);
  };

  const hideToast = (id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toasts, showToast, hideToast }}>
      {children}
      
      {/* Toast container */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col-reverse gap-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`
              flex items-center justify-between p-4 shadow-lg rounded-lg 
              transform transition-all duration-500 animate-fade-in max-w-md
              ${toast.type === 'success' ? 'bg-success-500 text-white' : ''}
              ${toast.type === 'error' ? 'bg-error-500 text-white' : ''}
              ${toast.type === 'warning' ? 'bg-warning-500 text-white' : ''}
              ${toast.type === 'info' ? 'bg-primary-500 text-white' : ''}
            `}
          >
            <p>{toast.message}</p>
            <button 
              onClick={() => hideToast(toast.id)}
              className="ml-4 text-white hover:text-gray-200 transition-colors"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};