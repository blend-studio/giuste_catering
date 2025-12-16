import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowRight, Truck, ChefHat, Mail, MapPin, Instagram, Facebook, Utensils, CheckCircle2, Phone } from 'lucide-react';

// ASSETS
import heroImage from './assets/images/Giustino - Lato Destro - JPEG.webp'; 
import food1 from './assets/images/Spolpette.webp';
import food2 from './assets/images/Pisarei fagioli croccanti.webp';
import food3 from './assets/images/Montanarina Coppa.jpg';
import truckImg from './assets/images/Giusté + Giustino 1 - JPEG.webp';
import detailImg from './assets/images/IMG_3993.webp';

// --- COMPONENTI ANIMAZIONE ---

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
      className={`flex flex-wrap justify-start font-heading font-black uppercase tracking-tight leading-[0.9] ${className}`}
      style={{ perspective: "1000px", WebkitTextStroke: stroke ? "2px #325541" : "none" }}
    >
      {letters.map((letter, index) => (
        <motion.span key={index} variants={child} className="inline-block origin-bottom drop-shadow-lg">
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

const SectionTitle = ({ children, subtitle }) => {
  return (
    <div className="mb-12 md:mb-16 text-center md:text-left text-primary">
      <motion.span 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="text-xs font-bold tracking-[0.2em] uppercase mb-4 block opacity-60"
      >
        {subtitle}
      </motion.span>
      <div className="overflow-hidden">
        <motion.h2 
          initial={{ y: "110%" }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-7xl font-heading leading-none"
        >
          {children}
        </motion.h2>
      </div>
    </div>
  );
};

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
           <span className="text-xl md:text-2xl font-heading text-primary/90 leading-tight">{item}</span>
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

// --- MAIN PAGE ---

const CateringPage = () => {
  const [activeSplit, setActiveSplit] = useState('both');
  const [formData, setFormData] = useState({ name: '', email: '', date: '', type: 'private', message: '' });
  const [status, setStatus] = useState('');
  
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const yParallax = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    // Simulazione chiamata API
    setTimeout(() => setStatus('success'), 2000);
  };

  return (
    <div ref={containerRef} className="overflow-x-hidden bg-background text-foreground font-sans">
      <NoiseOverlay />
      
      {/* --- 1. HERO SECTION --- */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-black">
        <motion.div style={{ y: yParallax }} className="absolute inset-0">
           <img 
             src={heroImage} 
             alt="Giustè Food Truck Hero" 
             className="w-full h-[120%] object-cover object-center opacity-90" 
           />
           <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40"></div>
        </motion.div>
        
        <div className="z-20 relative w-full px-4 text-center mt-[-5vh]">
          <motion.div 
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ delay: 0.5 }}
             className="inline-block mb-8 border border-white/30 bg-black/20 backdrop-blur-md px-6 py-2 rounded-full"
          >
             <span className="text-white text-xs md:text-sm font-bold tracking-[0.3em] uppercase drop-shadow-md">
                Est. 2018 — Piacenza
             </span>
          </motion.div>

          <div className="relative mb-8 text-center flex flex-col items-center">
            <div className="relative z-10 drop-shadow-[0_5px_5px_rgba(0,0,0,1)]">
               <StaggeredHeroText text="GIUSTÈ" className="text-[18vw] md:text-[14vw] text-white justify-center" />
               <StaggeredHeroText text="CATERING" className="text-[18vw] md:text-[14vw] text-white mt-[-1vw] md:mt-[-1.5vw] justify-center" />
            </div>
          </div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="text-white font-sans text-xl md:text-3xl font-light max-w-3xl mx-auto leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
          >
            L'esperienza del gusto, <span className="font-semibold text-white">con o senza Truck.</span><br/>
            Ovunque tu voglia.
          </motion.p>
        </div>

        <motion.div 
            className="absolute bottom-10 z-20 text-white flex flex-col items-center gap-2 drop-shadow-md"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
        >
             <span className="text-[10px] uppercase tracking-widest font-bold">Scorri</span>
             <ArrowRight className="rotate-90 w-5 h-5" />
        </motion.div>
      </section>

      {/* --- 2. MANIFESTO --- */}
      <section className="py-24 px-6 md:px-20 bg-background relative z-10">
         <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20 items-center">
            <div className="lg:w-1/2">
                <motion.span 
                    initial={{ opacity: 0, letterSpacing: "0em" }}
                    whileInView={{ opacity: 1, letterSpacing: "0.2em" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="text-primary text-xl md:text-2xl font-bold uppercase mb-6 block border-b-2 border-primary/20 w-fit pb-2"
                >
                    La Nostra Filosofia
                </motion.span>

                <div className="mb-10">
                    <StaggeredHeroText text="NON SOLO" className="text-7xl md:text-8xl lg:text-9xl text-primary mb-[-10px] md:mb-[-20px]" />
                    <StaggeredHeroText text="STREET FOOD" className="text-7xl md:text-8xl lg:text-9xl text-transparent stroke-text" stroke={true} />
                </div>

                <div className="prose prose-lg text-foreground/80 font-light">
                   <RevealParagraph className="text-2xl md:text-3xl leading-relaxed mb-8 text-primary/80 font-heading">
                     Molti ci conoscono per <strong className="text-primary font-black border-b-2 border-primary">Giustino</strong>, il nostro truck. 
                     Ma la vera magia accade quando portiamo la nostra cucina a casa tua.
                   </RevealParagraph>
                   
                   <StaggeredList items={[
                        "Allestimento cucine professionali in location",
                        "Menù sartoriali: Vegetariano, Vegano, Tradizionale",
                        "Materie prime stagionali a km0 e zero sprechi",
                        "Servizio completo con personale di sala"
                   ]} />
                </div>
            </div>

            <div className="lg:w-1/2 w-full h-[700px] relative">
               <motion.div 
                 initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" }}
                 whileInView={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }}
                 transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                 viewport={{ once: true }}
                 className="h-full w-full rounded-sm overflow-hidden shadow-2xl bg-black"
               >
                  <img src={food3} alt="Catering Giustè" className="w-full h-full object-cover transition-all duration-700" />
                  
                  <div className="absolute bottom-8 right-0 bg-black/80 text-white px-10 py-8 max-w-sm backdrop-blur-md shadow-xl border-l-4 border-primary">
                      <p className="font-heading text-3xl mb-2">CATERING PRIVATO</p>
                      <p className="text-sm uppercase tracking-widest opacity-80">L'eleganza del servizio al piatto</p>
                  </div>
               </motion.div>
               <motion.div 
                  initial={{ opacity: 0, x: 20, y: 20 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ delay: 0.5, duration: 1 }}
                  className="absolute -top-6 -left-6 w-full h-full border-2 border-primary/20 -z-10 rounded-sm"
               ></motion.div>
            </div>
         </div>
      </section>

      {/* --- 3. I SERVIZI (SPLIT SECTION) --- */}
      <section className="h-[80vh] md:h-screen flex flex-col md:flex-row border-y border-primary/20 bg-black">
        <motion.div 
           className="relative w-full md:w-1/2 h-full border-b md:border-b-0 md:border-r border-primary/20 group cursor-pointer overflow-hidden"
           onHoverStart={() => setActiveSplit('left')}
           onHoverEnd={() => setActiveSplit('both')}
           animate={{ flex: activeSplit === 'left' ? 2 : 1 }}
           transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
           <img src={detailImg} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
           <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
           
           <div className="absolute bottom-0 left-0 p-8 md:p-16 w-full bg-gradient-to-t from-black via-black/50 to-transparent">
              <ChefHat className="text-white w-12 h-12 mb-4" />
              <h3 className="text-5xl md:text-7xl font-heading text-white mb-2">PRIVATE<br/>EVENT</h3>
              <p className="text-white/90 text-lg max-w-sm translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                 Matrimoni, cene private, eventi in villa. Portiamo l'attrezzatura, lo chef e la qualità del ristorante ovunque.
              </p>
           </div>
        </motion.div>

        <motion.div 
           className="relative w-full md:w-1/2 h-full group cursor-pointer overflow-hidden"
           onHoverStart={() => setActiveSplit('right')}
           onHoverEnd={() => setActiveSplit('both')}
           animate={{ flex: activeSplit === 'right' ? 2 : 1 }}
           transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
           <img src={truckImg} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
           <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
           
           <div className="absolute bottom-0 left-0 p-8 md:p-16 w-full bg-gradient-to-t from-black via-black/50 to-transparent">
              <Truck className="text-white w-12 h-12 mb-4" />
              <h3 className="text-5xl md:text-7xl font-heading text-white mb-2">STREET<br/>FOOD</h3>
              <p className="text-white/90 text-lg max-w-sm translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                 Giustino on the road. Per festival, open day aziendali e feste informali che lasciano il segno.
              </p>
           </div>
        </motion.div>
      </section>

      {/* --- 4. IL MENU (GALLERY PULITA) --- */}
      <section className="py-32 px-6 md:px-12 bg-background text-foreground overflow-hidden">
         <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-24 border-b-2 border-primary/10 pb-10">
               <div>
                  <span className="uppercase tracking-widest text-xs font-bold text-primary/60 mb-2 block">Dalla Terra al Piatto</span>
                  <h2 className="text-6xl md:text-9xl font-heading leading-none text-primary">IL GUSTO</h2>
               </div>
               <p className="text-right md:max-w-md text-xl text-primary/70 font-light mt-6 md:mt-0 font-heading">
                  Stagionalità, territorio e zero sprechi. <br/>
                  Creiamo il menù su misura per il tuo evento.
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
               {[
                  { title: "Benvenuto", desc: "Gnocco Fritto, Salumi DOP & Finger Food", img: food1 },
                  { title: "Tradizione", desc: "Pisarei e Fasö croccanti & Pasta Fresca", img: food2 },
                  { title: "Gourmet", desc: "Montanarina con Coppa Piacentina", img: food3 }
               ].map((item, i) => (
                  <motion.div 
                     key={i}
                     initial={{ opacity: 0, y: 50 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     transition={{ delay: i * 0.2, duration: 0.6 }}
                     className="group cursor-pointer"
                  >
                     <div className="aspect-[3/4] overflow-hidden bg-primary/5 mb-8 relative rounded-sm shadow-sm">
                        <img src={item.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        <div className="absolute top-4 left-4 border border-white/50 bg-white/30 backdrop-blur-md px-4 py-1 text-white text-xs font-bold tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                           Specialità
                        </div>
                     </div>
                     <h3 className="text-4xl font-heading mb-2 text-primary group-hover:translate-x-2 transition-transform">{item.title}</h3>
                     <p className="opacity-70 font-sans text-lg border-l-2 border-primary/20 pl-4 group-hover:border-primary transition-colors">{item.desc}</p>
                  </motion.div>
               ))}
            </div>
         </div>
      </section>

      {/* --- 5. CONTATTI (SPLIT FORM & CONTACTS) --- */}
      <section className="py-24 md:py-32 px-6 bg-background relative">
         <div className="max-w-7xl mx-auto bg-white shadow-2xl overflow-hidden flex flex-col md:flex-row rounded-lg">
            
            {/* LATO SX: INFO & CONTATTI (Verde) */}
            <div className="md:w-5/12 bg-primary text-background p-10 md:p-16 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 p-10 opacity-10 pointer-events-none">
                    <Utensils size={200} strokeWidth={0.5} />
                </div>

                <div className="relative z-10">
                    <span className="text-xs font-bold tracking-[0.2em] uppercase opacity-60 mb-6 block">Contattaci</span>
                    <h2 className="text-5xl md:text-6xl font-heading leading-none mb-8">PARLIAMONE.</h2>
                    <p className="font-sans font-light opacity-80 text-lg leading-relaxed mb-12">
                        Hai un'idea in mente? Che sia un matrimonio, un evento aziendale o una festa privata, siamo pronti a realizzarla.
                    </p>
                    
                    <div className="space-y-6 font-sans">
                        <div className="flex items-center gap-4 opacity-90 hover:opacity-100 transition-opacity">
                            <Mail className="w-5 h-5" />
                            <a href="mailto:info@giustefoodtruck.com" className="hover:underline">info@giustefoodtruck.com</a>
                        </div>
                        <div className="flex items-center gap-4 opacity-90">
                            <MapPin className="w-5 h-5" />
                            <span>Piacenza & Nord Italia</span>
                        </div>
                        <div className="flex items-center gap-4 opacity-90">
                            <Truck className="w-5 h-5" />
                            <span>Disponibili 7 giorni su 7</span>
                        </div>
                    </div>
                </div>

                <div className="mt-12 relative z-10">
                    <p className="text-xs uppercase tracking-widest opacity-40 mb-4">Seguici</p>
                    <div className="flex gap-4">
                        <a href="#" className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-primary transition-all"><Instagram size={18} /></a>
                        <a href="#" className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-primary transition-all"><Facebook size={18} /></a>
                    </div>
                </div>
            </div>

            {/* LATO DX: FORM (Bianco Pulito) */}
            <div className="md:w-7/12 p-10 md:p-16 bg-white">
               <form onSubmit={handleSubmit} className="space-y-10">
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                     <div className="relative group">
                        <input 
                           type="text" 
                           value={formData.name}
                           onChange={e => setFormData({...formData, name: e.target.value})}
                           className="block w-full border-0 border-b border-gray-300 py-3 bg-transparent text-primary focus:border-primary focus:ring-0 transition-colors placeholder:text-transparent peer" 
                           placeholder="Nome"
                           id="name"
                           required
                        />
                        <label htmlFor="name" className="absolute left-0 top-3 text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-primary peer-focus:font-bold peer-[&:not(:placeholder-shown)]:-top-4 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-primary uppercase tracking-widest cursor-text pointer-events-none">
                            Nome e Cognome
                        </label>
                     </div>

                     <div className="relative group">
                        <input 
                           type="email" 
                           value={formData.email}
                           onChange={e => setFormData({...formData, email: e.target.value})}
                           className="block w-full border-0 border-b border-gray-300 py-3 bg-transparent text-primary focus:border-primary focus:ring-0 transition-colors placeholder:text-transparent peer" 
                           placeholder="Email"
                           id="email"
                           required
                        />
                        <label htmlFor="email" className="absolute left-0 top-3 text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-primary peer-focus:font-bold peer-[&:not(:placeholder-shown)]:-top-4 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-primary uppercase tracking-widest cursor-text pointer-events-none">
                            Email
                        </label>
                     </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                     <div className="relative group">
                        <input 
                           type="date" 
                           value={formData.date}
                           onChange={e => setFormData({...formData, date: e.target.value})}
                           className="block w-full border-0 border-b border-gray-300 py-3 bg-transparent text-primary focus:border-primary focus:ring-0 transition-colors placeholder:text-transparent peer"
                           id="date" 
                        />
                        <label htmlFor="date" className="absolute left-0 -top-4 text-xs text-primary font-bold uppercase tracking-widest">
                            Data Indicativa
                        </label>
                     </div>

                     <div className="relative group">
                        <select 
                           value={formData.type}
                           onChange={e => setFormData({...formData, type: e.target.value})}
                           className="block w-full border-0 border-b border-gray-300 py-3 bg-transparent text-primary focus:border-primary focus:ring-0 transition-colors cursor-pointer"
                        >
                           <option value="private">Catering Privato</option>
                           <option value="wedding">Matrimonio</option>
                           <option value="corporate">Evento Aziendale</option>
                           <option value="truck">Food Truck</option>
                        </select>
                        <label className="absolute left-0 -top-4 text-xs text-primary font-bold uppercase tracking-widest">
                            Tipo di Evento
                        </label>
                     </div>
                  </div>

                  <div className="relative group">
                      <textarea 
                        rows="4"
                        value={formData.message}
                        onChange={e => setFormData({...formData, message: e.target.value})}
                        className="block w-full border-0 border-b border-gray-300 py-3 bg-transparent text-primary focus:border-primary focus:ring-0 transition-colors placeholder:text-transparent peer resize-none"
                        placeholder="Messaggio"
                        id="message"
                      ></textarea>
                      <label htmlFor="message" className="absolute left-0 top-3 text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-primary peer-focus:font-bold peer-[&:not(:placeholder-shown)]:-top-4 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-primary uppercase tracking-widest cursor-text pointer-events-none">
                          Raccontaci i dettagli
                      </label>
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                     <button 
                        disabled={status === 'sending'}
                        className="bg-primary text-white px-10 py-4 text-lg font-heading tracking-widest uppercase hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl active:scale-[0.98] disabled:opacity-50"
                     >
                        {status === 'sending' ? 'Invio...' : 'Invia Richiesta'}
                     </button>
                     
                     {status === 'success' && (
                         <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-green-600 font-bold flex items-center gap-2"
                         >
                             <CheckCircle2 size={20} />
                             <span>Messaggio Inviato!</span>
                         </motion.div>
                     )}
                  </div>
               </form>
            </div>
         </div>
      </section>

      {/* --- FOOTER: FINAL DESIGN (Massive & Clean) --- */}
      <footer className="bg-[#1a1a1a] text-[#F4F1EA] pt-24 pb-12 px-6 overflow-hidden relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 mb-24 relative z-10">
            {/* Colonna Brand */}
            <div className="md:col-span-5">
                <span className="text-primary text-xs font-bold tracking-[0.2em] uppercase mb-6 block">Est. 2018</span>
                <h3 className="text-3xl font-heading leading-tight mb-6">
                    Portiamo l'atmosfera <span className="text-primary">Giustè</span> ovunque tu sia.
                </h3>
                <p className="text-white/40 font-light max-w-sm">
                    Street food ribelle e catering sartoriale. <br/>
                    Piacenza e tutto il Nord Italia.
                </p>
            </div>

            {/* Colonna Contatti */}
            <div className="md:col-span-3 md:col-start-7">
                <h4 className="text-xs font-bold tracking-[0.2em] uppercase mb-8 text-white/30">Contatti</h4>
                <ul className="space-y-4 font-sans text-lg">
                    <li>
                        <a href="mailto:info@giustefoodtruck.com" className="hover:text-primary transition-colors flex items-center gap-3 group">
                            <span className="w-2 h-2 rounded-full bg-primary scale-0 group-hover:scale-100 transition-transform"/>
                            info@giustefoodtruck.com
                        </a>
                    </li>
                    <li>
                        <a href="tel:+393331234567" className="hover:text-primary transition-colors flex items-center gap-3 group">
                            <span className="w-2 h-2 rounded-full bg-primary scale-0 group-hover:scale-100 transition-transform"/>
                            +39 333 123 4567
                        </a>
                    </li>
                </ul>
            </div>

            {/* Colonna Social */}
            <div className="md:col-span-3">
                <h4 className="text-xs font-bold tracking-[0.2em] uppercase mb-8 text-white/30">Seguici</h4>
                <ul className="space-y-4 font-sans text-lg">
                    <li>
                        <a href="#" className="hover:text-primary transition-colors flex items-center gap-3 group">
                            <Instagram size={20} />
                            <span className="relative">
                                Instagram
                                <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-primary transition-all group-hover:w-full"/>
                            </span>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="hover:text-primary transition-colors flex items-center gap-3 group">
                            <Facebook size={20} />
                            <span className="relative">
                                Facebook
                                <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-primary transition-all group-hover:w-full"/>
                            </span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>

        {/* MASSIVE FOOTER TEXT */}
        <div className="border-t border-white/10 pt-12 flex flex-col md:flex-row justify-between items-end">
            <div className="w-full">
                <h1 className="text-[18vw] leading-[0.75] font-heading font-black text-primary/20 select-none text-center md:text-left tracking-tighter">
                    GIUSTÈ
                </h1>
            </div>
            <div className="w-full md:w-auto text-center md:text-right pb-4 md:pb-8 whitespace-nowrap">
                 <p className="text-xs text-white/20 uppercase tracking-widest">© {new Date().getFullYear()} All Rights Reserved</p>
            </div>
        </div>
      </footer>

    </div>
  );
};

export default CateringPage;