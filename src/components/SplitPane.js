import React, { useRef, useState, useLayoutEffect } from "react";

export default function SplitPane({
  renderTop,
  bottom,
  initialTopPercent = 60,
  minTopPercent = 20,
  maxTopPercent = 80,
  handleSize = 8,
}) {
  const containerRef = useRef(null);
  const isDragging = useRef(false);
  const [ratio, setRatio] = useState(initialTopPercent / 100);
  const [containerH, setContainerH] = useState(400); // Default fallback height

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Initial height calculation
    const updateHeight = () => {
      const h = el.getBoundingClientRect().height;
      if (h > 0) {
        setContainerH(h);
      }
    };

    // Set initial height
    updateHeight();

    const ro = new ResizeObserver((entries) => {
      const h = entries[0]?.contentRect?.height || 0;
      if (h > 0) {
        setContainerH(h);
      }
    });

    ro.observe(el);

    window.addEventListener("resize", updateHeight);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  const clamp = (val, min, max) => Math.max(min, Math.min(max, val));

  const startDrag = (e) => {
    e.preventDefault();
    isDragging.current = true;
    document.addEventListener("mousemove", onDrag);
    document.addEventListener("mouseup", stopDrag);
    document.addEventListener("touchmove", onDragTouch, { passive: false });
    document.addEventListener("touchend", stopDrag);
  };

  const onDrag = (e) => {
    if (!isDragging.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const newRatio = clamp(
      (e.clientY - rect.top) / rect.height,
      minTopPercent / 100,
      maxTopPercent / 100
    );
    setRatio(newRatio);
  };

  const onDragTouch = (e) => {
    if (!isDragging.current || !containerRef.current) return;
    e.preventDefault();
    const t = e.touches[0];
    const rect = containerRef.current.getBoundingClientRect();
    const newRatio = clamp(
      (t.clientY - rect.top) / rect.height,
      minTopPercent / 100,
      maxTopPercent / 100
    );
    setRatio(newRatio);
  };

  const stopDrag = () => {
    isDragging.current = false;
    document.removeEventListener("mousemove", onDrag);
    document.removeEventListener("mouseup", stopDrag);
    document.removeEventListener("touchmove", onDragTouch);
    document.removeEventListener("touchend", stopDrag);
  };

  const topPx = Math.max(100, Math.round(containerH * ratio));
  const bottomPx = Math.max(100, containerH - topPx - handleSize);

  return (
    <div ref={containerRef} className="flex-1 flex flex-col min-h-0">
      {/* Top section */}
      <div
        style={{ height: `${topPx}px` }}
        className="flex-shrink-0 overflow-hidden"
      >
        {typeof renderTop === "function" ? renderTop(topPx) : renderTop}
      </div>

      {/* Drag handle */}
      <div
        style={{ height: `${handleSize}px` }}
        className="bg-gray-300 hover:bg-gray-400 cursor-row-resize flex-shrink-0 flex items-center justify-center"
        onMouseDown={startDrag}
        onTouchStart={startDrag}
      >
        <div className="w-8 h-1 bg-gray-500 rounded"></div>
      </div>

      {/* Bottom section */}
      <div
        style={{ height: `${bottomPx}px` }}
        className="flex-shrink-0 overflow-hidden"
      >
        {bottom}
      </div>
    </div>
  );
}
