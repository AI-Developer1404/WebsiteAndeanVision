import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="py-8 bg-andean-slate text-andean-cream/40 text-center text-sm border-t border-white/10">
            <div className="flex flex-col items-center gap-2">
                <span className="font-serif font-bold text-lg text-andean-gold tracking-widest">ANDEAN<span className="text-white">.</span></span>
                <p>&copy; {new Date().getFullYear()} Andean Sounds. All rights reserved.</p>
                <a href="mailto:hello@andeanvisions.com" className="text-cusco-red hover:text-white transition-colors">hello@andeanvisions.com</a>
            </div>
        </footer>
    );
};

export default Footer;
