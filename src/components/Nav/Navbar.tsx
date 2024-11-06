'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import Logo from '@/icons/Logo';

export default function Navbar() {
  const pathname = usePathname();

  const isActiveLink = (path) => {
    if (path === '/') {
      return pathname === '/';
    }
    if (path === '/documents/browse/') {
      return pathname.startsWith('/documents/');
    }
    if (path.startsWith('/raw-materials')) {
      return pathname.startsWith('/raw-materials');
    }
    return pathname.startsWith(path);
  };

  const renderLink = (link, index) => {
    let className = 'text-sm font-medium leading-tight';

    if (isActiveLink(link.path)) {
      className += ' text-primary-700 hover:text-primary-800';
    } else {
      className += ' text-gray-500 hover:text-gray-700';
    }
    return (
      <Link
        key={index}
        href={link.path}
        className={className}
        data-testid={link.title}
      >
        {link.title}
      </Link>
    );
  };

  return (
    <nav
      className="pb-4 h-[60px] w-full border-b border-gray-200 bg-white
     flex items-center gap-8 px-12 py-4 mx-auto fixed z-50"
    >
      <span data-testid="logo">
        <Logo />
      </span>
      <div className=" flex pb-4 h-16  items-center gap-8  py-4 ">
        {[
          { title: 'Raw Materials', path: '/raw-materials/overview' },
          { title: 'Documents', path: '/documents/browse/' },
        ].map((link, index) => renderLink(link, index))}
      </div>
    </nav>
  );
}
