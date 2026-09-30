import type { ReactNode } from 'react';
import RouteGuard from '@/components/auth/RouteGuard/RouteGuard';

type AuthLayoutProps = {
  children: ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return <RouteGuard access="guest">{children}</RouteGuard>;
}
