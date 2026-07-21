# APK Quick Start Guide

## Build APK in 3 Steps

### Step 1: Install Prerequisites (One-Time)

```bash
# Install Android Studio from:
# https://developer.android.com/studio

# Add to ~/.zshrc or ~/.bash_profile:
export ANDROID_SDK_ROOT=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_SDK_ROOT/tools/bin
export PATH=$PATH:$ANDROID_SDK_ROOT/platform-tools

# Reload shell
source ~/.zshrc
```

### Step 2: Build APK

```bash
cd /vercel/share/v0-project
pnpm run build:apk
```

**Wait 2-5 minutes for build to complete.**

### Step 3: Find Your APK

```
android/app/build/outputs/apk/debug/app-debug.apk
```

Done! Your APK is ready.

---

## Test on Your Phone

### Connect Phone via USB

```bash
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

App will install and appear on your home screen.

---

## Distribute to Users

### Option A: Direct Download (Easiest)

1. Copy APK to downloads folder:
```bash
cp android/app/build/outputs/apk/release/app-release.apk \
   public/downloads/balaji-online-service.apk
```

2. Users visit: `https://your-domain.com/download`

3. Users click "Download APK"

4. Users tap Install on their phone

### Option B: Google Play Store (Most Professional)

1. Create account: https://play.google.com/console ($25)

2. Create signing key:
```bash
keytool -genkey -v -keystore balaji-release-key.keystore \
  -keyalg RSA -keysize 2048 -validity 10000 \
  -alias balaji-key
```

3. Build release APK:
```bash
cd android
./gradlew assembleRelease
```

4. Upload to Google Play Console

5. App is live to 2+ billion Android devices

---

## Available Commands

| Command | What It Does |
|---------|-------------|
| `pnpm run build:apk` | Build complete APK |
| `pnpm run cap:sync` | Sync web files to Android |
| `pnpm run cap:open` | Open Android Studio |
| `adb install <file>` | Install APK on phone |
| `adb logcat` | View app logs |

---

## Troubleshooting

### "Android SDK not found"
```bash
# Set path manually
export ANDROID_SDK_ROOT=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_SDK_ROOT/platform-tools
```

### "Build failed"
```bash
# Clean and try again
cd android
./gradlew clean build
cd ..
pnpm run build:apk
```

### "Device not detected"
```bash
# Restart adb
adb kill-server
adb start-server

# Or enable USB debugging on phone:
# Settings > About Phone > Build Number (tap 7x)
# Settings > Developer Options > USB Debugging
```

---

## File Sizes

- **Debug APK:** ~50 MB (for testing)
- **Release APK:** ~30 MB (for distribution)
- **Download page:** All files shown at `/download`

---

## What Happens Next

1. **Users visit `/download` page** (you created it!)
2. **They download APK** directly
3. **They enable "Unknown Sources"** in security settings
4. **They tap Install** on the APK file
5. **App appears on home screen** like any other app
6. **They open and use it!**

---

## One More Thing

Check the full guide for advanced options:
- Google Play Store publishing
- Creating signing keys
- Customizing app icon
- Adding permissions
- Building release versions

👉 **See:** `MOBILE_APP_SETUP.md`

---

**Ready to build? Run:**
```bash
pnpm run build:apk
```
