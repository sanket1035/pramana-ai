import React from 'react';
import { User as UserIcon, ShieldCheck, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext.js';

export const ProfilePage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-[720px] mx-auto p-4 md:p-8 space-y-6 pb-20">
      <div className="bg-[var(--bg-surface)] border border-[var(--border-main)] p-8 rounded space-y-6 text-center">
        <div className="w-20 h-20 rounded-full bg-[var(--bg-surface-highest)] border-2 border-[var(--text-accent)] mx-auto flex items-center justify-center">
          <UserIcon className="w-10 h-10 text-[var(--text-accent)]" />
        </div>

        <div className="space-y-1">
          <h1 className="font-serif text-2xl font-bold text-[var(--text-main)]">
            {user?.name || 'Academic Researcher'}
          </h1>
          <p className="font-mono text-xs text-[var(--text-accent)]">
            {user?.isAnonymous ? 'Anonymous Guest Session' : user?.email || 'Instant Verified Researcher Session'}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto text-xs font-mono">
          <div className="p-4 bg-[var(--bg-main)] border border-[var(--border-main)] rounded space-y-1">
            <div className="text-[var(--text-muted)]/60 text-[10px] uppercase">Session Status</div>
            <div className="text-[var(--text-accent)] font-bold flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> ACTIVE
            </div>
          </div>
          <div className="p-4 bg-[var(--bg-main)] border border-[var(--border-main)] rounded space-y-1">
            <div className="text-[var(--text-muted)]/60 text-[10px] uppercase">Verification Tier</div>
            <div className="text-[var(--text-accent)] font-bold flex items-center justify-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> UNLIMITED
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
