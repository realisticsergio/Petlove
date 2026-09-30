import type { Metadata } from 'next';
import FriendsPageClient from '@/components/friends/FriendsPageClient';

export const metadata: Metadata = {
  title: 'Our friends',
  description: 'Petlove partners and animal support organizations.',
};

export default function FriendsPage() {
  return <FriendsPageClient />;
}
