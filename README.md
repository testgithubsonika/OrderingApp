
## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```
   ```bash
npm run reset-project
```

FoodOrderingApp/
├── App/category       
│     └── _layout{all root handling like navig..}
│     └── details
│     └── index {main home screen}
│     └── profile
│     └──search
│ 
├── assets/images
│          └── icon.png
│          └── splash.png
│          └── (...)
├── components/
│   ├── CartItemCard.js
│   ├── ErrorDisplay.js
│   ├── LoadingIndicator.js
│   └── MenuItemCard.js
├── context/
│   └── CartContext.js
├── navigation/
│   └── AppNavigator.js
├── screens/
│   ├── CartScreen.js
│   ├── MenuListScreen.js
│   ├── OrderConfirmationScreen.js
│   └── OrderSummaryScreen.js
├── App
├── app.json
├── babel.config.js
├── firebase.js  
└── package.json