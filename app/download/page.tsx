'use client';

import { motion } from 'framer-motion';
import { Download, Smartphone, Shield, Zap, ArrowRight, Check } from 'lucide-react';
import Link from 'next/link';

export default function DownloadPage() {
  const features = [
    {
      icon: Smartphone,
      title: 'Native Mobile App',
      description: 'Full-featured Android application built with Capacitor'
    },
    {
      icon: Shield,
      title: 'Secure & Fast',
      description: 'Direct access to all services with offline support'
    },
    {
      icon: Zap,
      title: 'Always Available',
      description: 'Access services anytime, anywhere on your device'
    }
  ];

  const steps = [
    {
      step: 1,
      title: 'Download APK',
      description: 'Click the download button below to get the APK file'
    },
    {
      step: 2,
      title: 'Enable Installation',
      description: 'Go to Settings > Security > Enable "Unknown Sources"'
    },
    {
      step: 3,
      title: 'Install App',
      description: 'Open the APK file and tap Install'
    },
    {
      step: 4,
      title: 'Launch & Enjoy',
      description: 'Open Balaji Online Service from your app drawer'
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <div className="relative overflow-hidden border-b border-primary/10 bg-gradient-to-r from-primary via-primary to-secondary/50 py-12 text-white sm:py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4 text-center"
          >
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-balance">
              Download Balaji Online Service
            </h1>
            <p className="text-lg text-white/90 sm:text-xl">
              Get the official mobile app and access all services on the go
            </p>
          </motion.div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        {/* Download Button Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16 rounded-2xl border border-primary/20 bg-card/60 p-8 text-center backdrop-blur-sm sm:p-12"
        >
          <h2 className="mb-4 text-2xl font-bold sm:text-3xl">Ready to Install?</h2>
          <p className="mb-8 text-muted-foreground">
            Latest version: 1.0.0 • Compatible with Android 8.0+
          </p>

          <div className="space-y-4">
            <a
              href="https://lunch-ruby.vercel.app/"
              download="balaji-online-service.apk"
              className="group inline-flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-primary to-accent px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:scale-105 active:scale-95"
            >
              <Download className="h-5 w-5 transition-transform group-hover:-translate-y-1" />
              Download APK (Latest)
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
            <p className="text-sm text-muted-foreground">
              File size: ~45 MB • Direct download
            </p>
          </div>

          {/* Alternative Downloads */}
          <div className="mt-8 space-y-3 border-t border-border/50 pt-8">
            <p className="text-sm font-medium text-muted-foreground">Alternative download sources:</p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href="https://play.google.com/store/apps"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-primary/30 bg-primary/5 px-4 py-2 text-sm font-medium text-primary transition-all hover:bg-primary/10 hover:border-primary/50"
              >
                Google Play Store
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-primary/30 bg-primary/5 px-4 py-2 text-sm font-medium text-primary transition-all hover:bg-primary/10 hover:border-primary/50"
              >
                GitHub Releases
              </a>
            </div>
          </div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-16"
        >
          <h2 className="mb-8 text-center text-2xl font-bold sm:text-3xl">Why Download the App?</h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-xl border border-primary/20 bg-card/60 p-6 backdrop-blur-sm transition-all hover:border-primary/40 hover:bg-card"
                >
                  <Icon className="mb-4 h-8 w-8 text-primary" />
                  <h3 className="mb-2 font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Installation Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="mb-8 text-center text-2xl font-bold sm:text-3xl">Installation Steps</h2>
          <div className="space-y-4">
            {steps.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="rounded-xl border border-primary/20 bg-card/60 p-6 backdrop-blur-sm"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent">
                    <span className="font-bold text-white">{item.step}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="rounded-2xl border border-primary/20 bg-card/60 p-8 backdrop-blur-sm sm:p-12"
        >
          <h2 className="mb-8 text-2xl font-bold">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              {
                q: 'Is the app free?',
                a: 'Yes, Balaji Online Service is completely free to download and use.'
              },
              {
                q: 'What Android versions are supported?',
                a: 'The app supports Android 8.0 and above. Most modern devices are compatible.'
              },
              {
                q: 'Is my data secure?',
                a: 'Yes, we use industry-standard encryption to protect your personal information.'
              },
              {
                q: 'Can I use the app offline?',
                a: 'Some features work offline, while others require an internet connection.'
              },
              {
                q: 'How do I update the app?',
                a: 'You can download the latest APK from this page or enable auto-updates if using Google Play Store.'
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <h3 className="mb-2 font-semibold text-primary">{faq.q}</h3>
                <p className="text-muted-foreground">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Back to Home */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
          >
            ← Back to Home
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
