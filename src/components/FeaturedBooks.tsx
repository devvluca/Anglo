import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, ShoppingCart, Eye, BookOpen, Heart, Users, X } from "phosphor-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './carousel-styles.css';

const featuredBooks = [
  {
    id: 1,
    title: "Fundamentos da Fé Convergente",
    author: "Dom. Ivan Rocha",
    price: "R$ 49,90",
    originalPrice: "R$ 59,90",
    rating: 4.8,
    reviews: 124,
    icon: X,
    category: "Teologia",
    color: "purple"
  },
  {
    id: 2,
    title: "Espiritualidade e Tradição",
    author: "Irmã Lídia",
    price: "R$ 39,90", 
    originalPrice: "R$ 49,90",
    rating: 4.9,
    reviews: 89,
    icon: Heart,
    category: "Espiritualidade",
    color: "beige"
  },
  {
    id: 3,
    title: "A Palavra que Transforma",
    author: "Dom. Alexandre Ximenes",
    price: "R$ 44,90",
    originalPrice: "R$ 54,90", 
    rating: 4.7,
    reviews: 156,
    icon: BookOpen,
    category: "Bíblia",
    color: "rose"
  },
  {
    id: 4,
    title: "Unidade na Diversidade",
    author: "Taisy Lacerda",
    price: "R$ 52,90",
    originalPrice: "R$ 62,90",
    rating: 4.8,
    reviews: 98,
    icon: Users,
    category: "Teologia",
    color: "blue"
  }
];

const colorClasses = {
  purple: {
    bg: "bg-gradient-to-br from-gray-50 to-white",
    text: "text-gray-900",
    accent: "bg-gray-100",
    border: "border-gray-200",
    categoryBg: "bg-gradient-to-b from-purple/90 via-purple to-purple/95",
    categoryText: "text-white"
  },
  beige: {
    bg: "bg-gradient-to-br from-gray-50 to-white",
    text: "text-gray-900",
    accent: "bg-gray-100",
    border: "border-gray-200",
    categoryBg: "bg-gradient-to-b from-beige/90 via-beige to-beige/95",
    categoryText: "text-gray-800"
  },
  rose: {
    bg: "bg-gradient-to-br from-gray-50 to-white",
    text: "text-gray-900",
    accent: "bg-gray-100",
    border: "border-gray-200",
    categoryBg: "bg-gradient-to-b from-rose/90 via-rose to-rose/95",
    categoryText: "text-white"
  },
  blue: {
    bg: "bg-gradient-to-br from-gray-50 to-white",
    text: "text-gray-900",
    accent: "bg-gray-100",
    border: "border-gray-200",
    categoryBg: "bg-gradient-to-b from-blue/90 via-blue to-blue/95",
    categoryText: "text-white"
  }
};

export function FeaturedBooks() {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-5xl md:text-6xl font-bold text-primary mb-8 animate-fade-in">
            Livros em{" "}
            <span className="text-purple hover:text-rose transition-colors duration-500">Destaque</span>
          </h2>
          <p className="font-serif text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto font-medium opacity-0 animate-slide-up-delayed-1">
            Descubra obras que fortalecem a fé e iluminam o caminho espiritual
          </p>
        </div>
        
        {/* Books Grid - Desktop */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredBooks.map((book, index) => {
            const colors = colorClasses[book.color as keyof typeof colorClasses];
            const Icon = book.icon;
            
            return (
              <Card 
                key={book.id} 
                className={`group hover:shadow-elegant hover:scale-[1.02] transition-all duration-200 overflow-hidden border-2 ${colors.border} ${colors.bg} backdrop-blur-sm opacity-0 animate-card-fade-in cursor-pointer will-change-transform`}
                style={{ animationDelay: `${(index + 2) * 0.1}s` }}
              >
                {/* Book Cover with Icon */}
                <div className="relative h-64 flex items-center justify-center overflow-hidden">
                  {/* Background gradient */}
                  <div className={`absolute inset-0 ${colors.bg} group-hover:scale-[1.02] transition-transform duration-200`} />
                  
                  {/* Large background icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:opacity-15 transition-opacity duration-200">
                    <Icon className="w-32 h-32 text-foreground" />
                  </div>
                  
                  {/* Category badge */}
                  <div className="absolute top-4 left-4">
                    <span className={`${colors.categoryBg} ${colors.categoryText} px-3 py-1 rounded-full text-sm font-bold backdrop-blur-sm border border-white/20`}>
                      {book.category}
                    </span>
                  </div>
                  
                  {/* View button */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Button variant="secondary" size="icon" className="bg-white/90 hover:bg-white hover:scale-105 transition-all duration-200">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <h3 className="font-serif text-xl font-bold text-foreground mb-3 line-clamp-2 group-hover:text-gray-900 transition-colors duration-200">
                    {book.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 font-medium group-hover:text-foreground transition-colors duration-200">
                    {book.author}
                  </p>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < Math.floor(book.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'} group-hover:scale-105 transition-transform duration-200`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-200">
                      {book.rating} ({book.reviews})
                    </span>
                  </div>
                  
                  {/* Price */}
                  <div className="flex items-center gap-2 mb-6">
                    <span className="font-bold text-xl text-green-600 group-hover:scale-105 transition-transform duration-200">{book.price}</span>
                    <span className="text-sm text-muted-foreground line-through">{book.originalPrice}</span>
                  </div>
                  
                  {/* Add to Cart Button */}
                  <Button 
                    variant="spiritual" 
                    className="w-full font-serif font-semibold group-hover:scale-[1.02] transition-all duration-200 text-white hover:text-white"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Adicionar ao Carrinho
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Books Carousel - Mobile */}
        <div className="md:hidden">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1.1}
            centeredSlides={true}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            className="books-swiper pb-12"
          >
            {featuredBooks.map((book, index) => {
              const colors = colorClasses[book.color as keyof typeof colorClasses];
              const Icon = book.icon;
              
              return (
                <SwiperSlide key={book.id}>
                  <Card 
                    className={`overflow-hidden border-2 ${colors.border} ${colors.bg} backdrop-blur-sm cursor-pointer mx-2`}
                  >
                    {/* Book Cover with Icon */}
                    <div className="relative h-48 flex items-center justify-center overflow-hidden">
                      {/* Background gradient */}
                      <div className={`absolute inset-0 ${colors.bg}`} />
                      
                      {/* Large background icon */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-15">
                        <Icon className="w-24 h-24 text-foreground" />
                      </div>
                      
                      {/* Category badge */}
                      <div className="absolute top-3 left-3">
                        <span className={`${colors.categoryBg} ${colors.categoryText} px-2 py-1 rounded-full text-xs font-bold backdrop-blur-sm border border-white/20`}>
                          {book.category}
                        </span>
                      </div>
                    </div>
                    
                    <CardContent className="p-4">
                      <h3 className="font-serif text-lg font-bold text-foreground mb-2 line-clamp-2">
                        {book.title}
                      </h3>
                      <p className="text-muted-foreground mb-3 font-medium text-sm">
                        {book.author}
                      </p>
                      
                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-3 h-3 ${i < Math.floor(book.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {book.rating} ({book.reviews})
                        </span>
                      </div>
                      
                      {/* Price */}
                      <div className="flex items-center gap-2 mb-4">
                        <span className="font-bold text-lg text-green-600">{book.price}</span>
                        <span className="text-xs text-muted-foreground line-through">{book.originalPrice}</span>
                      </div>
                      
                      {/* Add to Cart Button */}
                      <Button 
                        variant="spiritual" 
                        className="w-full font-serif font-semibold text-sm text-white hover:text-white"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Adicionar ao Carrinho
                      </Button>
                    </CardContent>
                  </Card>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
        
        {/* View All Button */}
        <div className="text-center mt-16">
          <Button variant="hero" size="lg" className="font-serif text-lg px-8 py-6 hover:scale-[1.02] transition-all duration-200">
            Ver Todos os Livros
          </Button>
        </div>
      </div>
    </section>
  );
}