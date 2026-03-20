import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

const CustomCursor: React.FC = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const updateMousePosition = (e: MouseEvent) => {
            if (!isVisible) setIsVisible(true);
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        
        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest('a, button, input, textarea, select, [role="button"]')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        const handleMouseLeave = () => setIsVisible(false);

        window.addEventListener('mousemove', updateMousePosition);
        window.addEventListener('mouseover', handleMouseOver);
        document.body.addEventListener('mouseleave', handleMouseLeave);

        // Hide default cursor
        document.body.style.cursor = 'none';

        // Add CSS to force cursor hiding on all interactive elements
        const style = document.createElement('style');
        style.innerHTML = `
            * { cursor: none !important; }
            iframe { pointer-events: none; } /* Edge case for iframes */
        `;
        document.head.appendChild(style);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            window.removeEventListener('mouseover', handleMouseOver);
            document.body.removeEventListener('mouseleave', handleMouseLeave);
            document.body.style.cursor = 'auto';
            document.head.removeChild(style);
        };
    }, [isVisible]);

    const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
    const cursorX = useSpring(mousePosition.x, springConfig);
    const cursorY = useSpring(mousePosition.y, springConfig);

    if (window.innerWidth <= 768) return null; // Disable custom cursor on mobile touch screens

    return (
        <>
            <motion.div
                className="fixed top-0 left-0 w-3 h-3 bg-andean-cream rounded-full pointer-events-none z-[9999] mix-blend-difference"
                animate={{
                    x: mousePosition.x - 6,
                    y: mousePosition.y - 6,
                    scale: isHovering ? 0 : 1,
                    opacity: isVisible ? 1 : 0
                }}
                transition={{ type: 'tween', ease: 'backOut', duration: 0.1 }}
            />
            <motion.div
                className="fixed top-0 left-0 w-10 h-10 rounded-full pointer-events-none z-[9998] mix-blend-difference border-[1.5px] border-andean-cream"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: '-50%',
                    translateY: '-50%'
                }}
                animate={{
                    scale: isHovering ? 1.5 : 1,
                    backgroundColor: isHovering ? 'rgba(244, 241, 222, 1)' : 'transparent',
                    opacity: isVisible ? (isHovering ? 1 : 0.6) : 0
                }}
                transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            />
        </>
    );
};

export default CustomCursor;
