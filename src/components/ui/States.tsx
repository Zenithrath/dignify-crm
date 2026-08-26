import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

export function LoadingSpinner({ size = 'md', text }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Loader2 className={`${sizeClasses[size]} text-primary animate-spin`} />
      {text && <p className="mt-3 text-sm font-semibold text-muted-foreground">{text}</p>}
    </div>
  );
}

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-14 px-4">
      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center text-muted-foreground mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-extrabold text-foreground mb-1">{title}</h3>
      <p className="text-sm font-medium text-muted-foreground text-center max-w-sm mb-6">
        {description}
      </p>
      {action}
    </div>
  );
}

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-14 px-4">
      <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
        <span className="text-destructive text-2xl font-extrabold">!</span>
      </div>
      <h3 className="text-lg font-extrabold text-foreground mb-1">Something went wrong</h3>
      <p className="text-sm font-medium text-muted-foreground text-center max-w-sm mb-6">
        {message}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-5 py-2.5 bg-primary text-primary-foreground rounded-full text-sm font-bold hover:bg-primary/80 transition-opacity cursor-pointer"
        >
          Try again
        </button>
      )}
    </div>
  );
}
