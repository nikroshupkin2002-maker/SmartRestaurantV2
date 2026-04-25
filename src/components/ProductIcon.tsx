import React from 'react';
import * as Icons from 'lucide-react';

interface ProductIconProps {
  name: string;
  size?: number;
  className?: string;
}

export const ProductIcon = ({ name, size = 24, className = "" }: ProductIconProps) => {
  // Динамически берем иконку по имени. Если имени нет — ставим дефолтную Box
  const IconComponent = (Icons as any)[name] || Icons.Box;
  return <IconComponent size={size} className={className} />;
};
