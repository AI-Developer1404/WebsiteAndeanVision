export interface Chapter {
    title: string;
    subtitle: string;
    description: string;
}

export interface EbookContent {
    title: string;
    subtitle: string;
    introduction: {
        title: string;
        content: string;
    };
    chapters: Chapter[];
    conclusion: {
        title: string;
        content: string;
    };
    appendices: {
        title: string;
        items: Array<{ title: string; description: string }>;
    };
}

export const ebookContent: { en: EbookContent; es: EbookContent } = {
    en: {
        title: "Cusco: City of the Sun",
        subtitle: "An immersive guide that uncovers the hidden history of the Inca capital by scanning the modern city for its imperial foundations. In this book, you will learn to look at Cusco through the eyes of an Inca, from their earthquake-proof architecture and golden temples to the invisible spiritual lines that still define the city.",
        introduction: {
            title: "Introduction: Welcome to 3,400 Meters",
            content: "Setting the scene: Why Cusco is a city of layers and how to use this book to see through the modern surface.",
        },
        chapters: [
            {
                title: "Chapter 1: The Masters of Stone",
                subtitle: "Earthquake-proofing of the Gods",
                description: "Discover the three engineering secrets that allow Inca walls to \"dance\" while Spanish buildings crumble.",
            },
            {
                title: "Chapter 2: The Square of Two Worlds",
                subtitle: "The Great Sand Plaza",
                description: "Visualizing the ancient Huacaypata where sand was hauled from the coast and mummies joined the festivals.",
            },
            {
                title: "Chapter 3: Qorikancha – The House of Gold",
                subtitle: "The Vatican of the Andes",
                description: "A deep dive into the richest temple in the Americas, its golden gardens, and its role as a solar clock.",
            },
            {
                title: "Chapter 4: Beyond the Gold – The Pulse of the People",
                subtitle: "The Language of Knots",
                description: "How the Incas ran a continent-wide empire without money or a writing system using the genius of the Quipu.",
            },
            {
                title: "Chapter 5: Sacsayhuamán – The Puma’s Teeth",
                subtitle: "Impossible Geometry",
                description: "How stones weighing 120 tons were moved across mountains and the tragic story of the battle for the city’s crown.",
            },
            {
                title: "Chapter 6: Ollantaytambo – The Living Blueprint",
                subtitle: "The City That Never Died",
                description: "Journey to the only place where the Inca grid remains intact and inhabited. A living, breathing time capsule where the past isn't studied—it's lived.",
            },
            {
                title: "Chapter 7: The Living Empire",
                subtitle: "Cusco Today",
                description: "A guide to the modern legacy, from the rhythmic clicks of the Quechua language to the ancient flavors of the San Pedro market.",
            },
        ],
        conclusion: {
            title: "Conclusion: The City That Refused to Be Buried",
            content: "A final reflection on the \"X-ray vision\" you now possess to appreciate the eternal layer of the Andes.",
        },
        appendices: {
            title: "Appendices: The Explorer’s Toolkit",
            items: [
                {
                    title: "A: The Sacred Valley & Beyond",
                    description: "Essential context for Machu Picchu, Ollantaytambo, and the labs of Moray.",
                },
                {
                    title: "B: The Traveler’s Quechua Glossary",
                    description: "The key words you need to connect with the local heart of the city.",
                },
                {
                    title: "C: The \"Inca Scanner\" Checklist",
                    description: "10 specific archaeological treasures you must find before you leave.",
                },
            ],
        },
    },
    es: {
        title: "Cusco: Ciudad del Sol",
        subtitle: "Una guía inmersiva que revela la historia oculta de la capital inca escaneando la ciudad moderna en busca de sus cimientos imperiales. En este libro, aprenderás a mirar Cusco a través de los ojos de un inca, desde su arquitectura a prueba de terremotos y templos dorados hasta las líneas espirituales invisibles que aún definen la ciudad.",
        introduction: {
            title: "Introducción: Bienvenidos a 3,400 Metros",
            content: "El escenario: Por qué Cusco es una ciudad de capas y cómo usar este libro para ver a través de la superficie moderna.",
        },
        chapters: [
            {
                title: "Capítulo 1: Los Maestros de la Piedra",
                subtitle: "Ingeniería antisísmica de los dioses",
                description: "Descubre los tres secretos de ingeniería que permiten a los muros incas \"bailar\" mientras los edificios españoles se derrumban.",
            },
            {
                title: "Capítulo 2: La Plaza de Dos Mundos",
                subtitle: "La Gran Plaza de Arena",
                description: "Visualizando la antigua Huacaypata donde se traía arena de la costa y las momias se unían a los festivales.",
            },
            {
                title: "Capítulo 3: Qorikancha – La Casa de Oro",
                subtitle: "El Vaticano de los Andes",
                description: "Una inmersión profunda en el templo más rico de las Américas, sus jardines dorados y su papel como reloj solar.",
            },
            {
                title: "Capítulo 4: Más Allá del Oro – El Pulso del Pueblo",
                subtitle: "El Lenguaje de los Nudos",
                description: "Cómo los incas dirigieron un imperio continental sin dinero ni escritura utilizando el genio del Quipu.",
            },
            {
                title: "Capítulo 5: Sacsayhuamán – Los Dientes del Puma",
                subtitle: "Geometría Imposible",
                description: "Cómo piedras de 120 toneladas fueron movidas a través de montañas y la trágica historia de la batalla por la corona de la ciudad.",
            },
            {
                title: "Capítulo 6: Ollantaytambo – El Plano Viviente",
                subtitle: "La Ciudad Que Nunca Murió",
                description: "Viaja al único lugar donde la cuadrícula inca permanece intacta y habitada. Una cápsula del tiempo viva donde el pasado no se estudia, se vive.",
            },
            {
                title: "Capítulo 7: El Imperio Viviente",
                subtitle: "Cusco Hoy",
                description: "Una guía del legado moderno, desde los chasquidos rítmicos del idioma quechua hasta los sabores antiguos del mercado de San Pedro.",
            },
        ],
        conclusion: {
            title: "Conclusión: La Ciudad Que Se Negó a Ser Enterrada",
            content: "Una reflexión final sobre la \"visión de rayos X\" que ahora posees para apreciar la capa eterna de los Andes.",
        },
        appendices: {
            title: "Apéndices: El Kit de Herramientas del Explorador",
            items: [
                {
                    title: "A: El Valle Sagrado y Más Allá",
                    description: "Contexto esencial para Machu Picchu, Ollantaytambo y los laboratorios de Moray.",
                },
                {
                    title: "B: El Glosario Quechua del Viajero",
                    description: "Las palabras clave que necesitas para conectarte con el corazón local de la ciudad.",
                },
                {
                    title: "C: La Lista de Verificación del \"Escáner Inca\"",
                    description: "10 tesoros arqueológicos específicos que debes encontrar antes de irte.",
                },
            ],
        },
    },
};
