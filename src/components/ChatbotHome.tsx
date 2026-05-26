import { useEffect } from "react";

export default function ChatbotHome() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//code.tidio.co/TU_ID.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
}