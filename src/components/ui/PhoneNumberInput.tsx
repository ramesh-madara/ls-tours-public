import { CountrySelector, usePhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

interface PhoneNumberInputProps {
  value: string;
  onChange: (value: string) => void;
  name?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  error?: string;
  inputClassName?: string;
}

const PhoneNumberInput = ({
  value,
  onChange,
  name,
  placeholder = 'Phone number',
  disabled = false,
  required = false,
  className,
  error,
  inputClassName,
}: PhoneNumberInputProps) => {
  const [touched, setTouched] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');

  const phoneInput = usePhoneInput({
    defaultCountry: 'lk',
    value,
    onChange: (data) => {
      onChange(data.phone);
    },
  });

  // Light validation - only show message, don't block submit
  useEffect(() => {
    if (!touched || !value || value === '+') {
      setValidationMessage('');
      return;
    }
    
    // Check if the number has at least some digits after the country code
    const digitsOnly = value.replace(/\D/g, '');
    if (digitsOnly.length > 0 && digitsOnly.length < 7) {
      setValidationMessage('Number seems incomplete');
    } else {
      setValidationMessage('');
    }
  }, [value, touched]);

  return (
    <div className={cn('relative', className)}>
      <div
        className={cn(
          'flex items-center h-10 w-full rounded-md border border-input bg-background text-base ring-offset-background',
          'focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2',
          disabled && 'cursor-not-allowed opacity-50',
          (error || validationMessage) && 'border-amber-500/50',
          inputClassName
        )}
      >
        {/* Country Selector */}
        <CountrySelector
          selectedCountry={phoneInput.country.iso2}
          onSelect={(country) => phoneInput.setCountry(country.iso2)}
          disabled={disabled}
          renderButtonWrapper={({ children, rootProps }) => (
            <button
              {...rootProps}
              type="button"
              className={cn(
                'flex items-center justify-center gap-1 h-full px-2 border-r border-input bg-muted/50 rounded-l-md shrink-0',
                'hover:bg-muted transition-colors',
                'focus:outline-none focus:bg-muted',
                disabled && 'pointer-events-none'
              )}
            >
              {children}
            </button>
          )}
          dropdownStyleProps={{
            className: cn(
              'absolute top-full left-0 z-50 mt-1 max-h-60 w-64 overflow-auto rounded-md',
              'border border-input bg-popover text-popover-foreground shadow-md',
              'scrollbar-thin scrollbar-thumb-muted-foreground/20'
            ),
            listItemClassName: cn(
              'flex items-center gap-2 px-3 py-2 cursor-pointer',
              'hover:bg-accent hover:text-accent-foreground transition-colors'
            ),
            listItemFlagClassName: 'w-5 h-4 rounded-sm object-cover',
            listItemCountryNameClassName: 'text-sm flex-1',
            listItemDialCodeClassName: 'text-sm text-muted-foreground',
          }}
        />

        {/* Phone Input */}
        <input
          ref={phoneInput.inputRef}
          type="tel"
          name={name}
          value={phoneInput.inputValue}
          onChange={phoneInput.handlePhoneValueChange}
          onBlur={() => setTouched(true)}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={cn(
            'flex-1 h-full bg-transparent px-3 text-base md:text-sm leading-none',
            'placeholder:text-muted-foreground',
            'focus:outline-none',
            disabled && 'cursor-not-allowed'
          )}
        />
      </div>
      {error && (
        <p className="text-xs text-destructive mt-1">{error}</p>
      )}
      {!error && validationMessage && (
        <p className="text-xs text-amber-500 mt-1">{validationMessage}</p>
      )}
    </div>
  );
};

export { PhoneNumberInput };
