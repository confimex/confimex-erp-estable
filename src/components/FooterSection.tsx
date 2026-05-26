import logo from "@/assets/logo_confimex.png";

export default function FooterSection() {
  return (
    <footer className="border-t border-border bg-navy py-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div>
            <img src={logo} alt="CONFIMÉX" className="h-32" />
            <p className="mt-1 text-sm text-navy-foreground/50">
              Patronaje digital para talleres de confección · CDMX
            </p>
          </div>
          <div className="flex items-center gap-6 text-sm text-navy-foreground/50">
            <a href="mailto:ventas@confimex.mx" className="transition hover:text-brand">
              ventas@confimex.mx
            </a>
            <a
              href="https://wa.me/525512895572"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-brand"
            >
              WhatsApp
            </a>
          </div>
        </div>
        <p className="mt-8 text-center text-xs text-navy-foreground/30">
          © {new Date().getFullYear()} CONFIMÉX. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
