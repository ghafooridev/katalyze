import { render } from '@testing-library/react';
import Loading from '@/components/Loading';
import { describe, expect, test } from '@jest/globals';

describe('Loading Component', () => {
    test('renders without crashing', () => {
        // Render the component
        const { container } = render(<Loading />);

        // Check if the component renders the <path> element
        const pathElement = container.querySelector('path');
        expect(pathElement).toBeInTheDocument();
    });

    test('renders the correct path attributes', () => {
        const { container } = render(<Loading />);

        // Check if the <path> has the correct "d" attribute
        const pathElement = container.querySelector('path');
        expect(pathElement).toHaveAttribute('d')
    });

    test('renders with the correct fill attribute', () => {
        const { container } = render(<Loading />);

        // Check if the <path> has the correct fill color
        const pathElement = container.querySelector('path');
        expect(pathElement).toHaveAttribute('fill', '#442E80');
    });
});
