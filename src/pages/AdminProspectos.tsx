import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export default function AdminProspectos() {

  const [prospectos, setProspectos] = useState<any[]>([]);

  useEffect(() => {

    cargarProspectos();

  }, []);

  const cargarProspectos = async () => {

    const { data, error } = await supabase
      .from("prospectos")
      .select("*")
      .order("id", { ascending: false });

    if (!error && data) {

      setProspectos(data);

    }

  };

  return (

    <div className="min-h-screen bg-black text-white p-6">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-3xl font-bold text-emerald-400 mb-6">
          Prospectos CONFIMEX
        </h1>

        <div className="overflow-auto rounded-2xl border border-white/10">

          <table className="w-full text-sm">

            <thead className="bg-zinc-900">

              <tr>

                <th className="p-4 text-left">
                  Nombre
                </th>

                <th className="p-4 text-left">
                  Empresa
                </th>

                <th className="p-4 text-left">
                  WhatsApp
                </th>

                <th className="p-4 text-left">
                  Diagnóstico
                </th>

                <th className="p-4 text-left">
                  Fecha
                </th>

              </tr>

            </thead>

            <tbody>

              {prospectos.map((p) => (

                <tr
                  key={p.id}
                  className="border-t border-white/5 hover:bg-white/5"
                >

                  <td className="p-4">
                    {p.nombre}
                  </td>

                  <td className="p-4">
                    {p.empresa}
                  </td>

                  <td className="p-4">
                    {p.telefono}
                  </td>

                  <td className="p-4">
                    {p.diagnostico}
                  </td>

                  <td className="p-4">
                    {new Date(p.created_at)
                      .toLocaleDateString()}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );

}

