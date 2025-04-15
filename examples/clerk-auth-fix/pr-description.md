# WTFB-05: Fix Clerk auth error by removing unsupported onError prop

## Overview
This PR fixes the Clerk authentication error that was causing the build to fail in Vercel deployments.

## Changes
- Removed the unsupported `onError` prop from the `ClerkProvider` component
- Added a global error event listener to catch and handle Clerk-related errors instead
- Fixed React hooks order to comply with the Rules of Hooks

## Technical Details
The error was occurring because the `onError` property doesn't exist on the `NextClerkProviderProps` type. The build was failing with the following error:

```
Type error: Type '{ children: Element[]; publishableKey: string; signInUrl: string; signUpUrl: string; signInFallbackRedirectUrl: string; afterSignInUrl: string; afterSignUpUrl: string; appearance: { ...; }; onError: (err: any) => void; }' is not assignable to type 'IntrinsicAttributes & Without<NextClerkProviderProps, "__unstable_invokeMiddlewareOnAuthStateChange">'. Property 'onError' does not exist on type 'IntrinsicAttributes & Without<NextClerkProviderProps, "__unstable_invokeMiddlewareOnAuthStateChange">'
```

The fix replaces the direct `onError` prop with a global error event listener that checks for Clerk-related errors and handles them appropriately. We also made sure to follow React's rules of hooks by placing all hooks at the top level of the component.

## Testing
- The application runs without console errors locally
- The build process completes successfully locally
- The build should now complete successfully in Vercel

## Impact
This change will fix the build failure and allow the application to be deployed successfully.

## Related Issues
- WTFB-05: Fix Clerk auth error
