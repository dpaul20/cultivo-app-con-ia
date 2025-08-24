import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { cultivo, mes, tipo, ubicacion } = await req.json();
  // Mock: solo para Tomate y Córdoba, Argentina
  if (
    cultivo?.toLowerCase() === "tomate" &&
    mes?.toLowerCase() === "agosto" &&
    tipo === "suelo" &&
    ubicacion?.toLowerCase().includes("córdoba") &&
    ubicacion?.toLowerCase().includes("argentina")
  ) {
    return NextResponse.json({
      "cultivo": "Tomate",
      "fechaSiembra": "Agosto 2025",
      "tiempoDesdeSiembra": "4 a 5 meses",
      "senalesCosecha": "frutos rojos firmes, fáciles de desprender",
      "mesesEsperados": "Diciembre 2025 - Enero 2026"
    });
  }
  // Mock genérico
  return NextResponse.json({
    "cultivo": cultivo,
    "fechaSiembra": `${mes} 2025`,
    "tiempoDesdeSiembra": tipo === "maceta" ? "3 a 4 meses" : "4 a 5 meses",
    "senalesCosecha": "Consultar señales específicas según el cultivo",
    "mesesEsperados": "Consultar meses recomendados según el cultivo y región"
  });
}
