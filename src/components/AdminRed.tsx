import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export default function AdminRed() {

  const [data, setData] = useState<any[]>([]);

  useEffect(() => {

    const cargarRed = async () => {

      const { data } = await supabase
        .from("red_confimex")
        .select("*")
        .order("created_at", {
          ascending: false,
        });

      if (data) {

        setData(data);

      }

    };

    cargarRed();

  }, []);

  return (

    <div className="space-y-4">

      <h2 className="text-xl font-bold text-emerald-400">
        Registros en Red Confimex
      </h2>

      <div className="overflow-x-auto">

        <table className="w-full border-collapse text-left">

          <thead>

            <tr className="border-b border-white/10 text-zinc-400">

              <th className="p-3">
                Empresa
              </th>

              <th className="p-3">
                Categoría
              </th>

              <th className="p-3">
                WhatsApp
              </th>

            </tr>

          </thead>

          <tbody>

            {data.map((item) => (

              <tr
                key={item.id}
                className="border-b border-white/5 hover:bg-white/5"
              >

                <td className="p-3">
                  {item.nombre}
                </td>

                <td className="p-3">
                  {item.categoria}
                </td>

                <td className="p-3">
                  {item.whatsapp}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}