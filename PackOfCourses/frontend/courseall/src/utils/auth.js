// utils/auth.js

export const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return token !== null;
  };
  
  export const isAdmin = () => {
    const token = localStorage.getItem('token');
    if (!token) return false;
  
    try {
      const decoded = JSON.parse(atob(token.split('.')[1])); // Decode token
      return decoded.isAdmin; // Check if the user is admin
    } catch (error) {
      return false;
    }
  };
  