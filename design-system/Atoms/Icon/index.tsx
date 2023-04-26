'use client';

import React, { ButtonHTMLAttributes } from 'react';
import { IconType } from 'react-icons';
import { BiMenu, BiX } from 'react-icons/bi';
interface IconProps {
  className?: string;
  icon: IconType;
  onClick?: () => void;
  title?: string;
}

export const Icon = ({
  icon,
  className,
  title,
  onClick,
  ...props
}: IconProps) => {
  const IconName = icon;

  return (
    <IconName
      className={className}
      title={title}
      style={{ verticalAlign: 'middle' }}
      onClick={onClick}
      {...props}
    />
  );
};

interface MenuIconPropsType extends ButtonHTMLAttributes<HTMLButtonElement> {
  isMenueOpen: boolean;
}

export const MenuIcon = ({
  className,
  isMenueOpen,
  onClick,
  ...props
}: MenuIconPropsType) => {
  const Icon = isMenueOpen ? BiX : BiMenu;

  return (
    <button className={className} onClick={onClick} {...props}>
      <Icon className="w-9 h-9" />
    </button>
  );
};
