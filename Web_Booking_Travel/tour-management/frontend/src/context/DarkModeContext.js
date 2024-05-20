import React, { createContext, useReducer } from 'react';

const DarkModeContext = createContext();

const darkModeReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE':
      return { darkMode: !state.darkMode };
    default:
      return state;
  }
};

const DarkModeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(darkModeReducer, { darkMode: false });

  return (
    <DarkModeContext.Provider value={{ state, dispatch }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export { DarkModeContext, DarkModeProvider };
