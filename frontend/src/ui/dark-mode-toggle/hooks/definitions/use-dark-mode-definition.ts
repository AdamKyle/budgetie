export default interface UseDarkModeDefinition {
  darkModeAriaLabel: string;
  darkModeIconClassName: string;
  darkModeLabel: string;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}
