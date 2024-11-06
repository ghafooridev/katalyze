'use client';

import { FC, ReactNode, useState } from 'react';
import { Chip } from '@nextui-org/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import ChevronDownIcon from '@/icons/ChevronDown';
import { cn } from '@/lib/utils';

type NavProps = {
  links: {
    title: string;
    label?: string;
    path: string;
    icon?: React.ReactElement;
    activeIcon?: React.ReactElement;
    disable?: boolean;
    children?: {
      title: string;
      path: string;
    }[],
  }[];
  children?: ReactNode
}

type Unpacked<T> = T extends (infer U)[] ? U : T;

const NavLink: FC<{ link: Unpacked<NavProps['links']>, isActive?: boolean, children: ReactNode }> = (props) => {
  const { link, isActive, children } = props;

  return (
    <div data-testid={'disable-class'}
      className={`${link.disable ? 'pointer-events-none' : 'pointer-events-auto'}`}>
      <Link
        key={link.title}
        href={link.path}
        className={cn(
          isActive && 'bg-primary-100',
          'h-12 p-3 rounded-md justify-start items-center gap-2 inline-flex w-full',
          isActive ? 'text-typo-900' : 'text-typo-700',
          'hover:bg-primary-200',
          'hover:text-typo-900',

        )}
      >
        <div className="grow shrink basis-0 h-6 justify-start items-center gap-3 flex w-full">
          {<div className='min-w-5'>{link.icon}</div>}
          <span
            className={cn(
              'text-base font-semibold leading-normal flex justify-between items-center w-full',
              link.disable && 'text-gray-300',
            )}
          >
            {children}
          </span>
          {link.label && (
            <Chip
              variant='bordered' color='default'
              className="-z-1 relative mt-auto mb-auto pr-1 px-0
              text-center text-xs font-medium h-[22px] mr-auto"
              classNames={{
                base: 'border-red-600 bg-red-600',
                content: 'font-medium text-xs text-primary-foreground',
              }}>
              <span className="text-center text-primary-foreground
              text-xs font-bold leading-[18px]">
                {link.label}
              </span>
            </Chip>
          )}
        </div>
      </Link>
    </div>
  );
};

export function NavSideBar({ links, children }: Readonly<NavProps>) {
  const pathname = usePathname();
  const [showChildren, setShowChildren] = useState(true);

  const onToggleChildren = () => {
    setShowChildren(!showChildren);
  };

  const getLink = (link, isActive) => (
    link.children?.length
      ? (
        <>
          <div className='h-12 p-3 rounded-md justify-start items-center gap-2 inline-flex w-full'>

            <div className="grow shrink basis-0 h-6 justify-start items-center gap-3 flex w-full">
              {link.icon ?? <div className='ml-5' />}
              <span
                className={cn(
                  'text-base font-semibold leading-normal flex justify-between items-center w-full',
                  link.disable && 'text-gray-300',
                )}
              >
                <div className='flex justify-between w-full text-typo-700'>
                  {link.title}
                  <div role="button"
                    onClick={onToggleChildren} data-testid={'children-toggle'} className='cursor-pointer'>
                    {showChildren ? <ChevronDownIcon className='rotate-180' /> : <ChevronDownIcon />}
                  </div>
                </div>
              </span>
            </div>
          </div>
          {showChildren && link.children.map((item) => {
            const isActiveChildren = pathname.includes(item.path);

            return (
              <NavLink link={item} isActive={isActiveChildren} key={item.path}>
                {item.title}
              </NavLink>
            );
          })}
        </>
      )
      : <NavLink link={link} isActive={isActive} >
        {link.title}
      </NavLink>
  );

  return (
    <div className="group flex flex-col gap-2 py-6 min-w-[264px]">
      {children}
      <nav className="grid gap-1 px-4 w-full">
        <div className='text-sm font-medium text-gray-700'>Sections</div>
        {links.map((link) => {
          const isActive = pathname.includes(link.path);

          return (
            <div key={link.path}>
              {getLink(link, isActive)}
            </div>
          );
        })}
      </nav>
    </div>
  );
}
