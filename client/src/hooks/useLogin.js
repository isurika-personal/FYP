import { useState } from 'react';
import { useAuthContext } from '../context/useAuthContext';
import config from '../config';

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (values) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${config.apiUrl}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      });

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.error || 'Failed to login');
      }

      // Save the user to local storage
      localStorage.setItem('user', JSON.stringify(json));

      // Update the auth context
      dispatch({ type: 'LOGIN', payload: json });

      // Navigate to the dashboard
      window.location.href = '/app/home';
    } catch (error) {
      setError(error.message);
      console.error('There has been a problem with your fetch operation:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};
