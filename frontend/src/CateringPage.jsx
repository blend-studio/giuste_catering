import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowRight, ChefHat, Mail, Mails, MapPin, Instagram, Phone, CheckCircle2, Utensils, Briefcase, ChevronDown, Menu, X, MessageSquareText } from 'lucide-react';

// --- CONFIGURATION ---
// PHP PURO: Puntiamo direttamente alla cartella dove risiedono i file .php
const API_BASE_URL = import.meta.env.PROD 
  ? 'https://giustefoodtruck.com/catering/backend' 
  : 'http://localhost:8000/backend'; // Assumi di servire la cartella backend localmente

const WhatsAppIcon = ({ size = 24, className = "" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    fill="currentColor" 
    viewBox="0 0 16 16"
    className={className}
  >
    <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
  </svg>
);

const MailCircleIcon = ({ size = 24, className = "" }) => (
  <div className={`bg-white rounded-full flex items-center justify-center p-1.5 ${className}`}>
    <Mail size={size} className="text-[#2b4432]" />
  </div>
);

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
      className={`flex flex-wrap justify-center font-heading font-normal uppercase tracking-tight leading-[0.9] whitespace-nowrap text-white ${className}`}
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
      className="text-primary text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-medium leading-[0.9]"
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

const FloatingContactButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  const containerVariants = {
    hidden: { opacity: 0, transition: { staggerChildren: 0.05, staggerDirection: -1 } },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.5 },
    show: { opacity: 1, y: 0, scale: 1 }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end pointer-events-none">
      <motion.div
        initial="hidden"
        animate={isOpen ? "show" : "hidden"}
        variants={containerVariants}
        className="flex flex-col items-end gap-3 mb-3 pointer-events-auto"
      >
        {/* Phone */}
        <motion.a
          href="tel:+393881589905"
          variants={itemVariants}
          className="w-14 h-14 bg-[#00d775] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        >
          <Phone size={20} />
        </motion.a>

        {/* WhatsApp */}
        <motion.a
          href="https://wa.me/393881589905"
          variants={itemVariants}
          className="w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        >
          <WhatsAppIcon size={20} />
        </motion.a>

        {/* Mail */}
        <motion.a
          href="mailto:info@giustefoodtruck.it"
          variants={itemVariants}
          className="w-14 h-14 bg-[#ff4b55] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        >
          <Mail size={20} />
        </motion.a>

        {/* Instagram */}
        <motion.a
          href="https://instagram.com"
          variants={itemVariants}
          className="w-14 h-14 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        >
          <Instagram size={20} />
        </motion.a>
      </motion.div>

      <div className="flex items-center gap-3 pointer-events-auto">
        <motion.div 
            key={isOpen ? 'close' : 'open'}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="bg-white px-3 py-1.5 rounded-lg shadow-md text-sm font-medium text-gray-700 hidden md:block"
        >
            {isOpen ? 'Chiudi' : 'Contattaci'}
        </motion.div>
        
        <button
          onClick={toggleOpen}
          className="w-14 h-14 rounded-full flex items-center justify-center text-white shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 bg-[#86d696]"
        >
          <motion.div
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {isOpen ? <X size={28} /> : <MessageSquareText size={28} />}
          </motion.div>
        </button>
      </div>
    </div>
  );
};

const ServiceCharterSection = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  const handleDownload = async (e) => {
    e.preventDefault();
    setStatus('loading');
    
    // CORREZIONE: Puntiamo al file PHP puro
    const apiUrl = `${API_BASE_URL}/download.php`;
    
    console.log('--- Downloading Service Charter ---');
    console.log('Target URL:', apiUrl);
    
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      console.log('Response Status:', response.status);

      if (!response.ok) {
         const text = await response.text(); 
         console.error('API Error Body:', text);
         throw new Error('Errore nel download: ' + response.statusText);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Carta-Servizi-Giuste.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
      setStatus('success');
    } catch (error) {
      console.error('Download Error:', error);
      setStatus('error');
    }
  };

  return (
    <section className="py-20 bg-primary/5 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-giuste p-8 md:p-12 shadow-xl flex flex-col md:flex-row items-center gap-10 border border-primary/10">
        <div className="flex-1 space-y-4 text-center md:text-left">
           <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto md:mx-0 mb-4">
              <Briefcase className="text-primary w-8 h-8" />
           </div>
           <h3 className="text-3xl font-heading font-bold text-primary">Carta dei Servizi</h3>
           <p className="opacity-80">Scarica il PDF per scoprire nel dettaglio le nostre proposte e modalità di servizio.</p>
        </div>
        
        <form onSubmit={handleDownload} className="flex-1 w-full flex flex-col gap-4">
            <input 
              type="email" 
              placeholder="La tua email" 
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-3 text-lg outline-none focus:border-primary transition-all text-primary placeholder:text-primary/40"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button 
              disabled={status === 'loading'}
              className="w-full bg-primary text-white py-3 rounded-xl font-bold uppercase tracking-widest hover:bg-primary/90 transition-all disabled:opacity-70 shadow-lg"
            >
              {status === 'loading' ? 'Scaricamento...' : 'Scarica PDF'}
            </button>
            {status === 'error' && <p className="text-red-500 text-sm text-center">Si è verificato un errore.</p>}
            {status === 'success' && <p className="text-green-600 text-sm text-center font-bold">Download avviato!</p>}
        </form>
      </div>
    </section>
  );
};

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
       <div className={`bg-[#2b4432] text-white px-6 transition-all duration-500 ease-in-out overflow-hidden ${isScrolled ? 'max-h-0 opacity-0' : 'max-h-20 py-3 opacity-100'}`}>
          <div className="max-w-7xl mx-auto flex justify-between items-center text-base font-medium tracking-wide">
             <div className="flex items-center gap-2">
                <div className="bg-white rounded-full flex items-center justify-center p-1.5">
                  <Mails size={16} className="text-[#2b4432]" />
                </div>
                <a href="mailto:info@giustefoodtruck.it" className="hover:opacity-80 transition-opacity">info@giustefoodtruck.it</a>
             </div>
             <div className="flex items-center gap-4">
                 <div className="bg-white rounded-full flex items-center justify-center p-1.5">
                    <Instagram size={16} className="text-[#2b4432]" />
                 </div>
             </div>
          </div>
       </div>

       <div className={`bg-white shadow-md transition-all duration-300 ${isScrolled ? 'py-2' : 'py-4'}`}>
          <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
             <a href="https://giustefoodtruck.com/" className="block">
                <img 
                   src="https://giustefoodtruck.com/wp-content/uploads/2023/03/logo-verde.png" 
                   alt="Giustè Logo" 
                   className={`object-contain transition-all duration-300 ${isScrolled ? 'h-12' : 'h-24 sm:h-18'}`} 
                />
             </a>

             <nav className="hidden lg:flex items-center gap-8">
                {navLinks.map(link => (
                   <a 
                     key={link.name} 
                     href={link.href}
                     className="text-[#2b4432] font-semibold text-base tracking-widest hover:text-[#5c8a66] transition-colors"
                   >
                     {link.name}
                   </a>
                ))}
                
                <a 
                   href="#contact"
                   className="ml-6 block bg-[#2b4432] text-white px-8 py-2 rounded-xl font-medium text-base active:scale-95 transition-all duration-300 hover:bg-[#fdd017] hover:text-[#2b4432]"
                >
                   Contattaci
                </a>
             </nav>

             <div className="flex items-center lg:hidden">
                <button className="text-[#2b4432]" onClick={() => setIsOpen(!isOpen)}>
                   {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
             </div>
          </div>
       </div>

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
  const [formData, setFormData] = useState({ name: '', email: '', type: 'private', date: '', message: '' });
  const [status, setStatus] = useState('');
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const yParallax = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    
    // CORREZIONE: Puntiamo al file PHP puro
    const apiUrl = `${API_BASE_URL}/contact.php`;
    
    console.log('--- Submitting Inquiry ---');
    console.log('Target URL:', apiUrl);
    console.log('Payload:', formData);

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log('Response Status:', response.status, response.statusText);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Invalid JSON response' }));
        console.error('API Error Response:', errorData);
        throw new Error(errorData.message || 'Something went wrong');
      }

      const data = await response.json();
      console.log('Success Response:', data);
      setStatus('success');
      setFormData({ name: '', email: '', type: 'private', date: '', message: '' });
    } catch (error) {
      console.error('Fetch Error:', error);
      setStatus('error');
    }
  };

  return (
    <div ref={containerRef} className="bg-background text-primary font-sans selection:bg-primary selection:text-background overflow-x-hidden w-full scroll-smooth">
      <Navbar />
      <FloatingContactButton />
      <NoiseOverlay />
      
      {/* --- HERO SECTION --- */}
      <section className="relative h-[100dvh] w-full flex flex-col justify-center items-center overflow-hidden">
            <motion.div style={{ y: yParallax }} className="absolute top-[-25%] left-0 w-full h-[150%] z-0">
                <img 
                   src={heroImage} 
                   alt="Giustè Catering" 
                   className="w-full h-full object-cover object-center" 
                />
                <div className="absolute inset-0 bg-black/60"></div>
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

                   <div className="flex flex-col items-center gap-2">
                      <StaggeredHeroText text="GIUSTÈ" className="text-[10vw] sm:text-[10vw] md:text-[10vw] leading-[0.8] text-white drop-shadow-xl" />
                      <StaggeredHeroText text="CATERING" className="text-[10vw] sm:text-[10vw] md:text-[10vw] leading-[0.8] text-white drop-shadow-xl" />
                   </div>

                </motion.div>
            </div>

        <a 
            href="#manifesto" 
            onClick={(e) => {
                e.preventDefault();
                document.getElementById('manifesto')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="absolute bottom-8 text-white flex flex-col items-center gap-1 cursor-pointer block left-1/2 -translate-x-1/2"
        >
             <motion.div 
                className="flex flex-col items-center gap-1"
                animate={{ y: [0, 10, 0] }}
                whileTap={{ scale: 0.9 }}
                transition={{ repeat: Infinity, duration: 2 }}
            >
                 <span className="text-sm sm:text-base uppercase tracking-widest font-bold opacity-80">Scorri</span>
                 <ArrowRight className="rotate-90 w-6 h-6 sm:w-8 sm:h-8" />
             </motion.div>
        </a>
      </section>

      {/* --- MANIFESTO --- */}
      <section id="manifesto" className="py-20 sm:py-24 px-6 md:px-12 max-w-7xl mx-auto">
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
                     <h3 className="text-3xl sm:text-4xl md:text-5xl font-heading font-medium mb-2">Eventi Privati</h3>
                     <p className="font-light opacity-90 max-w-md text-sm sm:text-base">Matrimoni, cene in villa, feste private. Catering sartoriale per rendere unico il tuo giorno.</p>
                  </div>
               </motion.div>

               {/* Card 2: EVENTI AZIENDALI */}
               <motion.div 
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
                  className="group relative h-[55vh] sm:h-[60vh] overflow-hidden rounded-giuste cursor-pointer shadow-lg"
               >
                  <img src={logistica} className="w-full h-full object-cover object-right transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/10 transition-colors"></div>
                  <div className="absolute bottom-0 left-0 p-6 sm:p-10 w-full bg-gradient-to-t from-primary/90 to-transparent text-[#ececec]">
                     <Briefcase className="mb-4 w-8 h-8" />
                     <h3 className="text-3xl sm:text-4xl md:text-5xl font-heading font-medium mb-2">Eventi Aziendali</h3>
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
                  <h4 className="text-2xl sm:text-3xl font-heading font-medium mb-2">Tradizione</h4>
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
                  <h4 className="text-2xl sm:text-3xl font-heading font-medium mb-2">Gourmet</h4>
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
                  <h4 className="text-2xl sm:text-3xl font-heading font-medium mb-2">Aperitivi</h4>
                  <p className="text-sm opacity-70 mb-6 font-light">Polpette, Panini Gourmet, Fritti d'autore.</p>
                  <img src={food1} className="w-full aspect-square object-cover rounded-giuste shadow-sm" />
               </div>
            </motion.div>
         </motion.div>
      </section>

      {/* --- CONTATTI --- */}
      <section id="contact" className="py-24 bg-white text-gray-700 px-6">
         <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
               <span className="text-xs font-bold tracking-[0.2em] uppercase mb-4 block opacity-60 text-primary">Parliamone</span>
               <h2 className="text-3xl sm:text-5xl md:text-7xl font-heading font-medium text-primary">ORGANIZZIAMO?</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
               <div className="space-y-8 font-light text-lg">
                  <div className="absolute top-0 right-0 p-10 opacity-10 pointer-events-none">
                      <Utensils size={200} strokeWidth={0.5} />
                  </div>
                  <p className="text-2xl">Raccontaci la tua idea.</p>
                  <p className="opacity-80">Ti risponderemo entro 24h con una proposta cucita su misura per il tuo evento privato o aziendale.</p>
                  <div className="space-y-6 text-base mt-8 relative z-10">
                      <a href="mailto:info@giustefoodtruck.it" className="flex items-center gap-4 hover:opacity-70 transition-opacity"><MailCircleIcon size={24}/> info@giustefoodtruck.it</a>
                      <a href="tel:+393881589905" className="flex items-center gap-4 hover:opacity-70 transition-opacity"><Phone className="w-6 h-6"/> +39 388 1589905</a>
                      <div className="flex items-center gap-4 opacity-70"><MapPin className="w-6 h-6"/> Piacenza e Nord Italia</div>
                  </div>
               </div>

               <motion.form 
                  onSubmit={handleSubmit} 
                  className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-2xl relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4"
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
                     <label className="text-xs uppercase tracking-widest opacity-70 font-bold ml-1 text-primary">Nome</label>
                     <input 
                       type="text" 
                       placeholder="Il tuo nome"
                       className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-3 text-lg text-primary focus:border-primary focus:bg-white outline-none transition-all placeholder:text-gray-400"
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
                     <label className="text-xs uppercase tracking-widest opacity-70 font-bold ml-1 text-primary">Email</label>
                     <input 
                       type="email" 
                       placeholder="tua@email.com"
                       className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-3 text-lg text-primary focus:border-primary focus:bg-white outline-none transition-all placeholder:text-gray-400"
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
                     <label className="text-xs uppercase tracking-widest opacity-70 font-bold ml-1 text-primary">Tipo Evento</label>
                     <div className="relative">
                        <select 
                           value={formData.type}
                           onChange={e => setFormData({...formData, type: e.target.value})}
                           className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-3 text-lg text-primary focus:border-primary focus:bg-white outline-none transition-all appearance-none cursor-pointer"
                        >
                           <option value="private">Catering Privato</option>
                           <option value="wedding">Matrimonio</option>
                           <option value="corporate">Evento Aziendale</option>
                        </select>
                        <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 opacity-50 pointer-events-none text-primary" size={20} />
                     </div>
                  </motion.div>

                  <motion.div
                     variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                     }}
                     className="space-y-2 col-span-1 md:col-span-2"
                  >
                     <label className="text-xs uppercase tracking-widest opacity-70 font-bold ml-1 text-primary">Data Evento</label>
                     <input
                       type="date"
                       className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-3 text-lg text-primary focus:border-primary focus:bg-white outline-none transition-all placeholder:text-gray-400 appearance-none min-w-0"
                       value={formData.date}
                       onChange={e => setFormData({...formData, date: e.target.value})}
                     />
                  </motion.div>

                  <motion.div 
                     variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                     }}
                     className="space-y-2 col-span-1 md:col-span-2"
                  >
                     <label className="text-xs uppercase tracking-widest opacity-70 font-bold ml-1 text-primary">Messaggio</label>
                     <textarea 
                       rows="4"
                       placeholder="Raccontaci i dettagli del tuo evento..."
                       className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-3 text-lg text-primary focus:border-primary focus:bg-white outline-none transition-all resize-none placeholder:text-gray-400"
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
                        className="w-full bg-primary text-white py-4 rounded-xl text-lg font-bold uppercase tracking-widest hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg disabled:opacity-70 disabled:pointer-events-none"
                      >
                         {status === 'sending' ? 'Invio...' : 'Invia Richiesta'}
                      </button>
                      {status === 'success' && <p className="text-green-600 text-center font-bold mt-4 animate-pulse">Messaggio inviato con successo!</p>}
                      {status === 'error' && <p className="text-red-600 text-center font-bold mt-4">Errore nell'invio del messaggio. Riprova più tardi.</p>}
                  </motion.div>
               </motion.form>
            </div>
         </div>
      </section>

      {/* --- SERVICE CHARTER --- */}
      <ServiceCharterSection />

      {/* --- FOOTER --- */}
      <footer className="bg-[#f0f0f0] text-[#2b4432] pt-12 sm:pt-16 pb-12 relative">

        {/* Decorative Images */}
        <img 
            src="https://giustefoodtruck.com/wp-content/uploads/2023/03/footer-sx-giuste.png" 
            alt="Decoration Left" 
            className="hidden xl:block absolute bottom-0 left-0 h-[180%] w-auto opacity-80 pointer-events-none z-0 mix-blend-multiply"
        />
        <img 
            src="https://giustefoodtruck.com/wp-content/uploads/2023/03/footer-dx-giuste.png" 
            alt="Decoration Right" 
            className="hidden xl:block absolute bottom-0 right-0 h-[180%] w-auto opacity-80 pointer-events-none z-0 mix-blend-multiply"
        />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Navigation Links */}
          <div className="flex justify-center flex-wrap gap-x-12 gap-y-6 py-8">
            <a href="https://giustefoodtruck.com/" className="font-heading font-medium text-lg tracking-widest hover:text-[#5c8a66] transition-colors">HOME</a>
            <a href="https://giustefoodtruck.com/chi-siamo/" className="font-heading font-medium text-lg tracking-widest hover:text-[#5c8a66] transition-colors">NOI DUE</a>
            <a href="https://giustefoodtruck.com/servizi/" className="font-heading font-medium text-lg tracking-widest hover:text-[#5c8a66] transition-colors">COSA FACCIAMO</a>
            <a href="https://giustefoodtruck.com/social-feed/" className="font-heading font-medium text-lg tracking-widest hover:text-[#5c8a66] transition-colors">SOCIAL FEED</a>
          </div>

          {/* Horizontal Line */}
          <div className="border-t-2 border-[#2b4432] my-10 w-full"></div>

          {/* Copyright and Socials */}
          <div className="flex flex-col sm:flex-row justify-between items-center text-sm font-medium opacity-80">
            <p className="mb-4 sm:mb-0 tracking-wide">© {new Date().getFullYear()} Giustè Food Truck | By Blend Studio</p>
            <a href="https://instagram.com" className="hover:text-[#5c8a66] transition-colors underline underline-offset-4 decoration-[#2b4432]/30">Instagram</a>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default CateringPage;