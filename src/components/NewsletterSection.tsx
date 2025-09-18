import { motion } from "framer-motion";
import { useState } from "react";

export function NewsletterSection() {
  const [form, setForm] = useState({ nome: "", sobrenome: "", email: "" });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    // Aqui você pode adicionar lógica de envio para backend ou serviço de newsletter
  }

  return (
    <section
      id="newsletter-section"
      className="py-24 bg-white"
    >
      <div className="container mx-auto px-4">
        <div
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-medium text-purple mb-3">
            Entre em contato
          </h2>
          <p className="text-base text-gray-600 w-full md:max-w-lg mx-auto font-light">
            Receba novidades e conteúdos para crescer na fé
          </p>
  </div>
        <form
          onSubmit={handleSubmit}
          className="w-full md:max-w-md mx-auto flex flex-col gap-4"
        >
          <div className="flex gap-3">
            <input
              type="text"
              name="nome"
              placeholder="Nome"
              value={form.nome}
              onChange={handleChange}
              required
              className="flex-1 px-3 py-2 border-b border-gray-300 focus:border-purple focus:outline-none bg-transparent text-gray-800 placeholder-gray-400"
            />
            <input
              type="text"
              name="sobrenome"
              placeholder="Sobrenome"
              value={form.sobrenome}
              onChange={handleChange}
              required
              className="flex-1 px-3 py-2 border-b border-gray-300 focus:border-purple focus:outline-none bg-transparent text-gray-800 placeholder-gray-400"
            />
          </div>
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            value={form.email}
            onChange={handleChange}
            required
            className="px-3 py-2 border-b border-gray-300 focus:border-purple focus:outline-none bg-transparent text-gray-800 placeholder-gray-400"
          />
          <button
            type="submit"
            className="mt-6 px-8 py-2 bg-purple text-white font-normal text-sm tracking-wide hover:bg-purple/90 transition-colors"
            disabled={submitted}
          >
            {submitted ? "Enviado" : "Enviar"}
          </button>
  </form>
        {submitted && (
          <motion.div
            className="text-center mt-8 text-purple text-sm font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Obrigado por se inscrever!
          </motion.div>
        )}
      </div>
  </section>
  );
}