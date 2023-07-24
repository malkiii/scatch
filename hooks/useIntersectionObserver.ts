import { useEffect, useRef, useState } from 'react';

type ObserverProps = IntersectionObserverInit & {
  once?: boolean;
};
export const useIntersectionObserver = <T extends HTMLElement = HTMLDivElement>(
  options?: ObserverProps
) => {
  const [isInView, setIsInView] = useState<boolean>(false);
  const targetRef = useRef<T>(null);
  const observerRef = useRef<IntersectionObserver>();

  useEffect(() => {
    if (!targetRef.current) return;

    observerRef.current = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return setIsInView(false);

        setIsInView(true);
        if (options?.once) observerRef.current!.unobserve(entry.target);
      });
    }, options);

    observerRef.current.observe(targetRef.current);

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, []);

  return { targetRef, isInView };
};
