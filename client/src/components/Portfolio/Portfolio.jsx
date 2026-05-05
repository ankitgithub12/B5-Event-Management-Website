const Portfolio = () => {
  const projects = [
    { title: 'College Fest', image: 'https://i.pinimg.com/1200x/0f/e9/84/0fe984a1e10c7394f44b6b396cea17a5.jpg' },
    { title: 'Corporate Gala', image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80' },
    { title: 'Wedding Setup', image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80' },
    { title: 'Product Launch', image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800&q=80' },
    { title: 'Birthday Party', image: 'https://i.pinimg.com/1200x/9d/5b/e4/9d5be4eb8bea1c525e7a1868ef731a95.jpg' },
    { title: 'Engagement', image: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80' },
  ];

  return (
    <section id="portfolio" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 text-accent font-semibold text-sm tracking-[2px] uppercase mb-4">
            <span className="w-8 h-px bg-accent"></span>
            OUR WORK
            <span className="w-8 h-px bg-accent"></span>
          </div>
          <h2 className="text-4xl md:text-5xl text-primary">Turning Ideas Into Reality</h2>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {projects.map((project, index) => (
            <div key={index} className="group relative rounded-2xl overflow-hidden aspect-[4/3] cursor-pointer">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <h3 className="text-white text-xl font-heading font-semibold translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  {project.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <a href="#" className="btn btn-outline">
            VIEW ALL WORK
          </a>
        </div>
        
      </div>
    </section>
  );
};

export default Portfolio;
