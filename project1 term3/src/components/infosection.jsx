import React, { useEffect, useRef, useState } from "react";

function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function InfoSection({ patientData }) {
  const cities = [...new Set(patientData.map((u) => u.address.city))];
  const [sectionRef, sectionVisible] = useInView();

  const cards = [
    {
      delay: "delay-100",
      icon: "🩸",
      title: String(patientData.length),
      subtitle: "Verified Donors Registered",
      accent: "from-blue-600 to-blue-700",
      desc: "Real people ready to help you in your time of need — verified and available across multiple cities.",
    },
    {
      delay: "delay-300",
      icon: "🏙️",
      title: "Active Cities",
      subtitle: `${cities.length} locations and growing`,
      content: cities,
      accent: "from-indigo-600 to-blue-700",
    },
    {
      delay: "delay-500",
      icon: "🤝",
      title: "How It Works",
      subtitle: "Simple 3-step process",
      isHelp: true,
      accent: "from-blue-700 to-sky-700",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-24 px-6 bg-gradient-to-b from-slate-900 to-blue-950 overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-60"></div>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-48 h-48 bg-blue-700/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-indigo-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className={`text-center mb-16 ${sectionVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <span className="text-blue-400 text-sm font-semibold tracking-widest uppercase">
            Why Choose LifeLink
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mt-3">
            Trusted. Fast. <span className="gradient-text">Life-Saving.</span>
          </h2>
          <p className="text-blue-300/70 mt-4 max-w-xl mx-auto text-sm">
            We bridge the gap between blood donors and patients in critical need — quickly, reliably, and completely free of charge.
          </p>
          <div className="mt-4 w-16 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((card, i) => (
            <div
              key={i}
              className={`card-glow glass-dark rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 ${sectionVisible ? `animate-scale-in ${card.delay}` : "opacity-0"}`}
            >
              <div className={`h-1.5 w-full bg-gradient-to-r ${card.accent}`}></div>
              <div className="p-8">
                <div className="text-4xl mb-4">{card.icon}</div>
                <h3 className="text-3xl font-extrabold text-white mb-1">{card.title}</h3>
                <p className="text-blue-300 text-sm font-medium mb-4">{card.subtitle}</p>

                {card.desc && (
                  <p className="text-blue-200/60 text-sm leading-relaxed">{card.desc}</p>
                )}

                {card.content && (
                  <ul className="text-blue-200/70 space-y-1 text-sm max-h-36 overflow-y-auto pr-1">
                    {card.content.map((city, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-blue-400 rounded-full flex-shrink-0"></span>
                        {city}
                      </li>
                    ))}
                  </ul>
                )}

                {card.isHelp && (
                  <ol className="text-blue-200/70 text-sm space-y-3">
                    {[
                      { step: "1", text: 'Go to the Donors section' },
                      { step: "2", text: 'Filter by blood group or city' },
                      { step: "3", text: 'Click Request Help — done!' },
                    ].map((s) => (
                      <li key={s.step} className="flex items-start gap-3">
                        <span className="w-6 h-6 bg-blue-700 text-blue-200 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                          {s.step}
                        </span>
                        <span>{s.text}</span>
                      </li>
                    ))}
                  </ol>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default InfoSection;
