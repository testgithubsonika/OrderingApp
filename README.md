Get started
1. Install dependencies

   ```bash
   npm install
   ```
2. Start the app

   ```bash
   npx expo start
   ```bash
npm run reset-project

OrderingApp/
├── app/
│   ├── _layout.jsx    # Root layout for navigation (Expo Router and manage all global navigation and other things)
│   ├── Cart.jsx               # Cart screen
│   ├── MenuList.jsx           # Menu list screen (like index as main screen)
│   ├── OrderConfirmation.jsx  # Order confirmation screen
│   ├── OrderSummary.jsx       # Order summary screen
│   ├── Profile.jsx            # Profile screen
│   ├── search.jsx             # Search screen
│   └── category/
│        └── [name].tsx        # Dynamic category screen (e.g., /category/pizza)
├── assets/
│   └── imageitems/
│        ├── imageMap.js       # Local image key map
│        ├── pizza_pepperoni.jpg
│        ├── burger_gourmet.jpg
│        └── ...               # Other images
│   └── images/
│        ├── icon.png
│        ├── splash.png
│        └── ...               # Other images
├── components/
│   ├── CartItemCard.jsx
│   ├── ErrorDisplay.jsx
│   ├── LoadingIndicator.jsx
│   └── MenuItemCard.jsx
├── context/
│   └── CartContext.js
├── firestore-seeder/
│   ├── seed.js
│   └── serviceAccountKey.json
├── app.json
├── babel.config.js
├── firebase.js  
├── package.json
└── README.md

 Start the app

   ```bash
   npx expo start
   ```bash
npm run reset-project
