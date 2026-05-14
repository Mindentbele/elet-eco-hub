export default function About() {
  return (
    <section id="about" className="py-20 md:py-28 bg-white">
      <div className="max-w-5xl mx-auto px-5 text-center">
        <span className="text-tomato-600 font-semibold uppercase tracking-wider text-sm">Rólunk</span>
        <h2 className="display text-3xl md:text-5xl font-extrabold mt-3">Mi az a kosárközösség?</h2>
        <p className="mt-6 text-lg text-ink-800/80 max-w-3xl mx-auto leading-relaxed">
          A <strong>Több, mint kosár</strong> egy helyi gazdákat és tudatos vásárlókat összekötő közösség.
          Hetente friss, szezonális zöldséget, gyümölcsöt és kézműves élelmiszert juttatunk el hozzád —
          közvetlenül onnan, ahol termett. Nincs felesleges közvetítő, nincs hosszú tárolás.
          Csak igazi íz, igazi emberek mögött.
        </p>
        <div className="grid sm:grid-cols-3 gap-6 mt-12">
          {[
            { e: "🌱", t: "Friss", d: "Reggel szedve, aznap nálad." },
            { e: "🤝", t: "Közösségi", d: "Helyi termelőket támogatsz." },
            { e: "♻️", t: "Fenntartható", d: "Rövid ellátási lánc, kevesebb hulladék." },
          ].map(x => (
            <div key={x.t} className="bg-cream-50 rounded-2xl p-6 border border-cream-200">
              <div className="text-4xl mb-3">{x.e}</div>
              <h3 className="font-display text-xl font-bold mb-2">{x.t}</h3>
              <p className="text-sm text-ink-800/70">{x.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
