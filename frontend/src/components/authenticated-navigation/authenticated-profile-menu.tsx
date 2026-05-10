import clsx from 'clsx';
import { AnimatePresence, motion } from 'motion/react';
import { KeyboardEvent, useId, useRef, useState } from 'react';
import { NavLink } from 'react-router';

import AuthenticatedProfileMenuProps from './types/authenticated-profile-menu-props';

import { UseLogout } from 'lib/authentication/api/hooks/use-logout';

import { NavigationRoutes } from 'router/enums/navigation-routes';
import { navigateToRoute } from 'router/utils/navigate-to-route';

const AuthenticatedProfileMenu = ({
  shouldReduceMotion,
}: AuthenticatedProfileMenuProps) => {
  const menuId = useId();
  const profileButtonRef = useRef<HTMLButtonElement | null>(null);

  const { loading, logout } = UseLogout({
    navigate_to_route: navigateToRoute,
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  const handleCloseMenuAndRestoreFocus = () => {
    setIsMenuOpen(false);
    profileButtonRef.current?.focus();
  };

  const handleToggleMenu = () => {
    setIsMenuOpen((currentIsMenuOpen) => !currentIsMenuOpen);
  };

  const handleLogout = () => {
    handleCloseMenu();
    logout().catch(() => {});
  };

  const handleMenuKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Escape') {
      return;
    }

    event.preventDefault();
    handleCloseMenuAndRestoreFocus();
  };

  return (
    <div className="relative flex justify-end">
      <button
        ref={profileButtonRef}
        type="button"
        aria-label={isMenuOpen ? 'Close profile menu' : 'Open profile menu'}
        aria-controls={menuId}
        aria-expanded={isMenuOpen}
        aria-haspopup="true"
        onClick={handleToggleMenu}
        className="border-storm-dust-400 bg-storm-dust-50 focus:ring-storm-dust-400 hover:bg-storm-dust-200 dark:border-storm-dust-600 dark:bg-storm-dust-900 dark:hover:bg-storm-dust-800 inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border transition focus:ring-2 focus:outline-hidden"
      >
        <img
          src={
            'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 48 48%22%3E%3Cpath fill=%22%233f3f46%22 d=%22M24 24c4.4 0 8-3.6 8-8s-3.6-8-8-8-8 3.6-8 8 3.6 8 8 8Zm0 4c-7.2 0-13 4.4-13 9.8 0 1.2 1 2.2 2.2 2.2h21.6c1.2 0 2.2-1 2.2-2.2 0-5.4-5.8-9.8-13-9.8Z%22/%3E%3C/svg%3E'
          }
          alt=""
          aria-hidden="true"
          className="h-6 w-6 rounded-full object-contain"
        />
      </button>

      <AnimatePresence initial={false}>
        {isMenuOpen && (
          <motion.div
            key="authenticated-profile-menu"
            id={menuId}
            aria-label="Profile options"
            initial={
              shouldReduceMotion ? false : { height: 0, opacity: 0, y: -8 }
            }
            animate={{ height: 'auto', opacity: 1, y: 0 }}
            exit={
              shouldReduceMotion
                ? { opacity: 0 }
                : { height: 0, opacity: 0, y: -8 }
            }
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { duration: 0.24, ease: 'easeOut' }
            }
            onKeyDown={handleMenuKeyDown}
            className="border-storm-dust-200 bg-storm-dust-50 dark:border-storm-dust-800 dark:bg-storm-dust-950 absolute top-full right-0 mt-3 w-64 overflow-hidden rounded-2xl border p-2 shadow-lg"
          >
            <nav aria-label="Profile navigation">
              <ul className="space-y-1">
                <li>
                  <NavLink
                    to={NavigationRoutes.PROFILE}
                    onClick={handleCloseMenu}
                    className={({ isActive }) =>
                      clsx(
                        'focus:ring-storm-dust-400 flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium transition focus:ring-2 focus:outline-hidden',
                        isActive
                          ? 'bg-storm-dust-200 text-storm-dust-950 dark:bg-storm-dust-800 dark:text-storm-dust-50'
                          : 'text-storm-dust-700 hover:bg-storm-dust-100 dark:text-storm-dust-200 dark:hover:bg-storm-dust-900'
                      )
                    }
                  >
                    <i className="fa-solid fa-user" aria-hidden="true" />
                    <span>Profile</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to={NavigationRoutes.SETTINGS}
                    onClick={handleCloseMenu}
                    className={({ isActive }) =>
                      clsx(
                        'focus:ring-storm-dust-400 flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium transition focus:ring-2 focus:outline-hidden',
                        isActive
                          ? 'bg-storm-dust-200 text-storm-dust-950 dark:bg-storm-dust-800 dark:text-storm-dust-50'
                          : 'text-storm-dust-700 hover:bg-storm-dust-100 dark:text-storm-dust-200 dark:hover:bg-storm-dust-900'
                      )
                    }
                  >
                    <i className="fa-solid fa-gear" aria-hidden="true" />
                    <span>Settings</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to={NavigationRoutes.HELP}
                    onClick={handleCloseMenu}
                    className={({ isActive }) =>
                      clsx(
                        'focus:ring-storm-dust-400 flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium transition focus:ring-2 focus:outline-hidden',
                        isActive
                          ? 'bg-storm-dust-200 text-storm-dust-950 dark:bg-storm-dust-800 dark:text-storm-dust-50'
                          : 'text-storm-dust-700 hover:bg-storm-dust-100 dark:text-storm-dust-200 dark:hover:bg-storm-dust-900'
                      )
                    }
                  >
                    <i
                      className="fa-solid fa-circle-question"
                      aria-hidden="true"
                    />
                    <span>Help</span>
                  </NavLink>
                </li>

                <li>
                  <button
                    type="button"
                    disabled={loading}
                    onClick={handleLogout}
                    className={clsx(
                      'focus:ring-storm-dust-400 flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium transition focus:ring-2 focus:outline-hidden',
                      'text-storm-dust-700 hover:bg-storm-dust-100 dark:text-storm-dust-200 dark:hover:bg-storm-dust-900 disabled:cursor-not-allowed disabled:opacity-60'
                    )}
                  >
                    <i
                      className="fa-solid fa-arrow-right-from-bracket"
                      aria-hidden="true"
                    />
                    <span>{loading ? 'Logging out' : 'Logout'}</span>
                  </button>
                </li>

                <li
                  aria-hidden="true"
                  className="bg-storm-dust-200 dark:bg-storm-dust-800 my-2 h-px"
                />

                <li>
                  <NavLink
                    to={NavigationRoutes.UPDATES}
                    onClick={handleCloseMenu}
                    className={({ isActive }) =>
                      clsx(
                        'focus:ring-storm-dust-400 flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium transition focus:ring-2 focus:outline-hidden',
                        isActive
                          ? 'bg-storm-dust-200 text-storm-dust-950 dark:bg-storm-dust-800 dark:text-storm-dust-50'
                          : 'text-storm-dust-700 hover:bg-storm-dust-100 dark:text-storm-dust-200 dark:hover:bg-storm-dust-900'
                      )
                    }
                  >
                    <i className="fa-solid fa-code-branch" aria-hidden="true" />
                    <span>Version</span>
                  </NavLink>
                </li>
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AuthenticatedProfileMenu;
