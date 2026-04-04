import React from 'react';

/**
 * Error Boundary - Catches component errors and prevents app crash
 * Displays fallback UI when error occurs
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8 max-w-md w-full border border-red-200 dark:border-red-800">
            <h1 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
              Oops! Something went wrong
            </h1>
            <p className="text-slate-600 dark:text-slate-300 mb-4">
              We encountered an unexpected error. Please try refreshing the page.
            </p>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="text-sm text-red-600 dark:text-red-400 whitespace-pre-wrap overflow-auto max-h-40 bg-red-50 dark:bg-red-900/20 p-3 rounded border border-red-200 dark:border-red-800">
                <summary className="cursor-pointer font-mono font-bold mb-2">
                  Technical Details
                </summary>
                {this.state.error.toString()}
                {this.state.errorInfo?.componentStack}
              </details>
            )}
            <button
              onClick={() => window.location.href = '/'}
              className="mt-6 w-full px-4 py-2 bg-slate-900 dark:bg-slate-700 text-white rounded font-medium hover:bg-slate-800 dark:hover:bg-slate-600 transition"
            >
              Go to Home
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
