import { FC, ReactElement } from 'react';

import { NavSideBar } from '@/components/Nav/NavSideBar';

type MaterialNavBarType = {
  children?: ReactElement,
  links: {
    title: string,
    label: string;
    path: string;
    icon: ReactElement;
    activeIcon?: ReactElement;
    disable?: boolean;
    children?: {
      title: string;
      path: string;
    }[],
  }[]
}

const MaterialNavbar: FC<MaterialNavBarType> = (props) => {
  const { children, links } = props;

  return (
    <div className='w-[264px] bg-white border-r border-gray-200 flex-col items-stretch justify-start fixed'>
      <div>{children}</div>
      <NavSideBar
        links={links}
      />
    </div>
  );
};

export default MaterialNavbar;
