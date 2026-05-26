
CREATE TABLE public.red_confimex (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre TEXT NOT NULL,
  categoria TEXT NOT NULL,
  especialidad TEXT,
  ciudad TEXT,
  estado TEXT,
  pais TEXT DEFAULT 'México',
  telefono TEXT,
  whatsapp TEXT,
  correo TEXT,
  web TEXT,
  descripcion TEXT,
  servicios TEXT,
  logo_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.red_confimex ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Directorio público: cualquiera puede ver"
  ON public.red_confimex FOR SELECT
  USING (true);

CREATE POLICY "Cualquiera puede registrar su negocio"
  ON public.red_confimex FOR INSERT
  WITH CHECK (
    length(nombre) BETWEEN 1 AND 200
    AND length(categoria) BETWEEN 1 AND 100
    AND (correo IS NULL OR length(correo) <= 255)
    AND (telefono IS NULL OR length(telefono) <= 50)
    AND (whatsapp IS NULL OR length(whatsapp) <= 50)
    AND (descripcion IS NULL OR length(descripcion) <= 2000)
  );

CREATE INDEX idx_red_confimex_categoria ON public.red_confimex(categoria);
CREATE INDEX idx_red_confimex_ciudad ON public.red_confimex(ciudad);
CREATE INDEX idx_red_confimex_created_at ON public.red_confimex(created_at DESC);
