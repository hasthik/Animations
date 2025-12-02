import React from 'react';

export interface AnimationItem {
  id: number;
  category: string;
  title: string;
  description: string;
  component?: React.ReactNode;
}

export enum SectionType {
  HERO = 'HERO',
  CORE = 'CORE',
  SCROLL = 'SCROLL',
  TEXT = 'TEXT',
}