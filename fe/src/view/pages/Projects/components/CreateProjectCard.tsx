"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import Logo from "@/assets/images/iconInova.png";

interface CreateProjectCardProps {
  onClick?: () => void;
}

export function CreateProjectCard({ onClick }: CreateProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <Card
        className="h-[320px] flex flex-col items-center justify-center cursor-pointer border-dashed border-2 border-primary/20 bg-primary/5 hover:bg-primary/10 hover:border-primary/30 transition-all group relative overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
      >
        <CardContent className="flex flex-col items-center justify-center h-full w-full p-6 text-center">
          {/* Círculo de fundo animado */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-40 h-40 rounded-full bg-primary/10 opacity-70 transition-transform duration-500 group-hover:scale-150" />
          </div>

          {/* Ícones flutuantes */}
          <div className="relative w-full h-full">
            <motion.div
              className="absolute"
              initial={{ x: "10%", y: "20%", opacity: 0.7 }}
              animate={{
                x: isHovered ? "15%" : "10%",
                y: isHovered ? "15%" : "20%",
                opacity: isHovered ? 1 : 0.7,
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            >
              <img
                src={Logo}
                alt="Logo"
                className="h-12 w-12 text-yellow-500 opacity-80"
              />
            </motion.div>
          </div>

          {/* Conteúdo principal */}
          <div className="relative z-10 flex flex-col items-center space-y-4">
            <div className="rounded-full bg-primary p-3 text-primary-foreground shadow-lg group-hover:scale-110 transition-transform">
              <Plus className="h-8 w-8" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-primary">
                Criar Novo Projeto
              </h3>
              <p className="text-muted-foreground max-w-[200px]">
                Transforme suas ideias em realidade. Comece um novo projeto
                agora!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
