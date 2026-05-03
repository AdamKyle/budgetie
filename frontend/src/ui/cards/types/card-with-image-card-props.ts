import type { ReactNode } from 'react';

export type CardWithImageProps = {
  children: ReactNode;
  id: string;
  imageAlt: string;
  imageSrc: string;
  title: string;
  isImageRight?: boolean;
};
