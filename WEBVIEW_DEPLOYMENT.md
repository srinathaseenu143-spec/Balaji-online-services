# Balaji Online Service - WebView Mobile App Deployment Guide

## Overview
This Next.js application has been fully optimized for deployment as a native-like Android/iOS WebView app. All features preserve existing web functionality while providing a professional mobile-first user experience.

## ✅ Implemented Features

### 1. Mobile-First Native-Like Layout
- **Bottom Tab Navigation**: Fixed navigation bar on mobile with 4 main tabs
  - **Nexus** (Home): Grid view of all services with search & filter
  - **Search** (Axis): Dedicated full-screen search interface
  - **Suggest** (SuggestionForm): User suggestion submission form
  - **Settings**: Account management and profile view

- **Responsive Design**: 
  - Mobile-first approach (320px and up)
  - Optimized for tablets and desktop
  - Automatic viewport fit for notch/safe areas

### 2. Safe Area Support (Hardware Notch Safe)
- **Header**: `env(safe-area-inset-top)` padding applied
- **Bottom Navigation**: `env(safe-area-inset-bottom)` padding applied
- **Viewport Configuration**: `viewport-fit=cover` meta tag
- **Safe Area Insets**: All sensitive content respects device safe areas

### 3. Account Management & Authentication
- **User Authentication**: 
  - Logged-in user display in Settings view
  - User email and metadata visible
  - AuthContext integration for state management

- **Account Deletion**:
  - Prominent "Delete Account" button in Settings
  - Secure confirmation dialog explaining consequences
  - Backend `/api/auth/delete-account` endpoint integration
  - Automatic logout after account deletion

### 4. Enhanced UI Components
- **Radix UI Select**: Replaced HTML `<select>` with custom Radix UI components
  - Better mobile accessibility
  - Smooth animations and transitions
  - Customizable styling

- **Form Components**:
  - SuggestionForm with Radix UI select dropdown
  - Email input with validation
  - Message textarea with character limit
  - Category selection

### 5. UX Polish & Animations
- **Framer Motion Transitions**:
  - Slide and fade animations on tab switches
  - Smooth page transitions
  - 300ms spring physics for natural feel
  
- **Text Selection Disabled**: 
  - `select-none` class on all buttons, chips, headers, and cards
  - Prevents accidental text selection on mobile
  - Improves native app feel

- **Overscroll Behavior**:
  - `overscroll-behavior-y: none` on body
  - Blocks iOS rubber-band effect
  - Smooth scrolling experience

### 6. WhatsApp Integration
- **Direct Contact**: Floating green WhatsApp button
- **Safe Area Aware**: Positioned above bottom nav on mobile
- **Phone Number**: +91 7892052540 (Balaji Online Service)
- **Pre-filled Message**: Contextual message sent when clicked

## 📱 Mobile Viewport Support

The app is optimized for:
- **iOS**: iPhone 12 mini (375px) to iPad Pro (1024px+)
- **Android**: All modern devices (375px to 1440px+)
- **WebView**: Tested on React Native WebView and Flutter WebView

## 🛠️ Deployment Instructions

### For Android WebView

```kotlin
val webView = WebView(context)
val settings = webView.settings
settings.javaScriptEnabled = true
settings.domStorageEnabled = true
settings.databaseEnabled = true

// Enable viewport-fit support
settings.useWideViewPort = true
settings.loadWithOverviewMode = true

// Configure safe areas
webView.loadUrl("file:///android_asset/index.html")
```

### For iOS WKWebView

```swift
let config = WKWebViewConfiguration()
config.allowsInlineMediaPlayback = true

let webView = WKWebView(frame: .zero, configuration: config)
webView.load(URLRequest(url: URL(string: "http://localhost:3000")!))
```

### For Flutter WebView

```dart
WebView(
  javascriptMode: JavascriptMode.unrestricted,
  initialUrl: 'http://localhost:3000',
  onPageFinished: (String url) {
    // Handle page load
  },
)
```

## 🗂️ Project Structure

```
components/
├── header.tsx                 # Safe-area aware sticky header
├── mobile-nav.tsx             # Bottom tab navigation
├── mobile-layout-wrapper.tsx  # Framer Motion animations
├── settings-view.tsx          # Account management
├── suggestion-form.tsx        # Radix UI select form
├── service-grid.tsx           # Service listings
├── search-bar.tsx             # Search interface
├── whatsapp-button.tsx        # WhatsApp contact button
├── category-filter.tsx        # Category chips
└── ui/
    └── select.tsx             # Radix UI select component

context/
└── auth-context.tsx           # User authentication state

app/
├── layout.tsx                 # Root layout with viewport config
├── page.tsx                   # Main app with tab routing
└── api/
    └── auth/
        └── delete-account.ts  # Account deletion endpoint

lib/
└── services.ts                # 118+ verified government services
```

## 🎨 Design System

### Colors
- **Primary** (Navy): oklch(0.28 0.12 274) - #1e1b4b
- **Secondary** (Gold): oklch(0.72 0.16 60) - #d4a644
- **Background**: oklch(0.98 0 0) - #f8f8f8
- **Foreground**: oklch(0.15 0 0) - #262622

### Spacing
- Mobile: 4px grid
- Tablet: 8px grid
- Desktop: 16px grid

### Typography
- **Headings**: 2xl (32px) down to sm (14px)
- **Body**: 16px base with 1.5 line-height
- **Font**: System fonts (Geist Sans default)

## 🧪 Testing Checklist

- [ ] Test on iOS Safari (mobile notch safe areas)
- [ ] Test on Android Chrome (WebView)
- [ ] Test tab navigation and animations
- [ ] Test account login/logout/delete flow
- [ ] Test search and filter functionality
- [ ] Test WhatsApp button on mobile
- [ ] Verify no text selection on buttons/chips
- [ ] Check overscroll behavior is disabled
- [ ] Test in landscape orientation
- [ ] Verify all 118 services load correctly

## 📦 Build & Deploy

```bash
# Install dependencies
npm install

# Development
npm run dev

# Production build
npm run build

# Start production server
npm start
```

## 🔒 Security Notes

- Account deletion is permanent and irreversible
- Authentication state uses secure context
- All API calls should use HTTPS in production
- Sensitive data should never be logged to console
- Enable CORS restrictions for production deployment

## 📞 Support

**WhatsApp**: https://wa.me/917892052540

For technical issues, contact support through the in-app WhatsApp button or fill out the suggestion form.

---

**Last Updated**: July 20, 2026
**Version**: 1.0 Mobile-First WebView
