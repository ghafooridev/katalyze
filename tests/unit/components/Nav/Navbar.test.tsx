import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it } from '@jest/globals';
import Navbar from '@/components/Nav/Navbar';
import { usePathname } from 'next/navigation';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

describe('Navbar', () => {
  const links = [
    { title: 'Raw Materials', path: '/raw-materials' },
    { title: 'Documents', path: '/documents' },
  ];

  beforeEach(() => {
    (usePathname as jest.Mock).mockReturnValue('/');
  });
  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  it('renders all links in the desktop view', () => {
    render(<Navbar />);

    links.forEach((link) => {
      expect(screen.getByText(link.title)).toBeInTheDocument();
    });
  });

  it('renders the dropdown menu in the mobile view', () => {
    global.innerWidth = 500;
    global.dispatchEvent(new Event('resize'));

    render(<Navbar />);

    const testTubeIcon = screen.getByTestId('logo');
    expect(testTubeIcon).toBeInTheDocument();
  });
});
