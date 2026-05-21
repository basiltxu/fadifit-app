import { RouterProvider } from 'react-router';
import { ThemeProvider } from './contexts/ThemeContext';
import { AppProvider } from './contexts/AppContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { router } from './routes';

export default function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <AppProvider>
          <RouterProvider router={router} />
        </AppProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}
