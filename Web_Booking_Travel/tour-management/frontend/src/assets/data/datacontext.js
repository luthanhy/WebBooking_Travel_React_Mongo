
import React, { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [tourData, setTourData] = useState(null);

  const updateTourData = (data) => {
    setTourData(data);
  };

  return (
    <DataContext.Provider value={{ tourData, updateTourData }}>
      {children}
    </DataContext.Provider>
  );
};
