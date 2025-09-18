import { motion } from "framer-motion";

export function OriginSection() {
  return (
  <section id="origin-section" className="py-24 pb-0 relative overflow-hidden bg-white">
      <div className="container mx-auto px-6 relative z-20">
        {/* Título central */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif text-primary font-bold mb-6">
            De onde vem o nome{' '}
            <span className="text-purple font-bold">Anglo?</span>
          </h2>
          <motion.div
            className="w-32 h-1 bg-purple rounded-full mx-auto mt-8"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.6, ease: 'easeOut' }}
          />
        </motion.div>

        <div className="max-w-4xl mx-auto">

          {/* Conteúdo em duas colunas simples */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Coluna 1 - Origem do Nome */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <h3 className="text-3xl font-serif text-primary font-semibold mb-6">
                Tradição Anglo
              </h3>
              <p className="text-gray-700 leading-relaxed text-lg mb-4">
                O nome <span className="font-bold text-purple">"Anglo"</span> representa as denominações nascidas da Igreja da Inglaterra, buscando equilíbrio e convergência na fé cristã.
              </p>
              <p className="text-gray-700 leading-relaxed text-lg">
                Uma tradição que integra diferentes dimensões da espiritualidade: carismática, reformada e litúrgica, acolhendo vozes complementares.
              </p>
            </motion.div>

            {/* Coluna 2 - Identidade Visual */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <h3 className="text-3xl font-serif text-primary font-semibold mb-6">
                Nosso Vitral
              </h3>
              <p className="text-gray-700 leading-relaxed text-lg mb-4">
                A identidade visual resgata a tradição da Igreja Inglesa. O vitral em forma de "A" simboliza a espiritualidade das igrejas medievais.
              </p>
              <p className="text-gray-700 leading-relaxed text-lg">
                Conectando-nos à realeza inglesa e à arquitetura sagrada antiga, criando um símbolo memorável e significativo.
              </p>
            </motion.div>
          </div>

          {/* Texto de convergência */}
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <p className="text-4xl text-primary leading-relaxed font-serif italic">
              "Assim, <span className="font-bold text-purple">Anglo</span> não é apenas uma referência histórica, mas um símbolo de unidade possível dentro da diversidade cristã."
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}