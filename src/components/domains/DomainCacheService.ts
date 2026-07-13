import { DomainResult, DomainSuggestion } from "./DomainData";

export interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

export const CACHE_TTL_DOMAINS = 24 * 60 * 60 * 1000; // 24 hours
export const CACHE_TTL_INFO = 12 * 60 * 60 * 1000; // 12 hours
export const CACHE_TTL_SUGGESTIONS = 48 * 60 * 60 * 1000; // 48 hours

export const DomainCacheService = {
  /**
   * Saves a single domain check result.
   */
  saveDomainResult(fqdn: string, result: Omit<DomainResult, "isAvailable"> & { isAvailable: boolean | "error" }) {
    if (typeof window === "undefined") return;
    try {
      const key = `domain_check:${fqdn.toLowerCase()}`;
      const entry: CacheEntry<typeof result> = {
        data: result,
        timestamp: Date.now()
      };
      localStorage.setItem(key, JSON.stringify(entry));
      this.enforceLimit();
    } catch (e) {
      console.warn("DomainCacheService: Storage write error", e);
    }
  },

  /**
   * Gets a cached domain check result.
   */
  getDomainResult(fqdn: string, ignoreExpiration = false): { data: DomainResult; isExpired: boolean } | null {
    if (typeof window === "undefined") return null;
    try {
      const key = `domain_check:${fqdn.toLowerCase()}`;
      const item = localStorage.getItem(key);
      if (!item) return null;
      const entry: CacheEntry<DomainResult> = JSON.parse(item);
      const age = Date.now() - entry.timestamp;
      const isExpired = age > CACHE_TTL_DOMAINS;
      if (isExpired && !ignoreExpiration) {
        return null;
      }
      return { data: entry.data, isExpired };
    } catch (e) {
      return null;
    }
  },

  /**
   * Saves detail info (WHOIS & Valuation).
   */
  saveDomainInfo(fqdn: string, info: any) {
    if (typeof window === "undefined") return;
    try {
      const key = `domain_info:${fqdn.toLowerCase()}`;
      const entry: CacheEntry<any> = {
        data: info,
        timestamp: Date.now()
      };
      localStorage.setItem(key, JSON.stringify(entry));
      this.enforceLimit();
    } catch (e) {
      console.warn("DomainCacheService: Storage write error", e);
    }
  },

  /**
   * Gets cached detail info.
   */
  getDomainInfo(fqdn: string, ignoreExpiration = false): { data: any; isExpired: boolean } | null {
    if (typeof window === "undefined") return null;
    try {
      const key = `domain_info:${fqdn.toLowerCase()}`;
      const item = localStorage.getItem(key);
      if (!item) return null;
      const entry: CacheEntry<any> = JSON.parse(item);
      const age = Date.now() - entry.timestamp;
      const isExpired = age > CACHE_TTL_INFO;
      if (isExpired && !ignoreExpiration) {
        return null;
      }
      return { data: entry.data, isExpired };
    } catch (e) {
      return null;
    }
  },

  /**
   * Saves AI domain suggestions.
   */
  saveSuggestions(keywords: string, suggestions: DomainSuggestion[]) {
    if (typeof window === "undefined") return;
    try {
      const key = `domain_suggestions:${keywords.toLowerCase()}`;
      const entry: CacheEntry<DomainSuggestion[]> = {
        data: suggestions,
        timestamp: Date.now()
      };
      localStorage.setItem(key, JSON.stringify(entry));
      this.enforceLimit();
    } catch (e) {
      console.warn("DomainCacheService: Storage write error", e);
    }
  },

  /**
   * Gets cached suggestions.
   */
  getSuggestions(keywords: string, ignoreExpiration = false): { data: DomainSuggestion[]; isExpired: boolean } | null {
    if (typeof window === "undefined") return null;
    try {
      const key = `domain_suggestions:${keywords.toLowerCase()}`;
      const item = localStorage.getItem(key);
      if (!item) return null;
      const entry: CacheEntry<DomainSuggestion[]> = JSON.parse(item);
      const age = Date.now() - entry.timestamp;
      const isExpired = age > CACHE_TTL_SUGGESTIONS;
      if (isExpired && !ignoreExpiration) {
        return null;
      }
      return { data: entry.data, isExpired };
    } catch (e) {
      return null;
    }
  },

  /**
   * Clears all expired entries from localStorage.
   */
  clearExpired() {
    if (typeof window === "undefined") return;
    try {
      const keysToRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && (key.startsWith("domain_check:") || key.startsWith("domain_info:") || key.startsWith("domain_suggestions:"))) {
          const item = localStorage.getItem(key);
          if (item) {
            const entry = JSON.parse(item);
            const age = Date.now() - entry.timestamp;
            let ttl = CACHE_TTL_DOMAINS;
            if (key.startsWith("domain_info:")) ttl = CACHE_TTL_INFO;
            if (key.startsWith("domain_suggestions:")) ttl = CACHE_TTL_SUGGESTIONS;
            if (age > ttl) {
              keysToRemove.push(key);
            }
          }
        }
      }
      keysToRemove.forEach(k => localStorage.removeItem(k));
    } catch (e) {
      console.warn("DomainCacheService: Error clearing expired cache", e);
    }
  },

  /**
   * Enforces a maximum cache size of 300 entries (LRU-ish removal policy).
   */
  enforceLimit() {
    if (typeof window === "undefined") return;
    try {
      const cacheEntries: Array<{ key: string; timestamp: number }> = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && (key.startsWith("domain_check:") || key.startsWith("domain_info:") || key.startsWith("domain_suggestions:"))) {
          const item = localStorage.getItem(key);
          if (item) {
            const entry = JSON.parse(item);
            cacheEntries.push({ key, timestamp: entry.timestamp });
          }
        }
      }

      // Keep max 300 entries to prevent localStorage quota issues
      if (cacheEntries.length > 300) {
        cacheEntries.sort((a, b) => a.timestamp - b.timestamp);
        const toRemove = cacheEntries.length - 300;
        for (let i = 0; i < toRemove; i++) {
          localStorage.removeItem(cacheEntries[i].key);
        }
      }
    } catch (e) {
      console.warn("DomainCacheService: Error enforcing cache limit", e);
    }
  }
};
