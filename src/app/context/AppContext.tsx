import { createContext, useContext, useState, ReactNode } from 'react';
import { units, ShortlistedUnit, Notification, sampleNotifications } from '../data/mockData';

export interface CompareUnit {
  id: string;
}

interface AppContextValue {
  shortlist: ShortlistedUnit[];
  addToShortlist: (unitId: string) => void;
  removeFromShortlist: (unitId: string) => void;
  isShortlisted: (unitId: string) => boolean;

  compareList: string[];
  addToCompare: (unitId: string) => void;
  removeFromCompare: (unitId: string) => void;
  clearCompare: () => void;

  notifications: Notification[];
  markNotificationRead: (id: string) => void;
  markAllRead: () => void;
  unreadCount: number;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [shortlist, setShortlist] = useState<ShortlistedUnit[]>([]);
  const [compareList, setCompareList] = useState<string[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>(sampleNotifications);

  const addToShortlist = (unitId: string) => {
    const unit = units.find(u => u.id === unitId);
    if (!unit) return;
    setShortlist(prev => {
      if (prev.some(u => u.id === unitId)) return prev;
      return [...prev, { ...unit, shortlistedAt: new Date() }];
    });
  };

  const removeFromShortlist = (unitId: string) => {
    setShortlist(prev => prev.filter(u => u.id !== unitId));
  };

  const isShortlisted = (unitId: string) => shortlist.some(u => u.id === unitId);

  const addToCompare = (unitId: string) => {
    setCompareList(prev => {
      if (prev.includes(unitId)) return prev;
      if (prev.length >= 3) return prev; // max 3
      return [...prev, unitId];
    });
  };

  const removeFromCompare = (unitId: string) => {
    setCompareList(prev => prev.filter(id => id !== unitId));
  };

  const clearCompare = () => setCompareList([]);

  const markNotificationRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <AppContext.Provider
      value={{
        shortlist,
        addToShortlist,
        removeFromShortlist,
        isShortlisted,
        compareList,
        addToCompare,
        removeFromCompare,
        clearCompare,
        notifications,
        markNotificationRead,
        markAllRead,
        unreadCount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
