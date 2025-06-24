// Button Component for UI Kit
export function createButton(options = {}) {
  const {
    text = 'Button',
    variant = 'primary',
    size = 'default',
    className = '',
    onClick = null,
    disabled = false
  } = options;

  const baseClasses = 'ui-button tw-px-4 tw-py-2';
  
  const variants = {
    primary: 'ui-button-primary',
    secondary: 'ui-button-secondary',
    outline: 'tw-border tw-border-primary tw-bg-transparent tw-text-primary hover:tw-bg-primary hover:tw-text-primary-foreground',
    ghost: 'hover:tw-bg-accent hover:tw-text-accent-foreground'
  };

  const sizes = {
    sm: 'tw-h-8 tw-px-3 tw-text-xs',
    default: 'tw-h-9 tw-px-4 tw-py-2',
    lg: 'tw-h-10 tw-px-8',
    icon: 'tw-h-9 tw-w-9'
  };

  const button = document.createElement('button');
  button.className = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`.trim();
  button.textContent = text;
  button.disabled = disabled;
  
  if (onClick) {
    button.addEventListener('click', onClick);
  }

  return button;
}

// Usage example:
// const primaryButton = createButton({
//   text: 'Get Started',
//   variant: 'primary',
//   size: 'lg',
//   onClick: () => console.log('Button clicked!')
// }); 