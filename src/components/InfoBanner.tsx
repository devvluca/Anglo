import { Truck, CreditCard, Shield, Clock } from "phosphor-react";

const InfoBanner = () => {
  const benefits = [
    { icon: Truck, text: "Envio para todo o Brasil" },
    { icon: CreditCard, text: "Parcele em até 12x sem juros" },
    { icon: Shield, text: "Compra 100% segura" },
    { icon: Clock, text: "Entrega rápida em até 7 dias" },
    { icon: Truck, text: "Frete grátis acima de R$ 99" },
    { icon: CreditCard, text: "Aceitamos PIX, cartão e boleto" },
  ];

  return (
    <div className="bg-purple text-white py-3 overflow-hidden relative">
      <div className="animate-[scroll_30s_linear_infinite] flex whitespace-nowrap">
        {/* Duplicate the content to create seamless loop */}
        {[...benefits, ...benefits].map((benefit, index) => (
          <div key={index} className="flex items-center mx-8 flex-shrink-0">
            <benefit.icon className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">{benefit.text}</span>
          </div>
        ))}
      </div>
      
    </div>
  );
};

export { InfoBanner };