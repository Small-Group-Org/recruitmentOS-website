'use client';

import { useEffect } from 'react';
import { useToolGate } from '@/hooks/useToolGate';
import ToolGateForm from '@/components/tools/ToolGateForm';

const GITHUB_URL = 'https://github.com/tushar-mangla/recruitment-skills';

export default function SkillsGateClient() {
  const { isUnlocked, isHydrated } = useToolGate();

  useEffect(() => {
    if (isHydrated && isUnlocked) {
      window.location.href = GITHUB_URL;
    }
  }, [isHydrated, isUnlocked]);

  if (!isHydrated || isUnlocked) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#F9FAFB]">
        <span className="w-8 h-8 rounded-full border-2 border-[#FF6A00] border-t-transparent animate-spin" />
      </main>
    );
  }

  return (
    <ToolGateForm
      toolTitle="6 Free AI Skills for Recruiters"
      redirectUrl={GITHUB_URL}
    />
  );
}
