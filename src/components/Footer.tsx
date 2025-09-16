import { Envelope, Phone, MapPin } from "phosphor-react";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground mt-20">
      <div className="container mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* Coluna 1: Logo e descrição */}
          <div className="space-y-6">
            <img
              src="/logo_com_nome_bege.png"
              alt="Editora Anglo"
              className="w-40 h-auto"
            />
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              Editora Anglo - Tradição em literatura espiritual e formação cristã.
            </p>
          </div>

          {/* Coluna 2: Links rápidos */}
          <div className="space-y-6">
            <h3 className="text-beige font-serif text-lg font-semibold">Links Rápidos</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-primary-foreground/70 hover:text-beige transition-colors text-sm">Início</a></li>
              <li><a href="#" className="text-primary-foreground/70 hover:text-beige transition-colors text-sm">Sobre Nós</a></li>
              <li><a href="#" className="text-primary-foreground/70 hover:text-beige transition-colors text-sm">Contato</a></li>
            </ul>
          </div>

          {/* Coluna 3: Contato */}
          <div className="space-y-6">
            <h3 className="text-beige font-serif text-lg font-semibold">Contato</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <Envelope className="w-4 h-4 text-beige" />
                <p className="text-primary-foreground/70">editoraanglo@gmail.com</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-beige" />
                <p className="text-primary-foreground/70">(81) 9973-3520</p>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-beige" />
                <p className="text-primary-foreground/70">Recife, PE - Brasil</p>
              </div>
            </div>
          </div>

        </div>

        {/* Separador e copyright */}
        <div className="border-t border-primary-foreground/20 pt-8">
          <p className="text-center text-primary-foreground/60 text-sm">
            © 2025 Editora Anglo. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}