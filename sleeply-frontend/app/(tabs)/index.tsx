import { useState, useEffect } from 'react';
import { Redirect } from 'expo-router';
import * as SecureStore from 'expo-secure-store';

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState<string | null>(null);

  useEffect(() => {
    async function checkToken() {
      const token = await SecureStore.getItemAsync('userToken');
      setUserToken(token);
      setIsLoading(false);
    }
    checkToken();
  }, []);

  if (isLoading) {
    return null; // or a loading component
  }

  if (userToken) {
    return <Redirect href="/dashboard" />;
  } else {
    return <Redirect href="/auth" />;
  }
}
