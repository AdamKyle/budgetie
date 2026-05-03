import { AnimatePresence, motion } from 'motion/react';
import { NavLink } from 'react-router';

import type BaseMobileNavigationProps from './types/base-mobile-navigation-props';

import type NavigationItemDefinition from 'router/public-routes/definitions/navigation-item-definition';

import Button from 'ui/buttons/button';
import { ButtonVariant } from 'ui/buttons/enums/button-variant';
import ToggleDarkMode from 'ui/dark-mode-toggle/toggle-dark-mode';

const BaseMobileNavigation = ({
  isMenuOpen,
  mobileMenuId,
  navigationItems,
  shouldReduceMotion,
  onCloseMenu,
  onLogin,
  onRegister,
}: BaseMobileNavigationProps) => {
  const getNavigationLinkClassName = ({ isActive }: { isActive: boolean }) => {
    const baseClassName =
      'focus:ring-storm-dust-400 inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition focus:ring-2 focus:outline-hidden';

    if (isActive) {
      return `${baseClassName} bg-storm-dust-200 text-storm-dust-950 dark:bg-storm-dust-800 dark:text-storm-dust-50`;
    }

    return `${baseClassName} text-storm-dust-700 hover:bg-storm-dust-100 dark:text-storm-dust-200 dark:hover:bg-storm-dust-900`;
  };

  const renderNavigationLink = (navigationItem: NavigationItemDefinition) => {
    return (
      <NavLink
        key={navigationItem.href}
        to={navigationItem.href}
        onClick={onCloseMenu}
        className={getNavigationLinkClassName}
      >
        {navigationItem.label}
      </NavLink>
    );
  };

  return (
    <AnimatePresence initial={false}>
      {isMenuOpen && (
        <motion.div
          key="mobile-menu"
          id={mobileMenuId}
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
          className="border-storm-dust-200 dark:border-storm-dust-800 overflow-hidden border-t md:hidden"
        >
          <div className="py-4">
            <div className="flex flex-col gap-2">
              {navigationItems.map(renderNavigationLink)}
            </div>

            <div className="border-storm-dust-200 dark:border-storm-dust-800 mt-4 flex flex-col gap-3 border-t pt-4">
              <ToggleDarkMode show_label />

              <Button
                on_click={onLogin}
                label="Login"
                variant={ButtonVariant.PRIMARY}
                additional_css="w-full"
              />

              <Button
                on_click={onRegister}
                label="Register"
                variant={ButtonVariant.SUCCESS}
                additional_css="w-full"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BaseMobileNavigation;
