import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Leaf, Truck, UtensilsCrossed, Instagram, Facebook, Mail } from 'lucide-react';

// Importa le nuove immagini
import heroImage from './assets/images/Giustino - Lato Destro - JPEG.webp';
import image1 from './assets/images/Spolpette.webp';
import image2 from './assets/images/Pisarei fagioli croccanti.webp';
import image3 from './assets/images/Montanarina Coppa.jpg';
import image4 from './assets/images/Giusté + Giustino 1 - JPEG.webp';

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.6, -0.05, 0.01, 0.99] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const galleryImages = [
    { src: image1, alt: "Spolpette artigianali" },
    { src: image2, alt: "Pisarei e fagioli croccanti" },
    { src: image3, alt: "Montanarina con coppa" },
    { src: image4, alt: "Il food truck Giusté" }
];

const CateringPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '', date: '', type: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const response = await fetch('https://api.giustefoodtruck.com/api/catering-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '', date: '', type: '' });
      } else { throw new Error('Network response was not ok.'); }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <div className="bg-background text-foreground min-h-screen selection:bg-primary selection:text-primary-foreground">

      {/* --- HERO SECTION --- */}
      <section className="relative h-[90vh] md:h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={heroImage} alt="Giustè Food Truck per catering" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 via-transparent"></div>

        <div className="z-20 text-center text-white px-4">
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.6, -0.05, 0.01, 0.99] }}
            className="text-6xl md:text-9xl font-heading font-extrabold tracking-wider uppercase"
          >
            L'Esperienza Giustè
          </motion.h1>
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.6, -0.05, 0.01, 0.99] }}
            className="text-lg md:text-xl mt-4 max-w-2xl font-sans font-light"
          >
            Portiamo la nostra passione per il cibo autentico e la convivialità ovunque tu sia.
          </motion.p>
        </div>
      </section>
      
      {/* --- PUNTI DI FORZA --- */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-card">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-20 text-center"
        >
          {[
            { icon: Truck, title: "Dentro e Fuori dal Truck", text: "Allestiamo cucine professionali in qualsiasi location o arriviamo direttamente con il nostro iconico food truck." },
            { icon: UtensilsCrossed, title: "Menù Sartoriale", text: "Creiamo esperienze di gusto su misura: dalla tradizione piacentina a proposte 100% vegetali, con attenzione a ogni esigenza." },
            { icon: Leaf, title: "Filosofia Sostenibile", text: "Valorizziamo ogni ingrediente con un approccio 'zero sprechi', selezionando produttori locali e rispettando la stagionalità." }
          ].map((item, i) => (
            <motion.div key={i} variants={fadeInUp} className="flex flex-col items-center">
              <div className="mb-6 text-primary"><item.icon size={44} strokeWidth={1.5}/></div>
              <h3 className="text-2xl font-heading mb-4 tracking-wide">{item.title}</h3>
              <p className="text-base leading-relaxed text-muted-foreground">{item.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* --- IMAGE GALLERY --- */}
      <section className="py-24 md:py-32 bg-accent">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div initial={{ y: 40, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true, amount: 0.5 }} className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-heading tracking-wider">Un Assaggio di Giustè</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">La qualità delle materie prime, la cura nella preparazione.</p>
          </motion.div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
            {galleryImages.map((img, index) => (
              <motion.div key={index} variants={fadeInUp} className="overflow-hidden rounded-md group relative shadow-md">
                <div className="aspect-w-1 aspect-h-1">
                  <img src={img.src} alt={img.alt} className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-in-out" />
                </div>
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- CONTACT FORM --- */}
      <section className="py-24 md:py-32 bg-card">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div initial={{ y: 40, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} className="mb-12">
            <h2 className="text-5xl md:text-6xl font-heading tracking-wider">Organizza il Tuo Evento</h2>
            <p className="mt-4 text-lg text-muted-foreground">Hai un'idea? Raccontacela. Costruiremo insieme un'esperienza indimenticabile.</p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-8 text-left">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <input type="text" name="name" placeholder="Nome e Cognome" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="form-input" required />
              <input type="email" name="email" placeholder="La tua Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="form-input" required />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <input type="date" name="date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} className="form-input text-muted-foreground" required/>
              <select name="type" value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})} className="form-input text-muted-foreground" required>
                <option value="" disabled>Tipo di Evento</option>
                <option value="private">Evento Privato (Senza Truck)</option>
                <option value="truck">Evento con Food Truck</option>
                <option value="corporate">Evento Aziendale</option>
                <option value="other">Altro</option>
              </select>
            </div>
            <textarea name="message" placeholder="Descrivi brevemente il tuo evento..." value={formData.message} rows="5" onChange={(e) => setFormData({...formData, message: e.target.value})} className="form-input" required></textarea>
            
            <div className="text-center pt-4">
              <motion.button type="submit" whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} className="bg-primary text-primary-foreground px-12 py-4 text-sm font-bold tracking-widest uppercase rounded-sm shadow-lg hover:shadow-primary/40 transition-all duration-300 disabled:opacity-50" disabled={status === 'loading'}>
                {status === 'loading' ? 'Invio in corso...' : 'Invia la Richiesta'}
              </motion.button>
            </div>
            
            <div className="text-center mt-6 h-6">
              {status === 'success' && <p className="text-green-600">Messaggio inviato! Ti risponderemo al più presto.</p>}
              {status === 'error' && <p className="text-red-600">Ops, qualcosa è andato storto. Riprova.</p>}
            </div>
          </form>
        </div>
      </section>
      
      {/* --- FOOTER --- */}
      <footer className="bg-foreground text-background">
          <div className="max-w-7xl mx-auto py-12 px-6 md:px-12 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
              <div className="mb-6 md:mb-0">
                  <h4 className="font-heading text-2xl tracking-wider">Giustè</h4>
                  <p className="text-sm text-muted-foreground font-light">&copy; {new Date().getFullYear()} Giustè Food Truck. Tutti i diritti riservati.</p>
              </div>
              <div className="flex space-x-6">
                  <a href="#" className="text-background hover:text-primary transition-colors"><Instagram size={24} /></a>
                  <a href="#" className="text-background hover:text-primary transition-colors"><Facebook size={24} /></a>
                  <a href="mailto:info@giustefoodtruck.com" className="text-background hover:text-primary transition-colors"><Mail size={24} /></a>
              </div>
          </div>
      </footer>
    </div>
  );
};

export default CateringPage;