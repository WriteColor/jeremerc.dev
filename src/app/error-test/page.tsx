"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MoveLeft, AlertTriangle, ShieldAlert, WifiOff, RefreshCw, Cpu, AlertCircle } from "lucide-react";
import ShapeGridBackground from "@/components/backgrounds/ShapeGridBackground";


type ErrorCodeType = "403" | "500" | "CONN" | "CLIENT" | "UNEXPECTED";

export default function ErrorTestPage() {
  const [activeError, setActiveError] = useState<ErrorCodeType>("500");

  const errorSpecs: Record<ErrorCodeType, {
    title: string;
    codeStr: string;
    codeNum: string;
    color: string;
    icon: React.ReactNode;
    description: string;
  }> = {
    "403": {
      title: "Acceso Prohibido",
      codeNum: "403",
      codeStr: "ACCESS_DENIED_FORBIDDEN",
      color: "text-neo-yellow",
      icon: <ShieldAlert size={32} className="stroke-[2.5]" />,
      description: "No tienes los permisos necesarios para acceder a este directorio del servidor local. La terminal bloqueó la petición de entrada."
    },
    "500": {
      title: "Error del Servidor",
      codeNum: "500",
      codeStr: "CRITICAL_SYSTEM_FAILURE_500",
      color: "text-neo-pink",
      icon: <AlertCircle size={32} className="stroke-[2.5]" />,
      description: "Ocurrió una excepción inesperada durante el renderizado de la interfaz. Esto puede deberse a un conflicto de dependencias o un error de datos."
    },
    "CONN": {
      title: "Fallo de Conexión",
      codeNum: "ERR",
      codeStr: "ERR_CONNECTION_REFUSED",
      color: "text-neo-orange",
      icon: <WifiOff size={32} className="stroke-[2.5]" />,
      description: "No se pudo establecer conexión con el puerto local 3000. Revisa si el servidor de desarrollo está activo o si hay un cortafuegos activo."
    },
    "CLIENT": {
      title: "Fallo del Cliente",
      codeNum: "500",
      codeStr: "CLIENT_SIDE_RUNTIME_CRASH",
      color: "text-neo-pink",
      icon: <Cpu size={32} className="stroke-[2.5]" />,
      description: "Se detectó un fallo crítico en el hilo de renderizado del navegador (Client-side crash). Un hook de React falló al intentar rehidratar el estado."
    },
    "UNEXPECTED": {
      title: "Error Inesperado",
      codeNum: "ERR",
      codeStr: "SYSTEM_UNEXPECTED_ABORT_1",
      color: "text-neo-cyan",
      icon: <AlertTriangle size={32} className="stroke-[2.5]" />,
      description: "La ejecución del programa se interrumpió debido a una condición inesperada. Los registros del sistema se han volcado a la terminal local."
    }
  };

  const current = errorSpecs[activeError];

  return (
    <main className="relative min-h-screen p-4 sm:p-8 flex flex-col items-center justify-center bg-(--c-bg) text-(--c-text) overflow-hidden">
      {/* Background ShapeGrid (High-Performance Canvas 2D) */}
      <div className="fixed inset-0 z-0 pointer-events-none select-none">
        <ShapeGridBackground />
      </div>

      {/* Switch Tabs at the top */}
      <div className="absolute top-4 left-4 right-4 sm:top-6 sm:left-6 sm:right-6 z-20 flex flex-col sm:flex-row justify-between items-center gap-3">
        <div className="flex items-center gap-1.5 font-mono text-[10px] sm:text-xs font-bold text-zinc-400">
          <RefreshCw className="animate-spin" size={12} /> simulador_paginas_error.sh
        </div>
        <div className="flex flex-wrap gap-1.5 justify-center">
          {(Object.keys(errorSpecs) as ErrorCodeType[]).map((code) => (
            <button
              key={code}
              onClick={() => setActiveError(code)}
              className={`px-3 py-1 border-2 font-mono text-[10px] sm:text-xs font-bold uppercase transition-all duration-150 cursor-pointer ${activeError === code
                  ? "bg-(--c-text) text-(--c-bg) border-(--c-border) shadow-[1px_1px_0px_0px_rgba(var(--c-shadow),1)]"
                  : "bg-(--c-surface) text-(--c-text) border-(--c-border) shadow-[2px_2px_0px_0px_rgba(var(--c-shadow),0.2)] hover:border-(--c-border)"
                }`}
            >
              {code}
            </button>
          ))}
        </div>
      </div>

      {/* Centered Content */}
      <div className="max-w-md w-full text-center space-y-6 sm:space-y-8 z-10 pt-20 sm:pt-0">

        {/* Error icon */}
        <div className="inline-flex p-3 sm:p-4 border-4 border-black bg-neo-yellow text-black shadow-[4px_4px_0px_0px_rgba(var(--c-shadow),1)]">
          {current.icon}
        </div>

        {/* Neobrutalist Title */}
        <div className="flex justify-center my-4">
          <div className="inline-block bg-[#F5F4F0] text-black border-4 border-black px-6 py-2 -rotate-3 shadow-[6px_6px_0px_0px_rgba(var(--c-shadow),1)] font-display font-black text-5xl sm:text-6xl uppercase tracking-wider">
            {current.codeNum}
          </div>
        </div>

        {/* Text Details */}
        <div className="space-y-2 px-4">
          <h1 className="font-display font-black text-xl sm:text-2xl uppercase tracking-tight">
            {current.title}
          </h1>
          <p className="font-mono text-xs text-(--c-text-muted) font-bold">
            ERROR_CODE: {current.codeStr}
          </p>
          <p className="font-sans text-xs sm:text-sm font-semibold text-(--c-text-muted) leading-relaxed pt-2">
            {current.description}
          </p>
        </div>

        {/* Action Button */}
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <Link
            href="/"
            className="neo-btn bg-(--c-surface) text-(--c-text) border-(--c-border) shadow-[4px_4px_0px_0px_rgba(var(--c-shadow),1)] hover:shadow-[6px_6px_0px_0px_rgba(var(--c-shadow),1)] px-5 py-2.5 text-xs font-bold uppercase inline-flex items-center gap-2 cursor-pointer transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5"
          >
            <MoveLeft size={16} /> Volver al Portafolio
          </Link>
        </div>

      </div>
    </main>
  );
}
