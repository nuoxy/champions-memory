/**
 * רכיב GameHeader - כותרת המשחק ולוח תוצאות
 * 
 * מציג את שם הנושא, מספר הניסיונות ומספר הזוגות שנמצאו.
 * כולל כפתור לאיפוס המשחק וכפתור חזרה לתפריט.
 * 
 * @param {Object} props
 * @param {string} props.themeName - שם הנושא בעברית
 * @param {string} props.themeIcon - אימוג'י הנושא
 * @param {number} props.attempts - מספר הניסיונות
 * @param {number} props.matchedPairs - מספר הזוגות שנמצאו
 * @param {number} props.totalPairs - סה"כ זוגות במשחק
 * @param {Function} props.onRestart - callback לאיפוס המשחק
 * @param {Function} props.onBackToHome - callback לחזרה למסך הבית
 */
function GameHeader({ themeName, themeIcon, attempts, matchedPairs, totalPairs, onRestart, onBackToHome }) {
  return (
    <header className="w-full px-2 sm:px-4 py-4 sm:py-6">
      {/* שורה עליונה: כפתור חזרה (מעוגן לימין) + כותרת (ממורכזת) */}
      <div className="relative flex items-center justify-center mb-6 min-h-[44px]">
        {/* כפתור חזרה לתפריט */}
        <button
          id="back-to-home-button"
          onClick={onBackToHome}
          aria-label="חזרה לתפריט הראשי"
          className="
            absolute right-0 sm:right-2
            flex items-center justify-center gap-1.5
            bg-white/90 backdrop-blur-sm
            px-3 py-2 rounded-xl
            shadow-sm border border-text-light/30
            text-sm font-bold text-text-secondary
            hover:bg-white hover:shadow-md hover:scale-105
            active:scale-95
            transition-all duration-200
            cursor-pointer
            z-10
          "
        >
          {/* אייקון חץ ימינה (RTL back) */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          <span className="hidden sm:inline">תפריט</span>
        </button>

        {/* שם המשחק + נושא */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-center px-12 sm:px-24">
          <span className="bg-gradient-to-l from-primary via-secondary to-accent-warm bg-clip-text text-transparent">
            {themeName} {themeIcon}
          </span>
        </h1>
      </div>

      {/* לוח תוצאות ואיפוס - כל האלמנטים מיושרים בגובה אחיד */}
      <div className="flex items-center justify-center gap-2 sm:gap-4 flex-wrap">
        
        {/* מונה ניסיונות */}
        <div
          id="attempts-counter"
          className="flex items-center justify-center gap-1.5 bg-white/90 px-3 py-2 h-[42px] rounded-xl shadow-sm border border-primary-light/30 text-sm sm:text-base font-semibold min-w-[100px]"
        >
          <span className="text-lg leading-none">🎯</span>
          <span className="text-text-secondary leading-none">ניסיונות:</span>
          <span className="text-primary font-black text-lg leading-none">{attempts}</span>
        </div>

        {/* מונה זוגות */}
        <div
          id="pairs-counter"
          className="flex items-center justify-center gap-1.5 bg-white/90 px-3 py-2 h-[42px] rounded-xl shadow-sm border border-success/30 text-sm sm:text-base font-semibold min-w-[100px]"
        >
          <span className="text-lg leading-none">✨</span>
          <span className="text-text-secondary leading-none">זוגות:</span>
          <span className="text-success font-black text-lg leading-none">
            {matchedPairs}/{totalPairs}
          </span>
        </div>

        {/* כפתור איפוס משחק */}
        <button
          id="restart-button"
          onClick={onRestart}
          aria-label="התחל משחק חדש"
          className="flex items-center justify-center gap-1.5 bg-gradient-to-l from-accent to-accent-warm text-white font-bold px-4 py-2 h-[42px] rounded-xl shadow-md hover:shadow-lg active:scale-95 transition-all text-sm sm:text-base cursor-pointer"
        >
          <span className="text-lg leading-none">🔄</span>
          <span className="leading-none">משחק חדש</span>
        </button>

      </div>
    </header>
  );
}

export default GameHeader;
