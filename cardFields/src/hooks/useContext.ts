import { useContext, Context } from 'react';

const useCustomContext = <T>(context: Context<T>) => {
  const contextValue = useContext(context);
  if (contextValue == undefined) {
    throw new Error('useContext must be used within an AppProvider');
  }
  return contextValue;
};

export default useCustomContext;
