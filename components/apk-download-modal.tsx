'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Download, X, CheckCircle, Smartphone, ArrowRight } from 'lucide-react'

interface APKDownloadModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function APKDownloadModal({ isOpen, onClose }: APKDownloadModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <motion.div
              className="relative w-full max-w-md bg-card rounded-2xl border border-primary/20 shadow-2xl pointer-events-auto overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="relative bg-gradient-to-r from-primary to-accent p-6 text-white">
                <motion.div
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Smartphone className="h-6 w-6" />
                  <h2 className="text-xl font-bold">Download APK</h2>
                </motion.div>
                <p className="text-sm text-white/80 mt-2">Get Balaji Online on your Android device</p>

                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Features */}
                <motion.div
                  className="space-y-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.15 }}
                >
                  {[
                    'Access 100+ government services',
                    'Offline reference mode available',
                    'Secure and trusted application',
                    '100% Free - No hidden charges'
                  ].map((feature, i) => (
                    <motion.div
                      key={i}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + i * 0.05 }}
                    >
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Info Box */}
                <motion.div
                  className="rounded-lg bg-primary/5 border border-primary/20 p-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                >
                  <p className="text-xs text-muted-foreground">
                    <span className="font-semibold text-foreground">Requires:</span> Android 8.0+ • ~15-25 MB storage
                  </p>
                </motion.div>

                {/* Download Button */}
                <motion.a
                  href="https://github.com/srinathaseenu143-spec/Balaji-online-services/releases"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full group"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="w-full rounded-lg bg-gradient-to-r from-primary to-accent text-white font-semibold py-3 px-4 flex items-center justify-center gap-2 hover:shadow-lg transition-shadow">
                    <Download className="h-5 w-5" />
                    Download from GitHub
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.a>

                {/* Alternative Info */}
                <motion.div
                  className="text-center space-y-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.45 }}
                >
                  <p className="text-xs text-muted-foreground">Or build from source</p>
                  <a
                    href="/BUILD_APK_REAL.md"
                    download
                    className="inline-block text-xs font-semibold text-primary hover:text-accent transition-colors"
                  >
                    View Build Guide
                  </a>
                </motion.div>
              </div>

              {/* Installation Steps */}
              <motion.div
                className="border-t border-border/50 bg-card/50 px-6 py-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <p className="text-xs font-semibold text-foreground mb-3">Installation Steps:</p>
                <ol className="space-y-2 text-xs text-muted-foreground">
                  <li>1. Download the APK file from GitHub</li>
                  <li>2. Enable &quot;Unknown Sources&quot; in your security settings</li>
                  <li>3. Open the downloaded APK and tap Install</li>
                  <li>4. Launch the app and enjoy!</li>
                </ol>
              </motion.div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
