export interface Property {
  slug: string;
  title: string;
  type: 'piso' | 'ático' | 'casa' | 'local' | 'oficina';
  neighborhood: string;
  district: string;
  price: number;
  currency: string;
  size: number; // m²
  bedrooms: number;
  bathrooms: number;
  floor?: string;
  yearBuilt: number;
  energyRating: string;
  description: string;
  features: string[];
  images: string[];
  featured: boolean;
  status: 'venta' | 'alquiler';
  coords: { lat: number; lng: number };
}

export const properties: Property[] = [
  {
    slug: 'atico-de-lujo-pedralbes',
    title: 'Ático de Lujo con Terraza en Pedralbes',
    type: 'ático',
    neighborhood: 'Pedralbes',
    district: 'Sarrià-Sant Gervasi',
    price: 3500000,
    currency: '€',
    size: 250,
    bedrooms: 4,
    bathrooms: 3,
    floor: '8ª',
    yearBuilt: 2020,
    energyRating: 'A',
    description: 'Espectacular ático de lujo en la exclusiva zona de Pedralbes con vistas panorámicas de 360° a toda Barcelona. Esta propiedad de 250 m² dispone de 4 amplios dormitorios con armarios empotrados, 3 baños completos de diseño, y una terraza privada de 80 m² con piscina. La cocina es de diseño italiano equipada con electrodomésticos de alta gama. El edificio cuenta con conserje, piscina comunitaria, gimnasio y jardines privados. La finca incluye 2 plazas de parking y trastero. La iluminación natural inunda cada estancia gracias a sus grandes ventanales de suelo a techo con carpintería de aluminio lacado y doble acristalamiento.',
    features: [
      'Terraza privada 80 m²',
      'Piscina privada en terraza',
      'Vistas panorámicas 360°',
      'Cocina de diseño italiano',
      'Suelos de parquet de roble',
      'Climatización por aerotermia',
      'Domótica completa',
      '2 plazas de parking',
      'Trastero',
      'Conserje 24h',
      'Piscina comunitaria',
      'Gimnasio',
      'Zonas verdes',
      'Armarios empotrados',
      'Videoportero'
    ],
    images: ['/images/properties/atico-pedralbes-1.jpg', '/images/properties/atico-pedralbes-2.jpg'],
    featured: true,
    status: 'venta',
    coords: { lat: 41.3951, lng: 2.1078 }
  },
  {
    slug: 'piso-eixample-derecho',
    title: 'Piso Reformado en Eixample Derecho',
    type: 'piso',
    neighborhood: 'Eixample Derecho',
    district: 'Eixample',
    price: 890000,
    currency: '€',
    size: 120,
    bedrooms: 3,
    bathrooms: 2,
    floor: '4ª',
    yearBuilt: 1965,
    energyRating: 'C',
    description: 'Piso completamente reformado en el corazón del Eixample Derecho, una de las zonas más emblemáticas de Barcelona. La propiedad cuenta con 120 m² distribuidos en un amplio salón-comedor con techos altos y molduras originales restauradas, cocina abierta totalmente equipada, 3 dormitorios y 2 baños completos. La reforma ha mantenido elementos originales como las vigas de madera y los techos con molduras, combinándolos con acabados contemporáneos de primera calidad. Situado en una finca clásica con ascensor y conserje. A pocos minutos de la Sagrada Familia y el Passeig de Gràcia.',
    features: [
      'Totalmente reformado',
      'Techos altos con molduras',
      'Suelos hidráulicos originales',
      'Cocina equipada con electrodomésticos Bosch',
      'Climatización por conductos',
      'Ascensor',
      'Conserje',
      'Balcón exterior',
      'Armarios empotrados',
      'Vigas de madera vistas'
    ],
    images: ['/images/properties/piso-eixample-1.jpg', '/images/properties/piso-eixample-2.jpg'],
    featured: true,
    status: 'venta',
    coords: { lat: 41.3931, lng: 2.1758 }
  },
  {
    slug: 'casa-moderna-sarria',
    title: 'Casa Moderna con Jardín en Sarrià',
    type: 'casa',
    neighborhood: 'Sarrià',
    district: 'Sarrià-Sant Gervasi',
    price: 2200000,
    currency: '€',
    size: 350,
    bedrooms: 5,
    bathrooms: 4,
    floor: 'Baja',
    yearBuilt: 2018,
    energyRating: 'A',
    description: 'Impresionante casa unifamiliar de diseño moderno en el prestigioso barrio de Sarrià. Con 350 m² construidos sobre una parcela de 400 m², la propiedad ofrece amplios espacios diáfanos, grandes ventanales que conectan con el jardín privado de 200 m² con piscina. Distribuida en 3 plantas más sótano: planta principal con salón de doble altura, cocina-office y comedor; planta primera con 3 dormitorios y 2 baños; planta segunda con suite principal con terraza y vestidor. Sótano con garaje para 3 coches, bodega y sala de juegos. Acabados de máxima calidad con materiales sostenibles.',
    features: [
      'Jardín privado 200 m²',
      'Piscina climatizada',
      'Garaje para 3 vehículos',
      'Suite principal con vestidor',
      'Cocina Bulthaup',
      'Aerotermia',
      'Paneles solares',
      'Domótica',
      'Bodega',
      'Sala de juegos',
      'Aspiración centralizada',
      'Alarma conectada',
      'Suelo radiante',
      'Climatización por conductos'
    ],
    images: ['/images/properties/casa-sarria-1.jpg', '/images/properties/casa-sarria-2.jpg'],
    featured: true,
    status: 'venta',
    coords: { lat: 41.4019, lng: 2.1308 }
  },
  {
    slug: 'atico-doble-gracia',
    title: 'Ático Dúplex con Vistas en Gràcia',
    type: 'ático',
    neighborhood: 'Vila de Gràcia',
    district: 'Gràcia',
    price: 650000,
    currency: '€',
    size: 95,
    bedrooms: 2,
    bathrooms: 2,
    floor: '6ª',
    yearBuilt: 1970,
    energyRating: 'D',
    description: 'Encantador ático dúplex en el vibrante barrio de Gràcia, reformado con gusto y respetando la esencia del barrio. La planta baja cuenta con un acogedor salón-comedor con cocina americana, un dormitorio y un baño. La planta superior alberga el dormitorio principal con baño en suite y acceso a una terraza privada de 25 m² con vistas a las montañas de Collserola. La finca dispone de ascensor. Situado a pocos pasos de la Plaza del Sol y del mercado de la Llibertat, rodeado de las mejores terrazas, tiendas y restaurantes del barrio.',
    features: [
      'Dúplex con terraza 25 m²',
      'Reformado integralmente',
      'Vistas a Collserola',
      'Cocina americana equipada',
      'Ascensor',
      'Suelos de parquet',
      'Climatización split',
      'Armarios empotrados',
      'Balcón francés'
    ],
    images: ['/images/properties/atico-gracia-1.jpg', '/images/properties/atico-gracia-2.jpg'],
    featured: true,
    status: 'venta',
    coords: { lat: 41.4028, lng: 2.1588 }
  },
  {
    slug: 'piso-con-vistas-diagonal-mar',
    title: 'Piso con Vistas al Mar en Diagonal Mar',
    type: 'piso',
    neighborhood: 'Diagonal Mar',
    district: 'Sant Martí',
    price: 520000,
    currency: '€',
    size: 85,
    bedrooms: 3,
    bathrooms: 2,
    floor: '12ª',
    yearBuilt: 2005,
    energyRating: 'B',
    description: 'Magnífico piso en la zona de Diagonal Mar con espectaculares vistas al mar Mediterráneo. La propiedad de 85 m² se distribuye en un luminoso salón-comedor con acceso a terraza, cocina independiente equipada, 3 dormitorios (2 dobles) y 2 baños completos. La urbanización dispone de piscina comunitaria, jardines, pista de pádel, gimnasio y sala social. Incluye plaza de parking y trastero. Situado a 5 minutos andando de la playa de la Mar Bella y del centro comercial Diagonal Mar. Excelente conexión de transporte público con parada de metro y tranvía.',
    features: [
      'Vistas al mar',
      'Terraza con vistas',
      'Piscina comunitaria',
      'Pista de pádel',
      'Gimnasio',
      'Parking incluido',
      'Trastero',
      'Cocina independiente',
      'Armarios empotrados',
      'Aire acondicionado',
      'Suelo radiante'
    ],
    images: ['/images/properties/piso-diagonal-mar-1.jpg', '/images/properties/piso-diagonal-mar-2.jpg'],
    featured: true,
    status: 'venta',
    coords: { lat: 41.4069, lng: 2.2189 }
  },
  {
    slug: 'local-comercial-el-born',
    title: 'Local Comercial en El Born',
    type: 'local',
    neighborhood: 'El Born',
    district: 'Ciutat Vella',
    price: 450000,
    currency: '€',
    size: 80,
    bedrooms: 0,
    bathrooms: 1,
    yearBuilt: 1850,
    energyRating: 'E',
    description: 'Excelente local comercial en una de las calles más transitadas del emblemático barrio de El Born. Con 80 m² diáfanos y una fachada de 6 metros, este local ofrece una visibilidad excepcional en una zona de alto tránsito peatonal y turístico. Cuenta con techos abovedados de ladrillo visto, suelos de hidráulico original y una entreplanta de 20 m² que puede utilizarse como almacén u oficina. Ideal para negocio de restauración, tienda de moda o galería de arte. Licencia de actividad en tramitación favorable. Baño privado y trastero incluido.',
    features: [
      'Fachada 6 metros',
      'Techos abovedados',
      'Ladrillo visto',
      'Suelos hidráulicos originales',
      'Entreplanta 20 m²',
      'Alta afluencia peatonal',
      'Licencia actividad',
      'Baño privado',
      'Trastero',
      'Aire acondicionado'
    ],
    images: ['/images/properties/local-born-1.jpg', '/images/properties/local-born-2.jpg'],
    featured: false,
    status: 'venta',
    coords: { lat: 41.3852, lng: 2.1833 }
  },
  {
    slug: 'oficinas-representativas-gotico',
    title: 'Oficinas Representativas en el Gótico',
    type: 'oficina',
    neighborhood: 'Barri Gòtic',
    district: 'Ciutat Vella',
    price: 380000,
    currency: '€',
    size: 120,
    bedrooms: 0,
    bathrooms: 2,
    floor: '2ª',
    yearBuilt: 1880,
    energyRating: 'D',
    description: 'Prestigiosas oficinas en un edificio histórico del Barri Gòtic de Barcelona, perfectas para despachos profesionales, bufetes de abogados o sedes corporativas. Con 120 m² distribuidos en un amplio espacio diáfano, 3 despachos independientes, sala de reuniones, recepción y 2 baños. El edificio ha sido rehabilitado manteniendo la fachada original del siglo XIX e incorporando todas las comodidades modernas: ascensor, aire acondicionado, fibra óptica y sistema de seguridad. Techos de 4 metros de altura con vigas de madera vistas. Situado a un minuto de la Plaza Sant Jaume y del Ayuntamiento.',
    features: [
      'Edificio histórico rehabilitado',
      'Techos 4 m de altura',
      'Vigas de madera vistas',
      '3 despachos independientes',
      'Sala de reuniones',
      'Ascensor',
      'Fibra óptica',
      'Seguridad 24h',
      'Aire acondicionado',
      'Suelos de parquet'
    ],
    images: ['/images/properties/oficinas-gotico-1.jpg', '/images/properties/oficinas-gotico-2.jpg'],
    featured: false,
    status: 'venta',
    coords: { lat: 41.3834, lng: 2.1769 }
  },
  {
    slug: 'piso-reformado-poble-sec',
    title: 'Piso Reformado con Balcón en Poble Sec',
    type: 'piso',
    neighborhood: 'Poble Sec',
    district: 'Sants-Montjuïc',
    price: 285000,
    currency: '€',
    size: 65,
    bedrooms: 2,
    bathrooms: 1,
    floor: '3ª',
    yearBuilt: 1960,
    energyRating: 'C',
    description: 'Piso reformado con excelente gusto en el auténtico barrio de Poble Sec, ideal para parejas o inversores. La vivienda de 65 m² consta de salón-comedor con balcón exterior, cocina americana totalmente equipada, 2 dormitorios dobles y un baño completo con ducha de diseño. Reforma integral realizada en 2022 con carpintería de aluminio Climalit, instalación eléctrica y fontanería nuevas, y suelo laminado de alta calidad. Finca con ascensor. A 10 minutos andando de las principales atracciones: Plaza España, Museo Nacional de Arte de Cataluña y el Parque de Montjuïc. Metro y bus a escasos metros.',
    features: [
      'Reformado en 2022',
      'Balcón exterior',
      'Cocina americana',
      'Ascensor',
      'Carpintería Climalit',
      'Suelo laminado',
      'Instalación eléctrica nueva',
      'Fontanería nueva',
      'Aire acondicionado split',
      'Armarios empotrados'
    ],
    images: ['/images/properties/piso-poble-sec-1.jpg', '/images/properties/piso-poble-sec-2.jpg'],
    featured: true,
    status: 'venta',
    coords: { lat: 41.3735, lng: 2.1640 }
  },
  {
    slug: 'piso-sant-antoni',
    title: 'Piso con Encanto en Sant Antoni',
    type: 'piso',
    neighborhood: 'Sant Antoni',
    district: 'Eixample',
    price: 395000,
    currency: '€',
    size: 75,
    bedrooms: 2,
    bathrooms: 2,
    floor: '1ª',
    yearBuilt: 1950,
    energyRating: 'E',
    description: 'Encantador piso exterior en el animado barrio de Sant Antoni, recientemente renovado. La propiedad ofrece 75 m² distribuidos en un salón comedor muy luminoso con ventanales que dan a la calle, cocina independiente equipada, 2 dormitorios dobles y 2 baños (uno en suite). La reforma ha preservado el encanto original con techos altos y molduras, combinado con cocina y baños modernos. Finca con ascensor y portero automático. Situado a dos calles del emblemático Mercado de Sant Antoni, recientemente rehabilitado, y muy cerca de la avenida del Paral·lel. Zona en plena transformación con numerosos bares, restaurantes y tiendas de diseño.',
    features: [
      'Recientemente renovado',
      'Exterior muy luminoso',
      'Techos altos con molduras',
      'Cocina independiente',
      'Ascensor',
      'Portero automático',
      'Baño en suite',
      'Armarios empotrados',
      'Aire acondicionado',
      'Balcón'
    ],
    images: ['/images/properties/piso-sant-antoni-1.jpg', '/images/properties/piso-sant-antoni-2.jpg'],
    featured: false,
    status: 'venta',
    coords: { lat: 41.3788, lng: 2.1647 }
  },
  {
    slug: 'casa-con-piscina-les-corts',
    title: 'Casa Adosada con Piscina en Les Corts',
    type: 'casa',
    neighborhood: 'Les Corts',
    district: 'Les Corts',
    price: 980000,
    currency: '€',
    size: 200,
    bedrooms: 4,
    bathrooms: 3,
    yearBuilt: 1995,
    energyRating: 'C',
    description: 'Espaciosa casa adosada en el tranquilo y residencial barrio de Les Corts, perfecta para familias. Con 200 m² distribuidos en 4 plantas, la vivienda cuenta con: sótano con garaje para 2 coches y zona de almacenaje; planta baja con salón de 40 m² con chimenea, cocina-office y aseo; primera planta con 3 dormitorios y 2 baños; segunda planta con suite principal, terraza y acceso a solárium privado. El jardín trasero de 50 m² con piscina es perfecto para disfrutar del clima mediterráneo. Excelente estado de conservación, con calefacción central de gas natural, aire acondicionado y carpintería de aluminio. Cerca del Camp Nou y de la Diagonal.',
    features: [
      'Jardín con piscina',
      'Chimenea',
      'Garaje 2 coches',
      'Solárium privado',
      'Calefacción central gas',
      'Aire acondicionado',
      'Cocina-office equipada',
      'Armarios empotrados',
      'Terraza',
      'Muy cerca de la Diagonal'
    ],
    images: ['/images/properties/casa-les-corts-1.jpg', '/images/properties/casa-les-corts-2.jpg'],
    featured: false,
    status: 'venta',
    coords: { lat: 41.3868, lng: 2.1325 }
  },
  {
    slug: 'atico-reformado-gracia',
    title: 'Ático Reformado en el Corazón de Gràcia',
    type: 'ático',
    neighborhood: 'Vila de Gràcia',
    district: 'Gràcia',
    price: 420000,
    currency: '€',
    size: 70,
    bedrooms: 2,
    bathrooms: 1,
    floor: '5ª',
    yearBuilt: 1950,
    energyRating: 'D',
    description: 'Bonito ático reformado en la mejor zona de Gràcia, a dos pasos de la Plaza de la Revolució. Con 70 m² bien aprovechados, la vivienda ofrece un salón comedor con techos de madera inclinados que le dan un encanto especial, cocina americana, 2 dormitorios (uno con altillo) y un baño con ducha. La terraza privada de 12 m² orientada a mediodía recibe sol todo el día. Reforma integral de calidad con acabados cuidados. Edificio con ascensor. Una oportunidad única para vivir en el barrio más cool de Barcelona, rodeado de galerías de arte, tiendas de diseño y la mejor oferta gastronómica de la ciudad.',
    features: [
      'Ático reformado',
      'Terraza 12 m²',
      'Techos inclinados de madera',
      'Altillo en dormitorio',
      'Ascensor',
      'Cocina americana',
      'Acabados de calidad',
      'Armarios empotrados',
      'Climatización split',
      'Muy luminoso'
    ],
    images: ['/images/properties/atico-reformado-gracia-1.jpg', '/images/properties/atico-reformado-gracia-2.jpg'],
    featured: false,
    status: 'venta',
    coords: { lat: 41.4008, lng: 2.1567 }
  },
  {
    slug: 'piso-estudio-inversion-sant-marti',
    title: 'Estudio en Venta – Oportunidad Inversión en Sant Martí',
    type: 'piso',
    neighborhood: 'Sant Martí de Provençals',
    district: 'Sant Martí',
    price: 180000,
    currency: '€',
    size: 45,
    bedrooms: 1,
    bathrooms: 1,
    floor: '2ª',
    yearBuilt: 1975,
    energyRating: 'E',
    description: 'Excelente oportunidad de inversión en el dinámico barrio de Sant Martí de Provençals. Este acogedor estudio de 45 m² recently renovado cuenta con salón-cocina americana, dormitorio independiente con armario empotrado y baño completo. La zona cuenta con todos los servicios: supermercados, farmacias, centros de salud y excelente conexión de transporte público (metro L1 y L2, bus y proximidad a la estación de Renfe). Alto potencial de rentabilidad por alquiler, con una estimación de rentabilidad del 6-7% anual. Ideal para inversores que buscan entrar en el mercado inmobiliario de Barcelona con una inversión asequible. Comunidad de vecinos tranquila y bien mantenida.',
    features: [
      'Reformado',
      'Dormitorio independiente',
      'Cocina americana',
      'Buena conexión transporte',
      'Alta rentabilidad inversión',
      'Armarios empotrados',
      'Aire acondicionado',
      'Comunidad tranquila',
      'Calefacción eléctrica',
      'Zona con todos los servicios'
    ],
    images: ['/images/properties/estudio-sant-marti-1.jpg', '/images/properties/estudio-sant-marti-2.jpg'],
    featured: false,
    status: 'venta',
    coords: { lat: 41.4180, lng: 2.2040 }
  },
  {
    slug: 'piso-de-lujo-passeig-gracia',
    title: 'Piso de Lujo en Passeig de Gràcia',
    type: 'piso',
    neighborhood: 'Passeig de Gràcia',
    district: 'Eixample',
    price: 2800000,
    currency: '€',
    size: 180,
    bedrooms: 3,
    bathrooms: 3,
    floor: '3ª',
    yearBuilt: 1920,
    energyRating: 'B',
    description: 'Propiedad de representación en el Passeig de Gràcia, la avenida más emblemática de Barcelona, frente a la Casa Batlló de Gaudí. Este majestuoso piso de 180 m² ha sido meticulosamente rehabilitado combinando elementos modernistas originales con las más altas prestaciones tecnológicas. Salón de 60 m² con techos de 4,5 m de altura, molduras originales y chimenea de mármol de Carrara. Cocina de diseño con isla central y electrodomésticos Gaggenau. Suite principal con baño de mármol, hidromasaje y vestidor. Sistema de climatización por conductos, domótica y seguridad avanzada. Portero 24h y parking en el mismo edificio.',
    features: [
      'Frente a Casa Batlló',
      'Techos 4,5 m de altura',
      'Molduras modernistas originales',
      'Chimenea de mármol de Carrara',
      'Cocina Gaggenau',
      'Suite con hidromasaje',
      'Domótica avanzada',
      'Portero 24h',
      'Parking en edificio',
      'Suelos de mosaico hidráulico restaurados'
    ],
    images: ['/images/properties/piso-passeig-gracia-1.jpg', '/images/properties/piso-passeig-gracia-2.jpg'],
    featured: true,
    status: 'venta',
    coords: { lat: 41.3924, lng: 2.1651 }
  }
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

export function getUniqueDistricts(): string[] {
  return [...new Set(properties.map(p => p.district))];
}

export function getUniqueTypes(): string[] {
  return [...new Set(properties.map(p => p.type))];
}

export function getUniqueNeighborhoods(): string[] {
  return [...new Set(properties.map(p => p.neighborhood))];
}

export function formatPrice(price: number, currency: string = '€'): string {
  return `${currency} ${price.toLocaleString('es-ES')}`;
}
