import React, { useEffect, useRef } from 'react';

type Props = {
  imageUrl?: string;
  children?: React.ReactNode;
  className?: string;
};

export const RippleBackground: React.FC<Props> = ({ imageUrl, children, className }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const ripplesRef = useRef<any[]>([]);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const parent = containerRef.current!;
      canvas.width = Math.max(1, Math.floor(parent.clientWidth * dpr));
      canvas.height = Math.max(1, Math.floor(parent.clientHeight * dpr));
      canvas.style.width = parent.clientWidth + 'px';
      canvas.style.height = parent.clientHeight + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    const render = (t: number) => {
      const w = canvas.width / (window.devicePixelRatio || 1);
      const h = canvas.height / (window.devicePixelRatio || 1);
      ctx.clearRect(0, 0, w, h);

      const now = performance.now();
      const nextRipples: any[] = [];
      for (const r of ripplesRef.current) {
        const age = (now - r.start) / r.duration;
        if (age >= 1) continue;

        const radius = r.maxRadius * easeOutCubic(age);
        const alpha = (1 - age) * r.strength;

        // draw radial gradient
        const grad = ctx.createRadialGradient(r.x, r.y, 0, r.x, r.y, radius);
        // coffee-toned highlights instead of white/blue
        grad.addColorStop(0, `rgba(111,78,55,${0.35 * alpha})`);
        grad.addColorStop(0.6, `rgba(190,150,120,${0.12 * alpha})`);
        grad.addColorStop(1, `rgba(0,0,0,0)`);

        ctx.globalCompositeOperation = 'lighter';
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(r.x, r.y, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalCompositeOperation = 'source-over';

        nextRipples.push(r);
      }
      ripplesRef.current = nextRipples;
      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);

    // add native pointer/touch listeners on the container in capture phase
    const container = containerRef.current!;

    const handlePointerDown = (ev: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ev.clientX - rect.left;
      const y = ev.clientY - rect.top;
      const max = Math.max(rect.width, rect.height);

      ripplesRef.current.push({
        x,
        y,
        start: performance.now(),
        duration: 700 + Math.random() * 600,
        maxRadius: max * (0.35 + Math.random() * 0.7),
        strength: 1
      });
    };

    const handleTouchStart = (ev: TouchEvent) => {
      const t = ev.touches && ev.touches[0];
      if (!t) return;
      const rect = container.getBoundingClientRect();
      const x = t.clientX - rect.left;
      const y = t.clientY - rect.top;
      const max = Math.max(rect.width, rect.height);

      ripplesRef.current.push({
        x,
        y,
        start: performance.now(),
        duration: 700 + Math.random() * 600,
        maxRadius: max * (0.35 + Math.random() * 0.7),
        strength: 1
      });
    };

    container.addEventListener('pointerdown', handlePointerDown, { capture: true });
    container.addEventListener('touchstart', handleTouchStart, { passive: true, capture: true });

    return () => {
      window.removeEventListener('resize', resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      container.removeEventListener('pointerdown', handlePointerDown, { capture: true } as any);
      container.removeEventListener('touchstart', handleTouchStart as any, { capture: true } as any);
    };
  }, []);


  return (
    <div
      ref={containerRef}
      className={`min-h-screen relative overflow-hidden ${className || ''}`}
      style={{
        backgroundImage: imageUrl ? `url('${imageUrl}')` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          zIndex: 10,
          pointerEvents: 'none'
        }}
      />

      {children}
    </div>
  );
};

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

export default RippleBackground;
