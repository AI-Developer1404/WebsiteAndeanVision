import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { Mail, Send, MapPin, Instagram } from 'lucide-react';

const AboutPage: React.FC = () => {
    const { language } = useLanguage();

    // Ideally this would come from a data file too, but for speed keeping it internal for now
    const text = {
        en: {
            title: "The Creator",
            subtitle: "An invisible thread connecting past and future.",
            intro: "Born in the shadow of the Misti volcano, raised among the imperial stones of Cusco. I am a child of two worlds.",
            philosophy: "Culture is not a relic to be kept in a museum. It is a living, breathing entity. My work is not about preserving the past, but projecting it into the future.",
            anonymous: "The face does not matter. Only the vision remains.",
            contact: {
                title: "Connect",
                subtitle: "Have a vision to share?",
                name: "Name",
                email: "Email",
                message: "Message",
                send: "Send Message",
                success: "Message sent into the ether."
            }
        },
        es: {
            title: "El Creador",
            subtitle: "Un hilo invisible conectando pasado y futuro.",
            intro: "Nacido a la sombra del volcán Misti, criado entre las piedras imperiales de Cusco. Soy hijo de dos mundos.",
            philosophy: "La cultura no es una reliquia para guardar en un museo. Es una entidad viva y constante. Mi trabajo no trata de preservar el pasado, sino de proyectarlo al futuro.",
            anonymous: "El rostro no importa. Solo la visión permanece.",
            contact: {
                title: "Conectar",
                subtitle: "¿Tienes una visión para compartir?",
                name: "Nombre",
                email: "Correo",
                message: "Mensaje",
                send: "Enviar Mensaje",
                success: "Mensaje enviado al éter."
            }
        }
    };

    const t = text[language];
    const { scrollY } = useScroll();

    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const opacityHero = useTransform(scrollY, [0, 300], [1, 0]);

    const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFormState('submitting');
        setTimeout(() => setFormState('success'), 1500);
    };

    return (
        <div className="bg-neutral-950 min-h-screen text-white font-sans overflow-hidden selection:bg-andean-gold selection:text-black">

            {/* Ambient Grain/Noise Overlay */}
            <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-50 mix-blend-overlay"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
            />

            {/* Hero - The Silhouette */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-neutral-950 to-neutral-950 z-0" />

                {/* Parallax Fog/Mountain Layers */}
                <motion.div style={{ y: y1 }} className="absolute inset-0 opacity-40">
                    <img
                        src="https://images.unsplash.com/photo-1543385426-18c5f8b074d6?q=80&w=2670&auto=format&fit=crop"
                        alt="Mist"
                        className="w-full h-full object-cover grayscale brightness-50"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />
                </motion.div>

                <motion.div
                    style={{ opacity: opacityHero }}
                    className="relative z-10 text-center max-w-3xl px-6"
                >
                    <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 80 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="w-[1px] bg-gradient-to-b from-transparent via-andean-gold to-transparent mx-auto mb-8"
                    />
                    <h1 className="text-5xl md:text-8xl font-serif mb-6 tracking-tight text-white drop-shadow-2xl">{t.title}</h1>
                    <p className="text-gray-400 text-lg uppercase tracking-[0.3em] font-light">{t.subtitle}</p>
                </motion.div>
            </section>

            {/* Narrative Stream */}
            <section className="relative py-32 px-6 overflow-hidden">
                {/* Connecting Line */}
                <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/5 -translate-x-1/2 hidden md:block" />

                <div className="max-w-5xl mx-auto space-y-40 relative z-10">

                    {/* Block 1 */}
                    <div className="flex flex-col md:flex-row gap-12 items-center relative">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="w-full md:w-1/2 aspect-[4/5] bg-neutral-900 rounded-sm overflow-hidden relative group"
                        >
                            <div className="absolute inset-0 bg-andean-gold/10 z-10 group-hover:bg-transparent transition-colors duration-500" />
                            <img
                                src="/author arquipa.png"
                                alt="Arequipa"
                                loading="lazy"
                                className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000 grayscale group-hover:grayscale-0"
                            />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="w-full md:w-1/2 md:pl-12"
                        >
                            <span className="text-andean-gold text-xs font-mono mb-4 block">01 / GENESIS</span>
                            <h2 className="text-4xl font-serif text-white mb-8">Arequipa</h2>
                            <p className="text-xl text-gray-400 leading-relaxed font-light border-l border-andean-gold/30 pl-6 italic">
                                "{t.intro}"
                            </p>
                        </motion.div>
                    </div>

                    {/* Block 2 */}
                    <div className="flex flex-col md:flex-row-reverse gap-12 items-center relative">
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="w-full md:w-1/2 aspect-[4/5] bg-neutral-900 rounded-sm overflow-hidden relative group"
                        >
                            <div className="absolute inset-0 bg-andean-gold/10 z-10 group-hover:bg-transparent transition-colors duration-500" />
                            <img
                                src="/author cusco.png"
                                alt="Cusco"
                                loading="lazy"
                                className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000 grayscale group-hover:grayscale-0"
                            />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="w-full md:w-1/2 md:pr-12 text-right"
                        >
                            <span className="text-andean-gold text-xs font-mono mb-4 block">02 / VISION</span>
                            <h2 className="text-4xl font-serif text-white mb-8">Cusco</h2>
                            <p className="text-xl text-gray-400 leading-relaxed font-light border-r border-andean-gold/30 pr-6 italic ml-auto max-w-md">
                                "{t.philosophy}"
                            </p>
                        </motion.div>
                    </div>

                    {/* Block 3 - The Journey */}
                    <div className="flex flex-col gap-12 items-center relative">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="w-full max-w-3xl text-center"
                        >
                            <span className="text-andean-gold text-xs font-mono mb-4 block">03 / THE JOURNEY</span>
                            <h2 className="text-4xl font-serif text-white mb-12">The Calling</h2>

                            <div className="space-y-8 text-gray-300 leading-loose font-light text-lg">
                                <p className="text-left border-l border-andean-gold/30 pl-6">
                                    I remember the first time I truly saw Machu Picchu—not as a tourist, but as someone who carries its stones in their blood. I was 17, standing at sunrise watching the mist dissolve like memories becoming present. That's when I understood: this wasn't just architecture. It was a language waiting to be translated for the modern world.
                                </p>

                                <p className="text-left border-l border-andean-gold/30 pl-6">
                                    My grandmother weaves textiles in Chinchero. Each thread carries a story, each pattern encodes wisdom passed down through generations. She taught me that art is not decoration—it's documentation of who we are. When I create music, compose visuals, or write about our culture, I'm doing what she does with her loom: I'm weaving connections between worlds.
                                </p>

                                <p className="text-left border-l border-andean-gold/30 pl-6">
                                    This digital souvenir isn't a product. It's a ceremony. Every song echoes the winds that carved these valleys. Every recipe holds the warmth of communal fires. Every artwork captures light the way our ancestors captured eternity in stone. I stay anonymous because the work should speak louder than the creator. What matters is that when you experience these pieces, you feel what I felt that morning—connected to something timeless, something sacred, something achingly beautiful.
                                </p>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </section>

            {/* Contact Section */}
            <section className="py-32 px-6 bg-neutral-950 border-t border-white/5">
                <div className="max-w-4xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-16">

                        {/* Contact Info */}
                        <div>
                            <h2 className="text-4xl font-serif mb-4 text-white">{t.contact.title}</h2>
                            <p className="text-gray-400 mb-12 font-light">{t.contact.subtitle}</p>

                            <div className="space-y-8">
                                <div className="flex items-center gap-4 text-gray-300 hover:text-andean-gold transition-colors cursor-pointer">
                                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                                        <Mail size={20} />
                                    </div>
                                    <span className="font-light tracking-wide">hello@andeanvisions.com</span>
                                </div>
                                <div className="flex items-center gap-4 text-gray-300 hover:text-andean-gold transition-colors cursor-pointer">
                                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                                        <Instagram size={20} />
                                    </div>
                                    <span className="font-light tracking-wide">@andean_visions</span>
                                </div>
                                <div className="flex items-center gap-4 text-gray-300 hover:text-andean-gold transition-colors cursor-pointer">
                                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                                        <MapPin size={20} />
                                    </div>
                                    <span className="font-light tracking-wide">Cusco, Perú</span>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
                            {formState === 'success' ? (
                                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                                    <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mb-6">
                                        <Send size={24} />
                                    </div>
                                    <h3 className="text-xl font-serif text-white mb-2">Message Sent</h3>
                                    <p className="text-gray-400">{t.contact.success}</p>
                                    <button
                                        onClick={() => setFormState('idle')}
                                        className="mt-8 text-xs text-gray-500 hover:text-white underline"
                                    >
                                        Send another
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label htmlFor="name" className="block text-xs uppercase tracking-widest text-gray-500 mb-2">{t.contact.name}</label>
                                        <input
                                            type="text"
                                            id="name"
                                            required
                                            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-andean-gold transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-xs uppercase tracking-widest text-gray-500 mb-2">{t.contact.email}</label>
                                        <input
                                            type="email"
                                            id="email"
                                            required
                                            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-andean-gold transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="message" className="block text-xs uppercase tracking-widest text-gray-500 mb-2">{t.contact.message}</label>
                                        <textarea
                                            id="message"
                                            required
                                            rows={4}
                                            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-andean-gold transition-colors resize-none"
                                        ></textarea>
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={formState === 'submitting'}
                                        className="w-full bg-white text-black font-bold py-4 rounded-lg hover:bg-andean-gold transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                                    >
                                        {formState === 'submitting' ? '...' : (
                                            <>
                                                <span>{t.contact.send}</span>
                                                <Send size={16} />
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>

                    </div>
                </div>
            </section>

        </div>
    );
};

export default AboutPage;
