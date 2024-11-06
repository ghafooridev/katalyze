import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from '@jest/globals';
import { NavSideBar } from '@/components/Nav/NavSideBar';
import { usePathname } from 'next/navigation';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

const links = [
  { title: 'About', path: '/about', icon: <span>ℹ️</span> },
  { title: 'Contact', path: '/contact', icon: <span>📞</span>, label: 'New' },
];

describe('NavSideBar', () => {
  beforeEach(() => {
    (usePathname as jest.Mock).mockReturnValue('/');
  });
  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });
  it('renders all links', () => {
    render(<NavSideBar links={links} />);

    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('highlights the active link', () => {
    (usePathname as jest.Mock).mockReturnValue('/about');

    render(<NavSideBar links={links} />);

    const activeLink = screen.getByText('About').closest('a');
    expect(activeLink).toHaveClass('bg-primary-100');
  });

  it('does not highlight inactive links', () => {
    (usePathname as jest.Mock).mockReturnValue('/about');

    render(<NavSideBar links={links} />);

    const inactiveLink = screen.getByText('Contact').closest('a');
    expect(inactiveLink).not.toHaveClass('bg-primary-100');
  });

  it('renders link labels correctly', () => {
    render(<NavSideBar links={links} />);

    const contactLink = screen.getByText('Contact').closest('div');
    const label = screen.getByText('New');
    expect(contactLink).toContainElement(label);
    expect(label).toBeInTheDocument();
  });
  
  it('renders disabled links correctly', () => {
    const disabledLink = { title: 'Disabled', path: '/disabled', disable: true };
    render(<NavSideBar links={[disabledLink]} />);
  
    const disabledLinkElement = screen.getByTestId('disable-class');
    expect(disabledLinkElement).toHaveClass('pointer-events-none');
  });
  it('renders links with children correctly', () => {
    const linkWithChildren = {
      title: 'Parent',
      path: '/parent',
      children: [
        { title: 'Child 1', path: '/child1' },
        { title: 'Child 2', path: '/child2' },
      ],
    };
    render(<NavSideBar links={[linkWithChildren]} />);
    const parentLink = screen.getByText('Parent');
    expect(parentLink).toBeInTheDocument();
    const childLinks = screen.queryAllByRole('link', { name: /Child \d/ });
    expect(childLinks).toHaveLength(2); 
    fireEvent.click(parentLink);
    const childLinksAfterClick = screen.queryAllByRole('link', { name: /Child \d/ });
    expect(childLinksAfterClick).toHaveLength(2);
  });
  it('renders custom children prop correctly', () => {
    const customChildren = <div>Custom Children</div>;
    render(<NavSideBar links={[]} children={customChildren} />);
    expect(screen.getByText('Custom Children')).toBeInTheDocument();
  });
  it('handles empty links prop correctly', () => {
    render(<NavSideBar links={[]} />);
    expect(screen.queryByRole('nav')).toBeNull();
  });
});