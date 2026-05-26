import { createFileRoute } from "@tanstack/react-router";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import BenefitsSection from "@/components/BenefitsSection";
import CtaSection from "@/components/CtaSection";

export const Route = createFileRoute("/servicios")({
  head: () => ({
    meta: [
      { title: "Servicios — CONFIMÉX | Patronaje Digital en CDMX" },
      { name: "description", content: "Conoce los servicios de patronaje digital, escalado y optimización de producción que ofrecemos a talleres de confección en CDMX." },
      { property: "og:title", content: "Servicios — CONFIMÉX" },
      { property: "og:description", content: "Patronaje digital, escalado y optimización para talleres de confección." },
    ],
  }),
  component: ServiciosPage,
});

function ServiciosPage() {
  return (
    <>
      <Navbar />
      <main className="pt-32">
        <section className="mx-auto max-w-6xl px-6 py-12">
          <h1 className="text-4xl font-bold text-foreground md:text-5xl">Nuestros Servicios</h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
  Cada implementación está enfocada en un objetivo claro: producir más, desperdiciar menos y controlar mejor tu operación.
          </p>

          <h2 className="mt-10 text-2xl font-semibold">
            ¿Qué logras con nuestras soluciones?
          </h2>

          <ul className="mt-4 space-y-2 text-gray-300 list-disc list-inside">
            <li>Menos desperdicio de tela desde el primer trazo</li>
            <li>Reducción de tiempos en desarrollo de patrones</li>
            <li>Mayor velocidad en escalado de tallas</li>
            <li>Procesos más ordenados y estandarizados</li>
            <li>Producción más constante y con menos errores</li>
          </ul>

        </section>

        <BenefitsSection />
        <CtaSection />
      </main>
      <FooterSection />
    </>
  );
}
