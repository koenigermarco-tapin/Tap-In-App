/**
 * TAP-IN Data Manager
 * Handles data versioning, migration, and export
 */

const TapInDataManager = {
  
  // Current data schema version
  SCHEMA_VERSION: 2,
  
  // Initialize data on first load
  init() {
    const version = safeGet('tapinSchemaVersion', 0);
    
    if (version < this.SCHEMA_VERSION) {
      this.migrate(version);
    }
    
    // Set initialized flag
    safeSet('tapinSchemaVersion', this.SCHEMA_VERSION);
  },
  
  // Migrate data from older versions
  migrate(fromVersion) {
    console.log(`Migrating data from v${fromVersion} to v${this.SCHEMA_VERSION}`);
    
    // Version 0 to 1: Normalize belt data
    if (fromVersion < 1) {
      const oldBelt = localStorage.getItem('beltLevel');
      if (oldBelt && !localStorage.getItem('currentBelt')) {
        const belts = ['white', 'blue', 'purple', 'brown', 'black'];
        safeSet('currentBelt', belts[parseInt(oldBelt)] || 'white');
      }
    }
    
    // Version 1 to 2: Add timestamps to progress
    if (fromVersion < 2) {
      const progress = safeGet('tapinGamification', null);
      if (progress && !progress.lastUpdated) {
        progress.lastUpdated = Date.now();
        progress.createdAt = progress.createdAt || Date.now();
        safeSet('tapinGamification', progress);
      }
    }
  },
  
  // Export all user data
  exportData() {
    const exportKeys = [
      'currentBelt',
      'beltsEarned',
      'beltLevel',
      'tapinGamification',
      'assessmentResults',
      'tap_in_assessment_results',
      'tap_in_profile',
      'teamCode',
      'teamData',
      'tap_in_team_data',
      'userProfile',
      'dailyPractice',
      'completedLessons',
      'achievements'
    ];
    
    const exportData = {
      version: this.SCHEMA_VERSION,
      exportedAt: new Date().toISOString(),
      data: {}
    };
    
    exportKeys.forEach(key => {
      const value = safeGet(key, null);
      if (value !== null) {
        exportData.data[key] = value;
      }
    });
    
    return exportData;
  },
  
  // Generate backup code from data
  generateBackupCode() {
    const data = this.exportData();
    const json = JSON.stringify(data);
    
    // Create simple hash for verification
    let hash = 0;
    for (let i = 0; i < json.length; i++) {
      hash = ((hash << 5) - hash) + json.charCodeAt(i);
      hash |= 0;
    }
    
    // Store mapping (in production, this would be server-side)
    const code = `TAP-${this.randomCode(4)}-${this.randomCode(4)}`;
    
    // Store backup locally (in production, use server)
    const backups = safeGet('tapinBackups', {});
    backups[code] = {
      data: btoa(json),
      created: Date.now(),
      hash
    };
    safeSet('tapinBackups', backups);
    
    return code;
  },
  
  // Restore from backup code
  restoreFromCode(code) {
    const backups = safeGet('tapinBackups', {});
    const backup = backups[code];
    
    if (!backup) return null;
    
    try {
      const data = JSON.parse(atob(backup.data));
      return this.importData(data);
    } catch (e) {
      console.error('Failed to restore backup:', e);
      return null;
    }
  },
  
  // Import data with validation
  importData(exportData) {
    if (!exportData || !exportData.data) return false;
    
    // Validate version compatibility
    if (exportData.version > this.SCHEMA_VERSION) {
      console.warn('Import data is from newer version');
    }
    
    // Import each key
    for (const [key, value] of Object.entries(exportData.data)) {
      safeSet(key, value);
    }
    
    // Run migration if needed
    if (exportData.version < this.SCHEMA_VERSION) {
      this.migrate(exportData.version);
    }
    
    return true;
  },
  
  // Clear all user data
  clearAllData(confirm = true) {
    if (confirm && !window.confirm('This will permanently delete all your progress. Are you sure?')) {
      return false;
    }
    
    const keysToKeep = ['tapinSchemaVersion'];
    const allKeys = Object.keys(localStorage);
    
    allKeys.forEach(key => {
      if (!keysToKeep.includes(key)) {
        localStorage.removeItem(key);
      }
    });
    
    return true;
  },
  
  // Generate random code segment
  randomCode(length) {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Exclude confusing chars
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  },
  
  // Get storage statistics
  getStorageStats() {
    return TapInErrorHandler.getStorageQuota();
  }
};

// Initialize on load
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    TapInDataManager.init();
  });
}

window.TapInDataManager = TapInDataManager;

