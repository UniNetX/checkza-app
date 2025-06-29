import { useEffect } from 'react';

// Declare splitbee as a global variable
declare global {
  interface Window {
    splitbee: {
      track: (event: string, data?: any) => void;
      user: {
        set: (properties: any) => void;
      };
    };
  }
}

export const useAnalytics = () => {
  const trackEvent = (event: string, data?: any) => {
    if (typeof window !== 'undefined' && window.splitbee) {
      window.splitbee.track(event, data);
    }
  };

  const setUserProperties = (properties: any) => {
    if (typeof window !== 'undefined' && window.splitbee) {
      window.splitbee.user.set(properties);
    }
  };

  const trackPageView = (page: string) => {
    trackEvent('page_view', { page });
  };

  const trackLessonCompleted = (lessonId: string, lessonTitle: string) => {
    trackEvent('lesson_completed', { lessonId, lessonTitle });
  };

  const trackEmailSignup = (email: string) => {
    trackEvent('email_signup', { email });
    setUserProperties({ email });
  };

  const trackPuzzleAttempt = (puzzleId: string, success: boolean, timeSpent: number) => {
    trackEvent('puzzle_attempt', { puzzleId, success, timeSpent });
  };

  const trackOpeningViewed = (openingName: string) => {
    trackEvent('opening_viewed', { openingName });
  };

  const trackResourceDownloaded = (resourceName: string, resourceType: string) => {
    trackEvent('resource_downloaded', { resourceName, resourceType });
  };

  return {
    trackEvent,
    setUserProperties,
    trackPageView,
    trackLessonCompleted,
    trackEmailSignup,
    trackPuzzleAttempt,
    trackOpeningViewed,
    trackResourceDownloaded,
  };
}; 