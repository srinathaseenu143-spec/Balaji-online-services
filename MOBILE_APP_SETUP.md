# Mobile App Setup - APK Build & Distribution

This guide covers building and distributing the Balaji Online Service as an Android APK.

## Quick Summary

The app is now configured with **Capacitor**, which allows us to wrap the Next.js web app as a native Android application and publish it to Google Play Store or distribute as a direct APK download.

## Project Setup Status

✅ **Completed:**
- Capacitor installed and initialized
- Android platform added
- Next.js configured for static export
- Download page created at `/download`
- Download button added to header

## Build Commands

### Build APK for Testing (Debug)

```bash
# One-command build
pnpm run build:apk
```

This command:
1. Builds the Next.js app
2. Exports to static files (`/out` directory)
3. Copies assets to Android project
4. Creates debug APK

Output location: `android/app/build/outputs/apk/debug/app-debug.apk`

### Build APK for Distribution (Release)

```bash
# After creating a signing key (see below)
cd android
./gradlew assembleRelease
```

Output location: `android/app/build/outputs/apk/release/app-release.apk`

## Prerequisites for Building

### 1. Install Android SDK

**Option A: Via Android Studio (Recommended)**
- Download: https://developer.android.com/studio
- Install Android Studio
- Install SDK through the IDE

**Option B: Via Command Line**
```bash
# macOS with Homebrew
brew install android-sdk

# Then update PATH
export ANDROID_SDK_ROOT="/usr/local/share/android-sdk"
```

### 2. Set Environment Variables

Add to your `.bashrc`, `.zshrc`, or `.bash_profile`:

```bash
export ANDROID_SDK_ROOT=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_SDK_ROOT/tools
export PATH=$PATH:$ANDROID_SDK_ROOT/tools/bin
export PATH=$PATH:$ANDROID_SDK_ROOT/platform-tools
export PATH=$PATH:$ANDROID_SDK_ROOT/cmdline-tools/latest/bin
```

### 3. Install Java JDK

```bash
# Check if installed
java -version

# If not installed:
# macOS with Homebrew
brew install openjdk@11

# Then set JAVA_HOME
export JAVA_HOME=$(/usr/libexec/java_home -v 11)
```

## Step-by-Step Build Instructions

### Step 1: Build the Web App

```bash
cd /vercel/share/v0-project
pnpm run build
```

This creates a static export in the `/out` directory.

### Step 2: Set Up Android Project

```bash
# Sync web files with Android project
pnpm run cap:sync

# Or copy and sync separately
pnpm exec capacitor copy android
pnpm exec capacitor sync android
```

### Step 3: Open in Android Studio

```bash
pnpm run cap:open
```

This opens the Android project in Android Studio.

### Step 4: Build APK in Android Studio

**Option A: Using GUI**
1. In Android Studio, go to: **Build** → **Build Bundle(s) / APK(s)** → **Build APK(s)**
2. Wait for the build to complete
3. Click "Locate" to find your APK

**Option B: Using Command Line**
```bash
cd android
./gradlew assembleDebug    # For debug APK
./gradlew assembleRelease  # For release APK (requires signing key)
```

### Step 5: Find Your APK

Debug APK: `android/app/build/outputs/apk/debug/app-debug.apk`

Release APK: `android/app/build/outputs/apk/release/app-release.apk`

## Creating a Signing Key (for Release APK)

For distribution to Google Play Store, you need a signing key:

```bash
# Generate keystore (one-time)
keytool -genkey -v -keystore balaji-release-key.keystore \
  -keyalg RSA -keysize 2048 -validity 10000 \
  -alias balaji-key

# When prompted, enter:
# - Password: (choose something strong)
# - Full name: Your name
# - Organization: Your company
# - Country: Your country code (e.g., IN)
```

**Save this file securely!** You'll need it for future app updates.

### Using the Signing Key

In Android Studio:
1. **Build** → **Generate Signed Bundle / APK**
2. Select **APK**
3. Click **Create new...** or select existing keystore
4. Enter your keystore password
5. Select alias: `balaji-key`
6. Enter key password
7. Choose **Release** for build type
8. Click **Finish**

## Distribution Options

### Option 1: Direct APK Download (Simplest)

1. Build the APK
2. Copy to `/public/downloads/balaji-online-service.apk`
3. Users visit `/download` page and download directly
4. Users enable "Unknown Sources" and install

**Users can visit:** `https://your-domain.com/download`

### Option 2: Google Play Store (Recommended)

1. Create Google Play Developer account: https://play.google.com/console ($25 one-time)
2. Build release APK with signing key
3. Create app listing:
   - App name, description, screenshots
   - Category, content rating, privacy policy
4. Upload release APK
5. Submit for review (takes 1-3 hours usually)
6. Once approved, app is live!

**Users can install from:** Google Play Store or Play Store app

### Option 3: GitHub Releases

1. Build release APK
2. Push to GitHub repo
3. Create a Release and upload APK
4. Users can download from releases page

```bash
# Example
git tag v1.0.0
git push origin v1.0.0
# Then upload APK to https://github.com/username/repo/releases
```

## Testing the APK

### On Physical Device

```bash
# Connect phone via USB (enable Developer Mode)
adb install android/app/build/outputs/apk/debug/app-debug.apk

# View logs
adb logcat

# Uninstall app
adb uninstall com.balaji.onlineservice
```

### On Android Emulator

```bash
# Start emulator
emulator -avd Pixel_6

# Install APK
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

### Enable USB Debugging (Physical Device)

1. Go to **Settings** → **About Phone**
2. Tap **Build Number** 7 times
3. Go back to **Settings** → **Developer Options**
4. Enable **USB Debugging**

## Customizing the App

### Change App Name

Edit `capacitor.config.ts`:
```typescript
{
  appName: 'Balaji Online Service'
}
```

Then sync:
```bash
pnpm run cap:sync
```

### Change App Icon

Replace files in: `android/app/src/main/res/`

Sizes needed:
- `mipmap-ldpi/ic_launcher.png` (36x36)
- `mipmap-mdpi/ic_launcher.png` (48x48)
- `mipmap-hdpi/ic_launcher.png` (72x72)
- `mipmap-xhdpi/ic_launcher.png` (96x96)
- `mipmap-xxhdpi/ic_launcher.png` (144x144)
- `mipmap-xxxhdpi/ic_launcher.png` (192x192)

### Add Permissions

Edit `android/app/src/main/AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.RECORD_AUDIO" />
```

Then sync:
```bash
pnpm run cap:sync
```

## Troubleshooting

### "Cannot find Android SDK"

```bash
# Set Android SDK path manually
export ANDROID_SDK_ROOT=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_SDK_ROOT/tools/bin
export PATH=$PATH:$ANDROID_SDK_ROOT/platform-tools
```

### "Build failed: Gradle error"

```bash
# Clean and rebuild
cd android
./gradlew clean build
cd ..
pnpm run cap:sync
```

### "App crashes on startup"

1. Check logs: `adb logcat | grep "app-debug"`
2. Verify Next.js build: `pnpm run build`
3. Check console for errors: `adb shell`

### "APK is too large"

Typical sizes:
- Debug APK: 45-60 MB
- Release APK: 25-35 MB

If much larger:
1. Check what's in `/public` directory
2. Remove unused npm packages
3. Enable minification in Gradle

### "Device not recognized by adb"

```bash
# Restart adb server
adb kill-server
adb start-server

# Or restart USB connection
# 1. Unplug device
# 2. Re-plug device
# 3. Confirm USB debugging permission on device
```

## Version Management

When releasing updates:

1. Update version in `package.json`:
```json
{
  "version": "1.0.1"
}
```

2. Build new APK
3. Upload to Google Play Store with release notes
4. Or upload to GitHub Releases

## Publishing Checklist

- [ ] App builds without errors
- [ ] Tested on at least 2 Android devices
- [ ] All features working correctly
- [ ] No console errors or crashes
- [ ] Privacy policy added (required for Play Store)
- [ ] App icon created and added
- [ ] Signing key created and backed up
- [ ] Version number updated
- [ ] Release notes prepared
- [ ] Screenshots taken for app store (Google Play requires 4-6)

## Next Steps

1. **Install prerequisites:** Android SDK, JDK
2. **Set environment variables** for Android SDK
3. **Run:** `pnpm run build:apk`
4. **Test APK** on device or emulator
5. **Choose distribution method:**
   - Direct download (use `/download` page)
   - Google Play Store
   - GitHub Releases

## Useful Links

- Capacitor Docs: https://capacitorjs.com/docs
- Android Docs: https://developer.android.com/docs
- Google Play Console: https://play.google.com/console
- ADB Documentation: https://developer.android.com/studio/command-line/adb

---

**Last Updated:** July 21, 2026  
**Capacitor Version:** 8.4.2  
**App Version:** 1.0.0
