import React from 'react';

/**
 * Alert Component - Displays error, success, info, or warning messages
 * Dismissible with optional auto-dismiss
 */
const Alert = ({ 
  message, 
  type = 'info', 
  dismissible = true, 
  autoDismiss = 0,
  onDismiss = () => {},
}) => {
  const [visible, setVisible] = React.useState(!!message);

  React.useEffect(() => {
    if (!message) return;
    setVisible(true);
    
    if (autoDismiss > 0) {
      const timer = setTimeout(() => {
        setVisible(false);
        onDismiss();
      }, autoDismiss);
      return () => clearTimeout(timer);
    }
  }, [message, autoDismiss, onDismiss]);

  if (!visible || !message) return null;

  const typeStyles = {
    error: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200',
    success: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200',
    info: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200',
    warning: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200',
  };

  const icons = {
    error: '✕',
    success: '✓',
    info: 'ℹ',
    warning: '⚠',
  };

  return (
    <div className={`rounded-lg border p-4 flex items-start gap-3 ${typeStyles[type]}`}>
      <span className="text-lg font-bold flex-shrink-0">
        {icons[type]}
      </span>
      <div className="flex-1 text-sm">
        {message}
      </div>
      {dismissible && (
        <button
          onClick={() => {
            setVisible(false);
            onDismiss();
          }}
          className="text-lg font-bold flex-shrink-0 hover:opacity-75 transition"
          aria-label="Dismiss"
        >
          ✕
        </button>
      )}
    </div>
  );
};

/**
 * FormField Component - Input with label and error message
 */
export const FormField = ({
  label,
  type = 'text',
  value,
  onChange,
  error,
  placeholder,
  disabled = false,
  required = false,
  maxLength,
  rows,
}) => {
  const Component = type === 'textarea' ? 'textarea' : 'input';

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <Component
        type={type !== 'textarea' ? type : undefined}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        maxLength={maxLength}
        rows={rows}
        className={`w-full px-3 py-2 rounded-lg border font-sans transition ${
          error
            ? 'border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20 text-red-900 dark:text-red-100'
            : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      />
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400 mt-1">{error}</p>
      )}
      {maxLength && (
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          {value?.length || 0} / {maxLength}
        </p>
      )}
    </div>
  );
};

/**
 * Button Component - Standardized button with variants
 */
export const Button = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  className = '',
}) => {
  const variants = {
    primary: 'bg-slate-900 dark:bg-slate-700 text-white hover:bg-slate-800 dark:hover:bg-slate-600',
    secondary: 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white hover:bg-slate-300 dark:hover:bg-slate-600',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    ghost: 'text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800',
  };

  const sizes = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`rounded-lg font-medium transition ${variants[variant]} ${sizes[size]} ${
        disabled || loading ? 'opacity-50 cursor-not-allowed' : ''
      } ${className}`}
    >
      {loading ? '⌛ Loading...' : children}
    </button>
  );
};

/**
 * Card Component - Container with consistent styling
 */
export const Card = ({ children, className = '' }) => (
  <div className={`bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6 shadow-sm ${className}`}>
    {children}
  </div>
);

export default Alert;
