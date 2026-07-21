# Building Real APK for Balaji Online Service

## Why Placeholder APK Failed

The previous APK file was a placeholder ZIP archive without actual Android code. Mobile devices reject it because:
- Missing AndroidManifest.xml
- No compiled Java/Kotlin code
- No resources or app signature
- Invalid APK structure

## Prerequisites

Install these on your machine:

### 1. Java Development Kit (JDK)
```bash
# macOS
brew install openjdk@11

# Windows/Linux
# Download from https://www.oracle.com/java/technologies/downloads/
```

### 2. Android SDK
Download Android Studio from https://developer.android.com/studio

After installation, you need:
- Android SDK Platform 33+
- Build Tools 33.0.0+
- Android Virtual Device (optional, for testing)

### 3. Node.js & pnpm
```bash
# Already installed in v0
node --version  # Should be v20+
pnpm --version  # Should be v8+
```

## Environment Setup

Set these environment variables:

### macOS/Linux
```bash
export JAVA_HOME=$(/usr/libexec/java_home)
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
export PATH=$PATH:$ANDROID_HOME/build-tools/33.0.0
```

### Windows
```powershell
$env:JAVA_HOME = "C:\Program Files\Java\jdk-11.x.x"
$env:ANDROID_HOME = "$env:USERPROFILE\AppData\Local\Android\sdk"
$env:PATH += ";$env:ANDROID_HOME\tools\bin"
$env:PATH += ";$env:ANDROID_HOME\platform-tools"
$env:PATH += ";$env:ANDROID_HOME\build-tools\33.0.0"
```

## Step-by-Step Build Instructions

### Step 1: Build the Next.js App
```bash
cd /path/to/balaji-online-service
pnpm install
pnpm run build
```

Expected output:
- `.next/` folder created
- No TypeScript errors
- Build time: ~5 seconds

### Step 2: Sync with Capacitor
```bash
pnpm exec capacitor copy android
pnpm exec capacitor sync android
```

This creates/updates the `android/` folder with the web app embedded.

### Step 3: Build APK (Debug)
```bash
cd android
./gradlew assembleDebug
```

**Output location**: `android/app/build/outputs/apk/debug/app-debug.apk`

**File size**: ~15-25 MB (debug build includes symbols)

**Build time**: 2-5 minutes (first build longer)

### Step 4: Test on Device
```bash
# Install on connected Android device
adb install -r android/app/build/outputs/apk/debug/app-debug.apk

# Or use Android Studio to run it
./gradlew assembleDebug && ./gradlew installDebugAndroidTest
```

## Building Release APK (For Distribution)

### Create Keystore (First Time Only)
```bash
keytool -genkey -v -keystore balaji.keystore -keyalg RSA \
  -keysize 2048 -validity 10000 \
  -alias balaji-key-alias
```

**Save the passwords safely!**

### Add Keystore to Gradle
Edit `android/app/build.gradle`:

```gradle
signingConfigs {
    release {
        storeFile file('path/to/balaji.keystore')
        storePassword 'your-store-password'
        keyAlias 'balaji-key-alias'
        keyPassword 'your-key-password'
    }
}

buildTypes {
    release {
        signingConfig signingConfigs.release
        minifyEnabled true
        proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
    }
}
```

### Build Release APK
```bash
cd android
./gradlew assembleRelease
```

**Output**: `android/app/build/outputs/apk/release/app-release.apk`

**File size**: ~8-12 MB (optimized)

**Ready for**: Google Play Store distribution

## Troubleshooting

### Error: "gradle not found"
```bash
cd android
chmod +x gradlew  # macOS/Linux
./gradlew --version
```

### Error: "ANDROID_HOME not found"
```bash
# Verify environment variable
echo $ANDROID_HOME

# If not set, add to ~/.bashrc or ~/.zshrc:
export ANDROID_HOME=$HOME/Library/Android/sdk
```

### Error: "SDK Platform 33 not installed"
```bash
# Use Android Studio SDK Manager or:
sdkmanager "platforms;android-33"
sdkmanager "build-tools;33.0.0"
```

### APK Still Won't Install
- Check Android version: min API 26 (Android 8.0)
- Try: `adb install -r` (replace existing)
- Check device storage: need ~50 MB free
- Enable "Unknown Sources" in Settings > Security

## Current Status

✅ Capacitor configured for Android builds
✅ Next.js app optimized for mobile
✅ Gradle setup ready
⏳ Awaiting Android SDK installation on your machine

## Next Steps

1. Install Android SDK and Java
2. Set environment variables
3. Run: `pnpm run build:apk`
4. Test APK on device
5. Fix any issues and rebuild

## Commands Reference

```bash
# Full build process
pnpm install
pnpm run build
pnpm exec capacitor copy android
pnpm exec capacitor sync android
cd android && ./gradlew assembleDebug

# Test on device
adb install -r android/app/build/outputs/apk/debug/app-debug.apk
adb logcat  # View app logs

# Release build
./gradlew assembleRelease

# Clean and rebuild
./gradlew clean
./gradlew assembleDebug
```

## Learn More

- Capacitor Docs: https://capacitorjs.com/docs/android
- Android Development: https://developer.android.com/guide
- Gradle Build: https://gradle.org/
- APK Distribution: https://developer.android.com/google-play/prepare

---

**Current Setup**: Ready for Android APK building
**Next**: Install Android SDK on your development machine
