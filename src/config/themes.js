/**
 * ============================================
 * קונפיגורציית נושאים (Themes) למשחק הזיכרון
 * ============================================
 * 
 * כל נושא מגדיר:
 * - מידע בסיסי (שם, אייקון, צבעים)
 * - סטטוס נעילה (פתוח/נעול)
 * - רשימת קלפים עם תמונות ושמות בעברית
 * - תמונת גב קלף
 * - תמונת תצוגה מקדימה (Preview) למסך הבית
 */

/* --- ייבוא תמונות חיות חווה --- */
import chickenImg from '../assets/images/animals_set/chicken.png';
import cowImg from '../assets/images/animals_set/cow.png';
import duckImg from '../assets/images/animals_set/duck.png';
import horseImg from '../assets/images/animals_set/horse.png';
import pigImg from '../assets/images/animals_set/pig.png';
import sheepImg from '../assets/images/animals_set/sheep.png';

/* --- ייבוא תמונות ממתקים --- */
import chocolateImg from '../assets/images/candies_set/chokolate.png';
import donutImg from '../assets/images/candies_set/donut.png';
import gummyBearImg from '../assets/images/candies_set/gummy_bear.png';
import icecreamImg from '../assets/images/candies_set/icecream.png';
import lollipopImg from '../assets/images/candies_set/lolipop.png';
import marshmallowImg from '../assets/images/candies_set/marshmallow.png';

/* --- ייבוא תמונות כלי רכב --- */
import airplaneImg from '../assets/images/transports_set/airplane.png';
import busImg from '../assets/images/transports_set/bus.png';
import fireTruckImg from '../assets/images/transports_set/fire_truck.png';
import scooterImg from '../assets/images/transports_set/scooter.png';
import toyCarImg from '../assets/images/transports_set/toy_car.png';
import trainImg from '../assets/images/transports_set/train.png';

/* --- תמונות משותפות --- */
import cardBackImg from '../assets/images/card_back.png';

/**
 * מערך הנושאים הזמינים במשחק
 */
const THEMES = [
  {
    id: 'farm-animals',
    name: 'חיות חווה',
    icon: '🐄',
    description: 'תרנגולות, פרות, ברווזים ועוד!',
    locked: false,
    bgGradient: 'from-green-400 via-emerald-400 to-teal-500',
    borderColor: 'border-emerald-300',
    cardBack: cardBackImg,
    previewImage: pigImg, // משמש לתצוגה מקדימה בכפתור
    pairs: [
      { pairId: 1, name: 'תרנגולת', image: chickenImg },
      { pairId: 2, name: 'פרה', image: cowImg },
      { pairId: 3, name: 'ברווז', image: duckImg },
      { pairId: 4, name: 'סוס', image: horseImg },
      { pairId: 5, name: 'חזיר', image: pigImg },
      { pairId: 6, name: 'כבשה', image: sheepImg },
    ],
  },
  {
    id: 'candies',
    name: 'עולם הממתקים',
    icon: '🍬',
    description: 'שוקולד, סופגניות, מרשמלו מתוק!',
    locked: false,
    bgGradient: 'from-pink-400 via-rose-400 to-red-400',
    borderColor: 'border-pink-300',
    cardBack: cardBackImg,
    previewImage: gummyBearImg,
    pairs: [
      { pairId: 1, name: 'שוקולד', image: chocolateImg },
      { pairId: 2, name: 'סופגניה', image: donutImg },
      { pairId: 3, name: 'דובי גומי', image: gummyBearImg },
      { pairId: 4, name: 'גלידה', image: icecreamImg },
      { pairId: 5, name: 'סוכריה', image: lollipopImg },
      { pairId: 6, name: 'מרשמלו', image: marshmallowImg },
    ],
  },
  {
    id: 'vehicles',
    name: 'כלי רכב',
    icon: '🚗',
    description: 'מכוניות, משאיות ומטוסים!',
    locked: false,
    bgGradient: 'from-blue-400 via-indigo-400 to-purple-500',
    borderColor: 'border-blue-300',
    cardBack: cardBackImg,
    previewImage: fireTruckImg,
    pairs: [
      { pairId: 1, name: 'מטוס', image: airplaneImg },
      { pairId: 2, name: 'אוטובוס', image: busImg },
      { pairId: 3, name: 'כבאית', image: fireTruckImg },
      { pairId: 4, name: 'קורקינט', image: scooterImg },
      { pairId: 5, name: 'מכונית', image: toyCarImg },
      { pairId: 6, name: 'רכבת', image: trainImg },
    ],
  },
];

export function getThemeById(themeId) {
  return THEMES.find(theme => theme.id === themeId);
}

export function getAllThemes() {
  return THEMES;
}

export default THEMES;
