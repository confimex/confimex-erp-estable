import asistenteImg from "@/assets/asistente-corto.png";
export default function ConfimexChatButton() {

 const abrirChat = () => {

  const tidio =
    (window as any).tidioChatApi;

  if (tidio) {

const botonTidio =
  document.querySelector(
    'iframe[src*="tidio"]'
  ) as HTMLElement;

if (botonTidio) {

  botonTidio.click();

}

  } else {

    alert(
      "El chat aún está cargando..."
    );

  }

};

  return (

    <button
      onClick={abrirChat}
      className="fixed bottom-28 right-6 z-[999999] flex items-center gap-3 rounded-full bg-emerald-500 px-5 py-4 shadow-2xl transition hover:scale-105 hover:bg-emerald-400"
    >

      <img
      src={asistenteImg}
      alt="Asistencia CONFIMEX"
      className="h-12 w-12 rounded-full object-cover"
      />

     <div className="flex flex-col items-center justify-center text-center">

        <p className="text-xs font-medium text-black/70">
          Después del diagnóstico
        </p>

        <p className="text-sm font-black text-black">
          Resuelve este sencillo TEST
        </p>

        <p className="text-sm font-black text-black">
          oprime el botón azúl
        </p>

 <p className="text-xs font-medium text-black/70">
          Y sabrás exactamente en donde tienes el problema
        </p>
      </div>

    </button>

  );

}