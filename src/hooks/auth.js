// hooks/auth.js
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from '@react-native-firebase/auth';

export function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged((authUser) => {
      setUser(authUser);
    });

    return unsubscribe; // Isso cancelará a inscrição quando o componente for desmontado
  }, []);

  return { user };
}
