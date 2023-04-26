import React from 'react';

interface SimpleSaperatorProps {
  height: 'h-5' | 'h-8' | 'h-14' | 'h-20';
}

interface CustomSaperator {
  className: string;
}

export const SimpleSaperator = ({ height }: SimpleSaperatorProps) => {
  return <div className={`inline-block w-full ${height}`} />;
};

export const CustomSaperator = ({ className }: Partial<CustomSaperator>) => {
  return <div className={`inline-block w-full ${className}`} />;
};
