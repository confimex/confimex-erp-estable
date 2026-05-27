import { useState, useEffect } from "react";

import AdminProspectos from "@/pages/AdminProspectos";
import AdminRed from "@/components/AdminRed";

export default function ERP() {

  const [pass, setPass] = useState("");

  const [autorizado, setAutorizado] =
    useState(false);

  const [tab, setTab] =
    useState("prospectos");

  const claveCorrecta =
    "Masa031722";

  /* ---------------- SESION ---------------- */

  useEffect(() => {

    const sesion =
      localStorage.getItem(
        "erp-auth"
      );

    if (sesion === "true") {

      setAutorizado(true);

    }

  }, []);

  /* ---------------- LOGIN ---------------- */

  const handleLogin = () => {

    if (pass === claveCorrecta) {

      setAutorizado(true);

      localStorage.setItem(
        "erp-auth",
        "true"
      );

      setPass("");

    } else {

      alert(
        "Contraseña incorrecta"
      );

    }

  };

  /* ---------------- LOGOUT ---------------- */

  const handleLogout = () => {

  setAutorizado(false);

  setPass("");

  localStorage.removeItem(
    "erp-auth"
  );

  window.location.href = "/";

};

  /* ---------------- LOGIN SCREEN ---------------- */

  if (!autorizado) {

    return (

      <div className="flex min-h-screen items-center justify-center bg-black p-4 text-white">

        <div className="w-full max-w-sm space-y-4 rounded-2xl border border-white/10 bg-zinc-900 p-8">

          <h2 className="text-2xl font-bold text-emerald-400">
            Acceso ERP
          </h2>

          <input
            type="password"
            placeholder="Contraseña"
            value={pass}
            onChange={(e) =>
              setPass(
                e.target.value
              )
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleLogin();
              }
            }}
            className="w-full rounded-xl border border-white/20 bg-black p-3 outline-none focus:border-emerald-500"
          />

          <button
            onClick={handleLogin}
            className="w-full rounded-xl bg-emerald-500 p-3 font-bold text-black transition hover:bg-emerald-400"
          >
            Entrar
          </button>

        </div>

      </div>

    );

  }

  /* ---------------- ERP ---------------- */

  return (

    <div className="min-h-screen bg-black text-white">

      {/* TOPBAR */}

      <div className="flex flex-wrap items-center gap-3 border-b border-white/10 p-4">

        <div className="flex gap-2">

          {[
            {
              id: "calendario",
              label: "Calendario",
            },
            {
              id: "prospectos",
              label: "Prospectos",
            },
            {
              id: "red",
              label: "Red Confimex",
            },
          ].map((item) => (

            <button
              key={item.id}
              onClick={() =>
                setTab(item.id)
              }
              className={`rounded-xl px-4 py-2 font-bold transition ${
                tab === item.id
                  ? "bg-emerald-500 text-black"
                  : "bg-zinc-800 hover:bg-zinc-700"
              }`}
            >
              {item.label}
            </button>

          ))}

        </div>

        <button
          onClick={handleLogout}
          className="ml-auto rounded-xl bg-red-900/30 px-4 py-2 font-bold text-red-400 hover:bg-red-900/50"
        >
          Salir
        </button>

      </div>

      {/* CONTENIDO */}

      <div className="p-4">

        {tab === "calendario" && (
          <CalendarioPro />
        )}

        {tab === "prospectos" && (
          <AdminProspectos />
        )}

        {tab === "red" && (
          <AdminRed />
        )}

      </div>

    </div>

  );

}