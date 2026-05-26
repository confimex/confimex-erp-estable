import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/red-confimex")({
  head: () => ({
    meta: [
      {
        title:
          "RED CONFIMÉX — Directorio textil: maquileros, proveedores y fabricantes en México",
      },
      {
        name: "description",
        content:
          "Directorio textil de México: encuentra maquileros, fabricantes, proveedores, talleres de confección, bordadores, patronistas y servicios textiles. Regístrate gratis.",
      },
      {
        property: "og:title",
        content: "RED CONFIMÉX — Directorio textil de México",
      },
      {
        property: "og:description",
        content:
          "Buscador estilo Google para la industria textil y de la confección. Conecta con maquileros, proveedores y fabricantes.",
      },
      {
        name: "keywords",
        content:
          "maquileros México, proveedores textiles, fabricantes de ropa, talleres de confección, directorio textil, servicios textiles, industria de la confección",
      },
      {
        rel: "canonical",
        href: "/red-confimex",
      } as any,
    ],
  }),
  component: RedConfimexPage,
});

const CATEGORIAS = [
  { nombre: "Maquileros", icono: "🧵" },
  { nombre: "Fabricantes", icono: "🏭" },
  { nombre: "Proveedores", icono: "📦" },
  { nombre: "Bordadores", icono: "🪡" },
  { nombre: "Patronistas", icono: "📐" },
  { nombre: "Corte", icono: "✂️" },
  { nombre: "Sublimado", icono: "🎨" },
  { nombre: "Uniformes", icono: "👔" },
  { nombre: "Diseño Textil", icono: "✏️" },
];

type Negocio = {
  id: string;
  nombre: string;
  categoria: string;
  especialidad: string | null;
  ciudad: string | null;
  estado: string | null;
  pais: string | null;
  telefono: string | null;
  whatsapp: string | null;
  correo: string | null;
  web: string | null;
  descripcion: string | null;
  servicios: string | null;
  logo_url: string | null;
  created_at: string;
};

const PAGE_SIZE = 12;

function RedConfimexPage() {
  const [query, setQuery] = useState("");
  const [categoriaFiltro, setCategoriaFiltro] = useState<string | null>(null);
  const [ciudadFiltro, setCiudadFiltro] = useState("");
  const [negocios, setNegocios] = useState<Negocio[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [openRegistro, setOpenRegistro] = useState(false);

  useEffect(() => {
    let cancel = false;
    (async () => {
      setLoading(true);
      const { data } = await supabase
        .from("red_confimex")
        .select("*")
        .order("created_at", { ascending: false });
      if (!cancel) {
        setNegocios((data as Negocio[]) ?? []);
        setLoading(false);
      }
    })();
    return () => {
      cancel = true;
    };
  }, []);

  const filtrados = useMemo(() => {
    const q = query.trim().toLowerCase();
    return negocios.filter((n) => {
      if (categoriaFiltro && n.categoria !== categoriaFiltro) return false;
      if (
        ciudadFiltro &&
        !(n.ciudad ?? "").toLowerCase().includes(ciudadFiltro.toLowerCase())
      )
        return false;
      if (!q) return true;
      const haystack = [
        n.nombre,
        n.categoria,
        n.especialidad,
        n.ciudad,
        n.estado,
        n.servicios,
        n.descripcion,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [negocios, query, categoriaFiltro, ciudadFiltro]);

  const totalPages = Math.max(1, Math.ceil(filtrados.length / PAGE_SIZE));
  const pageSafe = Math.min(page, totalPages);
  const visibles = filtrados.slice((pageSafe - 1) * PAGE_SIZE, pageSafe * PAGE_SIZE);

  useEffect(() => {
    setPage(1);
  }, [query, categoriaFiltro, ciudadFiltro]);

  const handleNuevoRegistro = (nuevo: Negocio) => {
    setNegocios((prev) => [nuevo, ...prev]);
    setOpenRegistro(false);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-32">
        {/* HERO */}
        <section className="mx-auto max-w-5xl px-6 pb-12 text-center">
          <h1 className="text-4xl font-black tracking-tight text-foreground md:text-6xl">
            RED <span className="text-brand">CONFIMÉX</span>
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-base text-muted-foreground md:text-lg">
            Esta es una RED que sirve para que busques Maquileros, Proveedores,
            Fabricantes y especialistas del sector textil. Inserta tus datos y
            siempre habrá alguien que pueda hacer uso de tus conocimientos y
            servicios.
          </p>

          {/* BUSCADOR */}
          <div className="mx-auto mt-10 max-w-2xl">
            <div className="flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3 shadow-md transition focus-within:shadow-lg">
              <svg
                className="h-5 w-5 text-muted-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.3-4.3M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z" />
              </svg>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar maquileros, proveedores, fabricantes, bordadores, talleres..."
                className="w-full bg-transparent text-base outline-none placeholder:text-muted-foreground"
                aria-label="Buscar en el directorio"
              />
            </div>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
              <input
                value={ciudadFiltro}
                onChange={(e) => setCiudadFiltro(e.target.value)}
                placeholder="Filtrar por ciudad"
                className="rounded-full border border-border bg-card px-4 py-2 text-sm outline-none focus:border-brand"
              />
              {categoriaFiltro && (
                <button
                  onClick={() => setCategoriaFiltro(null)}
                  className="rounded-full bg-brand/10 px-4 py-2 text-sm font-medium text-brand hover:bg-brand/20"
                >
                  ✕ {categoriaFiltro}
                </button>
              )}
              <button
                onClick={() => setOpenRegistro(true)}
                className="rounded-full bg-brand px-5 py-2 text-sm font-bold text-brand-foreground shadow-sm transition hover:brightness-110"
              >
                + Registrar mi negocio
              </button>
            </div>
          </div>
        </section>

        {/* CATEGORÍAS */}
        <section className="mx-auto max-w-6xl px-6 pb-12">
          <h2 className="mb-6 text-center text-xl font-semibold text-foreground">
            Explora por categoría
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9">
            {CATEGORIAS.map((c) => {
              const activo = categoriaFiltro === c.nombre;
              return (
                <button
                  key={c.nombre}
                  onClick={() => setCategoriaFiltro(activo ? null : c.nombre)}
                  className={`flex flex-col items-center gap-2 rounded-xl border p-4 text-center transition hover:-translate-y-0.5 hover:shadow-md ${
                    activo
                      ? "border-brand bg-brand/10"
                      : "border-border bg-card"
                  }`}
                >
                  <span className="text-2xl">{c.icono}</span>
                  <span className="text-xs font-medium text-foreground">{c.nombre}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* RESULTADOS */}
        <section className="mx-auto max-w-6xl px-6 pb-20">
          <div className="mb-6 flex items-end justify-between">
            <h2 className="text-lg font-semibold text-foreground">
              {loading
                ? "Cargando directorio..."
                : `${filtrados.length} resultado${filtrados.length === 1 ? "" : "s"}`}
            </h2>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-56 animate-pulse rounded-xl border border-border bg-card" />
              ))}
            </div>
          ) : filtrados.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border bg-card p-12 text-center">
              <p className="text-muted-foreground">
                No se encontraron negocios con esos criterios. ¿Eres el primero en tu categoría?
              </p>
              <button
                onClick={() => setOpenRegistro(true)}
                className="mt-4 rounded-lg bg-brand px-5 py-2.5 font-bold text-brand-foreground hover:brightness-110"
              >
                Registrar mi negocio
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {visibles.map((n) => (
                  <NegocioCard key={n.id} n={n} />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="mt-10 flex items-center justify-center gap-2">
                  <button
                    disabled={pageSafe === 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    className="rounded-md border border-border bg-card px-3 py-1.5 text-sm disabled:opacity-40"
                  >
                    Anterior
                  </button>
                  <span className="text-sm text-muted-foreground">
                    Página {pageSafe} de {totalPages}
                  </span>
                  <button
                    disabled={pageSafe === totalPages}
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    className="rounded-md border border-border bg-card px-3 py-1.5 text-sm disabled:opacity-40"
                  >
                    Siguiente
                  </button>
                </div>
              )}
            </>
          )}
        </section>
      </main>
      <FooterSection />

      <RegistroDialog
        open={openRegistro}
        onOpenChange={setOpenRegistro}
        onCreated={handleNuevoRegistro}
      />
    </>
  );
}

function NegocioCard({ n }: { n: Negocio }) {
  const wa = n.whatsapp?.replace(/[^0-9]/g, "");
  const contactHref = wa
    ? `https://wa.me/${wa}?text=${encodeURIComponent(`Hola ${n.nombre}, te encontré en RED CONFIMÉX`)}`
    : n.correo
    ? `mailto:${n.correo}`
    : n.telefono
    ? `tel:${n.telefono}`
    : "#";

  return (
    <article className="flex flex-col rounded-xl border border-border bg-card p-5 shadow-sm transition hover:shadow-lg">
      <div className="flex items-start gap-3">
        {n.logo_url ? (
          <img src={n.logo_url} alt={n.nombre} className="h-12 w-12 rounded-lg object-cover" />
        ) : (
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand/10 text-lg font-bold text-brand">
            {n.nombre.charAt(0).toUpperCase()}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-bold text-foreground">{n.nombre}</h3>
          <p className="text-xs font-medium text-brand">{n.categoria}</p>
          {n.ciudad && (
            <p className="text-xs text-muted-foreground">
              📍 {n.ciudad}{n.estado ? `, ${n.estado}` : ""}
            </p>
          )}
        </div>
      </div>

      {n.descripcion && (
        <p className="mt-3 line-clamp-3 text-sm text-muted-foreground">{n.descripcion}</p>
      )}

      {n.servicios && (
        <p className="mt-2 line-clamp-2 text-xs text-muted-foreground">
          <span className="font-medium text-foreground">Servicios:</span> {n.servicios}
        </p>
      )}

      <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted-foreground">
        {n.telefono && <span>📞 {n.telefono}</span>}
        {n.correo && <span className="truncate">✉ {n.correo}</span>}
      </div>

      <a
        href={contactHref}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center justify-center rounded-lg bg-brand px-4 py-2 text-sm font-bold text-brand-foreground transition hover:brightness-110"
      >
        Contactar
      </a>
    </article>
  );
}

function RegistroDialog({
  open,
  onOpenChange,
  onCreated,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onCreated: (n: Negocio) => void;
}) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    nombre: "",
    categoria: CATEGORIAS[0].nombre,
    especialidad: "",
    ciudad: "",
    estado: "",
    pais: "México",
    telefono: "",
    whatsapp: "",
    correo: "",
    web: "",
    descripcion: "",
    servicios: "",
    logo_url: "",
  });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!form.nombre.trim() || !form.categoria.trim()) {
      setError("Nombre y categoría son obligatorios.");
      return;
    }
    setSubmitting(true);
    const { data, error } = await supabase
      .from("red_confimex")
      .insert({
        ...form,
        especialidad: form.especialidad || null,
        ciudad: form.ciudad || null,
        estado: form.estado || null,
        telefono: form.telefono || null,
        whatsapp: form.whatsapp || null,
        correo: form.correo || null,
        web: form.web || null,
        descripcion: form.descripcion || null,
        servicios: form.servicios || null,
        logo_url: form.logo_url || null,
      })
      .select()
      .single();
    setSubmitting(false);
    if (error) {
      setError(error.message);
      return;
    }
    onCreated(data as Negocio);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Registrar mi negocio en RED CONFIMÉX</DialogTitle>
          <DialogDescription>
            Completa tus datos para aparecer en el directorio. Es 100% gratuito.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={submit} className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <Input placeholder="Nombre de empresa / persona *" value={form.nombre} onChange={set("nombre")} className="md:col-span-2" required maxLength={200} />

<select
  value={form.categoria}
  onChange={set("categoria")}
  className="h-9 rounded-md border border-input bg-background px-3 text-sm text-foreground"
>
  {CATEGORIAS.map((c) => (
    <option
      key={c.nombre}
      value={c.nombre}
      className="bg-background text-foreground"
    >
      {c.nombre}
    </option>
  ))}
</select>

          <Input placeholder="Ciudad" value={form.ciudad} onChange={set("ciudad")} />
          <Input placeholder="Estado" value={form.estado} onChange={set("estado")} />
          <Input placeholder="País" value={form.pais} onChange={set("pais")} />
          <Input placeholder="Teléfono" value={form.telefono} onChange={set("telefono")} maxLength={50} />
          <Input placeholder="WhatsApp (con lada, ej. 525512895572)" value={form.whatsapp} onChange={set("whatsapp")} maxLength={50} />
          <Input placeholder="Correo" type="email" value={form.correo} onChange={set("correo")} maxLength={255} />
          <Input placeholder="Página web (opcional)" value={form.web} onChange={set("web")} />
          <Input placeholder="URL de logo (opcional)" value={form.logo_url} onChange={set("logo_url")} className="md:col-span-2" />
          <Textarea placeholder="Descripción corta" value={form.descripcion} onChange={set("descripcion")} className="md:col-span-2" maxLength={2000} />
          <Textarea placeholder="Servicios que ofreces (separa con comas)" value={form.servicios} onChange={set("servicios")} className="md:col-span-2" />

          {error && <p className="text-sm text-destructive md:col-span-2">{error}</p>}

          <div className="flex justify-end gap-2 md:col-span-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
            <Button type="submit" disabled={submitting} className="bg-brand text-brand-foreground hover:brightness-110">
              {submitting ? "Guardando..." : "Registrar"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
