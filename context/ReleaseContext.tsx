"use client";

import React, { createContext, useContext, useState } from 'react';
import ReleaseModal from '@/components/ReleaseModal';

interface ReleaseContextType {
  onOpenRelease: () => void;
}

const ReleaseContext = createContext<ReleaseContextType | undefined>(undefined);

export function ReleaseProvider({ children }: { children: React.ReactNode }) {
  const [isReleaseOpen, setIsReleaseOpen] = useState(false);

  const onOpenRelease = () => setIsReleaseOpen(true);
  const onReleaseClose = () => setIsReleaseOpen(false);

  return (
    <ReleaseContext.Provider value={{ onOpenRelease }}>
      {children}
      <ReleaseModal isOpen={isReleaseOpen} onClose={onReleaseClose} />
    </ReleaseContext.Provider>
  );
}

export function useRelease() {
  const context = useContext(ReleaseContext);
  if (context === undefined) {
    throw new Error('useRelease must be used within a ReleaseProvider');
  }
  return context;
}
