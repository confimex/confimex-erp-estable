import { createFileRoute } from "@tanstack/react-router";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import CtaSection from "@/components/CtaSection";

export const Route = createFileRoute("/testimonios")({
  head: () => ({
    meta: [
      { title: "Testimonios — CONFIMÉX" },
      { name: "description", content: "Talleres de confección en CDMX comparten cómo CONFIMÉX les ayudó a ahorrar tela y mejorar su producción." },
      { property: "og:title", content: "Testimonios — CONFIMÉX" },
      { property: "og:description", content: "Resultados reales de talleres que digitalizaron su patronaje con CONFIMÉX." },
    ],
  }),
  component: TestimoniosPage,
});

const testimonios = [
  {
    nombre: "María G.",
    taller: "Taller Iztapalapa",
    texto: "En menos de tres meses reducimos cerca del 30% del desperdicio de tela, algo que llevábamos años intentando corregir sin éxito. CONFIMÉX no solo detectó dónde estaba la fuga de dinero, también nos acompañó paso a paso hasta transformar nuestra operación. El cambio se reflejó directamente en nuestra productividad y rentabilidad.",
  },
  {
    nombre: "Jorge R.",
    taller: "Confecciones del Valle",
    texto: "Optimizar la Graduación automática nos permitió reducir tiempos de trabajo drásticamente y aumentar nuestra capacidad de producción, nunca más hemos vuelto a utilizar las mesas de corte para hacer acomodos de moldes a mano, la perdida de moldes en la empresa se terminó, y lo mejor de todo sin contratar más personal. ",
  },
  {
    nombre: "Lucía M.",
    taller: "Moda CDMX",
    texto: "CONFIMÉX nos abrió los ojos. Detectaron con precisión los puntos donde estábamos perdiendo tiempo, material y dinero sin darnos cuenta. Hoy trabajamos con mucho más control, reducimos desperdicios y nuestra producción es más eficiente, rentable y organizada.",
  },
  {
    nombre: "Guadalupe M.",
    taller: "Uniformes Naroll",
    texto: "El acompañamiento de CONFIMÉX fue la clave para lograr el cambio. Antes ya habíamos intentado implementar sistemas de patronaje, pero solo nos dieron un curso y después nos dejaron solos; con el tiempo el personal olvidó cómo funcionaba y todo quedó abandonado. Con CONFIMÉX fue completamente diferente: siempre tuvimos soporte, asesoría y seguimiento. Eso le dio confianza al personal para aprender, usar el sistema correctamente y convertirlo realmente en parte de nuestra operación diaria.",
  },
];

function TestimoniosPage() {
  return (
    <>
      <Navbar />
      <main className="pt-32">
        <section className="mx-auto max-w-6xl px-6 py-12">
          <h1 className="text-4xl font-bold text-foreground md:text-5xl">Testimonios</h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Lo que dicen los talleres que ya trabajan con CONFIMÉX.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {testimonios.map((t) => (
              <div key={t.nombre} className="rounded-xl border border-border bg-card p-6 shadow-sm">
                <p className="text-card-foreground">"{t.texto}"</p>
                <div className="mt-4">
                  <p className="font-bold text-foreground">{t.nombre}</p>
                  <p className="text-sm text-muted-foreground">{t.taller}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        <CtaSection />
      </main>
      <FooterSection />
    </>
  );
}
