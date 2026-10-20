import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';

type ButtonProps = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>;

export function Button({ children, type = 'button', ...props }: ButtonProps) {
  return (
    <button
      type={type}
      {...props}
      style={{
        width: 'fit-content',
        border: 0,
        borderRadius: '999px',
        padding: '0.875rem 1.25rem',
        color: '#f8f6f1',
        background: '#1b1b1b',
        font: 'inherit',
        cursor: 'pointer',
        ...props.style,
      }}
    >
      {children}
    </button>
  );
}
