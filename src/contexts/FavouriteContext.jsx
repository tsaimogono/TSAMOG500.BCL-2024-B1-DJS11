// src/contexts/FavouriteContext.jsx

import React, { createContext, useState, useContext } from 'react';

export const FavoritesContext = createContext();
// Provider component to wrap the part of the app that needs access to favorites
export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState({});

  const addFavorite = (episode) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [episode.id]: episode,
    }));
  };

// Function to remove an episode from favorites
  const removeFavorite = (episodeId) => {
    const { [episodeId]: _, ...updatedFavorites } = favorites;  // Destructure to remove the episod
    setFavorites(updatedFavorites);
  };

 // Function to check if an episode is in favorites
  const isFavorite = (episodeId) => {
    return !!favorites[episodeId];
  };

  return (
    // Provide the favorites state and functions to the context consumers
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

// Custom hook to use the FavoritesContext
export const useFavorites = () => {
  return useContext(FavoritesContext);
};
