# Car Seat Lottery App / אפליקציית הגרלת כסאות ברכב

A smart car seat assignment application that manages seat lottery with advanced exclusion rules and priority algorithms.

אפליקציה חכמה לחלוקת כסאות ברכב המנהלת הגרלה עם כללי הוצאה מתקדמים ואלגוריתמי עדיפות.

## English

### Features

#### 🚗 Visual Car Layout
- Interactive car seat diagram with real positioning
- Car silhouette background for visual context
- Click-to-toggle seat participation in lottery
- Visual indicators for seat status (participating/excluded)

#### 🎲 Smart Lottery Algorithm
- **Priority-based allocation**: Passengers with more exclusions get priority
- **Constraint-aware**: Respects rank exclusions, seat exclusions, and passenger restrictions
- **Fair distribution**: Random allocation for passengers with fewer restrictions
- **Intelligent assignment**: Ensures no passenger is left without a seat

#### 👥 Passenger Management
- **Add new passengers** with a simple form
- **Edit passenger names** by clicking on them
- **Delete passengers** with confirmation
- **Toggle participation** in current lottery
- **Exclude from ranks**: Prevent passengers from specific seat ranks
- **Exclude from seats**: Prevent passengers from specific individual seats

#### 💾 Data Persistence
- **Auto-save**: All settings automatically saved to localStorage
- **Session persistence**: Data survives browser restarts
- **Lottery results**: Saved and restored automatically
- **Reset option**: Complete data reset with confirmation

#### 🎨 User Interface
- **RTL Support**: Full Hebrew language support with right-to-left layout
- **Responsive design**: Works on desktop and mobile devices
- **Interactive tooltips**: Hover for detailed seat information
- **Color-coded system**: 
  - Blue: Active/participating seats
  - Gray: Excluded seats
  - Green: Participating passengers
  - Orange: Rank exclusions
  - Red: Seat exclusions
  - Yellow: Assigned passengers

### How It Works

1. **Setup**: Configure passengers and their exclusions
2. **Exclusions**: Set rank and seat restrictions for each passenger
3. **Lottery**: Run the smart algorithm that prioritizes restricted passengers
4. **Results**: View assignments on the visual car layout
5. **Persistence**: All data automatically saved for next session

### Installation

```bash
# Clone the repository
git clone [repository-url]

# Navigate to project directory
cd CarSeatLotteryApp

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Technology Stack

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **React Hooks**: Modern state management
- **localStorage**: Client-side data persistence

---

## עברית

### תכונות

#### 🚗 תרשים רכב ויזואלי
- תרשים אינטראקטיבי של כסאות הרכב עם מיקום אמיתי
- רקע צללית רכב לקונטקסט ויזואלי
- לחיצה להחלפת השתתפות כסא בהגרלה
- אינדיקטורים ויזואליים לסטטוס הכסא (משתתף/מוצא)

#### 🎲 אלגוריתם הגרלה חכם
- **הקצאה מבוססת עדיפות**: נוסעים עם יותר הוצאות מקבלים עדיפות
- **מודע למגבלות**: מכבד הוצאות דרגה, הוצאות כסא והגבלות נוסע
- **חלוקה הוגנת**: הקצאה אקראית לנוסעים עם פחות הגבלות
- **שיבוץ חכם**: מבטיח שאף נוסע לא יישאר ללא כסא

#### 👥 ניהול נוסעים
- **הוספת נוסעים חדשים** עם טופס פשוט
- **עריכת שמות נוסעים** על ידי לחיצה עליהם
- **מחיקת נוסעים** עם אישור
- **החלפת השתתפות** בהגרלה הנוכחית
- **הוצאה מדרגות**: מניעת נוסעים מדרגות כסא ספציפיות
- **הוצאה מכסאות**: מניעת נוסעים מכסאות יחידים ספציפיים

#### 💾 שמירת נתונים
- **שמירה אוטומטית**: כל ההגדרות נשמרות אוטומטית ב-localStorage
- **התמדה בין הפעלות**: הנתונים שורדים הפעלות מחדש של הדפדפן
- **תוצאות הגרלה**: נשמרות ונטענות אוטומטית
- **אפשרות איפוס**: איפוס מלא של הנתונים עם אישור

#### 🎨 ממשק משתמש
- **תמיכה ב-RTL**: תמיכה מלאה בעברית עם פריסה מימין לשמאל
- **עיצוב רספונסיבי**: עובד על מחשב ונייד
- **עצות אינטראקטיביות**: רחף לקבלת מידע מפורט על כסא
- **מערכת קודי צבע**:
  - כחול: כסאות פעילים/משתתפים
  - אפור: כסאות מוצאים
  - ירוק: נוסעים משתתפים
  - כתום: הוצאות דרגה
  - אדום: הוצאות כסא
  - צהוב: נוסעים משובצים

### איך זה עובד

1. **הגדרה**: קבע נוסעים וההוצאות שלהם
2. **הוצאות**: קבע הגבלות דרגה וכסא לכל נוסע
3. **הגרלה**: הפעל את האלגוריתם החכם שנותן עדיפות לנוסעים מוגבלים
4. **תוצאות**: צפה בשיבוצים בתרשים הרכב הויזואלי
5. **התמדה**: כל הנתונים נשמרים אוטומטית להפעלה הבאה

### התקנה

```bash
# שכפל את הריפוזיטורי
git clone [repository-url]

# נווט לתיקיית הפרויקט
cd CarSeatLotteryApp

# התקן תלויות
npm install

# הפעל שרת פיתוח
npm run dev
```

פתח [http://localhost:3000](http://localhost:3000) לצפייה באפליקציה.

### סטק טכנולוגי

- **Next.js 14**: פריימוורק React עם App Router
- **TypeScript**: פיתוח בטוח מבחינת טיפוסים
- **Tailwind CSS**: פריימוורק CSS מבוסס כלים
- **React Hooks**: ניהול מצב מודרני
- **localStorage**: שמירת נתונים בצד הלקוח

## Development

### Getting Started

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

### Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Deploy to GitHub Pages / פריסה ל-GitHub Pages

### English

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

#### Setup Steps:

1. **Push to GitHub**: Make sure your code is pushed to a GitHub repository
2. **Enable GitHub Pages**: 
   - Go to your repository settings
   - Navigate to "Pages" section
   - Select "GitHub Actions" as the source
3. **Automatic Deployment**: Every push to the `main` branch will trigger an automatic deployment

#### Manual Deployment:

```bash
# Build the project for production
npm run build

# The static files will be generated in the 'out' folder
# Upload the contents of 'out' folder to your hosting service
```

#### Local Testing:

```bash
# Test the production build locally
npm run build
npx serve out
```

The app will be available at: `https://[your-username].github.io/CarSeatLotteryApp/`

### עברית

הפרויקט מוגדר לפריסה אוטומטית ל-GitHub Pages באמצעות GitHub Actions.

#### שלבי הגדרה:

1. **העלאה ל-GitHub**: ודא שהקוד מועלה לריפוזיטורי GitHub
2. **הפעלת GitHub Pages**:
   - עבור להגדרות הריפוזיטורי
   - נווט לקטע "Pages"
   - בחר "GitHub Actions" כמקור
3. **פריסה אוטומטית**: כל push לענף `main` יפעיל פריסה אוטומטית

#### פריסה ידנית:

```bash
# בניית הפרויקט לפרודקשן
npm run build

# הקבצים הסטטיים ייווצרו בתיקיית 'out'
# העלה את תוכן תיקיית 'out' לשירות האחסון שלך
```

#### בדיקה מקומית:

```bash
# בדיקת הבילד לפרודקשן מקומית
npm run build
npx serve out
```

האפליקציה תהיה זמינה בכתובת: `https://[your-username].github.io/CarSeatLotteryApp/`
