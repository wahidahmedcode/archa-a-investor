/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type AssetType = 'residential' | 'digital_twin' | 'commercial';

export type AssetStatus = 'acquired' | 'under_construction' | 'pipeline';

export interface PropertyAsset {
  id: string;
  name: string;
  code: string;
  type: AssetType;
  location: string;
  yieldRate: number;
  growthRate: number;
  value: number;
  imageUrl: string;
  description: string;
  coordinates: string;
  status: AssetStatus;
  materials: string[];
  twinNode?: string;
  carbonIndex: string;
  completionYear: number;
  clientName?: string;
}

export type SidebarView = 'portfolio' | 'assets' | 'analytics' | 'reports' | 'settings';

export interface PortfolioHistoryItem {
  month: string;
  value: number; // Millions
  yieldRate: number;
}
