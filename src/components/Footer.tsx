import { Button } from "@/components/ui/button";
import { useState } from 'react';
import { Separator } from "@/components/ui/separator";
import { 
  FacebookLogo, 
  InstagramLogo, 
  YoutubeLogo, 
  TwitterLogo, 
  LinkedinLogo,
  Envelope, 
  Phone, 
  MapPin,
  X,
  BookOpen,
  Users,
  Heart
} from "phosphor-react";

const footerLinks = {
  products: [
    "Teologia",
    "Espiritualidade", 
    "Estudos Bíblicos",
    "Vida Cristã",
    "Oração & Liturgia",
    "Formação"
  ],
  company: [
    "Sobre Nós",
    "Nossa Missão",
    "Autores",
    "Contato",
    "Trabalhe Conosco",
    "Imprensa"
  ],
  support: [
    "Central de Ajuda",
    "Política de Privacidade",
    "Termos de Uso", 
    "Política de Entrega",
    "Trocas e Devoluções",
    "FAQ"
  ],
  community: [
    "Blog",
    "Newsletter",
    "Eventos",
    "Grupos de Estudo",
    "Parcerias",
    "Testemunhos"
  ]
};

const socialLinks = [
  { icon: InstagramLogo, href: "#", label: "Instagram" }, 
  { icon: LinkedinLogo, href: "#", label: "LinkedIn" },
];

const contactInfo = [
  { icon: Envelope, text: "editoraanglo@gmail.com" },
  { icon: Phone, text: "(81) 9973-3520" },
  { icon: MapPin, text: "Recife, PE - Brasil" }
];

export function Footer() {
  const [openProducts, setOpenProducts] = useState(false);
  const [openCompany, setOpenCompany] = useState(false);
  const [openSupport, setOpenSupport] = useState(false);
  const [openCommunity, setOpenCommunity] = useState(false);
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
          <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <img
                  src="/logo_com_nome_bege.png"
                  alt="Logo Editora Anglo"
                  className="w-48 h-auto object-contain mb-6"
                />
              </div>
              
              {/* Contact Info */}
              <div className="space-y-3">
                {contactInfo.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div key={index} className="flex items-center gap-3">
                      <Icon className="w-4 h-4 text-beige" />
                      <span className="text-sm text-primary-foreground/80">{item.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Links Sections - desktop shows columns, mobile shows accordions */}
            <div className="hidden md:block">
              <h4 className="font-serif font-semibold mb-4 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-beige" />
                Produtos
              </h4>
              <ul className="space-y-2">
                {footerLinks.products.map((link) => (
                  <li key={link}>
                    <a 
                      href="#" 
                      className="text-sm text-primary-foreground/70 hover:text-beige transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="hidden md:block">
              <h4 className="font-serif font-semibold mb-4 flex items-center gap-2">
                <Heart className="w-4 h-4 text-beige" />
                Empresa
              </h4>
              <ul className="space-y-2">
                {footerLinks.company.map((link) => (
                  <li key={link}>
                    <a 
                      href="#" 
                      className="text-sm text-primary-foreground/70 hover:text-beige transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="hidden md:block">
              <h4 className="font-serif font-semibold mb-4 flex items-center gap-2">
                <Users className="w-4 h-4 text-beige" />
                Suporte
              </h4>
              <ul className="space-y-2">
                {footerLinks.support.map((link) => (
                  <li key={link}>
                    <a 
                      href="#" 
                      className="text-sm text-primary-foreground/70 hover:text-beige transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="hidden md:block">
              <h4 className="font-serif font-semibold mb-4 flex items-center gap-2">
                <X className="w-4 h-4 text-beige" />
                Comunidade
              </h4>
              <ul className="space-y-2">
                {footerLinks.community.map((link) => (
                  <li key={link}>
                    <a 
                      href="#" 
                      className="text-sm text-primary-foreground/70 hover:text-beige transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mobile accordions: 4 grouped buttons that expand to show links */}
            <div className="md:hidden">
              <button className="w-full text-left py-3" onClick={() => setOpenProducts(v => !v)}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2"><BookOpen className="w-5 h-5 text-beige"/> <span className="font-semibold">Produtos</span></div>
                  <span>{openProducts ? '-' : '+'}</span>
                </div>
              </button>
              {openProducts && (
                <ul className="pl-4 space-y-2 pb-3">
                  {footerLinks.products.map(link => (
                    <li key={link}><a href="#" className="text-sm text-primary-foreground/70 block py-1">{link}</a></li>
                  ))}
                </ul>
              )}

              <button className="w-full text-left py-3" onClick={() => setOpenCompany(v => !v)}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2"><Heart className="w-5 h-5 text-beige"/> <span className="font-semibold">Empresa</span></div>
                  <span>{openCompany ? '-' : '+'}</span>
                </div>
              </button>
              {openCompany && (
                <ul className="pl-4 space-y-2 pb-3">
                  {footerLinks.company.map(link => (
                    <li key={link}><a href="#" className="text-sm text-primary-foreground/70 block py-1">{link}</a></li>
                  ))}
                </ul>
              )}

              <button className="w-full text-left py-3" onClick={() => setOpenSupport(v => !v)}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2"><Users className="w-5 h-5 text-beige"/> <span className="font-semibold">Suporte</span></div>
                  <span>{openSupport ? '-' : '+'}</span>
                </div>
              </button>
              {openSupport && (
                <ul className="pl-4 space-y-2 pb-3">
                  {footerLinks.support.map(link => (
                    <li key={link}><a href="#" className="text-sm text-primary-foreground/70 block py-1">{link}</a></li>
                  ))}
                </ul>
              )}

              <button className="w-full text-left py-3" onClick={() => setOpenCommunity(v => !v)}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2"><X className="w-5 h-5 text-beige"/> <span className="font-semibold">Comunidade</span></div>
                  <span>{openCommunity ? '-' : '+'}</span>
                </div>
              </button>
              {openCommunity && (
                <ul className="pl-4 space-y-2 pb-3">
                  {footerLinks.community.map(link => (
                    <li key={link}><a href="#" className="text-sm text-primary-foreground/70 block py-1">{link}</a></li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
        
        <Separator className="bg-primary-foreground/20" />
        
        {/* Bottom Footer */}
        <div className="py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <div className="text-center md:text-left">
              <p className="text-sm text-primary-foreground/70">
                © 2025 Editora Anglo. Todos os direitos reservados.
              </p>
            </div>
            
            {/* Social Links */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-primary-foreground/70 mr-2">Siga-nos:</span>
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <Button
                    key={index}
                    variant="ghost"
                    size="icon"
                    className="text-primary-foreground/70 hover:text-beige hover:bg-primary-foreground/10"
                    asChild
                  >
                    <a href={social.href} aria-label={social.label}>
                      <Icon className="w-4 h-4" />
                    </a>
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}