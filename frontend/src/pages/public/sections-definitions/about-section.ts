import financeHarbourPlanningImage from 'assets/about-section/finance-harbour-planning.png';
import financeHarbourPrivacyImage from 'assets/about-section/finance-harbour-privacy.png';
import financeHarbourTrackingImage from 'assets/about-section/finance-harbour-tracking.png';

export const AboutSections = [
  {
    id: 'budget-periods',
    imageAlt: 'Finance Harbour mascot organizing budgets by period',
    imageSrc: financeHarbourPlanningImage,
    isImageRight: false,
    title: 'Budget by the period',
    text: 'Manage your money by the time frame that fits your life, whether that is monthly, every two weeks, a pay period, or a custom period.',
  },
  {
    id: 'transactions',
    imageAlt: 'Finance Harbour mascot tracking income and expenses',
    imageSrc: financeHarbourTrackingImage,
    isImageRight: true,
    title: 'Track every transaction',
    text: 'Add income and expenses in one place and see how each transaction changes your budget, what is left, and where your money is going.',
  },
  {
    id: 'privacy',
    imageAlt: 'Finance Harbour mascot protecting private budget details',
    imageSrc: financeHarbourPrivacyImage,
    isImageRight: false,
    title: 'Your budget stays private',
    text: 'Your budget details are personal, so Finance Harbour is built to keep your information safe, secure, and easy for only you to manage.',
  },
];
