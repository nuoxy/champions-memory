/**
 * רכיב MemoryCard - קלף בודד במשחק הזיכרון
 * 
 * מציג קלף עם שני צדדים:
 * - צד אחורי (ברירת מחדל): תמונת גב קלף מעוצבת
 * - צד קדמי (כשהקלף הפוך): תמונת חיית חווה עם שם בעברית
 * 
 * @param {Object} props
 * @param {Object} props.card - אובייקט הקלף { id, pairId, name, image }
 * @param {string} props.cardBackImage - נתיב לתמונת גב הקלף
 * @param {boolean} props.isFlipped - האם הקלף הפוך (גלוי)
 * @param {boolean} props.isMatched - האם הקלף כבר נמצא כזוג
 * @param {boolean} props.isDisabled - האם הקלף מושבת (לא ניתן ללחוץ)
 * @param {Function} props.onCardClick - פונקציית callback בלחיצה על הקלף
 */
function MemoryCard({ card, cardBackImage, isFlipped, isMatched, isDisabled, onCardClick }) {
  /**
   * טיפול בלחיצה על הקלף
   * מונע לחיצה אם הקלף מושבת, כבר הפוך, או כבר נמצא כזוג
   */
  const handleClick = () => {
    if (isDisabled || isFlipped || isMatched) return;
    onCardClick(card);
  };

  return (
    <button
      id={`card-${card.id}`}
      onClick={handleClick}
      disabled={isDisabled || isMatched}
      aria-label={isFlipped || isMatched ? `קלף ${card.name}` : 'קלף הפוך - לחץ לגילוי'}
      className={`
        relative w-full aspect-square cursor-pointer
        rounded-[var(--radius-card)] overflow-hidden
        transition-all duration-300 ease-in-out
        min-h-[var(--spacing-touch-min)]
        focus:outline-none focus:ring-4 focus:ring-primary-light/50
        border-0 bg-transparent p-0
        ${isMatched 
          ? 'animate-[match-celebrate_0.5s_ease-in-out] ring-4 ring-success/60 scale-95' 
          : 'hover:scale-105 active:scale-95'
        }
        ${isDisabled && !isMatched ? 'pointer-events-none' : ''}
      `}
      style={{ perspective: '600px' }}
    >
      {/* מעטפת הקלף - מסתובבת ב-3D */}
      <div
        className={`
          relative w-full h-full transition-transform duration-500 ease-in-out
          [transform-style:preserve-3d]
          ${isFlipped || isMatched ? '[transform:rotateY(180deg)]' : ''}
        `}
      >
        {/* === צד אחורי (ברירת מחדל) === */}
        <div
          className="
            absolute inset-0 [backface-visibility:hidden]
            rounded-[var(--radius-card)]
            overflow-hidden
            shadow-lg
            border-3 border-primary-light/30
          "
        >
          {/* תמונת גב הקלף */}
          <img
            src={cardBackImage}
            alt=""
            className="w-full h-full object-cover"
            loading="lazy"
            draggable="false"
          />
        </div>

        {/* === צד קדמי (גלוי) === */}
        <div
          className="
            absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]
            rounded-[var(--radius-card)]
            shadow-lg
            border-3 border-accent/40
            bg-white
            overflow-hidden
            transition-all duration-300
          "
        >
          {/* תמונת החיה - ממלאת את כל הקלף */}
          <img
            src={card.image}
            alt={card.name}
            className="w-full h-full object-cover"
            loading="lazy"
            draggable="false"
          />
          
          {/* שם החיה בעברית - פאנל תחתון מעוצב */}
          <div className="absolute bottom-0 inset-x-0 bg-white/75 backdrop-blur-md py-1 sm:py-1.5 flex justify-center border-t border-white/60">
            <span className="text-xs sm:text-sm font-black text-text-primary drop-shadow-sm">
              {card.name}
            </span>
          </div>

          {/* אפקט זוהר כשנמצא זוג */}
          {isMatched && (
            <div className="absolute inset-0 animate-[confetti-pop_0.6s_ease-out] bg-success/20 pointer-events-none" />
          )}
        </div>
      </div>
    </button>
  );
}

export default MemoryCard;
