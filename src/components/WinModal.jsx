/**
 * רכיב WinModal - מודל ניצחון
 * 
 * מוצג כשהשחקן מסיים את המשחק (מצא את כל הזוגות).
 * מציג הודעת ניצחון, סטטיסטיקות, דירוג כוכבים,
 * וכפתורים לשחק שוב או לחזור לתפריט.
 * 
 * @param {Object} props
 * @param {boolean} props.isVisible - האם המודל מוצג
 * @param {number} props.attempts - מספר הניסיונות
 * @param {number} props.totalPairs - סה"כ זוגות
 * @param {Function} props.onRestart - callback למשחק חדש
 * @param {Function} props.onBackToHome - callback לחזרה למסך הבית
 */
function WinModal({ isVisible, attempts, totalPairs, onRestart, onBackToHome }) {
  if (!isVisible) return null;

  /**
   * חישוב דירוג כוכבים לפי מספר הניסיונות
   * - 3 כוכבים: ניסיונות <= מספר הזוגות (מושלם!)
   * - 2 כוכבים: ניסיונות <= מספר הזוגות * 2
   * - 1 כוכב: מעל לכך
   */
  const getStarRating = () => {
    if (attempts <= totalPairs) return 3;
    if (attempts <= totalPairs * 2) return 2;
    return 1;
  };

  const stars = getStarRating();

  return (
    /* שכבת רקע כהה */
    <div
      id="win-modal-overlay"
      className="
        fixed inset-0 z-50
        bg-black/50 backdrop-blur-sm
        flex items-center justify-center
        p-4
        animate-[bounce-in_0.5s_ease-out]
      "
    >
      {/* תיבת המודל */}
      <div
        id="win-modal"
        className="
          bg-white rounded-3xl
          p-6 sm:p-8 md:p-10
          max-w-sm w-full
          shadow-2xl
          text-center
          border-4 border-accent/30
        "
      >
        {/* אימוג'י ניצחון */}
        <div className="text-6xl sm:text-7xl mb-4 animate-[float_2s_ease-in-out_infinite]">
          🎉
        </div>

        {/* כותרת */}
        <h2 className="text-2xl sm:text-3xl font-black text-primary mb-2">
          כל הכבוד!
        </h2>
        <p className="text-text-secondary text-base sm:text-lg mb-6">
          מצאת את כל הזוגות!
        </p>

        {/* דירוג כוכבים */}
        <div className="flex justify-center gap-2 mb-6" aria-label={`דירוג: ${stars} מתוך 3 כוכבים`}>
          {[1, 2, 3].map((i) => (
            <span
              key={i}
              className={`
                text-4xl sm:text-5xl
                transition-all duration-500
                ${i <= stars
                  ? 'animate-[star-spin_0.6s_ease-out_forwards] opacity-100'
                  : 'opacity-20 grayscale'
                }
              `}
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              ⭐
            </span>
          ))}
        </div>

        {/* סטטיסטיקות */}
        <div className="bg-bg-main rounded-2xl p-4 mb-6">
          <div className="flex justify-center gap-8">
            <div>
              <div className="text-2xl font-black text-primary">{attempts}</div>
              <div className="text-sm text-text-secondary">ניסיונות</div>
            </div>
            <div>
              <div className="text-2xl font-black text-success">{totalPairs}</div>
              <div className="text-sm text-text-secondary">זוגות</div>
            </div>
          </div>
        </div>

        {/* כפתורי פעולה */}
        <div className="flex flex-col gap-3">
          {/* כפתור שחק שוב */}
          <button
            id="play-again-button"
            onClick={onRestart}
            aria-label="שחק שוב"
            className="
              w-full
              bg-gradient-to-l from-primary to-primary-dark
              text-white font-bold text-lg
              px-6 py-4 rounded-2xl
              shadow-lg
              hover:shadow-xl hover:scale-105
              active:scale-95
              transition-all duration-200
              min-h-[var(--spacing-touch-min)]
              cursor-pointer
            "
          >
            🔄 שחק שוב!
          </button>

          {/* כפתור חזרה לתפריט */}
          <button
            id="back-to-menu-button"
            onClick={onBackToHome}
            aria-label="חזרה לתפריט הראשי"
            className="
              w-full
              bg-white
              text-text-secondary font-bold text-base
              px-6 py-3 rounded-2xl
              shadow-sm border-2 border-text-light/30
              hover:bg-bg-main hover:shadow-md hover:scale-105
              active:scale-95
              transition-all duration-200
              min-h-[var(--spacing-touch-min)]
              cursor-pointer
            "
          >
            🏠 חזרה לתפריט
          </button>
        </div>
      </div>
    </div>
  );
}

export default WinModal;
