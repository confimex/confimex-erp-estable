import { createFileRoute } from "@tanstack/react-router";
import ERP from "../pages/erp";

export const Route = createFileRoute("/erp")({
  component: ERP,
});