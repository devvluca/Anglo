import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, ShoppingCart, Eye } from "lucide-react";
import bookImage from "@/assets/book-1.jpg";

const featuredBooks = [
  {
    id: 1,
    title: "Fundamentos da Fé Convergente",
    author: "Pe. João Martinez",
    price: "R$ 49,90",
    originalPrice: "R$ 59,90",
    rating: 4.8,
    reviews: 124,
    image: bookImage,
    category: "Teologia"
  },
  {
    id: 2,
    title: "Espiritualidade e Tradição",
    author: "Irmã Maria Santos",
    price: "R$ 39,90", 
    originalPrice: "R$ 49,90",
    rating: 4.9,
    reviews: 89,
    image: bookImage,
    category: "Espiritualidade"
  },
  {
    id: 3,
    title: "A Palavra que Transforma",
    author: "Rev. Carlos Silva",
    price: "R$ 44,90",
    originalPrice: "R$ 54,90", 
    rating: 4.7,
    reviews: 156,
    image: bookImage,
    category: "Bíblia"
  },
  {
    id: 4,
    title: "Unidade na Diversidade",
    author: "Dra. Ana Oliveira",
    price: "R$ 52,90",
    originalPrice: "R$ 62,90",
    rating: 4.8,
    reviews: 98,
    image: bookImage,
    category: "Teologia"
  }
];

export function FeaturedBooks() {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-6">
            Livros em Destaque
          </h2>
          <p className="font-serif text-xl text-muted-foreground max-w-2xl mx-auto">
            Descubra obras que fortalecem a fé e iluminam o caminho espiritual
          </p>
        </div>
        
        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredBooks.map((book) => (
            <Card key={book.id} className="group hover:shadow-elegant transition-spiritual overflow-hidden border-border/50">
              <div className="relative">
                <img 
                  src={book.image} 
                  alt={book.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-spiritual"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-rose text-white px-3 py-1 rounded-full text-sm font-medium">
                    {book.category}
                  </span>
                </div>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-spiritual">
                  <Button variant="secondary" size="icon" className="bg-white/90 hover:bg-white">
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <CardContent className="p-6">
                <h3 className="font-serif text-lg font-semibold text-foreground mb-2 line-clamp-2">
                  {book.title}
                </h3>
                <p className="text-muted-foreground mb-3 font-medium">
                  {book.author}
                </p>
                
                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < Math.floor(book.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {book.rating} ({book.reviews})
                  </span>
                </div>
                
                {/* Price */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="font-bold text-lg text-primary">{book.price}</span>
                  <span className="text-sm text-muted-foreground line-through">{book.originalPrice}</span>
                </div>
                
                {/* Add to Cart Button */}
                <Button variant="spiritual" className="w-full font-serif">
                  <ShoppingCart className="w-4 h-4" />
                  Adicionar ao Carrinho
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* View All Button */}
        <div className="text-center mt-12">
          <Button variant="hero" size="lg" className="font-serif">
            Ver Todos os Livros
          </Button>
        </div>
      </div>
    </section>
  );
}