'use client';

import React, { FC, ReactNode } from 'react';
import { Skeleton } from '@nextui-org/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type BreadCrumbProps = {
  homeElement?: ReactNode,
  path: string[],
  urlPath?: string[]
}

const Breadcrumb: FC<BreadCrumbProps> = ({
  homeElement, path, urlPath = [],
}) => {
  const paths = usePathname();
  const pathNames = [...path];
  const urlPaths = urlPath.length > 0 ? urlPath : pathNames;
  const separator = <span> {'>'} </span >;

  const getHref = (href: string): string => {
    if (href === '/raw materials') {
      return '/raw-materials/overview';
    }
    if (href === '/documents') {
      return '/documents/browse';
    }
    return href.replaceAll(' ', '-');
  };

  const showLoading = () => {
    const numberOfTitle = 3;
    return (
      <div className=" flex items-center justify-start gap-2 px-2 w-[300px] ml-4 mt-4" >
        {[...Array(numberOfTitle)].map((element, index) => (
          <Skeleton key={`header-${index}`}
            data-testid="skeleton-column"
            className="before:!duration-1000 w-full h-5 rounded-lg skeleton flex items-center justify-start mr-5">
            <div className="h-3 rounded-lg bg-default-300" />
          </Skeleton>
        ))}
      </div>
    );
  };

  return (
    <div data-testid="breadcrumb">
      {pathNames.includes('') ? showLoading()
        : <ul className={'flex items-center pt-6 px-6 gap-3'}>
          {homeElement && <> <li className={'hover:underline mx-2 text-sm'}><Link href={'/'}>{homeElement}</Link></li>
            {pathNames.length > 0 && separator}</>}
          {
            pathNames.map((link, index) => {
              const href = `/${urlPaths.slice(0, index + 1).join('/')}`;
              const itemClasses = paths === href
                ? 'hover:underline mx-2 text-sm text-primary'
                : 'hover:underline text-sm text-gray-600 font-medium';
              const itemLink = link[0].toUpperCase() + link.slice(1);
              return (
                <React.Fragment key={link}>
                  <li className={itemClasses}>
                    <Link href={getHref(href)}
                      className={`${pathNames.length === index + 1 && 'text-primary-700 font-semibold'}`}>
                      {itemLink.replaceAll('-', ' ')}
                    </Link>
                  </li>
                  {pathNames.length !== index + 1 && separator}
                </React.Fragment>
              );
            })
          }
        </ul>

      }
    </div>
  );
};

export default Breadcrumb;
