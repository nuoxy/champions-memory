/**
 * ============================================
 * רכיב MemoryGame - ליבת משחק הזיכרון
 * ============================================
 * 
 * רכיב ראשי המנהל את כל לוגיקת המשחק:
 * - יצירה וערבוב של קלפים לפי הנושא (Theme) שנבחר
 * - ניהול מצב הקלפים (הפוכים, זוגות שנמצאו)
 * - ספירת ניסיונות
 * - זיהוי ניצחון
 * - אפקטי סאונד (flip, match, trouble, congrats)
 * 
 * @param {Object} props
 * @param {Object} props.theme - אובייקט הנושא מ-themes.js
 * @param {Function} props.onBackToHome - callback לחזרה למסך הבית
 */

import { useState, useCallback, useEffect } from 'react';
import MemoryCard from './MemoryCard';
import GameHeader from './GameHeader';
import WinModal from './WinModal';
import useSound from '../hooks/useSound';

/** זמן המתנה לפני הפיכת קלפים חזרה (במילישניות) */
const FLIP_BACK_DELAY = 900;

/** זמן המתנה לפני הצגת מודל ניצחון (במילישניות) */
const WIN_DELAY = 600;

/**
 * ערבוב מערך באלגוריתם Fisher-Yates
 * אלגוריתם יעיל ואקראי לחלוטין לערבוב
 * 
 * @param {Array} array - המערך לערבוב
 * @returns {Array} מערך חדש מעורבב
 */
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * יצירת חפיסת קלפים מעורבבת מתוך נושא
 * כל זוג מופיע פעמיים עם מזהים ייחודיים
 * 
 * @param {Array} pairs - מערך הזוגות מהנושא
 * @returns {Array} מערך קלפים מעורבבים
 */
function createShuffledDeck(pairs) {
  const deck = pairs.flatMap((pair, index) => [
    { ...pair, id: index * 2 },
    { ...pair, id: index * 2 + 1 },
  ]);
  return shuffleArray(deck);
}

function MemoryGame({ theme, onBackToHome }) {
  /** מספר הזוגות הכולל במשחק */
  const totalPairs = theme.pairs.length;

  /* --- מצבי המשחק (State) --- */

  /** חפיסת הקלפים המעורבבת */
  const [cards, setCards] = useState(() => createShuffledDeck(theme.pairs));

  /** קלפים שכרגע הפוכים (מקסימום 2) */
  const [flippedCards, setFlippedCards] = useState([]);

  /** מזהי הזוגות שנמצאו */
  const [matchedPairIds, setMatchedPairIds] = useState(new Set());

  /** מספר הניסיונות */
  const [attempts, setAttempts] = useState(0);

  /** האם הלוח מושבת (בזמן בדיקת זוג) */
  const [isBoardLocked, setIsBoardLocked] = useState(false);

  /** האם להציג את מודל הניצחון */
  const [showWinModal, setShowWinModal] = useState(false);

  /* --- הוק סאונד (טעינה מראש) --- */
  const { play: playSound } = useSound();

  /* --- חישובים נגזרים --- */

  /** מספר הזוגות שנמצאו */
  const matchedPairsCount = matchedPairIds.size;

  /** האם המשחק הסתיים (כל הזוגות נמצאו) */
  const isGameWon = matchedPairsCount === totalPairs;

  /**
   * בדיקה אם המשחק הסתיים - הצגת מודל ניצחון והשמעת צליל
   */
  useEffect(() => {
    if (isGameWon && matchedPairsCount > 0) {
      const timer = setTimeout(() => {
        setShowWinModal(true);
        playSound('congrats');
      }, WIN_DELAY);
      return () => clearTimeout(timer);
    }
  }, [isGameWon, matchedPairsCount, playSound]);

  /**
   * טיפול בלחיצה על קלף
   * מנהל את הלוגיקה של הפיכת קלפים ובדיקת זוגות
   * כולל אפקטי סאונד מתאימים לכל מצב
   * 
   * @param {Object} card - הקלף שנלחץ
   */
  const handleCardClick = useCallback((card) => {
    // מניעת לחיצה כשהלוח נעול או שכבר יש 2 קלפים הפוכים
    if (isBoardLocked || flippedCards.length >= 2) return;

    // מניעת לחיצה כפולה על אותו קלף
    if (flippedCards.some(fc => fc.id === card.id)) return;

    // השמעת צליל הפיכת קלף
    playSound('flip');

    const newFlipped = [...flippedCards, card];
    setFlippedCards(newFlipped);

    // אם זה הקלף השני - בדיקת התאמה
    if (newFlipped.length === 2) {
      setAttempts(prev => prev + 1);
      const [first, second] = newFlipped;

      if (first.pairId === second.pairId) {
        // === נמצא זוג! ===
        setTimeout(() => playSound('match'), 300);
        setMatchedPairIds(prev => new Set([...prev, first.pairId]));
        setFlippedCards([]);
      } else {
        // === לא זוג - הפיכת הקלפים בחזרה אחרי השהיה ===
        setIsBoardLocked(true);
        setTimeout(() => playSound('trouble'), 400);
        setTimeout(() => {
          setFlippedCards([]);
          setIsBoardLocked(false);
        }, FLIP_BACK_DELAY);
      }
    }
  }, [flippedCards, isBoardLocked, playSound]);

  /**
   * איפוס המשחק - ערבוב מחדש והתחלה מאפס
   */
  const handleRestart = useCallback(() => {
    setCards(createShuffledDeck(theme.pairs));
    setFlippedCards([]);
    setMatchedPairIds(new Set());
    setAttempts(0);
    setIsBoardLocked(false);
    setShowWinModal(false);
  }, [theme.pairs]);

  /**
   * בדיקה האם קלף מסוים הפוך כרגע
   */
  const isCardFlipped = (cardId) => {
    return flippedCards.some(fc => fc.id === cardId);
  };

  /**
   * בדיקה האם קלף מסוים נמצא כזוג
   */
  const isCardMatched = (pairId) => {
    return matchedPairIds.has(pairId);
  };

  return (
    <div
      id="memory-game-container"
      className="
        h-full w-full flex flex-col items-center
        bg-gradient-to-b from-bg-main via-white to-primary-light/10
        pt-[max(0.5rem,env(safe-area-inset-top))]
        pb-[max(0.5rem,env(safe-area-inset-bottom))]
        overflow-hidden
      "
    >
      {/* --- כותרת ולוח תוצאות --- */}
      <GameHeader
        themeName={theme.name}
        themeIcon={theme.icon}
        attempts={attempts}
        matchedPairs={matchedPairsCount}
        totalPairs={totalPairs}
        onRestart={handleRestart}
        onBackToHome={onBackToHome}
      />

      {/* --- לוח המשחק (גריד קלפים) --- */}
      <main className="w-full max-w-lg px-3 sm:px-6 flex-1 flex flex-col items-center justify-center min-h-0">
        <div
          id="game-board"
          className="
            grid grid-cols-3 sm:grid-cols-4 
            grid-rows-4 sm:grid-rows-3
            gap-2 sm:gap-4
            w-full
            max-h-full
            animate-[bounce-in_0.6s_ease-out]
          "
          role="grid"
          aria-label="לוח משחק הזיכרון"
        >
          {cards.map((card) => (
            <MemoryCard
              key={card.id}
              card={card}
              cardBackImage={theme.cardBack}
              isFlipped={isCardFlipped(card.id)}
              isMatched={isCardMatched(card.pairId)}
              isDisabled={isBoardLocked}
              onCardClick={handleCardClick}
            />
          ))}
        </div>
      </main>

      {/* --- פוטר --- */}
      <footer className="mt-6 text-center text-text-light text-xs sm:text-sm">
        <p>מותאם לילדים בגילאי 4-7 🧒</p>
      </footer>

      {/* --- מודל ניצחון --- */}
      <WinModal
        isVisible={showWinModal}
        attempts={attempts}
        totalPairs={totalPairs}
        onRestart={handleRestart}
        onBackToHome={onBackToHome}
      />
    </div>
  );
}

export default MemoryGame;
