import { useEffect, useRef } from "react";

const Spotlight = ({ children }: { children: React.ReactNode }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const applyOverlayMask = (e: PointerEvent) => {
    if (!containerRef.current) return;

    const x = e.pageX - containerRef.current.offsetLeft;
    const y = e.pageY - containerRef.current.offsetTop;

    containerRef.current.style.setProperty("--x", `${x}px`);
    containerRef.current.style.setProperty("--y", `${y}px`);
  };

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => applyOverlayMask(e);

    document.body.addEventListener("pointermove", handlePointerMove);

    return () => {
      document.body.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{
        mask: `
          radial-gradient(
            25rem 25rem at var(--x) var(--y),
            #000 1%,
            transparent 50%
          )`,
        WebkitMask: `
          radial-gradient(
            25rem 25rem at var(--x) var(--y),
            #000 1%,
            transparent 50%
          )`,
      }}
    >
      {children}
    </div>
  );
};

export default Spotlight; 