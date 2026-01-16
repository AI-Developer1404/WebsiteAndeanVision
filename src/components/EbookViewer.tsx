import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { Download, ArrowLeft } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import ebookHeroBg from '../assets/images/ebook-hero-bg.jpg';

const Reveal: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
    <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`print-reveal ${className}`}
    >
        {children}
    </motion.div>
);

const EbookViewer: React.FC = () => {
    const { t, setLanguage } = useLanguage();
    const [searchParams] = useSearchParams();
    const { ebook } = t;

    React.useEffect(() => {
        const langParam = searchParams.get('lang');
        if (langParam === 'en' || langParam === 'es') {
            setLanguage(langParam);
        }
    }, [searchParams, setLanguage]);

    // Safety check
    if (!ebook) return <div className="min-h-screen bg-cusco-paper flex items-center justify-center">Loading...</div>;

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="bg-cusco-paper text-stone-800 font-sans antialiased selection:bg-cusco-gold selection:text-white">
            <style>{`
                @media print {
                    @page { 
                        margin: 2cm; 
                        size: A4;
                    }
                    
                    /* STRICT RESET & VISIBILITY */
                    body, #root, .bg-cusco-paper, .bg-cusco-dark, .bg-stone-900 { 
                        background: white !important; 
                        color: #1a1a1a !important; 
                        font-family: "Georgia", "Times New Roman", serif !important;
                        font-size: 11pt !important;
                        line-height: 1.5 !important;
                        overflow: visible !important;
                        height: auto !important;
                    }

                    /* Force Visibility on Animations */
                    div, section, img, span, p, h1, h2, h3, li {
                        opacity: 1 !important;
                        transform: none !important;
                        transition: none !important;
                        visibility: visible !important;
                    }

                    /* Hide Web UI */
                    nav, .no-print, button, .scroll-indicator, .absolute.inset-0, .web-hero { 
                        display: none !important; 
                    }

                    /* Print Title Page */
                    .print-hero {
                        display: flex !important;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        height: 90vh !important;
                        page-break-after: always;
                        text-align: center;
                    }
                    
                    .print-hero img {
                        max-width: 100% !important;
                        height: auto !important;
                        max-height: 50vh !important;
                        object-fit: contain !important;
                        margin-bottom: 2cm !important;
                        display: block !important;
                    }

                    /* Typography */
                    h1 { 
                        color: black !important; 
                        font-size: 32pt !important; 
                        margin-bottom: 0.5cm !important;
                        text-shadow: none !important;
                    }
                    
                    h2 { 
                        color: #2c2c2c !important; 
                        font-size: 22pt !important; 
                        margin-bottom: 0.5cm !important;
                        border-bottom: 1px solid #ddd;
                        padding-bottom: 0.2cm;
                        page-break-after: avoid; 
                    }

                    /* Page Breaks */
                    .print-new-page {
                        page-break-before: always !important;
                        break-before: page !important;
                        margin-top: 0 !important;
                        padding-top: 2cm !important;
                    }

                    /* Component Overrides */
                    .bg-white\/5 {
                        background: transparent !important;
                        border: 1px solid #ccc !important;
                        color: #333 !important;
                    }
                    
                    /* Images */
                    img { 
                        max-width: 80% !important; 
                        max-height: 8cm !important; 
                        margin: 1cm auto !important; 
                        box-shadow: none !important;
                    }
                }
            `}</style>

            {/* Nav */}
            <nav className="fixed w-full z-50 bg-cusco-paper/90 border-b border-stone-200 backdrop-blur-md transition-all duration-300 no-print">
                <div className="max-w-6xl mx-auto px-6 h-20 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <Link to="/" className="text-stone-400 hover:text-cusco-red transition">
                            <ArrowLeft size={20} />
                        </Link>
                        <span className="font-serif text-xl md:text-2xl italic text-stone-900 font-semibold tracking-wide">
                            {ebook.nav.title}
                        </span>
                    </div>

                    <div className="flex items-center gap-8">
                        <div className="hidden md:flex space-x-8 text-xs uppercase tracking-[0.2em] font-bold text-stone-500">
                            <a href="#intro" className="hover:text-cusco-red transition">{ebook.nav.journal}</a>
                            <a href="#instruments" className="hover:text-cusco-red transition">{ebook.nav.heritage}</a>
                            <a href="#taste" className="hover:text-cusco-red transition">{ebook.nav.kitchen}</a>
                        </div>
                        <button
                            onClick={handlePrint}
                            className="bg-stone-900 text-white px-4 md:px-6 py-3 text-xs uppercase tracking-widest hover:bg-cusco-red transition flex items-center gap-2 rounded-sm shadow-lg no-print"
                        >
                            <span>{ebook.nav.savePdf}</span>
                            <Download size={16} />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Print Only Hero */}
            <header className="hidden print-hero">
                <img src={ebookHeroBg} alt="Cusco Landscape" />
                <h1 className="font-serif text-6xl italic mb-4">{ebook.nav.title}</h1>
                <p className="text-xl italic">"{ebook.hero.quote}"</p>
            </header>

            {/* Web Hero (Hidden in Print) */}
            <header className="relative h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden web-hero">
                <div className="absolute inset-0 z-0">
                    <img
                        src={ebookHeroBg}
                        className="w-full h-full object-cover transform scale-105"
                        alt="Cusco Landscape"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80"></div>
                </div>

                <div className="relative z-10 max-w-4xl text-white mt-16">
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="text-sm md:text-base uppercase tracking-[0.5em] mb-8 text-cusco-gold font-bold drop-shadow-lg"
                    >
                        {ebook.hero.pre}
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 1 }}
                        className="font-serif text-7xl md:text-9xl mb-6 italic tracking-tight leading-[0.9] drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]"
                    >
                        {ebook.hero.title} <br />
                        <span className="text-stone-100 text-6xl md:text-8xl not-italic font-light">{ebook.hero.titleSuffix}</span> {ebook.hero.titleEnd}
                    </motion.h1>
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: 128 }}
                        transition={{ delay: 1.2, duration: 1 }}
                        className="h-1 bg-cusco-gold mx-auto mb-10 shadow-lg"
                    />
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5, duration: 1 }}
                        className="text-xl md:text-3xl font-serif text-white font-light italic opacity-100 drop-shadow-md"
                    >
                        {ebook.hero.quote}
                    </motion.p>
                </div>
            </header>

            {/* Intro */}
            <section id="intro" className="py-32 px-6 max-w-3xl mx-auto text-center bg-cusco-paper print-new-page">
                <Reveal>
                    <p className="font-serif text-4xl italic text-stone-400 mb-12">{ebook.intro.quote}</p>

                    <div className="text-left text-lg md:text-xl text-stone-800 space-y-8 leading-relaxed font-light">
                        <p className="first-letter:text-7xl first-letter:font-serif first-letter:font-semibold first-letter:float-left first-letter:mr-3 first-letter:leading-[0.7] first-letter:text-cusco-red">
                            {ebook.intro.p1}
                        </p>
                        <p>{ebook.intro.p2}</p>
                        <p>{ebook.intro.p3}</p>
                        <div className="mt-16 text-right">
                            <p className="font-serif italic text-3xl text-cusco-red">{ebook.intro.signature}</p>
                        </div>
                    </div>
                </Reveal>
            </section>

            {/* Instruments */}
            <section id="instruments" className="py-32 bg-cusco-dark text-stone-300 relative overflow-hidden print-new-page">
                <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/black-linen.png')] no-print"></div>

                <div className="max-w-6xl mx-auto px-6 relative z-10">
                    <Reveal className="text-center mb-24">
                        <span className="text-cusco-gold uppercase tracking-[0.3em] text-xs font-bold">{ebook.instruments.label}</span>
                        <h2 className="text-5xl md:text-7xl text-white mt-6 mb-8 font-serif italic">{ebook.instruments.title}</h2>
                        <p className="text-xl font-serif text-stone-500 max-w-2xl mx-auto">{ebook.instruments.desc}</p>
                    </Reveal>

                    {ebook.instruments.items.map((inst: any, idx: number) => (
                        <Reveal key={idx} className={`grid md:grid-cols-2 gap-20 mb-40 items-start print-new-page ${idx % 2 === 0 ? '' : ''}`}>
                            <div className={`${idx % 2 === 0 ? 'order-2 md:order-1' : 'order-2'}`}>
                                <h3 className="text-6xl text-cusco-gold mb-4 font-serif italic">{inst.name}</h3>
                                <p className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-10 border-b border-stone-800 pb-4 inline-block">{inst.subtitle}</p>

                                <div className="space-y-6 text-lg font-light leading-relaxed">
                                    <p dangerouslySetInnerHTML={{ __html: inst.desc1 }} />
                                    <p dangerouslySetInnerHTML={{ __html: inst.desc2 }} />
                                    <p dangerouslySetInnerHTML={{ __html: inst.desc3 }} />
                                    <div className="bg-white/5 p-8 border-l-2 border-cusco-gold mt-6 italic text-stone-400 text-base">
                                        <p dangerouslySetInnerHTML={{ __html: inst.guide }} />
                                    </div>
                                </div>
                            </div>
                            <div className={`${idx % 2 === 0 ? 'order-1 md:order-2' : 'order-1'} relative group`}>
                                <div className="absolute -inset-4 bg-cusco-gold/20 opacity-0 group-hover:opacity-100 transition duration-700 blur-xl no-print"></div>
                                <img
                                    src={inst.image}
                                    className="w-full h-[650px] object-cover rounded-sm shadow-2xl relative z-10 grayscale group-hover:grayscale-0 transition duration-1000"
                                    alt={inst.name}
                                />
                                <p className="text-xs text-right text-stone-600 mt-4 italic">{inst.caption}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </section>

            {/* Recipes */}
            <section id="taste" className="py-32 bg-cusco-paper text-stone-900 print-new-page">
                <div className="max-w-4xl mx-auto px-6">
                    <Reveal className="text-center mb-24">
                        <span className="text-cusco-red uppercase tracking-[0.2em] text-xs font-bold">{ebook.recipes.label}</span>
                        <h2 className="text-5xl md:text-7xl mt-6 mb-8 font-serif italic">{ebook.recipes.title}</h2>
                        <p className="text-xl text-stone-600 font-serif">{ebook.recipes.desc}</p>
                    </Reveal>

                    {ebook.recipes.items.map((recipe: any, idx: number) => (
                        <Reveal key={idx} className="bg-white p-10 md:p-16 shadow-xl border-t-4 border-cusco-gold odd:border-cusco-red mb-20 print-new-page">
                            <header className="mb-10 border-b border-stone-100 pb-8 !h-auto !bg-transparent !p-0 !block">
                                <div className="flex justify-between items-baseline flex-wrap gap-4">
                                    <h3 className="text-4xl md:text-5xl font-serif text-cusco-dark mb-2">{recipe.name}</h3>
                                    <span className="font-serif italic text-stone-400 text-xl">{recipe.serves}</span>
                                </div>
                                <p className="text-cusco-gold odd:text-cusco-red uppercase tracking-widest text-xs font-bold mt-2">{recipe.tags}</p>
                            </header>
                            <div className="space-y-12 text-lg">
                                <p className="italic text-stone-600 leading-relaxed border-l-2 border-stone-200 pl-6">
                                    {recipe.intro}
                                </p>
                                <div className="grid md:grid-cols-2 gap-12">
                                    <div>
                                        <h4 className="font-bold uppercase tracking-widest text-xs mb-6 text-stone-400">{recipe.ingredientsTitle}</h4>
                                        <ul className="text-sm font-medium space-y-4 text-stone-700">
                                            {recipe.ingredients.map((ing: any, i: number) => (
                                                <li key={i} className="flex justify-between border-b border-stone-50 pb-2">
                                                    <span>{ing.name}</span>
                                                    <span>{ing.amount}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="bg-stone-50 p-8 text-sm text-stone-600 rounded-sm">
                                        <h4 className="font-bold text-stone-900 mb-4 uppercase tracking-widest text-[10px]">{recipe.tipsTitle}</h4>
                                        {recipe.tips.map((tip: string, i: number) => (
                                            <p key={i} className="mb-4 last:mb-0" dangerouslySetInnerHTML={{ __html: tip }} />
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-bold uppercase tracking-widest text-xs mb-6 text-stone-400">{recipe.stepsTitle}</h4>
                                    <ol className="list-decimal ml-6 space-y-6 text-stone-600">
                                        {recipe.steps.map((step: string, i: number) => (
                                            <li key={i} dangerouslySetInnerHTML={{ __html: step }} />
                                        ))}
                                    </ol>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default EbookViewer;

