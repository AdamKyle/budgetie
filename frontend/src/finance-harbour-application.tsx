import { Route, Routes } from 'react-router';

import PublicLayout from './layout/public-layout';
import LandingPage from './pages/landing-page';
import Onboard from './pages/protected/onboard';
import About from './pages/public/about';
import GoogleAuthCallback from './pages/public/google-auth-callback';
import Login from './pages/public/login';
import Register from './pages/public/register';
import Updates from './pages/public/updates';
import ProtectedRoute from './react-router/components/protected-route';
import { NavigationRoutes } from './react-router/enums/navigation-routes';

const FinanceHarbourApplication = () => {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path={NavigationRoutes.HOME} element={<LandingPage />} />
        <Route path={NavigationRoutes.ABOUT} element={<About />} />
        <Route path={NavigationRoutes.UPDATES} element={<Updates />} />
        <Route path={NavigationRoutes.LOGIN} element={<Login />} />
        <Route path={NavigationRoutes.REGISTER} element={<Register />} />
        <Route
          path={NavigationRoutes.GOOGLE_AUTH_CALLBACK}
          element={<GoogleAuthCallback />}
        />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path={NavigationRoutes.ONBOARDING} element={<Onboard />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default FinanceHarbourApplication;
