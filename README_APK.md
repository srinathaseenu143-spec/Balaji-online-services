# Balaji Online Service - APK & Mobile App Guide

Welcome! Your Balaji Online Service app is now ready to be built as an Android APK and distributed to users.

## Quick Summary

Your app now has:

✅ **APK Build System** - Using Capacitor (industry standard)  
✅ **Download Page** - Beautiful page at `/download` for users  
✅ **Download Button** - Added to main header for easy access  
✅ **Installation Guide** - Step-by-step instructions for users  
✅ **Complete Documentation** - Full guides for developers  

## For Users

### Where to Download

Users can get the app at:
```
https://your-domain.com/download
```

Or they can find it on Google Play Store (once published).

### Installation Steps

1. Visit the download page
2. Click "Download APK"
3. Enable "Unknown Sources" in Android settings
4. Tap the APK file to install
5. App appears on home screen

## For Developers

### Quick Build Commands

```bash
# Build APK in one command
pnpm run build:apk

# Open in Android Studio
pnpm run cap:open

# Sync files
pnpm run cap:sync

# Test on connected phone
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

### Choose Your Guide

| Document | Purpose | Read If... |
|----------|---------|-----------|
| **APK_QUICK_START.md** | 3-step build guide | You want to build APK immediately |
| **APK_SETUP_SUMMARY.md** | Overview of setup | You want to understand what's available |
| **MOBILE_APP_SETUP.md** | Complete reference | You need detailed instructions |
| **APK_BUILD_GUIDE.md** | In-depth build guide | You're building for Google Play Store |

### Prerequisites

Before building APK, you need:

1. **Android Studio** - Download from https://developer.android.com/studio
2. **Java JDK 11+** - Usually included with Android Studio
3. **Set Environment Variables** - See `MOBILE_APP_SETUP.md`

### Build in 3 Steps

**Step 1: Install Android SDK**
```bash
# Via Android Studio or:
brew install android-sdk  # macOS
```

**Step 2: Build APK**
```bash
pnpm run build:apk
```

**Step 3: Find APK**
```
android/app/build/outputs/apk/debug/app-debug.apk
```

## Project Structure

```
balaji-online-service/
│
├── app/
│   ├── page.tsx                 # Home page
│   ├── download/
│   │   └── page.tsx            # NEW: Download page
│   └── globals.css
│
├── components/
│   ├── header.tsx              # UPDATED: Added download button
│   ├── featured-banners.tsx
│   ├── service-grid.tsx
│   └── ...
│
├── public/
│   ├── downloads/              # NEW: APK storage location
│   │   └── balaji-online-service.apk  (you add this)
│   └── ...
│
├── android/                    # NEW: Android project (generated)
│   ├── app/
│   ├── gradle/
│   └── gradlew
│
├── capacitor.config.ts         # NEW: Capacitor config
├── APK_QUICK_START.md          # NEW: Quick 3-step guide
├── APK_SETUP_SUMMARY.md        # NEW: Setup overview
├── MOBILE_APP_SETUP.md         # NEW: Complete guide
├── APK_BUILD_GUIDE.md          # NEW: Detailed reference
├── README_APK.md               # NEW: This file
│
└── package.json                # UPDATED: Added build scripts
```

## Distribution Options

### Option 1: Direct Download (Current Setup)

Users download APK directly from your website.

**Steps:**
1. Build release APK: `pnpm run build:apk`
2. Copy to: `/public/downloads/balaji-online-service.apk`
3. Users visit: `/download`
4. Users click "Download APK"
5. Done!

**Pros:** Simple, no approval needed, instant updates  
**Cons:** Requires "Unknown Sources" enabled

### Option 2: Google Play Store (Recommended)

Professional distribution to all Android users.

**Requirements:**
- Google Play Developer account ($25 one-time)
- Signing key for your app
- Follow Google's app review process

**Benefits:**
- Reaches 2+ billion Android devices
- Automatic updates for users
- Professional rating/review system
- Safer installation process

**See:** `MOBILE_APP_SETUP.md` - Google Play Store section

### Option 3: GitHub Releases

Host APK on GitHub for free.

```bash
# After building:
# 1. Create GitHub release
# 2. Upload APK file
# 3. Share release URL with users
```

## Next Steps

### Immediate (Today)

1. **Review this guide**
2. **Check one of the documentation files**
3. **Understand the setup** (what's been configured for you)

### Soon (This Week)

1. **Install Android Studio** (if you haven't)
2. **Build your first APK**: `pnpm run build:apk`
3. **Test on a device** or emulator
4. **Verify all features work**

### For Distribution

**Direct Download Method:**
1. Build release APK
2. Copy to `/public/downloads/`
3. Users download from `/download` page

**Google Play Store:**
1. Create developer account
2. Follow publishing checklist in `MOBILE_APP_SETUP.md`
3. Submit for review
4. App goes live

## Common Questions

### Q: Do I need Android Studio?
**A:** Yes, to build the APK. Download from https://developer.android.com/studio

### Q: How big is the APK?
**A:** About 30-50 MB depending on configuration.

### Q: Can I update the app after publishing?
**A:** Yes, build a new APK and re-upload. Users will get update notification on Google Play Store.

### Q: What Android versions are supported?
**A:** Android 8.0+ (covers 99%+ of devices)

### Q: Can I customize the app icon?
**A:** Yes, see `MOBILE_APP_SETUP.md` - "Customizing the App"

### Q: How do I handle permissions?
**A:** Add to `android/app/src/main/AndroidManifest.xml`

### Q: Can the app work offline?
**A:** Partially, by default. Add offline support features as needed.

### Q: How often do I need to rebuild?
**A:** Only when you update the app code. Run `pnpm run build:apk` before releasing new version.

## Technical Details

- **Framework:** Capacitor 8.4.2 (wraps web app as native Android)
- **Base App:** Next.js 16 (web foundation)
- **Minimum Android:** 8.0 (API 26)
- **Target Android:** 14 (API 34)
- **Package Name:** `com.balaji.onlineservice`
- **Build Tools:** Gradle, Android SDK

## Commands Reference

```bash
# Build & Development
pnpm run dev              # Start dev server
pnpm run build            # Build Next.js app
pnpm run build:apk        # Build complete APK (recommended)

# Android-Specific
pnpm run cap:sync         # Sync files to Android
pnpm run cap:open         # Open Android Studio

# Testing
adb install <file>        # Install APK on phone
adb logcat                 # View app logs
adb shell pm clear com.balaji.onlineservice  # Clear app data
```

## File Locations

| What | Where |
|------|-------|
| Download Page | `/app/download/page.tsx` |
| Download Button | `/components/header.tsx` |
| Downloads Folder | `/public/downloads/` |
| Capacitor Config | `/capacitor.config.ts` |
| Android Project | `/android/` (generated) |
| Built APKs | `/android/app/build/outputs/apk/` |

## Environment Setup (One-Time)

Add to `~/.zshrc` or `~/.bash_profile`:

```bash
export ANDROID_SDK_ROOT=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_SDK_ROOT/tools/bin
export PATH=$PATH:$ANDROID_SDK_ROOT/platform-tools
export JAVA_HOME=$(/usr/libexec/java_home -v 11)
```

Then reload:
```bash
source ~/.zshrc
```

## Troubleshooting

**Problem:** Build fails with "Android SDK not found"  
**Solution:** Check `MOBILE_APP_SETUP.md` - "Prerequisites" section

**Problem:** Device not detected by `adb`  
**Solution:** Enable USB debugging on phone, restart adb server

**Problem:** App crashes on startup  
**Solution:** Check logs: `adb logcat | grep balaji`

**Problem:** APK too large  
**Solution:** See `MOBILE_APP_SETUP.md` - "Performance Optimization"

## Getting Help

1. **Quick answers:** Check `APK_QUICK_START.md`
2. **Detailed help:** Read `MOBILE_APP_SETUP.md`
3. **Reference:** See `APK_BUILD_GUIDE.md`
4. **Overview:** Read `APK_SETUP_SUMMARY.md`
5. **External:** https://capacitorjs.com/docs

## What's Included

### For Users
- ✅ Download page with clear instructions
- ✅ Download button in header
- ✅ FAQ section on download page
- ✅ Multiple distribution options shown

### For Developers
- ✅ Capacitor configured and ready
- ✅ Build scripts in package.json
- ✅ Android project structure created
- ✅ Comprehensive documentation
- ✅ Quick start guides
- ✅ Troubleshooting resources

### For Business
- ✅ Ready for Google Play Store
- ✅ Professional app icon support
- ✅ Signing key generation guide
- ✅ Publishing checklist
- ✅ Distribution options documented

## Success Criteria

You'll know everything is set up correctly when:

- ✅ `pnpm run build:apk` runs without errors
- ✅ APK file is created at expected location
- ✅ APK can install on Android device
- ✅ App launches and displays correctly
- ✅ Download page is accessible at `/download`
- ✅ Download button appears in header

## Next Action

**Ready to build?** Start here:

1. Read: `APK_QUICK_START.md` (5 minutes)
2. Run: `pnpm run build:apk`
3. Test on your Android phone
4. Share with users!

---

**Setup Complete:** July 21, 2026  
**Status:** Ready to Build APK  
**Documentation:** 4 guides included  
**Support:** Full troubleshooting docs  

**Questions?** Check the appropriate guide above or read `MOBILE_APP_SETUP.md` for comprehensive help.

Good luck! 🚀
