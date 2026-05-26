import { createFileRoute } from "@tanstack/react-router";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import CtaSection from "@/components/CtaSection";

export const Route = createFileRoute("/quienes-somos")({
  head: () => ({
    meta: [
      { title: "Quiénes Somos — CONFIMÉX" },
      { name: "description", content: "Conoce a CONFIMÉX: expertos en patronaje digital y optimización de talleres de confección en CDMX." },
      { property: "og:title", content: "Quiénes Somos — CONFIMÉX" },
      { property: "og:description", content: "Expertos en patronaje digital y optimización de talleres de confección." },
    ],
  }),
  component: QuienesSomosPage,
});

function QuienesSomosPage() {
  return (
    <>
      <Navbar />
      <main className="pt-32">
        <section className="mx-auto max-w-4xl px-6 py-12">
          <h1 className="text-4xl font-bold text-foreground md:text-5xl">Quiénes Somos</h1>
          <p className="mt-6 text-lg text-muted-foreground">
            En CONFIMÉX ayudamos a talleres de confección a digitalizar
            sus procesos de patronaje y escalado. Combinamos experiencia en la industria textil
            con tecnología de punta para que cada planta produzca más, desperdicie menos y
            crezca de forma sostenible.
          </p>
          <p className="mt-4 text-lg text-muted-foreground">
                        Nuestro equipo acompaña a cada cliente desde el diagnóstico inicial hasta la
            implementación, asegurando resultados medibles en productividad y ahorro de tela.
          </p>
        </section>
        <CtaSection />
      </main>
      <FooterSection />
    </>
  );
}
