'use client';

import { useEffect, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import Loader from '@/components/common/Loader/Loader';
import { useAppSelector } from '@/redux/hooks';

type RouteGuardProps = {
  children: ReactNode;
  access: 'private' | 'guest';
};

export default function RouteGuard({ children, access }: RouteGuardProps) {
  const router = useRouter();
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  const shouldRedirect =
    (access === 'private' && !isLoggedIn) || (access === 'guest' && isLoggedIn);

  useEffect(() => {
    if (!shouldRedirect) {
      return;
    }

    router.replace(access === 'private' ? '/login' : '/profile');
  }, [access, router, shouldRedirect]);

  if (shouldRedirect) {
    return <Loader fullScreen label="Перенаправлення" />;
  }

  return children;
}
