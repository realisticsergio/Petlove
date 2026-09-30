'use client';

import { Menu } from 'lucide-react';
import { useCallback, useState } from 'react';
import { usePathname } from 'next/navigation';
import Logo from '@/components/common/Logo/Logo';
import ModalApproveAction from '@/components/common/ModalApproveAction/ModalApproveAction';
import MobileMenu from '@/components/layout/MobileMenu/MobileMenu';
import AuthNav from '@/components/navigation/AuthNav/AuthNav';
import Nav from '@/components/navigation/Nav/Nav';
import UserNav from '@/components/navigation/UserNav/UserNav';
import { useAppSelector } from '@/redux/hooks';
import styles from './Header.module.css';

export default function Header() {
  const pathname = usePathname();
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const isHomePage = pathname === '/home';
  const variant = isHomePage ? 'light' : 'dark';

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const openLogoutModal = useCallback(() => {
    setIsMenuOpen(false);
    setIsLogoutModalOpen(true);
  }, []);

  return (
    <>
      <header
        className={`${styles.header} ${isHomePage ? styles.homeHeader : ''}`}
      >
        <div className={`container ${styles.inner}`}>
          <Logo variant={variant} />

          <Nav variant={variant} />

          <div className={styles.account}>
            {isLoggedIn ? (
              <UserNav variant={variant} onLogout={openLogoutModal} />
            ) : (
              <AuthNav variant={variant} />
            )}
          </div>

          <button
            type="button"
            className={`${styles.burger} ${styles[variant]}`}
            aria-label="Відкрити меню"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu size={32} strokeWidth={2} aria-hidden="true" />
          </button>
        </div>
      </header>

      <MobileMenu
        isOpen={isMenuOpen}
        isLoggedIn={isLoggedIn}
        onClose={closeMenu}
        onLogout={openLogoutModal}
      />

      <ModalApproveAction
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
      />
    </>
  );
}
