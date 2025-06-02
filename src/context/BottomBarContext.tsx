import React, { createContext } from 'react';


export type Mode = 'korean' | 'icon';

interface BottomBarContextType {
  mode: Mode;
  setMode: (mode: Mode) => void;
}

// 2) Context 생성 (초기값은 null로)
const BottomBarContext = createContext<BottomBarContextType | null>(null);

export default BottomBarContext;