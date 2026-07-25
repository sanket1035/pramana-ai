import React from 'react';
import { User as UserIcon, ShieldCheck, Sparkles, Database } from 'lucide-react';

export const ProfilePage: React.FC = () => {
  return (
    <div className="max-w-[720px] mx-auto p-4 md:p-8 space-y-6 pb-20">
      <div className="bg-[#221f1c] border border-[#554336] p-8 rounded space-y-6 text-center">
        <div className="w-20 h-20 rounded-full bg-[#383431] border-2 border-[#ffb77d] mx-auto flex items-center justify-center">
          <UserIcon className="w-10 h-10 text-[#ffb77d]" />
        </div>

        <div className="space-y-1">
          <h1 className="font-serif text-2xl font-bold text-[#e8e1dd]">Academic Researcher</h1>
          <p className="font-mono text-xs text-[#ffb77d]">Instant Verified Researcher Session</p>
        </div>

        <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto text-xs font-mono">
          <div className="p-4 bg-[#151310] border border-[#554336] rounded space-y-1">
            <div className="text-[#dbc2b0]/60 text-[10px] uppercase">Session Status</div>
            <div className="text-[#ffb77d] font-bold flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> ACTIVE
            </div>
          </div>
          <div className="p-4 bg-[#151310] border border-[#554336] rounded space-y-1">
            <div className="text-[#dbc2b0]/60 text-[10px] uppercase">Verification Tier</div>
            <div className="text-[#ffb77d] font-bold flex items-center justify-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> UNLIMITED
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
