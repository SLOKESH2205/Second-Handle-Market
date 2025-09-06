import { Toaster as SonnerToaster } from "sonner@2.0.3";

export function Toaster() {
  return (
    <SonnerToaster
      position="bottom-right"
      expand={true}
      richColors={true}
      closeButton={true}
      toastOptions={{
        duration: 4000,
        style: {
          background: 'hsl(var(--background))',
          color: 'hsl(var(--foreground))',
          border: '1px solid hsl(var(--border))',
          borderRadius: '8px',
          fontSize: '14px',
          padding: '16px',
          minHeight: '60px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        },
        className: 'bottom-toast',
      }}
    />
  );
}