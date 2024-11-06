import { describe, expect } from '@jest/globals';
// ChartAxisLabel.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { ChartAxisLabel, renderTick } from '@/components/Chart/ChartAxis';
import '@testing-library/jest-dom/extend-expect';



describe('ChartAxisLabel component', () => {
    it('renders the tick label with adjusted textY value', () => {
        const tickProps = {
            x: 50,
            y: 100,
            textAnchor: 'start',
            textX: 5,
            textY: 10,
            value: 'Tick Label',
        };

        render(renderTick(tickProps));

        const textElement = screen.getByText('Tick Label');
        expect(textElement).toBeInTheDocument();

        const gElement = textElement.closest('g');
        expect(gElement).toHaveAttribute('transform', 'translate(50,100)');

        expect(textElement).toHaveAttribute('text-anchor', 'start');

        // Use getComputedStyle for testing style values
        const styles = window.getComputedStyle(textElement);
        expect(styles.fontSize).toBe('12px');
        expect(styles.lineHeight).toBe('18');
        expect(styles.fill).toBe('#475467'); // Ensure correct RGB value for the fill color

        const transform = textElement.getAttribute('transform');
        expect(transform).toBe('translate(5,20)'); // textY is adjusted by 15 in renderTick
    });
});

describe('renderTick function', () => {
    it('renders the tick label with adjusted textY value', () => {
        const tickProps = {
            x: 50,
            y: 100,
            textAnchor: 'start',
            textX: 5,
            textY: 10,
            value: 'Tick Label',
        };

        render(renderTick(tickProps));

        const textElement = screen.getByText('Tick Label');
        expect(textElement).toBeInTheDocument();

        const gElement = textElement.closest('g');
        expect(gElement).toHaveAttribute('transform', 'translate(50,100)');

        expect(textElement).toHaveAttribute('text-anchor', 'start');
        // Use getComputedStyle for testing style values
        const styles = window.getComputedStyle(textElement);
        expect(styles.fontSize).toBe('12px');
        expect(styles.lineHeight).toBe('18');
        expect(styles.fill).toBe('#475467'); // Ensure correct RGB value for the fill color

        const transform = textElement.getAttribute('transform');
        expect(transform).toBe('translate(5,20)'); // textY is adjusted by 15 in renderTick
    });
});

