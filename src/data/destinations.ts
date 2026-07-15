export interface Destination {
  image: string;
  title: string;
  subtitle: string;
  description: string;
}

export const DESTINATIONS: Destination[] = [
  {
    image:
      'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=600&q=80&fit=crop',
    title: 'Santorini',
    subtitle: 'Greece',
    description:
      'Whitewashed cliffs meet the Aegean blue — sunsets that rewrite your definition of beauty.',
  },
  {
    image:
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&q=80&fit=crop',
    title: 'Kyoto',
    subtitle: 'Japan',
    description:
      'Temples wrapped in bamboo groves, where centuries of stillness meet cherry-blossom air.',
  },
  {
    image:
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80&fit=crop',
    title: 'Banff',
    subtitle: 'Canada',
    description:
      'Turquoise lakes cradled by the Rockies — raw wilderness with a lodge-fire welcome.',
  },
  {
    image:
      'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=600&q=80&fit=crop',
    title: 'Amalfi Coast',
    subtitle: 'Italy',
    description:
      'Cliffside villages spilling into the Mediterranean — lemon groves, terraced views, la dolce vita.',
  },
  {
    image:
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80&fit=crop',
    title: 'Bali',
    subtitle: 'Indonesia',
    description:
      'Emerald rice terraces and sacred temples — an island where spirit and nature move as one.',
  },
  {
    image:
      'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=600&q=80&fit=crop',
    title: 'Patagonia',
    subtitle: 'Argentina',
    description:
      'Jagged peaks above glacial fields — the edge of the world, and the start of something deeper.',
  },
];
