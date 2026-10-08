import type { ImageName, Language } from './types';

export const serviceIds = ['GESTION', 'REFORMA', 'VENTA', 'LLEGADA', 'INVERSION'];
export const interiorArt: Record<string, { image: ImageName; detail: ImageName; label: [string, string]; caption: [string, string] }> = {
  INVERSION: { image: 'hero', detail: 'staircase', label: ['Inversión inmobiliaria', 'Property investment'], caption: ['Patrimonio, perspectiva y un lugar en el mundo.', 'Assets, perspective and a place in the world.'] },
  GESTION: { image: 'living', detail: 'terrace', label: ['Gestión y cuidado', 'Property care'], caption: ['La tranquilidad de saber que todo tiene su lugar.', 'The reassurance of knowing everything is in place.'] },
  REFORMA: { image: 'staircase', detail: 'living', label: ['Reforma y puesta en valor', 'Renovation & enhancement'], caption: ['Una nueva forma de vivir lo que ya es tuyo.', 'A new way of living in a place that is yours.'] },
  VENTA: { image: 'hero', detail: 'staircase', label: ['Asesoramiento en venta', 'Property sale advice'], caption: ['Cada propiedad merece una decisión meditada.', 'Every property deserves a considered decision.'] },
  LLEGADA: { image: 'terrace', detail: 'hero', label: ['Vivienda y llegada', 'Housing & arrival'], caption: ['Barcelona, el comienzo de tu siguiente capítulo.', 'Barcelona, the beginning of your next chapter.'] },
  FIRMA: { image: 'staircase', detail: 'living', label: ['La firma', 'The firm'], caption: ['Una mirada personal. Una perspectiva completa.', 'A personal approach. A complete perspective.'] },
  JOURNAL: { image: 'staircase', detail: 'terrace', label: ['Journal de Solera', 'The Solera journal'], caption: ['Ideas para mirar tu propiedad de otra manera.', 'Ideas for seeing your property in a different light.'] },
  CONTACTO: { image: 'terrace', detail: 'hero', label: ['Una conversación privada', 'A private conversation'], caption: ['Toda buena relación comienza escuchando.', 'Every good relationship begins with listening.'] },
};
export const localText = (value: [string, string], lang: Language) => value[lang === 'es' ? 0 : 1];
