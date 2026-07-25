import React from 'react';
import { User as UserIcon, ShieldCheck, Award, Calendar, Sparkles } from 'lucide-react';

export const ProfilePage: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-20">
      <div className="p-6 md:p-8 rounded-2xl bg-[#111113] border border-[#27272A] space-y-6 text-center">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 p-[2px] mx-auto shadow-xl">
          <div className="w-full h-full bg-[#09090B] rounded-full flex items-center justify-center">
            <UserIcon className="w-10 h-10 text-purple-400" />
          </div>
        </div>

        <div className="space-y-1">
          <h1 className="text-xl font-heading font-bold text-white">Academic Researcher</h1>
          <p className="text-xs text-purple-300 font-mono">Instant Verified Researcher Session</p>
        </div>

        <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto text-xs font-mono">
          <div className="p-3 rounded-xl bg-[#09090B] border border-[#27272A] space-y-1">
            <div className="text-zinc-500 text-[10px]">Session Status</div>
            <div className="text-green-400 font-bold flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Active
            </div>
          </div>
          <div className="p-3 rounded-xl bg-[#09090B] border border-[#27272A] space-y-1">
            <div className="text-zinc-500 text-[10px]">Verification Tier</div>
            <div className="text-purple-400 font-bold flex items-center justify-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Unlimited
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
