import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

export function AboutSection() {
  return (
    <section 
      id="about" 
      className="pt-20 pb-2 relative overflow-hidden bg-white"
    >
      {/* Background pattern */}
      <motion.div 
        className="absolute inset-0 z-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.10 }}
        transition={{ duration: 0.5 }}
        style={{
          backgroundImage: 'url(/padronagem_aboutus.png)',
          backgroundRepeat: 'repeat',
          backgroundSize: 'auto',
        }}
      />

      {/* Gradient overlay */}
      <motion.div 
        className="absolute left-0 right-0 bottom-0 h-[20vh] bg-gradient-to-t from-white to-transparent pointer-events-none z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />

      <div className="container mx-auto px-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Logo Section */}
          <motion.div 
            className="flex justify-center lg:justify-center"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.img
              src="/logo_aboutus.png"
              alt="Logo Editora Anglo"
              className="w-56 md:w-72 lg:w-96 h-auto"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.04, y: -6 }}
              style={{ filter: 'none' }}
            />
          </motion.div>

          {/* Content Section */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Origin Title */}
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display text-primary font-light">
                De onde vem o nome <span className="text-purple font-bold">Anglo</span>?
              </h2>
              <motion.div
                className="w-40 h-1 bg-purple rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2.2, ease: 'easeOut' }}
                style={{ transformOrigin: 'left' }}
              />
            </div>

            {/* Origin Text */}
            <div className="space-y-6 text-gray-700 leading-relaxed pr-2 md:pr-8 lg:pr-24">
              <p className="text-base md:text-lg font-modern mb-2">
                Anglo não é apenas um nome. É um símbolo de unidade que acolhe múltiplas denominações sem abrir mão da verdade. É o encontro entre liturgia, carisma e tradição.
              </p>
              <p className="text-base md:text-lg font-modern">
                Nossa identidade visual nasce da história da Igreja Inglesa, onde a espiritualidade e a beleza se encontravam na luz que atravessava os vitrais medievais.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}