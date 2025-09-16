export function MissionSection() {
  return (
    <section 
      id="mission-section"
      className="min-h-[110vh] relative overflow-hidden bg-center bg-cover flex items-start justify-center pt-20"
      style={{
        backgroundImage: `url(/nossa-missao.jpg)`
      }}
    >
      {/* Overlay branco semi-transparente */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/80 to-white/90"></div>
      {/* Overlay branco extra na base */}
      <div className="absolute left-0 right-0 bottom-0 h-[20vh] bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-8xl mx-auto text-center">
          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-thin text-purple mt-20 mb-8 leading-tight" style={{ fontFamily: 'Metamorphous, serif', letterSpacing: '-0.02em', lineHeight: '1.05' }}>
            <span className="block leading-tight">Uma Voz de</span>
            <span className="block leading-tight">Convergência</span>
            <span className="block leading-tight">no Cenário Cristão</span>
          </h1>
          {/* Subtitles/Paragraphs */}
          <div className="space-y-3 text-base md:text-lg text-purple max-w-3xl mx-auto font-normal">
            <div className="text-center mx-auto px-8 md:px-20 lg:px-32" style={{ fontFamily: 'Cormorant Infant, serif', lineHeight: '1.6' }}>
              A Editora Anglo surge como uma ponte entre a rica tradição cristã e as necessidades espirituais contemporâneas, promovendo a unidade na diversidade através da publicação de conteúdos que nutrem a alma e fortalecem a fé.
            </div>
            <div className="text-center mx-auto px-8 md:px-20 lg:px-32" style={{ fontFamily: 'Cormorant Infant, serif', lineHeight: '1.6' }}>
              Nosso compromisso é com a formação teológica sólida e a espiritualidade autêntica, oferecendo obras que dialogam com diferentes tradições cristãs enquanto permanecem fiéis à Palavra de Deus.
            </div>
            <div className="text-center mx-auto px-8 md:px-20 lg:px-32" style={{ fontFamily: 'Cormorant Infant, serif', lineHeight: '1.6' }}>
              Acreditamos que a convergência cristã não diminui a riqueza das tradições, mas sim as celebra em sua diversidade, encontrando na unidade do Espírito a base para uma fé mais profunda e transformadora.
            </div>
          </div>
          
          {/* Venn Diagram */}
          <div className="mt-20 mb-24 flex justify-center">
            <svg
              width="150"
              height="120"
              viewBox="0 0 150 120"
              className="text-purple"
            >
              {/* Three interlocking circles */}
              <circle
                cx="75"
                cy="40"
                r="30"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
              <circle
                cx="55"
                cy="75"
                r="30"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
              <circle
                cx="95"
                cy="75"
                r="30"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}