// contexts/SearchContext.js
import React, { createContext, useState } from 'react';

export const SearchContext = createContext();
// Provider component to wrap the part of the app that needs access to search context
export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    // Provide the search query state and the function to update it to the context consumers
    <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </SearchContext.Provider>
  );
};