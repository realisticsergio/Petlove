'use client';

import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { useEffect, useState, type ReactNode } from 'react';
import Loader from '@/components/common/Loader/Loader';
import { clearAuth, setCredentials } from '@/redux/auth/authSlice';
import { useAppDispatch } from '@/redux/hooks';
import { store } from '@/redux/store';
import { fetchCurrentUser } from '@/services/auth';

type AppProvidersProps = {
  children: ReactNode;
};

function AuthBootstrap({ children }: AppProvidersProps) {
  const dispatch = useAppDispatch();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let isActive = true;

    const restoreSession = async () => {
      const token = window.localStorage.getItem('petlove-token');

      if (!token) {
        if (isActive) {
          setIsReady(true);
        }

        return;
      }

      try {
        const user = await fetchCurrentUser();

        if (isActive) {
          dispatch(
            setCredentials({
              user,
              token,
            }),
          );
        }
      } catch {
        window.localStorage.removeItem('petlove-token');

        if (isActive) {
          dispatch(clearAuth());
        }
      } finally {
        if (isActive) {
          setIsReady(true);
        }
      }
    };

    restoreSession();

    return () => {
      isActive = false;
    };
  }, [dispatch]);

  if (!isReady) {
    return <Loader fullScreen label="Відновлення сесії" />;
  }

  return children;
}

export default function AppProviders({ children }: AppProvidersProps) {
  return (
    <Provider store={store}>
      <AuthBootstrap>{children}</AuthBootstrap>

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            padding: '14px 18px',
            color: '#262626',
            background: '#ffffff',
            borderRadius: '15px',
          },
          success: {
            iconTheme: {
              primary: '#08aa83',
              secondary: '#ffffff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef2447',
              secondary: '#ffffff',
            },
          },
        }}
      />
    </Provider>
  );
}
