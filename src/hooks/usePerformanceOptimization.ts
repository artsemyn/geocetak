// src/hooks/usePerformanceOptimization.ts
import { useEffect, useCallback, useRef, useState } from 'react';

// Hook untuk throttling function calls
export const useThrottle = <T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T => {
  const lastRun = useRef(Date.now());

  return useCallback(
    ((...args) => {
      if (Date.now() - lastRun.current >= delay) {
        callback(...args);
        lastRun.current = Date.now();
      }
    }) as T,
    [callback, delay]
  );
};

// Hook untuk debouncing function calls
export const useDebounce = <T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T => {
  const timeoutRef = useRef<NodeJS.Timeout | undefined>();

  return useCallback(
    ((...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => callback(...args), delay);
    }) as T,
    [callback, delay]
  );
};

// Hook untuk intersection observer (lazy loading)
export const useIntersectionObserver = (
  options: IntersectionObserverInit = {}
) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [node, setNode] = useState<Element | null>(null);

  const observer = useRef<IntersectionObserver | undefined>();

  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(
      ([entry]) => setIsIntersecting(entry.isIntersecting),
      { threshold: 0.1, ...options }
    );

    if (node) observer.current.observe(node);

    return () => observer.current?.disconnect();
  }, [node, options]);

  return [setNode, isIntersecting] as const;
};

// Hook untuk performance monitoring
export const usePerformanceMonitor = (componentName: string) => {
  const renderStart = useRef(performance.now());
  const [renderTime, setRenderTime] = useState<number>(0);

  useEffect(() => {
    const endTime = performance.now();
    const duration = endTime - renderStart.current;
    setRenderTime(duration);

    // Log performance jika render time > 16ms (60fps threshold)
    if (duration > 16) {
      console.warn(`${componentName} render time: ${duration.toFixed(2)}ms`);
    }
  });

  // Reset timer untuk render berikutnya
  renderStart.current = performance.now();

  return renderTime;
};

// Hook untuk memory usage monitoring
export const useMemoryMonitor = () => {
  const [memoryInfo, setMemoryInfo] = useState<any>(null);

  useEffect(() => {
    const updateMemoryInfo = () => {
      if ('memory' in performance) {
        setMemoryInfo({
          usedJSHeapSize: (performance as any).memory.usedJSHeapSize,
          totalJSHeapSize: (performance as any).memory.totalJSHeapSize,
          jsHeapSizeLimit: (performance as any).memory.jsHeapSizeLimit,
        });
      }
    };

    updateMemoryInfo();
    const interval = setInterval(updateMemoryInfo, 5000); // Update setiap 5 detik

    return () => clearInterval(interval);
  }, []);

  return memoryInfo;
};
