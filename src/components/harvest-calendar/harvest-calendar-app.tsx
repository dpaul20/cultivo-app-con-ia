"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";

export default function HarvestCalendarApp() {
  const t = useTranslations("harvestCalendar");
  const [form, setForm] = useState({
    cultivo: "",
    mes: "",
    tipo: "suelo",
  });
  const [ubicacion, setUbicacion] = useState<string>("");
  const [resultado, setResultado] = useState<Record<
    string,
    string | number | null
  > | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Obtener ubicación del dispositivo
  const obtenerUbicacion = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await res.json();
          const city =
            data.address.city ||
            data.address.town ||
            data.address.village ||
            "";
          const state = data.address.state || "";
          const country = data.address.country || "";
          setUbicacion(
            `${city}${city ? ", " : ""}${state}${state ? ", " : ""}${country}`
          );
        } catch {
          setUbicacion("");
        }
      },
      () => setUbicacion("")
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResultado(null);
    try {
      const res = await fetch("/api/calendario-cosecha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, ubicacion }),
      });
      if (!res.ok) throw new Error("Error al obtener datos");
      const data = await res.json();
      setResultado(data);
    } catch {
      setError("No se pudo generar el calendario. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  const months = [
    t("january"),
    t("february"),
    t("march"),
    t("april"),
    t("may"),
    t("june"),
    t("july"),
    t("august"),
    t("september"),
    t("october"),
    t("november"),
    t("december"),
  ];
  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{t("approxTitle")}</h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white rounded shadow p-4"
      >
        <div>
          <label htmlFor="cultivo" className="block mb-1 font-medium">
            {t("crop")}
          </label>
          <input
            id="cultivo"
            className="w-full border rounded px-2 py-1"
            required
            value={form.cultivo}
            onChange={(e) =>
              setForm((f) => ({ ...f, cultivo: e.target.value }))
            }
            placeholder={t("cropPlaceholder")}
          />
        </div>
        <div>
          <label htmlFor="mes" className="block mb-1 font-medium">
            {t("sowingMonth")}
          </label>
          <select
            id="mes"
            className="w-full border rounded px-2 py-1"
            required
            value={form.mes}
            onChange={(e) => setForm((f) => ({ ...f, mes: e.target.value }))}
          >
            <option value="">{t("selectMonth")}</option>
            {months.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="tipo" className="block mb-1 font-medium">
            {t("sowingType")}
          </label>
          <select
            id="tipo"
            className="w-full border rounded px-2 py-1"
            required
            value={form.tipo}
            onChange={(e) => setForm((f) => ({ ...f, tipo: e.target.value }))}
          >
            <option value="suelo">{t("soil")}</option>
            <option value="maceta">{t("pot")}</option>
          </select>
        </div>
        <div>
          <label htmlFor="ubicacion" className="block mb-1 font-medium">
            {t("location")}
          </label>
          <div className="flex gap-2">
            <input
              id="ubicacion"
              className="w-full border rounded px-2 py-1"
              value={ubicacion}
              readOnly
              placeholder={t("detectingLocation")}
            />
            <button
              type="button"
              className="bg-blue-500 text-white px-2 py-1 rounded"
              onClick={obtenerUbicacion}
            >
              {t("detect")}
            </button>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded font-semibold"
          disabled={loading}
        >
          {loading ? t("generating") : t("generateCalendar")}
        </button>
      </form>
      {error && <div className="text-red-600 mt-4">{t("error")}</div>}
      {resultado && (
        <div className="mt-6">
          <h2 className="text-lg font-bold mb-2">{t("result")}</h2>
          <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
            {JSON.stringify(resultado, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
