/**
 * Clear all browser caches and service workers
 * Call this on app startup to ensure users get the latest version
 */
export const clearAllCaches = async (): Promise<void> => {
  try {
    // Unregister all service workers
    if ('serviceWorker' in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      for (const registration of registrations) {
        await registration.unregister();
        console.log('Unregistered service worker:', registration.scope);
      }
    }

    // Clear all caches
    if ('caches' in window) {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.map(async (name) => {
          await caches.delete(name);
          console.log('Deleted cache:', name);
        })
      );
    }

    console.log('✅ All caches cleared successfully');
  } catch (error) {
    console.error('Error clearing caches:', error);
  }
};

/**
 * Check if a hard reload is needed based on version
 */
export const checkVersionAndReload = (currentVersion: string): void => {
  const storedVersion = localStorage.getItem('app_version');

  if (storedVersion && storedVersion !== currentVersion) {
    console.log(`Version changed from ${storedVersion} to ${currentVersion}`);
    console.log('Clearing storage and reloading...');

    // Clear everything except authentication
    const keysToPreserve = [
      'supabase.auth.token',
      'sb-localhost-auth-token',
    ];

    // Save auth keys
    const preservedData: Record<string, string> = {};
    keysToPreserve.forEach((key) => {
      const value = localStorage.getItem(key);
      if (value) preservedData[key] = value;
    });

    // Clear all storage
    localStorage.clear();
    sessionStorage.clear();

    // Restore auth keys
    Object.entries(preservedData).forEach(([key, value]) => {
      localStorage.setItem(key, value);
    });

    // Set new version
    localStorage.setItem('app_version', currentVersion);

    // Force hard reload
    window.location.reload();
  } else {
    // First time or same version, just set it
    localStorage.setItem('app_version', currentVersion);
  }
};

