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
      className="pt-10 pb-20 bg-white"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="font-display text-2xl md:text-3xl font-medium text-purple mb-2">
            Inscreva-se na nossa newsletter
          </h2>
          <p className="text-base text-gray-600 font-light">
            Receba novidades e conteúdos para crescer na fé
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-4xl mx-auto flex flex-col md:flex-row gap-3 items-center justify-center"
        >
          <div className="w-full flex flex-row gap-3 mb-3 md:mb-0">
            <input
              type="text"
              name="nome"
              placeholder="Nome"
              value={form.nome}
              onChange={handleChange}
              required
              className="flex-1 min-w-[120px] px-4 py-3 border-b border-gray-300 focus:border-purple focus:outline-none bg-transparent text-gray-800 placeholder-gray-400"
            />
            <input
              type="text"
              name="sobrenome"
              placeholder="Sobrenome"
              value={form.sobrenome}
              onChange={handleChange}
              required
              className="flex-1 min-w-[120px] px-4 py-3 border-b border-gray-300 focus:border-purple focus:outline-none bg-transparent text-gray-800 placeholder-gray-400"
            />
          </div>
          <div className="w-full flex flex-row gap-3 mb-3 md:mb-0">
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              value={form.email}
              onChange={handleChange}
              required
              className="flex-1 min-w-[180px] px-4 py-3 border-b border-gray-300 focus:border-purple focus:outline-none bg-transparent text-gray-800 placeholder-gray-400"
            />
          </div>
          <button
            type="submit"
            className="w-full md:w-auto px-8 py-3 bg-purple text-white font-display font-medium text-base tracking-wide hover:bg-purple/90 transition-colors"
            disabled={submitted}
          >
            {submitted ? "Enviado" : "Assinar"}
          </button>
        </form>
        {submitted && (
          <motion.div
            className="text-center mt-6 text-purple text-sm font-light"
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