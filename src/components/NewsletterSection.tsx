import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function NewsletterSection() {
  const [form, setForm] = useState({ nome: "", sobrenome: "", email: "" });
  const [submitted, setSubmitted] = useState(false);
  const [modal, setModal] = useState<{ type: "success" | "error"; message: string } | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const payload = {
        data: {
          Nome: form.nome,
          Sobrenome: form.sobrenome,
          "E-mail": form.email
        }
      };
      console.log("Enviando para SheetDB:", payload);
      const res = await fetch("https://sheetdb.io/api/v1/s4esy47ja2sdj", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
      console.log("Status da resposta:", res.status);
      const text = await res.text();
      console.log("Resposta do SheetDB:", text);
      if (res.ok) {
        setSubmitted(true);
        setModal({ type: "success", message: "Inscrição enviada com sucesso!" });
      } else {
        setModal({ type: "error", message: `Erro ao enviar. Status: ${res.status}. Resposta: ${text}` });
      }
    } catch (err) {
      console.error("Erro no envio para SheetDB:", err);
      setModal({ type: "error", message: "Erro ao enviar. Tente novamente mais tarde." });
    }
  }

  return (
    <section
      id="newsletter-section"
      className="pt-20 pb-20 bg-beige/70 rounded-t-[0rem] relative"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="font-display text-2xl md:text-3xl font-medium text-purple mb-2">
            Inscreva-se na nossa newsletter
          </h2>
          <p className="text-base text-foreground font-modern font-light">
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
              className="flex-1 min-w-[120px] px-4 py-3 border-b border-purple focus:border-purple focus:outline-none bg-transparent text-foreground placeholder-purple"
              disabled={submitted}
            />
            <input
              type="text"
              name="sobrenome"
              placeholder="Sobrenome"
              value={form.sobrenome}
              onChange={handleChange}
              required
              className="flex-1 min-w-[120px] px-4 py-3 border-b border-purple focus:border-purple focus:outline-none bg-transparent text-foreground placeholder-purple"
              disabled={submitted}
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
              className="flex-1 min-w-[180px] px-4 py-3 border-b border-purple focus:border-purple focus:outline-none bg-transparent text-foreground placeholder-purple"
              disabled={submitted}
            />
          </div>
          <button
            type="submit"
            className={`w-full md:w-auto px-8 py-3 font-display font-medium text-base tracking-wide transition-colors flex items-center justify-center ${submitted ? "bg-beige text-purple" : "bg-purple text-white hover:bg-purple/90"}`}
            disabled={submitted}
            style={submitted ? { border: "2px solid var(--beige)" } : {}}
          >
            {submitted ? (
              <motion.span
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-2"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="12" fill="var(--beige)" />
                  <path d="M7 12.5L11 16L17 9.5" stroke="#6B3FA0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Enviado
              </motion.span>
            ) : "Assinar"}
          </button>
        </form>
        {/* Modal removido conforme solicitado */}
      </div>
    </section>
  );
}