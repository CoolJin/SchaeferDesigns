import { useState, useEffect } from 'react';

export type PerformanceTier = 'high' | 'low';

export function usePerformance(): PerformanceTier {
  const [tier, setTier] = useState<PerformanceTier>('high');

  useEffect(() => {
    let isLowTier = false;

    // 1. Static checks
    // Check RAM (Strictly less than 4GB, so 4GB is considered okay)
    // @ts-ignore
    const memory = navigator.deviceMemory;
    if (memory && memory < 4) isLowTier = true;

    // Check CPU (Strictly less than 4 cores)
    const cores = navigator.hardwareConcurrency;
    if (cores && cores < 4) isLowTier = true;

    // Check Mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) isLowTier = true;

    // Check Connection
    // @ts-ignore
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (connection && (connection.saveData || connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g')) {
      isLowTier = true;
    }

    if (isLowTier) {
      setTier('low');
    }
  }, []);

  return tier;
}
