import type { ReactNode } from 'react';
import RouteGuard from '@/components/auth/RouteGuard/RouteGuard';

type PrivateLayoutProps = {
  children: ReactNode;
};

export default function PrivateLayout({ children }: PrivateLayoutProps) {
  return <RouteGuard access="private">{children}</RouteGuard>;
}
