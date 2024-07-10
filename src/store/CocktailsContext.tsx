import { createContext, useState, useContext, ReactNode, FC } from 'react';
import { Cocktail } from '../services/api/types';

interface CocktailContextType {
  cocktails: Cocktail[];
  addCocktail: (cocktail: Cocktail) => void;
}

const CocktailContext = createContext<CocktailContextType | undefined>(undefined);

export const useCocktails = () => {
  const context = useContext(CocktailContext);
  if (!context) {
    throw new Error('useCocktails must be used within a CocktailProvider');
  }
  return context;
};

export const CocktailProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [cocktails, setCocktails] = useState<Cocktail[]>(() => {
    const savedCocktails = localStorage.getItem('cocktails');
    return savedCocktails ? JSON.parse(savedCocktails) : [];
  });

  const addCocktail = (cocktail: Cocktail) => {
    setCocktails((prevCocktails) => {
      const updatedCocktails = [...prevCocktails, cocktail];
      localStorage.setItem('cocktails', JSON.stringify(updatedCocktails));
      return updatedCocktails;
    });
  };

  return (
    <CocktailContext.Provider value={{ cocktails, addCocktail }}>
      {children}
    </CocktailContext.Provider>
  );
};
