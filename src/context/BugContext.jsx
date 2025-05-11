import { createContext, useState, useContext } from 'react';

const BugContext = createContext();

export const BugProvider = ({ children }) => {
  const [submittedBug, setSubmittedBug] = useState(null);

  return (
    <BugContext.Provider value={{ submittedBug, setSubmittedBug }}>
      {children}
    </BugContext.Provider>
  );
};
export const useBug = () => useContext(BugContext);