# Balaji Online Service - APK Build Guide

This guide explains how to build an Android APK from the Balaji Online Service Next.js web app.

## Option 1: Using Capacitor (Recommended)

Capacitor wraps your web app in a native Android container, allowing you to publish to Google Play Store.

### Prerequisites
- Node.js and npm/pnpm installed
- Java Development Kit (JDK) 11 or higher
- Android Studio and Android SDK
- A Google Play Developer account (for publishing)

### Steps

1. **Add Capacitor to your project:**
```bash
npm install @capacitor/core @capacitor/cli @capacitor/android
npx cap init
```

2. **Build the web app for production:**
```bash
npm run build
```

3. **Add Android platform:**
```bash
npx cap add android
```

4. **Copy web assets:**
```bash
npx cap copy android
```

5. **Open Android Studio:**
```bash
npx cap open android
```

6. **Build APK in Android Studio:**
   - Menu: Build → Build Bundle(s) / APK(s) → Build APK(s)
   - Or use command line:
   ```bash
   cd android
   ./gradlew assembleRelease
   ```

7. **Find your APK:**
   - Location: `android/app/build/outputs/apk/release/app-release.apk`

### Config Update (capacitor.config.json)
```json
{
  "appId": "com.balajionline.service",
  "appName": "Balaji Online",
  "webDir": "out",
  "plugins": {}
}
```

---

## Option 2: Using Expo

Easier setup but less control over native features.

### Steps

1. **Install Expo CLI:**
```bash
npm install -g expo-cli
```

2. **Create Expo project wrapper:**
```bash
expo init balaji-online-eas
cd balaji-online-eas
```

3. **Configure for your web app:**
   - Copy web assets into Expo's asset directory
   - Update app.json with your app details

4. **Build APK:**
```bash
eas build --platform android --local
```

---

## Option 3: Using Android Studio WebView

Manual approach with Android Studio - create a minimal native app that displays your web app in a WebView.

### Steps

1. Open Android Studio
2. Create new project: "Empty Activity"
3. Add WebView permissions to AndroidManifest.xml
4. Add this code to MainActivity.java:

```java
import android.webkit.WebView;

public class MainActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        
        WebView webView = findViewById(R.id.webview);
        webView.getSettings().setJavaScriptEnabled(true);
        webView.loadUrl("https://your-balaji-online-url.vercel.app");
    }
}
```

5. Build and run: Build → Build APK(s)

---

## Uploading to Google Play Store

1. **Create signed APK:**
   - In Android Studio: Build → Generate Signed Bundle / APK
   - Create or use existing keystore

2. **Prepare Google Play Store account:**
   - Sign up at play.google.com/console
   - Add app details (screenshots, description, privacy policy)
   - Set pricing and distribution

3. **Upload APK:**
   - Upload to Internal Testing first
   - Test on real devices
   - Move to Alpha/Beta/Production

---

## App Information

- **App Name:** Balaji Online Service
- **Package Name:** com.balajionline.service
- **Minimum Android Version:** 6.0 (API 23)
- **Target Android Version:** 14 (API 34)
- **Permissions Needed:**
  - INTERNET
  - ACCESS_NETWORK_STATE

---

## Distribution Options

1. **Google Play Store** - Most official, reaches most users
2. **Direct APK Download** - Add to your website (current implementation)
3. **GitHub Releases** - Free hosting for APK files
4. **F-Droid** - Open source app store (if app is open source)

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Build fails | Update Java, Android SDK, and Gradle |
| WebView not loading | Check INTERNET permission in AndroidManifest.xml |
| APK too large | Use ProGuard/R8 for code minification |
| Crashes on startup | Check LogCat for error messages |

---

## Next Steps

1. Install Capacitor or Expo
2. Build the APK using preferred method
3. Test on multiple Android devices
4. Upload to Google Play Store or host for direct download
5. Add download link to the app or website

For more info: https://capacitorjs.com or https://expo.dev
