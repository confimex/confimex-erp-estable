const objections = [
  {
    question: '"Es muy caro para mi taller"',
    answer:
      "Entendemos. Por eso ofrecemos planes de financiamiento accesibles y un diagnóstico GRATIS para que veas exactamente cuánto puedes ahorrar en tela y tiempo. La mayoría de nuestros clientes recuperan la inversión en menos de 6 meses solo con el ahorro en desperdicio de tela.",
  },
  {
    question: '"No tengo personal que sepa usar el equipo"',
    answer:
      "Nuestra propuesta incluye asistencia completa para ti y tu personal. El programa es intuitivo, amigable y fácil de usar. Si han sido capaces de aprender a usar un celular, nosotros les enseñaremos cómo sacarle el mejor provecho a todo esto. Siempre estaremos a su lado para apoyarlos: nosotros no solo instalamos, CAPACITAMOS EN SU TOTALIDAD.",
  },
  {
    question: '"¿Y si no es para mi tipo de taller?"',
    answer:
      "Ya sea que hagas ropa casual, uniformes, vestidos de novia o ropa deportiva, el patronaje digital se adapta a cualquier tipo de confección. El diagnóstico GRATIS te dirá exactamente cómo aplicarlo a tu producción específica, sin compromiso.",
  },
];

export default function ObjectionsSection() {
  return (
    <section className="bg-background py-24">
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-brand">
            Resolvemos tus dudas
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-foreground sm:text-4xl">
            Sabemos lo que estás pensando
          </h2>
        </div>

        <div className="mt-14 space-y-8">
          {objections.map((obj, i) => (
            <div
              key={i}
              className="rounded-2xl border border-border bg-card p-8 shadow-sm"
            >
              <p className="text-xl font-bold text-brand">{obj.question}</p>
              <p className="mt-4 leading-relaxed text-muted-foreground">{obj.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
