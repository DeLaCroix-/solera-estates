export interface Property {
  slug: string;
  title: string;
  location: string;
  neighborhood: string;
  price: number;
  type: string;
  bedrooms: number;
  bathrooms: number;
  sqm: number;
  image: string;
  gallery: string[];
  description: string;
  longDescription: string;
  features: string[];
  featured: boolean;
  status: 'available' | 'reserved' | 'sold';
  reference: string;
}

// Unsplash photo IDs assignados por tipo de propiedad
const UNSPLASH = {
  penthouse:    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2',
  apartment:    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688',
  seaview:      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6',
  villa:        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750',
  modern:       'https://images.unsplash.com/photo-1586023492125-27b2c045efd7',
  loft:         'https://images.unsplash.com/photo-1556020685-ae41abfc9365',
  luxury:       'https://images.unsplash.com/photo-1613977257363-707ba9348227',
  elegant:      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0',
  bedroom:      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0',
  kitchen:      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136',
  bathroom:     'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14',
  exterior:     'https://images.unsplash.com/photo-1568605114967-8130f3a36994',
  terrace:      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9',
  interior2:    'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92',
  duplex:       'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd',
};

function img(base: string, w = 800, h = 540) {
  return `${base}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;
}

export const properties: Property[] = [
  {
    slug: 'atico-terraza-panoramica-eixample-barcelona',
    title: 'Ático con Terraza Panorámica en el Eixample',
    location: 'Eixample Dret, Barcelona',
    neighborhood: 'eixample',
    price: 850000,
    type: 'atico',
    bedrooms: 3,
    bathrooms: 2,
    sqm: 145,
    image: img(UNSPLASH.penthouse),
    gallery: [
      img(UNSPLASH.penthouse, 1200, 800),
      img(UNSPLASH.bedroom, 1200, 800),
      img(UNSPLASH.kitchen, 1200, 800),
      img(UNSPLASH.bathroom, 1200, 800),
      img(UNSPLASH.terrace, 1200, 800),
    ],
    description: 'Espectacular ático en el corazón del Eixample Dret con terraza privada de 80m² y vistas panorámicas sobre la ciudad de Barcelona.',
    longDescription: `Este exclusivo ático en pleno Eixample Dret combina la elegancia del modernismo barcelonés con un interiorismo contemporáneo de primer nivel. Situado en el piso 8 de un emblemático edificio modernista en plena Passatge de la Concepció, disfruta de una privilegiada terraza privada de 80m² desde la que se divisan los tejados de Barcelona y la silueta de la Sagrada Família en el horizonte.

La distribución interior de 145m² útiles consta de tres amplios dormitorios —con vestidor en la habitación principal—, dos baños completos con acabados premium y un espacioso salón-comedor de doble altura con grandes ventanales que inundan de luz natural cada rincón. La cocina de diseño integra electrodomésticos Miele y encimera de Silestone.

El edificio cuenta con portero 24 horas, ascensor panorámico y plaza de garaje privada incluida en el precio. Certificado energético B.`,
    features: [
      'Terraza privada 80m²',
      'Vistas panorámicas 360°',
      'Garaje incluido',
      'Aire acondicionado',
      'Ascensor',
      'Portero 24h',
      'Cocina equipada Miele',
      'Vestidor en suite',
      'Certificado energético B',
      'Armarios a medida',
    ],
    featured: true,
    status: 'available',
    reference: 'SE-2601',
  },
  {
    slug: 'piso-modernista-gracia-barcelona',
    title: 'Piso Modernista en el Corazón de Gràcia',
    location: 'Gràcia, Barcelona',
    neighborhood: 'gracia',
    price: 420000,
    type: 'piso',
    bedrooms: 2,
    bathrooms: 1,
    sqm: 88,
    image: img(UNSPLASH.apartment),
    gallery: [
      img(UNSPLASH.apartment, 1200, 800),
      img(UNSPLASH.bedroom, 1200, 800),
      img(UNSPLASH.kitchen, 1200, 800),
      img(UNSPLASH.interior2, 1200, 800),
    ],
    description: 'Encantador piso reformado con todos los detalles originales del modernismo catalán conservados. Techos altos, suelos hidráulicos y gran luminosidad.',
    longDescription: `Un auténtico tesoro del patrimonio arquitectónico barcelonés situado en una de las calles más pintorescas de Gràcia. Este piso de 88m² ha sido objeto de una exquisita reforma integral que ha respetado todos los elementos originales: techos de 3,20m con molduras, suelos hidráulicos de época recuperados y carpintería de madera maciza.

La distribución incluye un amplio salón con balcón a la calle de doble hoja, comedor independiente, cocina completamente equipada con acceso a patio interior, dos dormitorios con armarios empotrados y un baño completo renovado con ducha de lluvia.

El edificio data de 1908 y está catalogado como elemento de interés arquitectónico. Calefacción central renovada, instalación eléctrica actualizada. A 5 minutos caminando del metro Fontana.`,
    features: [
      'Suelos hidráulicos originales',
      'Techos 3.20m',
      'Balcón a calle',
      'Reforma integral 2024',
      'Calefacción central',
      'Patio interior',
      'Metro Fontana a 5 min',
      'Certificado energético C',
    ],
    featured: true,
    status: 'available',
    reference: 'SE-2602',
  },
  {
    slug: 'apartamento-vistas-mar-barceloneta-barcelona',
    title: 'Apartamento con Vistas al Mar en la Barceloneta',
    location: 'Barceloneta, Barcelona',
    neighborhood: 'barceloneta',
    price: 680000,
    type: 'apartamento',
    bedrooms: 2,
    bathrooms: 2,
    sqm: 92,
    image: img(UNSPLASH.seaview),
    gallery: [
      img(UNSPLASH.seaview, 1200, 800),
      img(UNSPLASH.modern, 1200, 800),
      img(UNSPLASH.bedroom, 1200, 800),
      img(UNSPLASH.bathroom, 1200, 800),
    ],
    description: 'Excepcional apartamento frente al mar con vistas despejadas al Mediterráneo desde el salón y la terraza. Edificio moderno con piscina comunitaria.',
    longDescription: `Situado en primera línea de mar en la Barceloneta, este apartamento de diseño contemporáneo ofrece unas vistas al Mediterráneo absolutamente privilegiadas. Desde el amplio salón y la terraza de 20m² se contempla un horizonte marino sin obstáculos que convierte cada amanecer en un espectáculo único.

El inmueble se distribuye en 92m² interiores más terraza: salón-comedor abierto a la cocina de diseño, dos dormitorios dobles con baños en suite, ambos orientados al mar. Los acabados son de primera calidad: suelos de microcemento, carpintería lacada y cocina con isla central de Corian.

El edificio, construido en 2018, dispone de piscina comunitaria en la azotea con vistas al mar, gimnasio, conserjería 24 horas y dos plazas de garaje. Acceso directo a la Barceloneta y a 10 minutos del centro ciudad.`,
    features: [
      'Vistas directas al mar',
      'Terraza 20m²',
      'Piscina comunitaria azotea',
      'Gimnasio edificio',
      'Conserjería 24h',
      'Dos plazas de garaje',
      'Acabados premium',
      'Certificado energético A',
    ],
    featured: true,
    status: 'available',
    reference: 'SE-2603',
  },
  {
    slug: 'villa-lujo-sarria-barcelona',
    title: 'Villa de Lujo en Sarrià con Jardín y Piscina',
    location: 'Sarrià, Barcelona',
    neighborhood: 'sarria',
    price: 2500000,
    type: 'villa',
    bedrooms: 5,
    bathrooms: 4,
    sqm: 480,
    image: img(UNSPLASH.villa),
    gallery: [
      img(UNSPLASH.villa, 1200, 800),
      img(UNSPLASH.luxury, 1200, 800),
      img(UNSPLASH.bedroom, 1200, 800),
      img(UNSPLASH.kitchen, 1200, 800),
      img(UNSPLASH.exterior, 1200, 800),
    ],
    description: 'Magnífica villa singular de lujo en la exclusiva zona de Sarrià. 480m² construidos en parcela privada de 800m² con jardín mediterráneo y piscina infinita.',
    longDescription: `Oportunidad única de adquirir una de las villas más exclusivas de Sarrià, el barrio residencial más cotizado de Barcelona. Esta propiedad singular de 480m² construidos se asienta sobre una parcela privada de 800m² con jardín mediterráneo diseñado por un reconocido paisajista y piscina infinita con vistas a la ciudad.

La villa, proyectada por un estudio de arquitectura de referencia nacional, distribuye sus espacios en tres plantas: planta baja con sala de estar de doble altura, comedor de gala, cocina-office y habitación de invitados; primera planta con suite principal de 80m² más cuatro dormitorios adicionales; sótano con cine privado, bodega climatizada, sala de fitness y dos plazas de garaje.

Los acabados son de la más alta gama: suelos de mármol travertino, cocina Bulthaup, baños Dornbracht, domótica integral Crestron y sistema de climatización radiante. Parcela completamente vallada y sistema de seguridad perimetral.`,
    features: [
      'Piscina infinita privada',
      'Jardín 800m² diseñado',
      'Garaje privado 2 plazas',
      'Cine privado',
      'Bodega climatizada',
      'Domótica Crestron',
      'Cocina Bulthaup',
      'Baños Dornbracht',
      'Certificado energético A+',
    ],
    featured: true,
    status: 'available',
    reference: 'SE-2604',
  },
  {
    slug: 'piso-renovado-born-barcelona',
    title: 'Piso Renovado en El Born',
    location: 'El Born, Barcelona',
    neighborhood: 'born',
    price: 395000,
    type: 'piso',
    bedrooms: 2,
    bathrooms: 1,
    sqm: 75,
    image: img(UNSPLASH.modern),
    gallery: [
      img(UNSPLASH.modern, 1200, 800),
      img(UNSPLASH.bedroom, 1200, 800),
      img(UNSPLASH.kitchen, 1200, 800),
    ],
    description: 'Precioso piso totalmente renovado en el barrio más trendy de Barcelona. Decoración de diseño, excelente distribución y ubicación inmejorable.',
    longDescription: `El Born es hoy por hoy uno de los barrios más deseados de Barcelona, y este piso de 75m² en la Carrer del Comerç lo tiene todo: una reforma integral completada en 2024 con materiales de primera calidad, dos dormitorios luminosos, salón-comedor con chimenea decorativa y cocina abierta de diseño.

El estilo interiorista combina elementos industriales —ladrillo visto, vigas metálicas— con toques cálidos de madera y textiles naturales. Los suelos de microcemento aportan continuidad y modernidad. El piso tiene una distribución muy eficiente que aprovecha al máximo cada metro cuadrado.

A un paso del Mercat de Santa Caterina, el Parc de la Ciutadella y las mejores terrazas del barrio. Excelente para uso como primera residencia o inversión con altísima rentabilidad por alquiler de media y larga estancia.`,
    features: [
      'Reforma integral 2024',
      'Chimenea decorativa',
      'Ladrillo visto original',
      'Suelos microcemento',
      'Mercado Santa Caterina a 2 min',
      'Parc Ciutadella a 3 min',
      'Inversión alta rentabilidad',
      'Certificado energético C',
    ],
    featured: false,
    status: 'available',
    reference: 'SE-2605',
  },
  {
    slug: 'loft-industrial-poblenou-barcelona',
    title: 'Loft Industrial de Diseño en Poblenou',
    location: 'Poblenou, Barcelona',
    neighborhood: 'poblenou',
    price: 380000,
    type: 'loft',
    bedrooms: 1,
    bathrooms: 1,
    sqm: 95,
    image: img(UNSPLASH.loft),
    gallery: [
      img(UNSPLASH.loft, 1200, 800),
      img(UNSPLASH.modern, 1200, 800),
      img(UNSPLASH.kitchen, 1200, 800),
    ],
    description: 'Impresionante loft de diseño en antigua fábrica reconvertida del @22 de Barcelona. Techos de 5 metros, diáfano y lleno de carácter.',
    longDescription: `Poblenou es el nuevo Silicon Valley de Barcelona, y este loft en una icónica fábrica modernista reconvertida es la joya del barrio. Con 95m² de planta abierta y techos de 5 metros, el espacio es imponente: vigas metálicas originales, cristaleras industriales, paredes de ladrillo visto y suelos de hormigón pulido crean una atmósfera única e irrepetible.

La distribución diáfana permite personalizar el espacio a gusto: el área de descanso está elevada en entreplanta (incluida en los 95m²), mientras la zona de estar, cocina de diseño y baño completo con ducha XL se distribuyen en la planta principal. Instalación eléctrica por carril electrificado y radiadores de diseño.

El edificio, con acceso controlado y conserjería, está en pleno Districte 22@, rodeado de empresas tecnológicas y a metros de la playa. Perfecto para profesionales creativos o inversión turística.`,
    features: [
      'Techos 5 metros',
      'Planta diáfana',
      'Ladrillo visto original',
      'Vigas metálicas',
      'Suelo hormigón pulido',
      'Conserjería edificio',
      'Distrito 22@',
      'A 600m de la playa',
    ],
    featured: false,
    status: 'available',
    reference: 'SE-2606',
  },
  {
    slug: 'atico-duplex-pedralbes-barcelona',
    title: 'Ático Dúplex Exclusivo en Pedralbes',
    location: 'Pedralbes, Barcelona',
    neighborhood: 'pedralbes',
    price: 1800000,
    type: 'atico',
    bedrooms: 4,
    bathrooms: 3,
    sqm: 280,
    image: img(UNSPLASH.luxury),
    gallery: [
      img(UNSPLASH.luxury, 1200, 800),
      img(UNSPLASH.penthouse, 1200, 800),
      img(UNSPLASH.bedroom, 1200, 800),
      img(UNSPLASH.kitchen, 1200, 800),
      img(UNSPLASH.terrace, 1200, 800),
    ],
    description: 'Extraordinario ático dúplex en la zona más exclusiva de Barcelona. 280m² interiores más 120m² de terrazas con vistas a la ciudad y la sierra de Collserola.',
    longDescription: `Pedralbes es la zona más exclusiva y tranquila de Barcelona, y este ático dúplex en un edificio de lujo representa lo mejor que la ciudad puede ofrecer. Con 280m² distribuidos en dos plantas y 120m² adicionales de terrazas, la propiedad combina amplitud, privacidad y unas vistas excepcionales.

La planta inferior alberga un salón de doble altura con chimenea de bioetanol, comedor para 14 personas, cocina italiana de alta gama y una habitación doble con baño propio. La planta superior, conectada por una elegante escalera de cristal y acero, acoge la suite principal de 60m² con vestidor y baño de mármol, además de dos dormitorios adicionales con baños en suite.

Las terrazas, accesibles desde todas las estancias del piso superior, disponen de jardín privado, jacuzzi de hidromasaje y zona de barbacoa. El edificio ofrece seguridad 24 horas, conserjería, piscina comunitaria y spa. Incluye tres plazas de garaje.`,
    features: [
      'Terrazas 120m²',
      'Chimenea bioetanol',
      'Jacuzzi privado',
      'Escalera cristal-acero',
      'Suite principal 60m²',
      'Spa edificio',
      'Tres plazas de garaje',
      'Seguridad 24h',
      'Certificado energético A',
    ],
    featured: true,
    status: 'available',
    reference: 'SE-2607',
  },
  {
    slug: 'piso-avenida-diagonal-barcelona',
    title: 'Piso Elegante en Avenida Diagonal',
    location: 'Les Corts, Barcelona',
    neighborhood: 'les-corts',
    price: 560000,
    type: 'piso',
    bedrooms: 3,
    bathrooms: 2,
    sqm: 130,
    image: img(UNSPLASH.elegant),
    gallery: [
      img(UNSPLASH.elegant, 1200, 800),
      img(UNSPLASH.modern, 1200, 800),
      img(UNSPLASH.kitchen, 1200, 800),
      img(UNSPLASH.bathroom, 1200, 800),
    ],
    description: 'Piso de representación en primera línea de la Diagonal, el eje más emblemático de Barcelona. Tres dormitorios, reforma total y parking incluido.',
    longDescription: `La Avenida Diagonal es la arteria más importante y representativa de Barcelona, y este piso de 130m² en su tramo más cotizado es una oportunidad de primer orden. Con una reforma integral finalizada en 2023, la propiedad luce un estado como nuevo con los mejores materiales del mercado.

El salón-comedor de 45m² con ventanales a la Diagonal es el corazón de la vivienda: parquet de roble natural, techo preparado para cortinas eléctricas y acceso a balcón terciado con vistas al bulevar arbolado. La cocina office es completamente independiente y está equipada con Siemens y Gaggenau. Tres dormitorios: uno principal con baño en suite y dos dobles con baño compartido de mármol Carrara.

El edificio, de arquitectura clásica barcelonesa, dispone de portero presencial, ascensor de diseño y sala de reuniones comunitaria. Incluye plaza de garaje en planta -1.`,
    features: [
      'Vistas a la Diagonal',
      'Parquet roble natural',
      'Reforma 2023',
      'Cocina Gaggenau',
      'Portero presencial',
      'Balcón terciado',
      'Garaje incluido',
      'Certificado energético B',
    ],
    featured: false,
    status: 'available',
    reference: 'SE-2608',
  },
];

export function getPropertyBySlug(slug: string): Property | undefined {
  return properties.find(p => p.slug === slug);
}

export function getFeaturedProperties(): Property[] {
  return properties.filter(p => p.featured);
}

export function getPropertiesByType(type: string): Property[] {
  return properties.filter(p => p.type === type);
}

export function getPropertiesByNeighborhood(neighborhood: string): Property[] {
  return properties.filter(p => p.neighborhood === neighborhood);
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(price);
}
