'use client'

import { useState } from 'react'
import { LogOut, Trash2, AlertTriangle, User } from 'lucide-react'
import { useAuth } from '@/context/auth-context'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

export default function SettingsView() {
  const { user, logout, deleteAccount } = useAuth()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDeleteAccount = async () => {
    setIsDeleting(true)
    try {
      await deleteAccount()
      window.location.href = '/'
    } catch (error) {
      console.error('Failed to delete account:', error)
      setIsDeleting(false)
    }
  }

  return (
    <div className="space-y-6 px-4 py-6 pb-24">
      {/* Account Section */}
      <div className="rounded-lg border border-border bg-card p-6">
        <h2 className="mb-6 text-xl font-bold text-foreground">Account Settings</h2>

        {user ? (
          <div className="space-y-6">
            {/* User Info */}
            <div className="flex items-center gap-4 rounded-lg bg-secondary/10 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary">
                <User className="h-6 w-6 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Logged in as</p>
                <p className="font-medium text-foreground">{user.name}</p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
            </div>

            {/* Account Created Date */}
            <div className="border-t border-border pt-4">
              <p className="text-sm text-muted-foreground">Account created</p>
              <p className="text-foreground">
                {new Date(user.createdAt).toLocaleDateString('en-IN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>

            {/* Logout Button */}
            <button
              onClick={logout}
              className="select-none flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-background px-4 py-2 font-medium text-foreground transition-all hover:border-primary hover:bg-card active:scale-95"
            >
              <LogOut className="h-5 w-5" />
              Logout
            </button>

            {/* Delete Account Section */}
            <div className="border-t border-border pt-6">
              <div className="mb-4">
                <h3 className="mb-2 text-sm font-semibold text-destructive">Danger Zone</h3>
                <p className="text-xs text-muted-foreground">
                  Permanently delete your account and all associated data. This action cannot be undone.
                </p>
              </div>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button className="select-none flex w-full items-center justify-center gap-2 rounded-lg border border-destructive bg-destructive/10 px-4 py-2 font-medium text-destructive transition-all hover:border-destructive/80 hover:bg-destructive/20 active:scale-95">
                    <Trash2 className="h-5 w-5" />
                    Delete Account
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent className="border-border bg-card">
                  <AlertDialogHeader>
                    <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10">
                      <AlertTriangle className="h-6 w-6 text-destructive" />
                    </div>
                    <AlertDialogTitle className="text-destructive">Delete Account?</AlertDialogTitle>
                    <AlertDialogDescription className="text-muted-foreground">
                      This action cannot be undone. Your account and all data will be permanently deleted.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="border-border text-foreground hover:bg-card">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDeleteAccount}
                      disabled={isDeleting}
                      className="select-none bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      {isDeleting ? 'Deleting...' : 'Delete Account'}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border p-8 text-center">
            <User className="mb-3 h-12 w-12 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">You are not logged in.</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Sign in to manage your account settings.
            </p>
          </div>
        )}
      </div>

      {/* App Information */}
      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="mb-4 text-sm font-semibold text-foreground">About</h3>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">App Version</span>
            <span className="text-foreground">1.0.0</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Services</span>
            <span className="text-foreground">118+</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Last Updated</span>
            <span className="text-foreground">2026-07-20</span>
          </div>
        </div>
      </div>
    </div>
  )
}
