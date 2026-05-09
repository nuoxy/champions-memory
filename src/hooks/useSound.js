/**
 * ============================================
 * useSound - הוק מותאם לניהול אפקטי סאונד
 * ============================================
 * 
 * טוען קבצי אודיו מראש (Preload) כדי למנוע דיליי בהשמעה.
 * אובייקטי Audio נוצרים ונטענים ב-mount הראשון של הרכיב.
 * 
 * שימוש:
 *   const { play } = useSound();
 *   play('flip');  // מנגן צליל הפיכת קלף
 * 
 * @returns {{ play: (soundName: string) => void }}
 */

import { useRef, useCallback, useEffect } from 'react';

/* --- ייבוא סטטי של נתיבי האודיו (Vite מטפל ב-URL) --- */
import flipSound from '../assets/audio/flip.wav';
import matchSound from '../assets/audio/match.wav';
import troubleSound from '../assets/audio/trouble.mp3';
import congratsSound from '../assets/audio/congrats.mp3';

/** מיפוי שמות צלילים לנתיבי קבצים */
const SOUND_MAP = {
  flip: flipSound,
  match: matchSound,
  trouble: troubleSound,
  congrats: congratsSound,
};

/**
 * הוק לניהול אפקטי סאונד במשחק
 * 
 * אסטרטגיית טעינה:
 * - הקבצים מיובאים סטטית (Vite מטפל ב-URL ואופטימיזציה)
 * - אובייקטי Audio נוצרים ונטענים מראש (preload) ב-useEffect
 * - נשמרים ב-ref cache למניעת יצירה חוזרת
 * - תמיכה בהשמעה מקבילית ע"י איפוס currentTime
 * 
 * @returns {{ play: (soundName: string) => void }}
 */
function useSound() {
  /** מטמון (cache) של אובייקטי Audio טעונים מראש */
  const audioCache = useRef({});

  /**
   * טעינה מראש (Preload) של כל קבצי האודיו
   * רץ פעם אחת ב-mount - יוצר את כל אובייקטי ה-Audio
   * ומגדיר preload='auto' כדי שהדפדפן יטען את הקבצים לזיכרון
   */
  useEffect(() => {
    Object.entries(SOUND_MAP).forEach(([name, url]) => {
      if (!audioCache.current[name]) {
        const audio = new Audio(url);
        // preload='auto' מורה לדפדפן לטעון את הקובץ לזיכרון
        audio.preload = 'auto';
        audioCache.current[name] = audio;
      }
    });
  }, []);

  /**
   * השמעת צליל לפי שם
   * משתמש באובייקט Audio שנטען מראש מה-cache
   * 
   * @param {string} soundName - שם הצליל (flip/match/trouble/congrats)
   */
  const play = useCallback((soundName) => {
    try {
      const audio = audioCache.current[soundName];
      if (!audio) {
        console.warn(`[useSound] צליל לא מוכר: "${soundName}"`);
        return;
      }

      // איפוס לנקודת ההתחלה (מאפשר השמעה מהירה חוזרת)
      audio.currentTime = 0;
      
      // השמעה - תופס שגיאות בשקט (למשל אם הדפדפן חוסם autoplay)
      audio.play().catch(() => {
        // דפדפנים מסוימים חוסמים autoplay לפני אינטראקציה ראשונה
        // זה בסדר - הצליל פשוט לא יושמע בפעם הראשונה
      });
    } catch {
      // שגיאת טעינה - ממשיכים בלי סאונד
    }
  }, []);

  return { play };
}

export default useSound;
