import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowRight, ArrowLeft, X } from "lucide-react";
import { siteData, defaultBlogPosts, type BlogPost } from "@/lib/siteData";
import { useAnimateOnScroll } from "@/hooks/useAnimateOnScroll";

const POSTS_PER_PAGE = 3;

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [page, setPage] = useState(0);
  const [openPost, setOpenPost] = useState<BlogPost | null>(null);
  const { ref, isVisible } = useAnimateOnScroll();

  useEffect(() => {
    const saved = siteData.getBlogPosts();
    setPosts(saved.length > 0 ? saved : defaultBlogPosts);
  }, []);

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const visible = posts.slice(page * POSTS_PER_PAGE, (page + 1) * POSTS_PER_PAGE);

  return (
    <section id="blog" className="py-20 bg-background">
      <div
        ref={ref}
        className={`container mx-auto px-4 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6">Blog</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Olvasd cikkeinket az önellátásról, hagyományőrzésről és fenntartható életmódról.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {visible.map((post, i) => (
            <Card
              key={post.id}
              className="overflow-hidden hover:shadow-organic transition-all duration-500 group cursor-pointer"
              style={{ animationDelay: `${i * 120}ms` }}
              onClick={() => setOpenPost(post)}
            >
              <div className="h-40 bg-muted/50 flex items-center justify-center text-6xl overflow-hidden">
                {post.imageUrl ? (
                  <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
                ) : (
                  post.emoji
                )}
              </div>
              <div className="p-6">
                <span className="inline-block text-xs font-semibold uppercase tracking-wider text-accent-foreground bg-accent/20 px-3 py-1 rounded-full mb-3">
                  {post.category}
                </span>
                <h3 className="text-xl font-bold text-primary mb-2 group-hover:text-primary/80 transition-colors">
                  {post.title}
                </h3>
                <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <User className="h-3.5 w-3.5" />
                    {post.author}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {post.date}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mb-8">
            <Button
              variant="outline"
              size="icon"
              disabled={page === 0}
              onClick={() => setPage(page - 1)}
              className="border-primary text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            {Array.from({ length: totalPages }, (_, i) => (
              <Button
                key={i}
                variant={page === i ? "default" : "outline"}
                size="icon"
                onClick={() => setPage(i)}
                className={page === i ? "bg-primary text-primary-foreground" : "border-primary text-primary"}
              >
                {i + 1}
              </Button>
            ))}
            <Button
              variant="outline"
              size="icon"
              disabled={page >= totalPages - 1}
              onClick={() => setPage(page + 1)}
              className="border-primary text-primary"
            >
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Blog post modal */}
      {openPost && (
        <div className="fixed inset-0 z-[60] bg-black/80 flex items-center justify-center p-4" onClick={() => setOpenPost(null)}>
          <div className="bg-card rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto relative animate-in fade-in zoom-in-95" onClick={(e) => e.stopPropagation()}>
            <Button variant="ghost" size="icon" className="absolute top-3 right-3 z-10" onClick={() => setOpenPost(null)}>
              <X className="h-5 w-5" />
            </Button>
            {openPost.imageUrl ? (
              <img src={openPost.imageUrl} alt={openPost.title} className="w-full h-48 object-cover rounded-t-2xl" />
            ) : (
              <div className="w-full h-48 bg-muted/50 flex items-center justify-center text-7xl rounded-t-2xl">
                {openPost.emoji}
              </div>
            )}
            <div className="p-8">
              <span className="inline-block text-xs font-semibold uppercase tracking-wider text-accent-foreground bg-accent/20 px-3 py-1 rounded-full mb-3">
                {openPost.category}
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">{openPost.title}</h2>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                <div className="flex items-center gap-1"><User className="h-4 w-4" />{openPost.author}</div>
                <div className="flex items-center gap-1"><Calendar className="h-4 w-4" />{openPost.date}</div>
              </div>
              <div className="prose prose-green max-w-none text-foreground leading-relaxed">
                <p>{openPost.content || openPost.excerpt}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Blog;
