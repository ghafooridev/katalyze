'use client';

import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/react';

interface BreadcrumbNavProps {
  links: {
    title: string;
    path?: string;
  }[];
}

export function BreadcrumbNav({ links }: Readonly<BreadcrumbNavProps>) {
  return (
    <Breadcrumbs
      className="flex flex-row items-center"
      itemClasses={{
        item: 'opacity-100 hover:opacity-100',
        separator: 'text-gray-600 px-3',
      }}
    >
      {links.map((link, index) => {
        const isLastItem = index === links.length - 1;
        let textClass = '';

        if (isLastItem) {
          textClass = 'text-primary-700 font-semibold';
        } else if (!link.path) {
          textClass = 'text-gray-600';
        } else {
          textClass = 'text-gray-600';
        }

        return (
          <BreadcrumbItem
            key={link.title}
            href={link.path}
            isDisabled={!link.path}
          >
            <span className={textClass}>{link.title}</span>
          </BreadcrumbItem>
        );
      })}
    </Breadcrumbs>
  );
}
