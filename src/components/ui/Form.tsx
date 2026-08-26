import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Input as ShadcnInput } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && <Label>{label}</Label>}
        <ShadcnInput
          ref={ref}
          className={cn(
            error && '!ring-2 !ring-destructive/40 !border-destructive/40',
            className
          )}
          {...props}
        />
        {error && <p className="text-xs font-semibold text-destructive">{error}</p>}
        {helperText && !error && (
          <p className="text-xs font-medium text-muted-foreground">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, helperText, ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && <Label>{label}</Label>}
        <textarea
          ref={ref}
          className={cn(
            'flex min-h-16 w-full rounded-md border border-input bg-input/20 px-3 py-2 text-sm transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 disabled:pointer-events-none disabled:opacity-50 dark:bg-input/30 resize-none',
            error && '!ring-2 !ring-destructive/40 !border-destructive/40',
            className
          )}
          {...props}
        />
        {error && <p className="text-xs font-semibold text-destructive">{error}</p>}
        {helperText && !error && (
          <p className="text-xs font-medium text-muted-foreground">{helperText}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, options, ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && <Label>{label}</Label>}
        <select
          ref={ref}
          className={cn(
            'flex h-7 w-full rounded-md border border-input bg-input/20 px-2 py-0.5 text-sm transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 disabled:pointer-events-none disabled:opacity-50 dark:bg-input/30 cursor-pointer appearance-none pr-8',
            error && '!ring-2 !ring-destructive/40',
            className
          )}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <p className="text-xs font-semibold text-destructive">{error}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';
