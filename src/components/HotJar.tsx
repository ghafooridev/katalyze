// src/app/HotjarComponent.tsx

'use client';

// This makes it a Client Component

import useHotjar from '@/hooks/useHotjar';
import env from '@/lib/env';

const HotjarComponent = () => {
  useHotjar(env('NEXT_PUBLIC_HOTJAR_ID'), 6);

  return null; // We don't need to render anything
};

export default HotjarComponent;
