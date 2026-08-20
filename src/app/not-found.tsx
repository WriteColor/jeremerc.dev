"use client";

import React from "react";
import Link from "next/link";
import { MoveLeft, AlertOctagon } from "lucide-react";
import ShapeGridBackground from "@/components/backgrounds/ShapeGridBackground";

export default function NotFound() {
  return (
    <main className="relative min-h-screen p-4 sm:p-8 flex flex-col items-center justify-center bg-(--c-bg) text-(--c-text) overflow-hidden">
      {/* Background ShapeGrid (High-Performance Canvas 2D) */}
      <div className="fixed inset-0 z-0 pointer-events-none select-none">
        <ShapeGridBackground />
      </div>
      <div className="max-w-md w-full text-center space-y-6 sm:space-y-8 z-10">

        {/* Error icon */}
        <div className="inline-flex p-3 sm:p-4 border-4 border-black bg-neo-pink text-black shadow-[4px_4px_0px_0px_rgba(var(--c-shadow),1)]">
          <AlertOctagon size={32} className="stroke-[2.5]" />
        </div>

        {/* Neobrutalist Title */}
        <div className="flex justify-center my-4">
          <div className="inline-block bg-[#F5F4F0] text-black border-4 border-black px-6 py-2 -rotate-3 shadow-[6px_6px_0px_0px_rgba(var(--c-shadow),1)] font-display font-black text-6xl sm:text-7xl uppercase tracking-wider">
            404
          </div>
        </div>

        {/* Text Details */}
        <div className="space-y-2 px-4">
          <h1 className="font-display font-black text-xl sm:text-2xl uppercase tracking-tight">
            Archivo no encontrado
          </h1>
          <p className="font-mono text-xs text-(--c-text-muted) font-bold">
            ERROR_CODE: PAGE_NOT_FOUND_404
          </p>
          <p className="font-sans text-xs sm:text-sm font-semibold text-(--c-text-muted) leading-relaxed pt-2">
            La ruta solicitada no corresponde a ningún archivo en el portafolio. Puede haber sido movida, borrada o ingresada incorrectamente en la terminal.
          </p>
        </div>

        {/* Back Button */}
        <div>
          <Link
            href="/"
            className="neo-btn bg-(--c-surface) text-(--c-text) border-(--c-border) shadow-[4px_4px_0px_0px_rgba(var(--c-shadow),1)] hover:shadow-[6px_6px_0px_0px_rgba(var(--c-shadow),1)] px-5 py-2.5 text-xs font-bold uppercase inline-flex items-center gap-2 cursor-pointer transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5"
          >
            <MoveLeft size={16} /> Volver al Inicio
          </Link>
        </div>

      </div>
    </main>
  );
}
