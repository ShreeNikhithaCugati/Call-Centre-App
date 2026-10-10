import React, { useState } from 'react';
import { Bell, UserCircle, Settings, LogOut } from 'lucide-react';

interface TopBarProps {
  onOpenNotifications: () => void;
  onOpenOgScore: () => void;
  onOpenRankDetail: () => void;
  onOpenAvatar: () => void;
  onOpenSettings: () => void;
  onToggleMobileNav: () => void;
  hasUnreadNotifs: boolean;
  avatarEmoji: string;
  avatarRing: string;
}

export const TopBar: React.FC<TopBarProps> = ({
  onOpenNotifications,
  onOpenOgScore,
  onOpenRankDetail,
  onOpenAvatar,
  onOpenSettings,
  onToggleMobileNav,
  hasUnreadNotifs,
  avatarEmoji,
  avatarRing,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="min-h-[54px] bg-[#123c30]/95 backdrop-blur-md flex items-center justify-between px-4 py-2 sticky top-0 z-40 gap-2 border-b border-white/10">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileNav}
          className="md:hidden w-8 h-8 rounded-lg bg-white/10 flex flex-col items-center justify-center gap-1 cursor-pointer"
          aria-label="Toggle Navigation"
        >
          <span className="w-4 h-0.5 bg-white rounded-full"></span>
          <span className="w-4 h-0.5 bg-white rounded-full"></span>
          <span className="w-4 h-0.5 bg-white rounded-full"></span>
        </button>

        <div className="flex items-center">
          <div className="w-8 h-8 bg-[#1d9e75] rounded-xl flex items-center justify-center font-bold text-sm text-white shadow-sm">
            OG
          </div>
          <span className="font-semibold text-white ml-2 text-base tracking-tight">On-Ground.ai</span>
        </div>
      </div>

      <div className="flex items-center gap-2.5 relative">
        {/* Notification Bell */}
        <button
          onClick={onOpenNotifications}
          className="relative w-9 h-9 rounded-full bg-gradient-to-tr from-[#e2233d] to-[#ff5b52] flex items-center justify-center text-white cursor-pointer shadow-md hover:scale-105 active:scale-95 transition-transform"
          title="Notifications"
        >
          <Bell className="w-4 h-4 text-white" />
          {hasUnreadNotifs && (
            <span className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#ffd400] border-2 border-[#123c30] animate-pulse" />
          )}
        </button>

        {/* Global Persistent Score & Rank Pill */}
        <div className="flex items-center gap-1.5 bg-white/10 border border-amber-400/30 rounded-full px-2 py-1 text-xs font-bold text-amber-300">
          <button
            onClick={onOpenOgScore}
            className="flex items-center gap-1.5 cursor-pointer hover:opacity-90"
            title="OG Score™ — Overall Sales Performance"
          >
            <div className="relative w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'conic-gradient(#1d9e75 76%, rgba(255,255,255,0.15) 0)',
                }}
              />
              <div className="absolute inset-0.5 bg-[#0a1a14] rounded-full flex items-center justify-center text-[10px] text-white font-extrabold">
                76
              </div>
            </div>
            <span className="text-white/80 font-medium hidden sm:inline text-[11px]">OG Score™</span>
          </button>

          <span className="text-white/40">|</span>

          <button
            onClick={onOpenRankDetail}
            className="cursor-pointer hover:text-white transition-colors"
            title="Your Rank within Koramangala store: #3"
          >
            ⭐ #3
          </button>
        </div>

        {/* User Profile Avatar with Spinning Persona Ring */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer relative"
          >
            <div
              className="absolute -inset-0.5 rounded-full"
              style={{ background: avatarRing }}
            />
            <div className="relative z-10 w-8 h-8 rounded-full bg-gradient-to-tr from-[#0a2a1e] to-[#1d9e75] flex items-center justify-center text-sm shadow-sm">
              <span>{avatarEmoji}</span>
            </div>
          </button>

          {/* User Dropdown */}
          {dropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setDropdownOpen(false)}
              />
              <div className="absolute right-0 top-11 bg-white rounded-2xl shadow-xl w-60 overflow-hidden z-50 border border-slate-100 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="bg-[#0a1a14] p-3.5 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#5dcaa5] flex items-center justify-center text-lg font-bold text-[#04342c]">
                    {avatarEmoji}
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-white truncate">Arvind Rajan</div>
                    <div className="text-xs text-[#9fe1cb] truncate">Koramangala · The Sleep Company</div>
                  </div>
                </div>

                <div className="py-1">
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      onOpenAvatar();
                    }}
                    className="w-full px-4 py-2.5 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2.5 cursor-pointer font-medium"
                  >
                    <UserCircle className="w-4 h-4 text-emerald-600" />
                    Change Selling Persona
                  </button>

                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      onOpenSettings();
                    }}
                    className="w-full px-4 py-2.5 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2.5 cursor-pointer font-medium"
                  >
                    <Settings className="w-4 h-4 text-emerald-600" />
                    App Settings
                  </button>

                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      onOpenOgScore();
                    }}
                    className="w-full px-4 py-2.5 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2.5 cursor-pointer font-medium"
                  >
                    <span className="text-sm">🏆</span>
                    OG Score™ &amp; Radar
                  </button>

                  <div className="border-t border-slate-100 my-1" />

                  <button
                    onClick={() => setDropdownOpen(false)}
                    className="w-full px-4 py-2.5 text-left text-sm text-rose-600 hover:bg-rose-50 flex items-center gap-2.5 cursor-pointer font-medium"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
