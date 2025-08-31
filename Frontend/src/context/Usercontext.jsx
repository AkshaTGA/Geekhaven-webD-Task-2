import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); 


  const updateUser = (updatedUser) => {
    setUser(updatedUser);
  };


  const clearUser = () => {
    setUser(null);
  };


  const addToCart = async (productId) => {
    try {
      const response = await fetch("/api/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
        credentials: "include", 
      });
      const data = await response.json();
      updateUser(data.user); 
    } catch (error) {
      console.error("Cart update failed:", error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const response = await fetch("/api/cart/remove", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
        credentials: "include",
      });
      const data = await response.json();
      updateUser(data.user);
    } catch (error) {
      console.error("Cart remove failed:", error);
    }
  };

  const toggleLikeItem = async (productId) => {
    try {
      const response = await fetch("/api/likedItems/toggle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
        credentials: "include",
      });
      const data = await response.json();
      updateUser(data.user);
    } catch (error) {
      console.error("Liked items update failed:", error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        updateUser,
        clearUser,
        addToCart,
        removeFromCart,
        toggleLikeItem,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => useContext(UserContext);
