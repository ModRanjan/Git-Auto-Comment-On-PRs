import Link from 'next/link';
import { FC } from 'react';
import {
  FaFacebookF,
  FaGoogle,
  FaInstagram,
  FaPinterestP,
  FaTwitter,
} from 'react-icons/fa';

interface SocialNavigationProps {}

const FooterSocialNavigation = [
  {
    name: 'Facebook',
    href: '#',
    icon: FaFacebookF,
  },
  {
    name: 'Twitter',
    href: '#',
    icon: FaTwitter,
  },
  {
    name: 'Pinterest',
    href: '#',
    icon: FaPinterestP,
  },

  {
    name: 'Google',
    href: '#',
    icon: FaGoogle,
  },
  {
    name: 'Instagram',
    href: '#',
    icon: FaInstagram,
  },
];

export const SocialNavigation: FC<SocialNavigationProps> = ({}) => {
  return (
    <div className="flex w-64 space-x-4">
      {FooterSocialNavigation.map((item) => (
        <Link key={item.name} legacyBehavior passHref href={item.href}>
          <a className="p-2 text-blue-400 border border-purple-300 rounded-full hover:bg-green-500 hover:text-blue-gray-500">
            <item.icon className="w-4 h-4 text-white" aria-hidden="true" />
          </a>
        </Link>
      ))}
    </div>
  );
};

{
  /* OLD
  <div className="flex space-x-4">
  {FooterSocialNavigation.map((item) => (
    <a
      key={item.name}
      href={item.href}
      className="p-2 text-blue-400 border border-purple-300 rounded-full hover:bg-green-500 hover:text-blue-gray-500"
    >
      <item.icon className="w-4 h-4 text-white" aria-hidden="true" />
    </a>
  ))}
</div>; */
}
