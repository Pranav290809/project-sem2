import React, { useEffect, useRef, useState } from "react";

function ContactSection() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const contacts = [
    { icon: "🌐", label: "Website",  value: "lifelink.in",            sub: "Visit our portal anytime" },
    { icon: "📧", label: "Email",    value: "support@lifelink.in",    sub: "We reply within 24 hours" },
    { icon: "📞", label: "Helpline", value: "1800-XXX-XXXX",          sub: "Available 24/7, toll-free" },
  ];

  return (
    <section
      ref={ref}
      className="relative py-24 px-6 bg-gradient-to-b from-blue-950 to-slate-950 overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-50"></div>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10 text-center">
        <div className={`${visible ? "animate-fade-in-up" : "opacity-0"}`}>
          <span className="text-blue-400 text-sm font-semibold tracking-widest uppercase">
            We're Here For You
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mt-3 mb-3">
            Need <span className="gradient-text">Assistance?</span>
          </h2>
          <p className="text-blue-300/60 text-sm max-w-lg mx-auto mb-12">
            Our dedicated support team is available around the clock to help connect donors with patients in urgent need.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full mb-14"></div>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 mb-12">
          {contacts.map((c, i) => (
            <div
              key={i}
              className={`card-glow glass-dark rounded-2xl p-8 transition-all duration-500 hover:-translate-y-2 ${visible ? `animate-scale-in delay-${(i + 1) * 200}` : "opacity-0"}`}
            >
              <div className="text-4xl mb-4">{c.icon}</div>
              <p className="text-blue-400 text-xs font-semibold tracking-widest uppercase mb-2">{c.label}</p>
              <p className="text-white font-bold text-lg mb-1">{c.value}</p>
              <p className="text-blue-300/50 text-xs">{c.sub}</p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className={`glass rounded-2xl p-8 ${visible ? "animate-fade-in-up delay-700" : "opacity-0"}`}>
          <h3 className="text-white font-bold text-xl mb-2">Want to register as a donor?</h3>
          <p className="text-blue-300/60 text-sm mb-5">
            Join thousands of heroes across India. Registering takes less than 2 minutes and your information remains completely confidential.
          </p>
          <a
            href="#/Donors"
            className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-1"
          >
            🩸 Become a Donor
          </a>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
