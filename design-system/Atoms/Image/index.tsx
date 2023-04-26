import React from 'react';
interface ImageProps extends React.HTMLAttributes<HTMLImageElement> {
  src: string;
  alt?: string;
}

export const Image = ({ src, alt, ...props }: ImageProps) => {
  const { className, ...rest } = props;

  return <Image className={className} src={src} alt={alt} {...rest} />;
};
