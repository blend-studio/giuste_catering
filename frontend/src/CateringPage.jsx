import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Leaf, Calendar, Truck, ChefHat, UtensilsCrossed, ArrowRight } from 'lucide-react';

// Configurazione animazioni base
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const CateringPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '', date: '' });
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Chiamata all'API Laravel (implementata sotto)
    try {
        const response = await fetch('https://api.giustefoodtruck.com/api/catering-inquiry', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        if(response.ok) setStatus('success');
    } catch (err) {
        setStatus('error');
    }
  };

  return (
    <div className="bg-[#325541] text-white min-h-screen font-sans selection:bg-white selection:text-[#325541]">
      
      {/* --- HERO SECTION --- */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Placeholder per Immagine da NAS: 20250410_Giusté_Truck_Jpeg_HR */}
        <div className="absolute inset-0 z-0 opacity-40">
           <img 
             src="/path/to/hero-image.jpg" // CAMBIARE CON PERCORSO REALE
             alt="Giustè Catering Experience" 
             className="w-full h-full object-cover"
           />
        </div>
        
        <div className="z-10 text-center px-4 max-w-5xl">
          <motion.h1 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, type: "spring" }}
            className="text-6xl md:text-8xl font-bold tracking-tighter mb-6 uppercase"
          >
            Non Solo Truck
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-xl md:text-2xl font-light tracking-widest border-t border-b border-white/30 py-4 inline-block"
          >
            L'esperienza Giustè, ovunque tu voglia.
          </motion.p>
        </div>
      </section>

      {/* --- CONCETTI CHIAVE (Grid) --- */}
      <section className="py-24 px-6 md:px-20 bg-white text-[#325541]">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12"
        >
          {/* Card 1 */}
          <motion.div variants={fadeInUp} className="group">
            <div className="mb-6 p-4 border-2 border-[#325541] rounded-full w-20 h-20 flex items-center justify-center group-hover:bg-[#325541] group-hover:text-white transition-colors duration-300">
              <Truck size={40} />
            </div>
            <h3 className="text-2xl font-bold mb-3 uppercase">Con o Senza Truck</h3>
            <p className="text-lg leading-relaxed opacity-80">
              Eventi privati in location esclusive? Veniamo noi da te. 
              Non serve il camioncino per portare il gusto. Allestiamo la cucina ovunque.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div variants={fadeInUp} className="group">
            <div className="mb-6 p-4 border-2 border-[#325541] rounded-full w-20 h-20 flex items-center justify-center group-hover:bg-[#325541] group-hover:text-white transition-colors duration-300">
              <UtensilsCrossed size={40} />
            </div>
            <h3 className="text-2xl font-bold mb-3 uppercase">Menù Sartoriale</h3>
            <p className="text-lg leading-relaxed opacity-80">
              Dalla tradizione al 100% vegetale. Creiamo il menù su misura per le tue esigenze, 
              con opzioni vegane, vegetariane e intolleranze incluse.
            </p>
          </motion.div>

           {/* Card 3 */}
           <motion.div variants={fadeInUp} className="group">
            <div className="mb-6 p-4 border-2 border-[#325541] rounded-full w-20 h-20 flex items-center justify-center group-hover:bg-[#325541] group-hover:text-white transition-colors duration-300">
              <Calendar size={40} />
            </div>
            <h3 className="text-2xl font-bold mb-3 uppercase">Sempre Presenti</h3>
            <p className="text-lg leading-relaxed opacity-80">
              Siamo operativi <strong>7 giorni su 7</strong>. Che sia un brunch domenicale o una cena aziendale del martedì, Giustè risponde.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* --- SEZIONE SOSTENIBILITÀ (Parallax/Big Impact) --- */}
      <section className="py-32 px-6 bg-[#325541] relative overflow-hidden flex items-center">
        {/* Decorazione Sfondo Animata */}
        <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
            className="absolute -right-20 -top-20 opacity-10"
        >
            <Leaf size={400} />
        </motion.div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center z-10">
          <motion.div 
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-7xl font-bold mb-8">Radici &<br/>Sostenibilità</h2>
            <div className="space-y-6 text-xl font-light">
              <p>
                Il nostro cuore batte per il territorio. Utilizziamo erbe stagionali e prodotti locali, 
                rispettando la tradizione ma guardando al futuro.
              </p>
              <p className="flex items-start gap-3">
                <Leaf className="text-green-300 mt-1 shrink-0" />
                <span>
                  <strong>Filosofia Zero Sprechi:</strong> Ogni parte dell'ingrediente viene valorizzata. 
                  Dalla buccia al cuore, cuciniamo con rispetto per la natura.
                </span>
              </p>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ margin: "-100px" }}
            className="relative h-[500px] border border-white/20 p-4"
          >
             {/* Placeholder immagine piatto: 20250410_Giusté_Truck_Jpeg_HR */}
             <div className="w-full h-full bg-stone-800 overflow-hidden relative group">
                <img 
                    src="/path/to/food-detail.jpg" 
                    alt="Dettaglio Cibo Sostenibile" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute bottom-4 left-4 bg-white text-[#325541] px-4 py-1 text-sm font-bold">
                    STAGIONALITÀ GARANTITA
                </div>
             </div>
          </motion.div>
        </div>
      </section>

      {/* --- CONTACT FORM --- */}
      <section className="py-24 bg-zinc-900 text-white relative">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Organizziamo il tuo evento?</h2>
            <p className="text-gray-400">Compila il form. Ti risponderemo prima che si raffreddi il forno.</p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input 
                    type="text" 
                    placeholder="Nome e Cognome" 
                    className="w-full bg-transparent border-b border-gray-600 p-4 focus:border-[#325541] focus:outline-none transition-colors"
                    onChange={e => setFormData({...formData, name: e.target.value})}
                />
                <input 
                    type="email" 
                    placeholder="Email" 
                    className="w-full bg-transparent border-b border-gray-600 p-4 focus:border-[#325541] focus:outline-none transition-colors"
                    onChange={e => setFormData({...formData, email: e.target.value})}
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input 
                    type="date" 
                    className="w-full bg-transparent border-b border-gray-600 p-4 focus:border-[#325541] focus:outline-none transition-colors text-gray-400"
                    onChange={e => setFormData({...formData, date: e.target.value})}
                />
                <select 
                     className="w-full bg-transparent border-b border-gray-600 p-4 focus:border-[#325541] focus:outline-none transition-colors bg-zinc-900"
                     onChange={e => setFormData({...formData, type: e.target.value})}
                >
                    <option>Tipo di Evento</option>
                    <option value="private">Privato (No Truck)</option>
                    <option value="truck">Con Truck</option>
                    <option value="corporate">Aziendale</option>
                </select>
            </div>
            <textarea 
                placeholder="Raccontaci le tue esigenze (es. opzioni vegane, numero persone...)" 
                rows="4"
                className="w-full bg-transparent border-b border-gray-600 p-4 focus:border-[#325541] focus:outline-none transition-colors"
                onChange={e => setFormData({...formData, message: e.target.value})}
            ></textarea>

            <motion.button 
                whileHover={{ scale: 1.05, backgroundColor: "#ffffff", color: "#325541" }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#325541] text-white px-12 py-4 text-lg font-bold tracking-wider w-full md:w-auto mt-8 flex items-center justify-center gap-2 mx-auto"
            >
                INVIA RICHIESTA <ArrowRight size={20} />
            </motion.button>

            {status === 'success' && <p className="text-green-500 text-center mt-4">Messaggio ricevuto! A presto.</p>}
          </form>
        </div>
      </section>
    </div>
  );
};

export default CateringPage;