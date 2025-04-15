"use client";

import { ReactNode, useEffect, useState } from 'react';
import { ClerkProvider, ClerkLoaded, ClerkLoading } from '@clerk/nextjs';
import { useToast } from '@/components/ui/use-toast';
import config from '@/config';

interface AuthWrapperProps {
  children: ReactNode;
}

const AuthWrapper = ({ children }: AuthWrapperProps) => {
  const [mounted, setMounted] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Show auth errors as toasts
  useEffect(() => {
    if (authError) {
      toast({
        title: "Authentication Error",
        description: authError,
        variant: "destructive",
      });
    }
  }, [authError, toast]);
  
  // Set up an effect to listen for Clerk errors
  useEffect(() => {
    if (mounted && config.auth.enabled) {
      const handleClerkError = (event: ErrorEvent) => {
        // Check if this is a Clerk-related error
        if (event.message && (event.message.includes('Clerk') || event.filename?.includes('clerk'))) {
          console.error("Clerk error:", event);
          setAuthError(`Authentication error: ${event.message}`);
        }
      };

      // Add event listener for errors
      window.addEventListener('error', handleClerkError);

      // Clean up
      return () => {
        window.removeEventListener('error', handleClerkError);
      };
    }
  }, [mounted]);

  // During server rendering or before mounting, just render children
  if (!mounted || !config.auth.enabled) {
    return <>{children}</>;
  }

  // Check if we have the required environment variable
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  if (!publishableKey) {
    const error = "Missing NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY environment variable";
    console.error(error);
    setAuthError(error);

    // Instead of silently failing, show an error message
    return (
      <div className="p-4 bg-destructive/10 border border-destructive rounded m-4">
        <h2 className="text-lg font-bold text-destructive mb-2">Authentication Configuration Error</h2>
        <p>
          The Clerk publishable key is missing. Authentication will not work properly.
        </p>
        <p className="mt-2">
          Please add <code className="bg-muted px-1 rounded">NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY</code> to your environment variables.
        </p>
        <p className="mt-2 text-sm">
          For development, create a <code className="bg-muted px-1 rounded">.env.local</code> file in the project root.
        </p>
        {children}
      </div>
    );
  }

  return (
    <ClerkProvider
      publishableKey={publishableKey}
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      signInFallbackRedirectUrl="/dashboard"
      afterSignInUrl="/dashboard"
      afterSignUpUrl="/dashboard"
      appearance={{
        variables: { colorPrimary: '#3b82f6' }, // Changed to a brighter blue
        elements: {
          formButtonPrimary:
            'bg-blue-500 text-white hover:bg-blue-600 shadow-md font-medium',
          card: 'bg-background border border-border shadow-md',
          headerTitle: 'text-foreground text-xl font-semibold',
          headerSubtitle: 'text-muted-foreground',
          socialButtonsBlockButton:
            'border border-border bg-background text-foreground shadow-sm hover:bg-muted',
          formFieldLabel: 'text-foreground font-medium',
          formFieldInput: 'bg-background border border-input',
          footerActionLink: 'text-blue-400 hover:text-blue-300 font-medium',
          identityPreviewEditButton: 'text-blue-400 hover:text-blue-300',
          formButtonReset: 'text-blue-400 hover:text-blue-300 font-medium',
          otpCodeFieldInput: 'border-blue-400 focus:border-blue-500',
        },
        layout: {
          socialButtonsPlacement: 'top',
          socialButtonsVariant: 'blockButton',
        }
      }}
    >
      <ClerkLoading>
        {/* Show while Clerk is loading */}
        {children}
      </ClerkLoading>
      <ClerkLoaded>
        {/* Show when Clerk is loaded */}
        {children}
      </ClerkLoaded>
    </ClerkProvider>
  );
};

export default AuthWrapper;
