import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect } from '@jest/globals';
import Breadcrumb from '@/components/BreadCrumb';

describe('Breadcrumb', () => {
  it('renders without crashing', () => {
    render(<Breadcrumb homeElement={<div>Home</div>} path={['path1', 'path2']} />);
    const breadcrumbElement = screen.getByTestId('breadcrumb');
    expect(breadcrumbElement).toBeInTheDocument();
  });

  it('displays the correct home element and path links', () => {
    render(<Breadcrumb homeElement={<div>Home</div>} path={['path1', 'path2']} />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Path1')).toBeInTheDocument();
    expect(screen.getByText('Path2')).toBeInTheDocument();
  });
});