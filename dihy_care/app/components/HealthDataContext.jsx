"use client";
import { createContext, useContext, useState } from 'react';

const HealthDataContext = createContext();

export function HealthDataProvider({ children }) {
  const [glucoseData, setGlucoseData] = useState([]);
  const [pressureData, setPressureData] = useState([]);

  return (
    <HealthDataContext.Provider value={{ 
      glucoseData, 
      setGlucoseData,
      pressureData,
      setPressureData 
    }}>
      {children}
    </HealthDataContext.Provider>
  );
}

export function useHealthData() {
  const context = useContext(HealthDataContext);
  if (!context) {
    throw new Error('useHealthData must be used within HealthDataProvider');
  }
  return context;
}