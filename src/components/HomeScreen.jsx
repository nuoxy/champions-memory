/**
 * ============================================
 * רכיב HomeScreen - מסך הבית / בחירת נושא
 * ============================================
 * 
 * מסך הפתיחה של המשחק. מציג:
 * - כותרת ראשית מעוצבת
 * - רשימת נושאים (עולמות) לבחירה
 * - נושאים נעולים עם אייקון מנעול וטקסט "בקרוב"
 * 
 * @param {Object} props
 * @param {Array} props.themes - מערך הנושאים הזמינים
 * @param {Function} props.onSelectTheme - callback בבחירת נושא (מקבל themeId)
 */
function HomeScreen({ themes, onSelectTheme }) {
  return (
    <div
      id="home-screen"
      className="
        h-full flex flex-col items-center justify-center
        bg-gradient-to-b from-bg-main via-white to-primary-light/10
        px-4 py-4 sm:py-8
        pt-[max(1rem,env(safe-area-inset-top))]
        pb-[max(1rem,env(safe-area-inset-bottom))]
      "
    >
      {/* --- כותרת ראשית --- */}
      <div className="text-center mb-10 sm:mb-14">
        <div className="text-6xl sm:text-7xl mb-4 animate-[float_3s_ease-in-out_infinite]">
          🏆
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-3">
          <span className="bg-gradient-to-l from-primary via-secondary to-accent-warm bg-clip-text text-transparent">
            זיכרון של אלופים
          </span>
        </h1>
        <p className="text-text-secondary text-base sm:text-lg font-medium">
          בחרו עולם והתחילו לשחק! 🎮
        </p>
      </div>

      {/* --- רשימת נושאים --- */}
      <div className="w-full max-w-md flex flex-col gap-4 sm:gap-5">
        {themes.map((theme, index) => (
          <button
            key={theme.id}
            id={`theme-${theme.id}`}
            onClick={() => !theme.locked && onSelectTheme(theme.id)}
            disabled={theme.locked}
            aria-label={theme.locked ? `${theme.name} - נעול, בקרוב` : `שחק ${theme.name}`}
            className={`
              relative w-full
              rounded-3xl overflow-hidden
              transition-all duration-300 cubic-bezier(0.4, 0, 0.2, 1)
              min-h-[90px] sm:min-h-[110px]
              border-0 p-0 text-right
              animate-[bounce-in_0.5s_ease-out_both]
              ${theme.locked
                ? 'cursor-not-allowed opacity-60 grayscale'
                : 'cursor-pointer hover:scale-[1.04] hover:-translate-y-1 hover:shadow-2xl active:scale-[0.96] active:shadow-md'
              }
            `}
            style={{ animationDelay: `${index * 0.12}s` }}
          >
            {/* רקע גרדיאנט */}
            <div className={`
              absolute inset-0 bg-gradient-to-l ${theme.bgGradient}
              ${theme.locked ? 'opacity-40' : 'opacity-100'}
            `} />

            {/* תוכן הכרטיס */}
            <div className="relative z-10 flex items-center gap-4 p-5 sm:p-6">
              {/* תצוגה מקדימה / אייקון הנושא */}
              <div className={`
                w-16 h-16 sm:w-20 sm:h-20
                rounded-2xl
                bg-white/25 backdrop-blur-sm
                flex items-center justify-center
                text-3xl sm:text-4xl
                shadow-sm
                overflow-hidden
                ${!theme.locked ? 'animate-[float_4s_ease-in-out_infinite]' : ''}
              `}
                style={{ animationDelay: `${index * 0.5}s` }}
              >
                {theme.locked ? (
                  '🔒'
                ) : theme.previewImage ? (
                  <img src={theme.previewImage} alt="" className="w-full h-full object-cover" draggable="false" />
                ) : (
                  theme.icon
                )}
              </div>

              {/* פרטי הנושא */}
              <div className="flex-1">
                <h2 className="text-xl sm:text-2xl font-black text-white drop-shadow-sm mb-1">
                  {theme.name}
                </h2>
                <p className="text-sm sm:text-base text-white/80 font-medium">
                  {theme.locked ? '🔒 בקרוב...' : theme.description}
                </p>
              </div>

              {/* חץ / מנעול */}
              <div className="text-2xl sm:text-3xl text-white/70">
                {theme.locked ? '🔒' : '◀'}
              </div>
            </div>

            {/* אפקט ברק דקורטיבי (רק לנושאים פתוחים) */}
            {!theme.locked && (
              <div
                className="
                  absolute inset-0
                  bg-gradient-to-l from-transparent via-white/10 to-transparent
                  animate-[shimmer_3s_infinite]
                  bg-[length:200%_100%]
                "
              />
            )}
          </button>
        ))}
      </div>

      {/* --- פוטר --- */}
      <footer className="mt-10 sm:mt-14 text-center text-text-light text-xs sm:text-sm">
        <p>מותאם לילדים בגילאי 4-7 🧒</p>
      </footer>
    </div>
  );
}

export default HomeScreen;
