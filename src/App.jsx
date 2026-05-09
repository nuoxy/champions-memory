/**
 * ============================================
 * App.jsx - רכיב ראשי של האפליקציה
 * ============================================
 * 
 * מנהל את הניווט בין מסכים:
 * - מסך בית (בחירת נושא)
 * - מסך משחק (משחק הזיכרון)
 * 
 * כולל אנימציית מעבר (fade) בין המסכים
 * ומקסימום 2 רמות עומק (בהתאם לאפיון ב-Claude.md)
 */

import { useState, useCallback, useEffect } from 'react';
import HomeScreen from './components/HomeScreen';
import MemoryGame from './components/MemoryGame';
import { getAllThemes, getThemeById } from './config/themes';

/** משך אנימציית המעבר (במילישניות) */
const TRANSITION_DURATION = 400;

/**
 * מסכים אפשריים באפליקציה
 * @enum {string}
 */
const SCREENS = {
  HOME: 'home',
  GAME: 'game',
};

function App() {
  /** המסך הנוכחי */
  const [currentScreen, setCurrentScreen] = useState(SCREENS.HOME);

  /** מזהה הנושא שנבחר */
  const [selectedThemeId, setSelectedThemeId] = useState(null);

  /** מצב אנימציית המעבר - 'in' | 'out' | null */
  const [fadeState, setFadeState] = useState('in');

  /** כל הנושאים הזמינים */
  const themes = getAllThemes();

  /** הנושא שנבחר (אובייקט מלא) */
  const selectedTheme = selectedThemeId ? getThemeById(selectedThemeId) : null;

  /**
   * מעבר למסך חדש עם אנימציית fade
   * 1. fade-out מהמסך הנוכחי
   * 2. החלפת מסך
   * 3. fade-in למסך החדש
   * 
   * @param {string} screen - המסך היעד
   * @param {string|null} themeId - מזהה נושא (אופציונלי)
   */
  const navigateTo = useCallback((screen, themeId = null) => {
    // שלב 1: fade-out
    setFadeState('out');

    // שלב 2: אחרי סיום ה-fade-out, החלפת מסך
    setTimeout(() => {
      setCurrentScreen(screen);
      if (themeId !== undefined) {
        setSelectedThemeId(themeId);
      }

      // שלב 3: fade-in למסך החדש
      // requestAnimationFrame מבטיח שה-DOM התעדכן לפני ה-fade-in
      requestAnimationFrame(() => {
        setFadeState('in');
      });
    }, TRANSITION_DURATION);
  }, []);

  /**
   * טיפול בבחירת נושא - מעבר למסך המשחק
   * @param {string} themeId - מזהה הנושא שנבחר
   */
  const handleSelectTheme = useCallback((themeId) => {
    navigateTo(SCREENS.GAME, themeId);
  }, [navigateTo]);

  /**
   * חזרה למסך הבית
   */
  const handleBackToHome = useCallback(() => {
    navigateTo(SCREENS.HOME, null);
  }, [navigateTo]);

  return (
    <div
      className={`
        h-[100dvh] w-full overflow-hidden flex flex-col
        transition-opacity ease-in-out
        ${fadeState === 'out' ? 'opacity-0' : 'opacity-100'}
      `}
      style={{ transitionDuration: `${TRANSITION_DURATION}ms` }}
    >
      {currentScreen === SCREENS.HOME && (
        <HomeScreen
          themes={themes}
          onSelectTheme={handleSelectTheme}
        />
      )}

      {currentScreen === SCREENS.GAME && selectedTheme && (
        <MemoryGame
          theme={selectedTheme}
          onBackToHome={handleBackToHome}
        />
      )}
    </div>
  );
}

export default App;
