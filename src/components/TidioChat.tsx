import { useEffect } from "react";

export default function TidioChat() {

  useEffect(() => {

    const style =
      document.createElement("style");

    style.innerHTML = `

      iframe[src*="tidio"] {

        z-index: 1 !important;

      }

      #tidio-chat,
      #tidio-chat-iframe {

        z-index: 1 !important;

      }

    `;

    document.head.appendChild(style);

    const script =
      document.createElement("script");

    script.src =
      "https://code.tidio.co/6qh4w3yydrz5z3yyzmmdbehfvw0j6pa7.js";

    script.async = true;

    document.body.appendChild(script);

  }, []);

  return null;

}