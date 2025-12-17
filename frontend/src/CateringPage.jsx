import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowRight, ChefHat, Mail, MapPin, Instagram, Facebook, Phone, CheckCircle2, Utensils, Briefcase, ChevronDown, Menu, X } from 'lucide-react';

// ASSETS
import heroImage from './assets/images/IMG_9150.webp';
import food1 from './assets/images/IMG_9107.webp';
import food2 from './assets/images/IMG_9142.webp';
import food3 from './assets/images/Montanarina Coppa.jpg';
import detailImg from './assets/images/20251129_173320.webp';
import logistica from './assets/images/auguri in logistica pc .webp';
import dolce from './assets/images/20251203_190718.webp'
// --- COMPONENTS ---

const StaggeredHeroText = ({ text, className = "", stroke = false }) => {
  const letters = Array.from(text);
  
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.2 }
    }
  };

  const child = {
    hidden: { y: 100, rotateX: -90, opacity: 0 },
    visible: {
      y: 0,
      rotateX: 0,
      opacity: 1,
      transition: { type: "spring", damping: 12, stiffness: 100 }
    }
  };

  return (
    <motion.h1
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className={`flex font-heading font-black uppercase tracking-tight leading-[0.9] whitespace-nowrap ${className}`}
      // Rimossa la logica stroke per forzare il bianco pieno come richiesto
      style={{ perspective: "1000px" }}
    >
      {letters.map((letter, index) => (
        <motion.span key={index} variants={child} className="inline-block origin-bottom drop-shadow-2xl">
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.h1>
  );
};

const RevealParagraph = ({ children, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  return (
    <motion.p 
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      className={className}
    >
      {children}
    </motion.p>
  );
};

const SectionTitle = ({ children, subtitle, align = "center" }) => (
  <div className={`mb-6 sm:mb-8 ${align === "left" ? "text-left" : "text-center"}`}>
    <motion.span 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-primary text-xs font-bold tracking-[0.2em] uppercase mb-3 block opacity-70"
    >
      {subtitle}
    </motion.span>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      className="text-primary text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-black leading-[0.9]"
    >
      {children}
    </motion.h2>
  </div>
);

const StaggeredList = ({ items }) => {
  return (
    <motion.ul 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={{
        visible: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } }
      }}
      className="space-y-6 mt-10"
    >
      {items.map((item, i) => (
        <motion.li 
          key={i} 
          variants={{
            hidden: { opacity: 0, x: -30 },
            visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 50 } }
          }}
          className="flex items-start gap-4 border-l-4 border-primary/20 pl-6 hover:border-primary transition-colors duration-300"
        >
           <CheckCircle2 className="text-primary w-8 h-8 shrink-0 mt-[-2px]" strokeWidth={1.5} />
           <span className="text-lg sm:text-xl md:text-2xl font-heading text-primary/90 leading-tight">{item}</span>
        </motion.li>
      ))}
    </motion.ul>
  );
};

const NoiseOverlay = () => (
  <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay"
       style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
  </div>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "HOME", href: "https://giustefoodtruck.com/" },
    { name: "NOI DUE", href: "https://giustefoodtruck.com/chi-siamo/" },
    { name: "COSA FACCIAMO", href: "https://giustefoodtruck.com/servizi/" },
    { name: "SOCIAL FEED", href: "https://giustefoodtruck.com/social-feed/" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] transition-all duration-300">
       {/* Top Bar - Hidden on scroll for cleaner look, or kept if preferred. Matching the screenshot's dark green */}
       <div className={`bg-[#2b4432] text-white py-3 px-6 transition-all duration-300 ${isScrolled ? 'h-0 overflow-hidden py-0' : 'h-auto'}`}>
          <div className="max-w-7xl mx-auto flex justify-between items-center text-base font-medium tracking-wide">
             <div className="flex items-center gap-2">
                <Mail size={16} />
                <a href="mailto:info@giustefoodtruck.it" className="hover:opacity-80 transition-opacity">info@giustefoodtruck.it</a>
             </div>
             <div className="flex items-center gap-4">
                 <a href="https://www.instagram.com/giustefoodtruck/" className="hover:opacity-80 transition-opacity"><Instagram size={16} /></a>
             </div>
          </div>
       </div>

       {/* Main Navbar */}
       <div className={`bg-white shadow-md transition-all duration-300 ${isScrolled ? 'py-2' : 'py-4'}`}>
          <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
             {/* Logo */}
             <a href="https://giustefoodtruck.com/" className="block">
                <img 
                   src="https://giustefoodtruck.com/wp-content/uploads/2023/03/logo-verde.png" 
                   alt="Giustè Logo" 
                   className={`object-contain transition-all duration-300 ${isScrolled ? 'h-12' : 'h-24 sm:h-18'}`} 
                />
             </a>

             {/* Desktop Nav */}
             <nav className="hidden lg:flex items-center gap-8">
                {navLinks.map(link => (
                   <a 
                     key={link.name} 
                     href={link.href}
                     className="text-[#2b4432] font-semibold text-base tracking-widest hover:text-[#5c8a66] transition-colors relative group"
                   >
                     {link.name}
                     <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#5c8a66] transition-all group-hover:w-full"></span>
                   </a>
                ))}
                
                {/* Contattaci Button - desktop */}
                <div className="relative group ml-6">
                   {/* Offset Green Border (Shadow effect) */}
                   <div className="absolute top-1.5 left-1.5 w-full h-full border-2 border-[#2b4432] rounded-xl pointer-events-none transition-transform duration-300 group-hover:translate-x-1"></div>
                   {/* Main Button */}
                   <a 
                      href="#contact"
                      className="relative block bg-[#2b4432] text-white px-8 py-2 rounded-xl font-medium text-base active:scale-95 transition-all duration-300 hover:bg-[#fdd017] hover:text-[#2b4432]"
                   >
                      Contattaci
                   </a>
                </div>
             </nav>

             {/* Mobile Toggle */}
             <div className="flex items-center lg:hidden">
                <button className="text-[#2b4432]" onClick={() => setIsOpen(!isOpen)}>
                   {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
             </div>
          </div>
       </div>

       {/* Mobile Menu */}
       <motion.div 
          initial={false}
          animate={isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
          className="lg:hidden bg-white border-t border-gray-100 overflow-hidden shadow-xl"
       >
          <div className="p-6 flex flex-col gap-6">
             {navLinks.map(link => (
                <a 
                   key={link.name} 
                   href={link.href}
                   className="text-[#2b4432] font-semibold text-lg tracking-widest"
                   onClick={() => setIsOpen(false)}
                >
                   {link.name}
                </a>
             ))}
             <a 
                href="#contact"
                className="bg-[#2b4432] text-white px-6 py-3 rounded-xl font-bold text-sm tracking-widest text-center hover:bg-[#3d5e46] transition-all"
                onClick={() => setIsOpen(false)}
             >
                Contattaci
             </a>
          </div>
       </motion.div>
    </header>
  );
};

// --- PAGE COMPONENT ---

const CateringPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', type: 'private', message: '' });
  const [status, setStatus] = useState('');
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const yParallax = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => setStatus('success'), 2000);
  };

  return (
    <div ref={containerRef} className="bg-background text-primary font-sans selection:bg-primary selection:text-background overflow-x-hidden w-full">
      <Navbar />
      <NoiseOverlay />
      
      {/* --- HERO SECTION --- */}
      <section className="relative h-[100dvh] w-full flex flex-col justify-center items-center overflow-hidden">
            <motion.div style={{ y: yParallax }} className="absolute top-[-25%] left-0 w-full h-[150%] z-0">
                <img 
                   src={heroImage} 
                   alt="Giustè Catering" 
                   className="w-full h-full object-cover object-center" 
                />
                <div className="absolute inset-0 bg-black/60"></div> {/* Overlay scuro per contrasto */}
            </motion.div>

          
            <div className="relative z-10 text-center text-white px-4 flex flex-col items-center">
                <motion.div 
                   initial={{ opacity: 0, y: 30 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ duration: 0.8 }}
                >
                   <span className="inline-block border border-white/30 px-6 py-2 rounded-full text-sm font-bold tracking-[0.3em] uppercase mb-8 backdrop-blur-md">
                        Tradizione & Eleganza
                   </span>

                   {/* TITOLO HERO: Bianco, Montserrat, Ben Disposto */}
                   <div className="flex flex-col items-center gap-2">
                      <StaggeredHeroText text="GIUSTÈ" className="text-[10vw] sm:text-[10vw] md:text-[10vw] leading-[0.8] text-white drop-shadow-xl" />
                      <StaggeredHeroText text="CATERING" className="text-[10vw] sm:text-[10vw] md:text-[10vw] leading-[0.8] text-white drop-shadow-xl" />
                   </div>

                </motion.div>
            </div>

        <motion.div 
            className="absolute bottom-8 w-full text-white flex flex-col items-center gap-1"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
        >
             <span className="text-sm sm:text-base uppercase tracking-widest font-bold opacity-80">Scorri</span>
             <ArrowRight className="rotate-90 w-6 h-6 sm:w-8 sm:h-8" />
        </motion.div>
      </section>

      {/* --- MANIFESTO --- */}
      <section className="py-20 sm:py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
           <div className="order-2 md:order-1">
              <SectionTitle subtitle="La Nostra Filosofia" align="left">CATERING<br/>D'AUTORE.</SectionTitle>
              <div className="space-y-6 text-base md:text-lg text-primary/80 font-light leading-relaxed">
                 <p>
                   Un'idea che nasce dalla passione per la cucina autentica piacentina e dalla voglia di portarla in contesti esclusivi.
                 </p>
                 <RevealParagraph className="text-xl md:text-2xl font-bold leading-relaxed text-primary/90 font-heading">
                   La vera magia accade quando portiamo la nostra cucina a casa tua, in villa o nella tua azienda.
                 </RevealParagraph>
                 <p>
                   Allestiamo cucine temporanee ovunque, creando un'esperienza gastronomica su misura per i tuoi momenti speciali, curando ogni dettaglio dalla materia prima al servizio.
                 </p>
                 
                 <StaggeredList items={[
                      "Allestimento cucine in location esclusive",
                      "Menù sartoriali: Tradizione e Innovazione",
                      "Materie prime stagionali a km0",
                      "Servizio completo con personale di sala"
                 ]} />
              </div>
           </div>
           
           <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="order-1 md:order-2 h-[250px] sm:h-[350px] md:h-[450px] lg:h-[600px] relative"
           >
              <div className="absolute inset-0 bg-primary rounded-giuste transform translate-x-3 translate-y-3 sm:translate-x-4 sm:translate-y-4"></div>
              <img src={dolce} alt="Catering Giustè" className="w-full h-full object-cover rounded-giuste relative z-10 shadow-xl" />
           </motion.div>
        </div>
      </section>

      {/* --- SERVIZI --- */}
      <section className="py-20 sm:py-24 bg-white px-6">
         <div className="max-w-7xl mx-auto">
            <SectionTitle subtitle="Cosa Facciamo">I Nostri Servizi</SectionTitle>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
               {/* Card 1: EVENTI PRIVATI */}
               <motion.div 
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="group relative h-[55vh] sm:h-[60vh] overflow-hidden rounded-giuste cursor-pointer shadow-lg"
               >
                  <img src={detailImg} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/10 transition-colors"></div>
                  <div className="absolute bottom-0 left-0 p-6 sm:p-10 w-full bg-gradient-to-t from-primary/90 to-transparent text-[#ececec]">
                     <ChefHat className="mb-4 w-8 h-8" />
                     <h3 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black mb-2">Eventi Privati</h3>
                     <p className="font-light opacity-90 max-w-md text-sm sm:text-base">Matrimoni, cene in villa, feste private. Catering sartoriale per rendere unico il tuo giorno.</p>
                  </div>
               </motion.div>

               {/* Card 2: EVENTI AZIENDALI (Sostituisce Food Truck) */}
               <motion.div 
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
                  className="group relative h-[55vh] sm:h-[60vh] overflow-hidden rounded-giuste cursor-pointer shadow-lg"
               >
                  {/* Uso heroImage come placeholder professionale, o un'altra img aziendale */}
                  <img src={logistica} className="w-full h-full object-cover object-right transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/10 transition-colors"></div>
                  <div className="absolute bottom-0 left-0 p-6 sm:p-10 w-full bg-gradient-to-t from-primary/90 to-transparent text-[#ececec]">
                     <Briefcase className="mb-4 w-8 h-8" />
                     <h3 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black mb-2">Eventi Aziendali</h3>
                     <p className="font-light opacity-90 max-w-md text-sm sm:text-base">Cene di gala, coffee break e light lunch. Soluzioni professionali per il tuo business.</p>
                  </div>
               </motion.div>
            </div>
         </div>
      </section>

      {/* --- MENU GALLERY --- */}
      <section className="py-20 sm:py-24 px-6 max-w-7xl mx-auto">
         <SectionTitle subtitle="Il Gusto">Menu Sartoriale</SectionTitle>
         
         <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
                visible: {
                    transition: { staggerChildren: 0.1 }
                }
            }}
         >
            <motion.div 
               variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
               }}
               className="md:col-span-1 space-y-6"
            >
               <div className="bg-white p-6 sm:p-8 rounded-giuste border border-primary/10 text-center shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="text-2xl sm:text-3xl font-heading font-black mb-2">Tradizione</h4>
                  <p className="text-sm opacity-70 mb-6 font-light">Pisarei e Fasö, Anolini, Tortelli.</p>
                  <img src={food2} className="w-full aspect-square object-cover rounded-giuste shadow-sm" />
               </div>
            </motion.div>
            
            <motion.div 
               variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
               }}
               className="md:col-span-1 mt-0 md:mt-8 lg:mt-16 space-y-6"
            >
               <div className="bg-white p-6 sm:p-8 rounded-giuste border border-primary/10 text-center shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="text-2xl sm:text-3xl font-heading font-black mb-2">Gourmet</h4>
                  <p className="text-sm opacity-70 mb-6 font-light">Montanarina, Salumi DOP, Finger Food.</p>
                  <img src={food3} className="w-full aspect-square object-cover rounded-giuste shadow-sm" />
               </div>
            </motion.div>

            <motion.div 
               variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
               }}
               className="md:col-span-1 space-y-6"
            >
               <div className="bg-white p-6 sm:p-8 rounded-giuste border border-primary/10 text-center shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="text-2xl sm:text-3xl font-heading font-black mb-2">Aperitivi</h4>
                  <p className="text-sm opacity-70 mb-6 font-light">Polpette, Panini Gourmet, Fritti d'autore.</p>
                  <img src={food1} className="w-full aspect-square object-cover rounded-giuste shadow-sm" />
               </div>
            </motion.div>
         </motion.div>
      </section>

      {/* --- CONTATTI --- */}
      <section id="contact" className="py-24 bg-primary text-[#ececec] px-6">
         <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
               <span className="text-xs font-bold tracking-[0.2em] uppercase opacity-60 mb-4 block">Parliamone</span>
               <h2 className="text-3xl sm:text-5xl md:text-7xl font-heading font-black">ORGANIZZIAMO?</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
               <div className="space-y-8 font-light text-lg">
                  <div className="absolute top-0 right-0 p-10 opacity-10 pointer-events-none">
                      <Utensils size={200} strokeWidth={0.5} />
                  </div>
                  <p className="text-2xl">Raccontaci la tua idea.</p>
                  <p className="opacity-80">Ti risponderemo entro 24h con una proposta cucita su misura per il tuo evento privato o aziendale.</p>
                  <div className="space-y-6 text-base mt-8 pt-8 border-t border-[#ececec]/20 relative z-10">
                     <a href="mailto:info@giustefoodtruck.it" className="flex items-center gap-4 hover:opacity-70 transition-opacity"><Mail className="w-6 h-6"/> info@giustefoodtruck.it</a>
                     <a href="tel:+393881589905" className="flex items-center gap-4 hover:opacity-70 transition-opacity"><Phone className="w-6 h-6"/> +39 388 1589905</a>
                     <div className="flex items-center gap-4 opacity-70"><MapPin className="w-6 h-6"/> Piacenza e Nord Italia</div>
                  </div>
               </div>

               <motion.form 
                  onSubmit={handleSubmit} 
                  className="bg-white/5 p-6 sm:p-8 rounded-3xl border border-white/10 backdrop-blur-sm shadow-2xl relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                  variants={{
                      visible: {
                          transition: { staggerChildren: 0.1 }
                      }
                  }}
               >
                  <motion.div 
                     variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                     }}
                     className="space-y-2 col-span-1"
                  >
                     <label className="text-xs uppercase tracking-widest opacity-70 font-bold ml-1">Nome</label>
                     <input 
                       type="text" 
                       placeholder="Il tuo nome"
                       className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-lg focus:border-white/50 focus:bg-white/10 outline-none transition-all placeholder:text-white/20"
                       value={formData.name}
                       onChange={e => setFormData({...formData, name: e.target.value})}
                       required
                     />
                  </motion.div>

                  <motion.div 
                     variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                     }}
                     className="space-y-2 col-span-1"
                  >
                     <label className="text-xs uppercase tracking-widest opacity-70 font-bold ml-1">Email</label>
                     <input 
                       type="email" 
                       placeholder="tua@email.com"
                       className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-lg focus:border-white/50 focus:bg-white/10 outline-none transition-all placeholder:text-white/20"
                       value={formData.email}
                       onChange={e => setFormData({...formData, email: e.target.value})}
                       required
                     />
                  </motion.div>
                  
                  <motion.div 
                     variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                     }}
                     className="space-y-2 col-span-1 md:col-span-2 relative"
                  >
                     <label className="text-xs uppercase tracking-widest opacity-70 font-bold ml-1">Tipo Evento</label>
                     <div className="relative">
                        <select 
                           value={formData.type}
                           onChange={e => setFormData({...formData, type: e.target.value})}
                           className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-lg focus:border-white/50 focus:bg-white/10 outline-none transition-all appearance-none cursor-pointer text-[#ececec]"
                        >
                           <option value="private" className="bg-[#1a1a1a] text-white">Catering Privato</option>
                           <option value="wedding" className="bg-[#1a1a1a] text-white">Matrimonio</option>
                           <option value="corporate" className="bg-[#1a1a1a] text-white">Evento Aziendale</option>
                        </select>
                        <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 opacity-50 pointer-events-none" size={20} />
                     </div>
                  </motion.div>

                  <motion.div 
                     variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                     }}
                     className="space-y-2 col-span-1 md:col-span-2"
                  >
                     <label className="text-xs uppercase tracking-widest opacity-70 font-bold ml-1">Messaggio</label>
                     <textarea 
                       rows="4"
                       placeholder="Raccontaci i dettagli del tuo evento..."
                       className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-lg focus:border-white/50 focus:bg-white/10 outline-none transition-all resize-none placeholder:text-white/20"
                       value={formData.message}
                       onChange={e => setFormData({...formData, message: e.target.value})}
                     ></textarea>
                  </motion.div>

                  <motion.div 
                    className="col-span-1 md:col-span-2 pt-2"
                    variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                     }}
                  >
                      <button 
                        disabled={status === 'sending'}
                        className="w-full bg-[#ececec] text-primary py-4 rounded-xl text-lg font-bold uppercase tracking-widest hover:bg-white hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg disabled:opacity-70 disabled:pointer-events-none"
                      >
                         {status === 'sending' ? 'Invio...' : 'Invia Richiesta'}
                      </button>
                      {status === 'success' && <p className="text-green-400 text-center font-bold mt-4 animate-pulse">Messaggio inviato con successo!</p>}
                  </motion.div>
               </motion.form>
            </div>
         </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-[#1a1a1a] text-[#ececec] py-16 sm:py-20 px-6 border-t border-[#ececec]/10">
         <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 sm:gap-12 mb-16 sm:mb-20 text-center md:text-left">
            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8 text-center sm:text-left">
               <div>
                  <h3 className="font-heading font-black text-xl sm:text-2xl mb-6 text-[#ececec] tracking-wider">Menu</h3>
                  <ul className="space-y-3 text-sm opacity-60 font-bold uppercase tracking-widest">
                     <li><a href="#" className="hover:text-white hover:opacity-100 transition-all">Home</a></li>
                     <li><a href="#" className="hover:text-white hover:opacity-100 transition-all">Catering</a></li>
                     <li><a href="#" className="hover:text-white hover:opacity-100 transition-all">Servizi</a></li>
                     <li><a href="#contact" className="hover:text-white hover:opacity-100 transition-all">Contatti</a></li>
                  </ul>
               </div>
               <div>
                  <h3 className="font-heading font-black text-xl sm:text-2xl mb-6 text-[#ececec] tracking-wider">Contatti</h3>
                  <ul className="space-y-3 text-sm sm:text-base opacity-80 font-medium">
                     <li><a href="mailto:info@giustefoodtruck.it" className="hover:text-white hover:opacity-100 transition-all block">info@giustefoodtruck.it</a></li>
                     <li><a href="tel:+393881589905" className="hover:text-white hover:opacity-100 transition-all block">(+39) 388 158 9905</a></li>
                  </ul>
               </div>
            </div>
            <div className="md:col-span-2 flex flex-col items-center md:items-end justify-center">
               <h2 className="text-[10vw] sm:text-[12vw] md:text-[8vw] font-heading font-black leading-none text-[#ececec] opacity-10 select-none hover:opacity-20 transition-opacity duration-500">
                  GIUSTÈ
               </h2>
            </div>
         </div>
         
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center pt-8 border-t border-[#ececec]/10 text-xs opacity-40 uppercase tracking-widest font-bold">
            <p className="order-2 md:order-1 mt-6 md:mt-0">© {new Date().getFullYear()} Giustè P.IVA 1234567890</p>
            <div className="order-1 md:order-2 flex gap-6">
               <a href="https://www.instagram.com/giustefoodtruck/" className="hover:text-white hover:opacity-100 transition-all"><Instagram size={20}/></a>
               <a href="#" className="hover:text-white hover:opacity-100 transition-all"><Facebook size={20}/></a>
            </div>
         </div>
      </footer>

    </div>
  );
};

export default CateringPage;