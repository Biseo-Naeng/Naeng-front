// LanguageModeProvider.tsx
import BottomBarContext, {Mode} from "../context/BottomBarContext";
import React, { useState, ReactNode } from 'react';

export function BottomBarProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>('korean'); // 기본값은 'korean'

  return (
    <BottomBarContext.Provider value={{ mode, setMode }}>
      {children}
    </BottomBarContext.Provider>
  );
}
