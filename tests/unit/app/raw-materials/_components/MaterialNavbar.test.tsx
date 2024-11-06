import { render, screen } from '@testing-library/react';
import MaterialNavbar from '@/app/raw-materials/_components/MaterialNavbar';
import { describe, expect, test } from '@jest/globals';

jest.mock('next/navigation', () => ({
    usePathname: jest.fn().mockReturnValue('/mocked-path'),
  }));


describe('MaterialNavbar Component', () => {
  const mockLinks = [
    {
      title: 'Overview',
      label: 'Overview',
      path: '/raw-materials/id/overview',
      icon: <svg />, 
    },
    {
      title: 'Batches',
      label: 'Batches',
      path: '/raw-materials/id/batches',
      icon: <svg />, 
      children: [
        {
          title: 'Correlations',
          path: '/raw-materials/id/correlations',
        },
        {
          title: 'Trends',
          path: '/raw-materials/id/trends',
        },
      ],
    },
  ];


  test('renders MaterialNavbar component with links and children', () => {
    render(
      <MaterialNavbar links={mockLinks} >
        <div>Child Component</div>
      </MaterialNavbar>,
    );

    expect(screen.getByText('Child Component')).toBeInTheDocument();
    expect(screen.getByText('Batches')).toBeInTheDocument();
    expect(screen.getByText('Correlations')).toBeInTheDocument();
    expect(screen.getByText('Trends')).toBeInTheDocument();
  });
});