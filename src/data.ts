/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PropertyAsset, PortfolioHistoryItem } from './types';

export const INITIAL_ASSETS: PropertyAsset[] = [
  {
    id: '1',
    name: 'The Obsidian Prism',
    code: 'ARCH-OP-01',
    type: 'residential',
    location: 'Reykjavik, Iceland',
    yieldRate: 8.2,
    growthRate: 1.2,
    value: 3450000,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB-Xpv1ScvfXcxQYniWx67Jg4DA_ud5eGBeqFG-XEmupH0M1GPnTjqzUd4H3s0avQka4uSH3dndoxuzdn_PmMZ9qdmK39w0U01gN5CPpRkn8rzfxnz42opjMPjXDbUEvuLoDap-4kIRj-OEQRWVO-S68baqawS7PPN0jvGcGAIz0xd7iBKdTzOBouWGvgmhD9P83nNe3hpDeiddoSj3MoLd7mXmSoSEtydyYelmL6vgb-M3JZoc_pElwR71LfioFtI2nfoIYYLDvRH5',
    description: 'A futuristic minimalist residential structure with sharp geometric lines and an obsidian-black facade, captured at twilight with high-contrast lighting. The building is surrounded by sparse, architectural landscaping.',
    coordinates: '64.1466° N, 21.9426° W',
    status: 'acquired',
    materials: ['Sintered Volcano Obsidian', 'Polycrystalline Smart Glass', 'Reinforced Carbon Fiber composite'],
    twinNode: 'META-REYK-NODE-01',
    carbonIndex: 'A++ (Negative Emissions)',
    completionYear: 2024
  },
  {
    id: '2',
    name: 'Digital Twin 08',
    code: 'ARCH-DT-08',
    type: 'digital_twin',
    location: 'Metaverse Node 4',
    yieldRate: 12.4,
    growthRate: 4.8,
    value: 820000,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAKbYlJVdmegbbn_5bUFC2df70qDhNrwkPtR4Lh828fb52vx5LFbytDWguWkiyfv5DHdwC6lA_y3N1AJUTXNby8DZ9wJuspEZcKslip4-0twFgHBpvxHODxXkNnpl7CUFya46s4lnyLOOpzCu8167M5_NsI8R3kUTWD8d1kOLtii6vOeigoCCJeTVKJTkjtm3cdHI1oItsU114KNWx7yzaGV0iTZ4ZEpc4hwE9n9ebYazZjYPbbUBLQk0gbOOBsvT_jU_cC7ZhEk-Cu',
    description: 'Modern avant-garde desert architecture with cantilevered glass wings and smooth concrete surfaces. Fully synchronized physical-to-virtual twin node supporting dynamic environmental state matching.',
    coordinates: 'Node-4.Metaverse.arch (Virtual)',
    status: 'acquired',
    materials: ['Holographic Mesh Grid', 'Crystalline Light Pipeline', 'Unreal Core Matrix V2'],
    twinNode: 'META-NODE-04-CORE',
    carbonIndex: 'Zero Virtual Carbon',
    completionYear: 2025
  },
  {
    id: '3',
    name: 'Azure Monolith',
    code: 'ARCH-AM-14',
    type: 'commercial',
    location: 'Dubai Marina, UAE',
    yieldRate: 7.9,
    growthRate: 0.4,
    value: 5100000,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBaLVoRwzobeS0nXsA9dcBrZ8gzCLMibz1udISrNWqfr5t6GDof_6dWod93iUyepnRTV9Vl0UYUuOfKIcgtia1sd73fcglRcCUxcZTCG7oPzTMUUUvvvS081zwZADP5pqz1sXhvth0X0u1ZNE7JLJFghGexHpdQ7-c0keI2GIxIZjPeDflDrIASDHRMCIEtMJpIcqFg18N8o3wHbjKP-kj-9Z97SPkelJ8_fzkb5FKcPHPZWSdclQqRrsvxBOJEggueC2YmsF9ObzWy',
    description: 'A vertical monolithic residential and commercial tower with deep recessed windows and metallic gold accent trim against dark carbon-fiber textures, projecting power and high exclusivity.',
    coordinates: '25.0819° N, 55.1367° E',
    status: 'acquired',
    materials: ['Gilded Titanium Compound', 'Hydrophobic Dark Glazing', 'Reinforced Graphene Columns'],
    twinNode: 'META-DUBA-NODE-78',
    carbonIndex: 'A (Carbon Neutral)',
    completionYear: 2023
  },
  {
    id: '4',
    name: 'Helios Canopy',
    code: 'ARCH-HC-04',
    type: 'residential',
    location: 'Kyoto Hills, Japan',
    yieldRate: 6.8,
    growthRate: 2.1,
    value: 2980000,
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800',
    description: 'A continuous sweeping structure embedded in the hills of historic Kyoto. Features integrated photoluminescent roofing and automated water purification micro-canals mimicking ancient streams.',
    coordinates: '35.0116° N, 135.7681° E',
    status: 'under_construction',
    materials: ['Treated Bio-Timber', 'Nanotech Organic Solar Skin', 'Lightweight Aerated concrete'],
    twinNode: 'META-KYO-NODE-09',
    carbonIndex: 'A+++ (Net Active Emission Absorber)',
    completionYear: 2026
  },
  {
    id: '5',
    name: 'Vortex Syndicate',
    code: 'ARCH-VS-99',
    type: 'commercial',
    location: 'Zurich, Switzerland',
    yieldRate: 9.1,
    growthRate: 3.5,
    value: 7420000,
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800',
    description: 'A spiral headquarters for algorithmic finance, crafted out of hyper-polished chrome composite, blending into the Swiss sky. Dynamic heliostat arrays follow the sun to feed thermal deep wells.',
    coordinates: '47.3769° N, 8.5417° E',
    status: 'pipeline',
    materials: ['Hyper-polished Chrome Steel', 'Anodized Dark Aluminum', 'Regenerative Solar Spires'],
    twinNode: 'META-ZUR-NODE-12',
    carbonIndex: 'A++ (Active Thermal Generator)',
    completionYear: 2027
  },
  {
    id: '6',
    name: 'Elysium Cuboid',
    code: 'ARCH-EC-02',
    type: 'digital_twin',
    location: 'Metaverse Node 11',
    yieldRate: 14.2,
    growthRate: 6.3,
    value: 1250000,
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800',
    description: 'A pure floating geometric glass cube situated in the high-density financial vector of Node 11. Built entirely of procedural crystalline architecture with real-time trading light pipelines.',
    coordinates: 'Node-11.Metaverse.arch (Virtual)',
    status: 'pipeline',
    materials: ['Refractive Crystalline Shaders', 'Quantum Raytracing Mesh', 'Dynamic Aura Flux Modulator'],
    twinNode: 'META-NODE-11-FINANCIAL',
    carbonIndex: 'Zero Virtual Carbon',
    completionYear: 2028
  }
];

export const HISTORY_6M: PortfolioHistoryItem[] = [
  { month: 'Jan', value: 10.1, yieldRate: 8.0 },
  { month: 'Feb', value: 10.6, yieldRate: 8.1 },
  { month: 'Mar', value: 11.2, yieldRate: 8.2 },
  { month: 'Apr', value: 11.8, yieldRate: 8.3 },
  { month: 'May', value: 12.1, yieldRate: 8.3 },
  { month: 'Jun', value: 12.4, yieldRate: 8.4 }
];

export const HISTORY_1Y: PortfolioHistoryItem[] = [
  { month: 'Jul 25', value: 8.5, yieldRate: 7.6 },
  { month: 'Aug 25', value: 8.9, yieldRate: 7.7 },
  { month: 'Sep 25', value: 9.3, yieldRate: 7.8 },
  { month: 'Oct 25', value: 9.5, yieldRate: 7.8 },
  { month: 'Nov 25', value: 9.8, yieldRate: 7.9 },
  { month: 'Dec 25', value: 10.1, yieldRate: 8.0 },
  { month: 'Jan 26', value: 10.3, yieldRate: 8.1 },
  { month: 'Feb 26', value: 10.8, yieldRate: 8.1 },
  { month: 'Mar 26', value: 11.2, yieldRate: 8.2 },
  { month: 'Apr 26', value: 11.7, yieldRate: 8.3 },
  { month: 'May 26', value: 12.1, yieldRate: 8.3 },
  { month: 'Jun 26', value: 12.4, yieldRate: 8.4 }
];

export const HISTORY_ALL: PortfolioHistoryItem[] = [
  { month: '2022', value: 4.2, yieldRate: 6.8 },
  { month: '2023', value: 6.8, yieldRate: 7.2 },
  { month: '2024', value: 9.4, yieldRate: 7.9 },
  { month: '2025', value: 11.1, yieldRate: 8.2 },
  { month: 'Mid 2026', value: 12.4, yieldRate: 8.4 }
];

export const AVAILABLE_LOCATIONS = [
  'Reykjavik, Iceland',
  'Dubai Marina, UAE',
  'Kyoto Hills, Japan',
  'Zurich, Switzerland',
  'Singapore Waterfront',
  'New York, USA',
  'Metaverse Node 4',
  'Metaverse Node 11',
  'Metaverse Node 15',
  'London, UK',
  'Cape Town, South Africa',
  'Tokyo Shinjuku, Japan'
];

export const PRESET_IMAGES = [
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1549576490-b0b4831da60a?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=800'
];
