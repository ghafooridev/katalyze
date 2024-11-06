import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from '@jest/globals';
import { BreadcrumbNav } from '@/components/Nav/BreadcrumbNav';

const links = [
  { title: 'About', path: '/about' },
  { title: 'Contact' },
];

describe('BreadcrumbNav', () => {
  it('renders all links', () => {
    render(<BreadcrumbNav links={links} />);

    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('renders BreadcrumbPage for links without path', () => {
    render(<BreadcrumbNav links={links} />);

    const breadcrumbPage = screen.getByText('Contact');
    expect(breadcrumbPage).toBeInTheDocument();
    expect(breadcrumbPage).toHaveClass('text-primary-700');
  });

  it('renders links correctly', () => {
    render(<BreadcrumbNav links={links} />);

    const aboutLink = screen.getByText('About').closest('a');

    expect(aboutLink).toHaveAttribute('href', '/about');
  });
});
