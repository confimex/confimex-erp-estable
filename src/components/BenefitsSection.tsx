import { useState } from "react";
import productividadImg from "@/assets/productividad.jpg";
import ahorroTelaImg from "@/assets/ahorro-tela.jpg";
import escaladoTallasImg from "@/assets/escalado-tallas.jpg";
import produccionRapidaImg from "@/assets/produccion-rapida.jpg";
import patronesSegurosImg from "@/assets/patrones-seguros.jpg";
import retornoInversionImg from "@/assets/retorno-inversion.jpg";
import trazoVideo from "@/assets/trazo.mp4";
import cortadoraVideo from "@/assets/cortadora.mp4";
import graduacionVideo from "@/assets/graduacion.mp4";
import ploteoVideo from "@/assets/ploteo.mp4";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

const benefits = [
  {
    icon: "📐",
    title: "Graduación instantánea de tallas",
    description: "Realiza cualquier cambio en el patrón base y se aplicará automáticamente a todas las tallas en cuestión de segundos, con precisión y sin necesidad de redibujar manualmente.",
    image: escaladoTallasImg,
    imageAlt: "Patronaje digital con escalado de tallas en sistema CAD",
    proofVideo: graduacionVideo,
    proofLabel: "Demostración",
  },
  {
    icon: "⚡",
    title: "Hasta 20% menos desperdicio de tela",
    description: "El trazado automático optimiza cada centímetro de tela mediante trazos inteligentes que reducen desperdicios y mejoran el aprovechamiento del material.",
    image: ahorroTelaImg,
    imageAlt: "Reducir errores teniendo el control: el ahorro de tela es ganancia completa",
    proofVideo: trazoVideo,
    proofAlt: "Los ahorros en tela son verificables — control desde el inicio hasta el final del corte",
  },
  {
    icon: "⏱️",
    title: "Producción más rápida",
    description: "Optimiza el proceso de trazo y corte hasta en un 60%, acelerando la producción y mejorando la capacidad de respuesta de tu planta.",
    image: produccionRapidaImg,
    imageAlt: "Capacitación de Confimex en patronaje digital con sistema CAD",
    proofVideo: ploteoVideo,
    proofLabel: "Trazo automático",
  },
  {
    icon: "🎯",
    title: "Precisión milimétrica",
    description: "El corte automático elimina variaciones y errores humanos, logrando cortes precisos y uniformes en toda la producción.",
    image: productividadImg,
    imageAlt: "Planta de confección con control total de producción",
    proofVideo: cortadoraVideo,
    proofLabel: "Ver video",
  },
  {
    icon: "🔒",
    title: "Más orden, menos errores en producción",
    description: "Mantén tus archivos organizados, protegidos y siempre disponibles para trabajar con mayor rapidez, precisión y seguridad.",
    image: patronesSegurosImg,
    imageAlt: "Patrones digitales seguros y respaldados en la nube",
  },
  {
    icon: "💰",
    title: "Retorno de la inversión rápidamente",
    description: "El ahorro en tela, tiempo y producción permite recuperar la inversión en menos tiempo. Desde el primer día, tu taller trabaja con mayor eficiencia y rentabilidad.",
    image: retornoInversionImg,
    imageAlt: "Control de inventario y producción digital en almacén de confección",
  },
];

export default function BenefitsSection() {
  const [openProof, setOpenProof] = useState<string | null>(null);

  return (
    <section id="beneficios" className="bg-surface py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-brand">
            ¿POR QUÉ UN SISTEMA DE PATRONAJE Y TRAZO AUTOMÁTICO?
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-foreground sm:text-4xl">
            Tu taller merece producir mejor
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Talleres y grandes empresas de confección ya están reduciendo costos y aumentando productividad gracias al patronaje y trazo digital. Estos son algunos de los beneficios más importantes:
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b, i) => (
            <div
              key={i}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:shadow-lg hover:border-brand/40 hover:-translate-y-1"
            >
              {b.image && (
                <img
                  src={b.image}
                  alt={b.imageAlt ?? b.title}
                  loading="lazy"
                  className="h-44 w-full object-cover"
                />
              )}
              <div className="flex flex-1 flex-col p-8">
                <h3 className="text-lg font-bold text-card-foreground">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.description}</p>
                {b.proofVideo && (
                  <button
                    type="button"
                    onClick={() => setOpenProof(b.proofVideo!)}
                    className="mt-auto pt-4 self-start"
                  >
                    <span className="inline-flex items-center justify-center rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground shadow-sm transition hover:brightness-110">
                      {b.proofLabel ?? "Ver comprobación"}
                    </span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={!!openProof} onOpenChange={(o) => !o && setOpenProof(null)}>
        <DialogContent className="max-w-[95vw] sm:max-w-3xl max-h-[90vh] p-2 sm:p-4 overflow-auto bg-background">
          <DialogTitle className="sr-only">Comprobación de ahorros en tela</DialogTitle>
          {openProof && (
            <video
              src={openProof}
              controls
              autoPlay
              playsInline
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg mx-auto bg-black"
            />
          )}
          <button
            type="button"
            onClick={() => setOpenProof(null)}
            className="mt-2 inline-flex items-center justify-center rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground shadow-sm transition hover:brightness-110 mx-auto"
          >
            Cerrar y volver
          </button>
        </DialogContent>
      </Dialog>
    </section>
  );
}
