import { Link } from "@tanstack/react-router";

export default function RedConfimexBanner() {
  return (
    <section className="bg-black px-6 py-20 text-white">
      <div className="mx-auto max-w-5xl rounded-3xl border border-white/10 bg-zinc-900 p-10 text-center shadow-2xl">

        <h2 className="text-3xl font-black md:text-5xl">
          RED <span className="text-emerald-400">CONFIMEX</span>
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-300">
          Encuentra maquileros, fabricantes, proveedores,
          talleres y especialistas del sector textil.
        </p>

        <p className="mt-3 text-sm text-zinc-500">
          Conecta con empresas y servicios reales de la industria.
        </p>

        <Link
          to="/red_confimex"
          className="mt-8 inline-flex rounded-2xl bg-emerald-500 px-8 py-4 text-lg font-black text-black transition hover:scale-105 hover:bg-emerald-400"
        >
          EXPLORAR RED CONFIMEX
        </Link>

      </div>
    </section>
  );
}