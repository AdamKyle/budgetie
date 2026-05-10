import { Route, Routes } from 'react-router';

import AuthorizedLayout from './layout/authorized-layout';
import PublicLayout from './layout/public-layout';
import LandingPage from './pages/landing-page';
import Onboard from './pages/protected/onboard';
import Profile from './pages/protected/profile';
import Settings from './pages/protected/settings';
import About from './pages/public/about';
import GoogleAuthCallback from './pages/public/google-auth-callback';
import Help from './pages/public/help';
import Login from './pages/public/login';
import Register from './pages/public/register';
import Updates from './pages/public/updates';
import OnboardingRedirectRoute from './react-router/components/onboarding-redirect-route';
import ProtectedRoute from './react-router/components/protected-route';
import { NavigationRoutes } from './react-router/enums/navigation-routes';

const FinanceHarbourApplication = () => {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route element={<OnboardingRedirectRoute />}>
          <Route path={NavigationRoutes.HOME} element={<LandingPage />} />
          <Route path={NavigationRoutes.ABOUT} element={<About />} />
          <Route path={NavigationRoutes.LOGIN} element={<Login />} />
          <Route path={NavigationRoutes.REGISTER} element={<Register />} />
        </Route>

        <Route path={NavigationRoutes.HELP} element={<Help />} />
        <Route path={NavigationRoutes.UPDATES} element={<Updates />} />

        <Route
          path={NavigationRoutes.GOOGLE_AUTH_CALLBACK}
          element={<GoogleAuthCallback />}
        />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<AuthorizedLayout />}>
          <Route path={NavigationRoutes.ONBOARDING} element={<Onboard />} />
          <Route path={NavigationRoutes.PROFILE} element={<Profile />} />
          <Route path={NavigationRoutes.SETTINGS} element={<Settings />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default FinanceHarbourApplication;
