'use client'

import { motion } from 'framer-motion'
import { Download, Smartphone, CheckCircle, Zap } from 'lucide-react'

export default function APKDownloadSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Download Balaji Online
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get the official Balaji Online Service app on your Android device for instant access to government services
          </p>
        </div>

        {/* Main Download Card */}
        <motion.div
          className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 p-8 sm:p-12 shadow-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/20 backdrop-blur-sm">
                  <Smartphone className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">Mobile App</h3>
              </div>

              <ul className="space-y-3">
                {[
                  'Access government services anytime, anywhere',
                  'Offline mode for quick reference',
                  'Push notifications for important updates',
                  'Secure and trusted application',
                  '100% Free to download and use'
                ].map((feature, i) => (
                  <motion.li
                    key={i}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.3 }}
                  >
                    <CheckCircle className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-white/90">{feature}</span>
                  </motion.li>
                ))}
              </ul>

              <motion.a
                href="https://github.com/srinathaseenu143-spec/Balaji-online-services/releases"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-secondary text-primary font-semibold px-6 py-3 hover:bg-secondary/90 transition-all active:scale-95 shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download className="h-5 w-5" />
                Get APK from GitHub Releases
              </motion.a>

              <p className="text-xs text-white/70">
                APK v1.0 • Android 8.0+ • ~15-25 MB
              </p>
            </div>

            {/* Right - Phone Mockup */}
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="relative w-full max-w-sm">
                {/* Phone Frame */}
                <div className="rounded-3xl border-8 border-white/30 bg-white/5 p-3 backdrop-blur-sm aspect-video flex items-center justify-center">
                  <div className="w-full h-full rounded-2xl bg-gradient-to-br from-secondary/20 to-primary/20 flex items-center justify-center flex-col gap-4">
                    <Smartphone className="h-16 w-16 text-white/50" />
                    <p className="text-white/60 text-center px-4">Your trusted government services partner</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Installation Steps */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {[
            {
              step: '1',
              title: 'Download',
              description: 'Click the download button to get the APK file to your device'
            },
            {
              step: '2',
              title: 'Install',
              description: 'Allow installation from unknown sources and install the application'
            },
            {
              step: '3',
              title: 'Launch',
              description: 'Open the app and start accessing government services instantly'
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              className="rounded-2xl border border-primary/20 bg-card p-6 hover:border-primary/40 hover:shadow-md transition-all"
              whileHover={{ y: -4 }}
            >
              <div className="space-y-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <span className="font-bold text-primary">{item.step}</span>
                </div>
                <h4 className="font-semibold text-foreground">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Info Box */}
        <motion.div
          className="rounded-2xl bg-gradient-to-r from-primary/10 to-accent/5 border border-primary/20 p-6 flex gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Zap className="h-6 w-6 text-primary flex-shrink-0" />
          <div className="space-y-2">
            <h4 className="font-semibold text-foreground">Build Instructions Available</h4>
            <p className="text-sm text-muted-foreground">
              Download the real APK from GitHub Releases or follow the comprehensive build guide to create your own APK using Capacitor and Android Studio. See the BUILD_APK_REAL.md documentation for step-by-step instructions.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
