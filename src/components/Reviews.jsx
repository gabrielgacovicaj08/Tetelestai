import { useMemo, useState } from "react";

function mod(n, m) {
  // true modulo (handles negative)
  return ((n % m) + m) % m;
}

function shortestOffset(i, active, n) {
  // i-active but choose the "shortest" direction around the circle
  let d = i - active;
  if (d > n / 2) d -= n;
  if (d < -n / 2) d += n;
  return d;
}

const reviews = [
  {
    name: "Burt V.",
    source: "Google",
    stars: 5,
    text: "Zach and the Tetelestai Renovations team are top notch. They are all excellent craftsmen who are professional, reliable and produce amazing results. We tried them out with our kitchen and living room remodel and when that came out so well, we hired them again to do two more bathrooms. Those came out so beautifully, we then remodeled our master bath using the team again. The bathroom remodels were complete renovations, from the foundation and studs, with new bath tubs, showers, vanities, flooring, even including moved walls and new structural features we hadn't first considered. All of this produced dream results.We HIGHLY recommend Tetelestai Renovations.",
  },
  {
    name: "Daniela M. N.",
    source: "Google",
    stars: 5,
    text: "Kitchen looks amazing. They handled everything end-to-end.",
  },
  {
    name: "Daniel P.",
    source: "Google",
    stars: 5,
    text: "Excellent work! Everything about Tetelestai Renovations is the epitome of excellence. My husband and I used this company to update our kitchen and three bathrooms. I cannot express just how impressed my husband and I are with our experience with this company. From the quality of work to the fact they showed up when they said they would, it was worth every penny. Everything turned out wonderfully.",
  },
];

export default function ReviewCarousel() {
  const [active, setActive] = useState(0);
  const n = reviews.length;

  const goLeft = () => setActive((a) => mod(a - 1, n));
  const goRight = () => setActive((a) => mod(a + 1, n));

  // Optional: keyboard arrows
  const onKeyDown = (e) => {
    if (e.key === "ArrowLeft") goLeft();
    if (e.key === "ArrowRight") goRight();
  };

  // Precompute offsets so render is clean
  const items = useMemo(() => {
    return reviews.map((r, i) => ({
      ...r,
      i,
      offset: shortestOffset(i, active, n),
    }));
  }, [reviews, active, n]);

  return (
    <div
      className="relative w-full max-w-5xl mx-auto py-10 outline-none"
      tabIndex={0}
      onKeyDown={onKeyDown}
      aria-label="Reviews carousel"
    >
      {/* arrows */}
      <button
        onClick={goLeft}
        className="absolute left-4 top-[25%] -translate-y-1/2 z-30 
           bg-white/30 backdrop-blur-md
           text-gray-700 hover:text-black
           p-3 rounded-full
           shadow-[0_10px_30px_rgba(0,0,0,0.15)]
           hover:shadow-[0_15px_40px_rgba(0,0,0,0.25)]
           opacity-40 hover:opacity-100
           transition-all duration-300"
        aria-label="Previous review"
      >
        ←
      </button>

      <button
        onClick={goRight}
        className="absolute right-4 top-[25%] -translate-y-1/2 z-30 
           bg-white/30 backdrop-blur-md
           text-gray-700 hover:text-black
           p-3 rounded-full
           shadow-[0_10px_30px_rgba(0,0,0,0.15)]
           hover:shadow-[0_15px_40px_rgba(0,0,0,0.25)]
           opacity-40 hover:opacity-100
           transition-all duration-300"
        aria-label="Next review"
      >
        →
      </button>

      {/* stage */}
      <div className="relative min-h-[280px] sm:min-h-[260px] py-10 [perspective:1200px]">
        {items.map((item) => {
          const { offset, i } = item;

          // Show only center + neighbors (you can expand to 2 neighbors if you want)
          const isCenter = offset === 0;
          const isNeighbor = offset === -1 || offset === 1;

          // Base transform values
          let translateX = 0;
          let scale = 1;
          let opacity = 1;
          let blur = 0;
          let zIndex = 20;
          let rotateY = 0;
          let translateZ = 0;

          if (offset === 0) {
            translateX = 0;
            scale = 1;
            opacity = 1;
            blur = 0;
            rotateY = 0;
            translateZ = 0;
            zIndex = 30;
          } else if (offset === -1) {
            translateX = -240;
            scale = 0.92;
            opacity = 0.35;
            blur = 5;
            rotateY = 22; // tilt toward center
            translateZ = -140; // push back
            zIndex = 20;
          } else if (offset === 1) {
            translateX = 240;
            scale = 0.92;
            opacity = 0.35;
            blur = 5;
            rotateY = -22; // tilt toward center
            translateZ = -140; // push back
            zIndex = 20;
          } else {
            opacity = 0;
            scale = 0.9;
            blur = 10;
            rotateY = 0;
            translateZ = -300;
            zIndex = 0;
          }

          return (
            <div
              key={i}
              className="absolute left-1/2 top-1/2 w-[92%] sm:w-[520px] -translate-y-1/2 rounded-2xl
           bg-white/70 backdrop-blur-md
           shadow-[0_20px_60px_rgba(0,0,0,0.15)]
           transition-all duration-500"
              style={{
                transform: `translateX(calc(-50% + ${translateX}px)) translateY(-50%) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                transformStyle: "preserve-3d",
                opacity,
                filter: `blur(${blur}px)`,
                zIndex,
                pointerEvents: offset === 0 ? "auto" : "none",
              }}
              aria-hidden={!isCenter}
            >
              <div className="p-6 sm:p-7">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-lg font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.source}</p>
                  </div>

                  <div className="text-sm text-gray-600">
                    {"★".repeat(item.stars || 5)}
                  </div>
                </div>

                <div className="mt-4 h-px w-full bg-gray-200" />

                <p className="mt-4 text-gray-700 leading-relaxed line-clamp-3">
                  {item.text}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* dots */}
      <div className="mt-1 flex justify-center gap-2">
        {reviews.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`h-2.5 w-2.5 rounded-full transition ${
              i === active ? "bg-gray-900" : "bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Go to review ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
