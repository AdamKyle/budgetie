import { useNavigate } from 'react-router';

import budgetChart from 'assets/hero-section/budget-chart.png';

import { NavigationRoutes } from 'router/enums/navigation-routes';
import { navigateToRoute } from 'router/utils/navigate-to-route';

import Button from 'ui/buttons/button';
import { ButtonVariant } from 'ui/buttons/enums/button-variant';
import HeroSection from 'ui/hero-section/hero-section';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleNavigateToAbout = () => {
    navigateToRoute(navigate, NavigationRoutes.ABOUT);
  };

  const handleNavigateToRegistration = () => {
    navigateToRoute(navigate, NavigationRoutes.REGISTER);
  };

  return (
    <main>
      <HeroSection
        title="Finance Harbour helps you budget based on periods of time"
        subtitle={
          <>
            <span className="block">
              Track your income, expenses, and transactions in one place across
              monthly budgets, pay cycles, or any custom period. As you spend,
              Finance Harbour updates your budget so you always know what
              changed, what is left, and where your money is going.
            </span>
          </>
        }
        imageSrc={budgetChart}
        imageAlt="Finance Harbour dashboard preview with income, spending, savings, and an upward chart"
      >
        <Button
          on_click={handleNavigateToRegistration}
          label="Get Started Today!"
          variant={ButtonVariant.SUCCESS}
        />
        <Button
          on_click={handleNavigateToAbout}
          label="Learn more about Finance Harbour!"
          variant={ButtonVariant.PRIMARY}
        />
      </HeroSection>
    </main>
  );
};

export default LandingPage;
