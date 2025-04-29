"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowRight } from "lucide-react";
import { useState } from "react";
import { BlogModal } from "./blog/BlogModal";

export function BlogSection() {
  const { language } = useLanguage();
  const [filter, setFilter] = useState<'all' | 'today' | 'previous'>('all');
  const [selectedPost, setSelectedPost] = useState<null | typeof posts[0]>(null);
  const [isImageLoaded, setIsImageLoaded] = useState<{[key: string]: boolean}>({});

  const posts = [
    {
      title: language === "es" 
        ? "IPINNOVATECH expande sus servicios en Latinoamérica"
        : "IPINNOVATECH expands services in Latin America",
      description: language === "es"
        ? "Nuestra empresa continúa su expansión con nuevas oficinas y servicios en la región"
        : "Our company continues its expansion with new offices and services in the region",
      date: "2024-03-15",
      category: language === "es" ? "Empresa" : "Company",
      image: "/Images/Noticias/Noticias_1.jpg"
    },
    {
      title: language === "es"
        ? "Nueva plataforma de IA para gestión empresarial"
        : "New AI platform for business management",
      description: language === "es"
        ? "Lanzamos nuestra última solución de inteligencia artificial para optimización de procesos"
        : "We launch our latest artificial intelligence solution for process optimization",
      date: "2024-03-10",
      category: language === "es" ? "Tecnología" : "Technology",
      image: language === "es" ? "/Images/Noticias/Noticias_2.jpg" : "/Images/Noticias/Noticias_2.jpg"
    },
    {
      title: language === "es"
        ? "Reconocimiento internacional en innovación"
        : "International recognition in innovation",
      description: language === "es"
        ? "IPINNOVATECH recibe premio por sus soluciones tecnológicas innovadoras"
        : "IPINNOVATECH receives award for its innovative technological solutions",
      date: "2024-03-05",
      category: language === "es" ? "Premios" : "Awards",
      image: "/Images/Noticias/Noticias_3.jpg"
    }
  ];

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const getFilteredPosts = () => {
    if (filter === 'all') return posts;
    
    return posts.filter(post => {
      const postDate = new Date(post.date);
      postDate.setHours(0, 0, 0, 0);
      
      if (filter === 'previous') {
        return postDate < today;
      } else {
        return postDate >= today;
      }
    });
  };

  const handleImageLoad = (postTitle: string) => {
    setIsImageLoaded(prev => ({
      ...prev,
      [postTitle]: true
    }));
  };

  const getImagePosition = (index: number) => {
    switch(index) {
      case 0: // First image (robot with yellow eye)
        return 'center 15%'; // Adjusted from 25% to 15% to show more of the head
      case 1: // Second image (robot at laptop)
        return 'center 40%'; // Unchanged
      case 2: // Third image (hologram robot)
        return 'center 35%'; // Unchanged
      default:
        return 'center center';
    }
  };

  const filteredPosts = getFilteredPosts();

  return (
    <section id="blog" className="section-padding">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-[var(--primary-blue)] to-[var(--accent-blue)] bg-clip-text text-transparent">
            {language === "es" ? "Noticias" : "News"}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            {language === "es"
              ? "Mantente al día con las últimas novedades y avances de IPINNOVATECH"
              : "Stay up to date with the latest news and developments from IPINNOVATECH"}
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                ${filter === 'all'
                  ? 'bg-gradient-to-r from-[var(--primary-blue)] to-[var(--accent-blue)] text-white shadow-lg'
                  : 'bg-white/80 text-gray-700 hover:bg-white/90 border border-gray-200'
                }`}
            >
              {language === "es" ? "Todos" : "All"}
            </button>
            <button
              onClick={() => setFilter('today')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                ${filter === 'today'
                  ? 'bg-gradient-to-r from-[var(--primary-blue)] to-[var(--accent-blue)] text-white shadow-lg'
                  : 'bg-white/80 text-gray-700 hover:bg-white/90 border border-gray-200'
                }`}
            >
              {language === "es" ? "Hoy" : "Today"}
            </button>
            <button
              onClick={() => setFilter('previous')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                ${filter === 'previous'
                  ? 'bg-gradient-to-r from-[var(--primary-blue)] to-[var(--accent-blue)] text-white shadow-lg'
                  : 'bg-white/80 text-gray-700 hover:bg-white/90 border border-gray-200'
                }`}
            >
              {language === "es" ? "Anteriores" : "Previous"}
            </button>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 px-0">
          {filteredPosts.map((post, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="group bg-black/40 border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden h-full hover:shadow-lg hover:shadow-blue-500/10">
                <div className="relative h-[280px] sm:h-[320px] overflow-hidden">
                  {!isImageLoaded[post.title] && (
                    <div className="absolute inset-0 bg-gray-800 animate-pulse" />
                  )}
                  
                  <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-black">
                    <img
                      src={post.image}
                      alt={post.title}
                      className={`w-full h-full transition-all duration-700 ${
                        isImageLoaded[post.title] ? 'opacity-100' : 'opacity-0'
                      } object-cover transform scale-[1.02]`}
                      onLoad={() => handleImageLoad(post.title)}
                      loading="lazy"
                      style={{
                        objectPosition: getImagePosition(index)
                      }}
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/30 to-black/80" />
                </div>
                <CardHeader className="relative z-10 -mt-20 space-y-4 bg-gradient-to-b from-transparent to-black/90 pt-8">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="bg-[var(--primary-blue)]/10 text-white hover:bg-[var(--primary-blue)]/20 backdrop-blur-sm">
                      {post.category}
                    </Badge>
                    <div className="flex items-center text-sm text-gray-300 backdrop-blur-sm bg-black/20 px-2 py-1 rounded-full">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(post.date).toLocaleDateString()}
                    </div>
                  </div>
                  <CardTitle className="text-white text-xl sm:text-2xl line-clamp-2 group-hover:text-[var(--accent-blue)] transition-colors duration-300">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="text-gray-300 text-base line-clamp-2">
                    {post.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative z-10 bg-black/90 pt-2">
                  <button 
                    onClick={() => setSelectedPost(post)}
                    className="text-[var(--primary-blue)] hover:text-[var(--accent-blue)] transition-colors duration-300 font-medium flex items-center gap-2 group/btn"
                  >
                    {language === "es" ? "Saber más" : "Learn more"}
                    <ArrowRight className="h-4 w-4 transform group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {selectedPost && (
        <BlogModal
          isOpen={!!selectedPost}
          onClose={() => setSelectedPost(null)}
          post={selectedPost}
        />
      )}
    </section>
  );
}