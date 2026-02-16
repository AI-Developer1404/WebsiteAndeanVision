import React, { useState } from 'react';
import Modal from './Modal';
import { Music, BookOpen, Palette, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { artContent } from '../data/artContent';

interface BundlePreviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialTab?: 'music' | 'book' | 'art';
    customTitle?: string;
    allowedTabs?: ('music' | 'book' | 'art')[];
}

const BundlePreviewModal: React.FC<BundlePreviewModalProps> = ({ isOpen, onClose, initialTab = 'music', customTitle, allowedTabs }) => {
    const { t, language } = useLanguage();
    const [activeTab, setActiveTab] = useState<'music' | 'book' | 'art'>(initialTab);

    // Reset tab when modal opens or initialTab changes
    // Reset tab when modal opens or initialTab changes
    React.useEffect(() => {
        if (isOpen) {
            setActiveTab(initialTab);
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden'; // Lock html too for mobile support
        } else {
            document.body.style.overflow = 'unset';
            document.documentElement.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
            document.documentElement.style.overflow = 'unset';
        };
    }, [isOpen, initialTab]);

    const allTabs = [
        { id: 'music' as const, label: t.nav.music, icon: Music },
        { id: 'book' as const, label: t.nav.book, icon: BookOpen },
        { id: 'art' as const, label: t.nav.art, icon: Palette },
    ];

    const tabs = allowedTabs
        ? allTabs.filter(tab => allowedTabs.includes(tab.id))
        : allTabs;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={customTitle || t.bundle.title}>
            {/* Tabs - Only show if more than 1 tab is allowed */}
            {tabs.length > 1 && (
                <div className="flex gap-2 mb-6 border-b border-white/10 overflow-x-auto pb-2 md:pb-0">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-4 py-3 font-medium transition-all ${activeTab === tab.id
                                    ? 'text-andean-gold border-b-2 border-andean-gold'
                                    : 'text-gray-400 hover:text-white'
                                    }`}
                            >
                                <Icon size={18} />
                                {tab.label}
                            </button>
                        );
                    })}
                </div>
            )}

            {/* Content */}
            {activeTab === 'music' && (
                <div>
                    <h3 className="text-xl font-bold mb-4 text-white">{t.valueStack.items.music.title}</h3>
                    <p className="text-gray-400 mb-6">{t.valueStack.items.music.description}</p>
                    <div className="space-y-2">
                        {t.audio.playlist.slice(0, 12).map((track, idx) => (
                            <div key={idx} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-andean-gold/20 flex items-center justify-center text-andean-gold text-sm font-bold">
                                        {idx + 1}
                                    </div>
                                    <span className="text-gray-200">{track.title}</span>
                                </div>
                                <span className="text-gray-500 text-sm font-mono">{track.duration}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 'book' && (
                <div>
                    <h3 className="text-xl font-bold mb-4 text-white">{t.valueStack.items.book.title}</h3>
                    <p className="text-gray-400 mb-6">{t.valueStack.items.book.description}</p>
                    <div className="space-y-3">
                        <div className="flex items-start gap-3 p-4 bg-white/5 rounded-lg">
                            <Check className="text-andean-gold shrink-0 mt-1" size={20} />
                            <div>
                                <p className="font-medium text-white">Musical Heritage Section</p>
                                <p className="text-sm text-gray-400">Deep dive into Charango, Quena, and Zampoña instruments</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 p-4 bg-white/5 rounded-lg">
                            <Check className="text-andean-gold shrink-0 mt-1" size={20} />
                            <div>
                                <p className="font-medium text-white">Andean Cuisine Chapter</p>
                                <p className="text-sm text-gray-400">Authentic recipes including Pisco Sour and Lomo Saltado</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 p-4 bg-white/5 rounded-lg">
                            <Check className="text-andean-gold shrink-0 mt-1" size={20} />
                            <div>
                                <p className="font-medium text-white">Interactive Maps</p>
                                <p className="text-sm text-gray-400">Sacred sites and Inca landmarks across the valley</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'art' && (
                <div>
                    <h3 className="text-xl font-bold mb-4 text-white">{t.valueStack.items.art.title}</h3>
                    <p className="text-gray-400 mb-6">{t.valueStack.items.art.description}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {artContent[language].gallery.map((item) => (
                            <div key={item.id} className="aspect-[4/3] bg-neutral-800 rounded-lg border border-white/10 overflow-hidden relative group">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                                />
                                <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/90 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                    <p className="text-white text-xs font-medium truncate">{item.title}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <p className="mt-4 text-sm text-gray-500 text-center">High-resolution TIFF, JPEG, and PDF formats included</p>
                </div>
            )}
        </Modal>
    );
};

export default BundlePreviewModal;
