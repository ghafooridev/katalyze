import { describe, expect, test } from '@jest/globals';
import { MetricCard } from '@/components/MetricCard';


import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // for extended matchers

describe('MetricCard', () => {
  test('renders with title and value', async () => {
    render(<MetricCard title="Metric Title" value={42} />);

    expect(screen.getByText('Metric Title')).toBeInTheDocument();
    expect(screen.getByText('42')).toBeInTheDocument();
  });

  test('displays loader when loading', async () => {
    render(<MetricCard title="Metric Title" />);

  });

  test('displays chip with success color when rate is positive', async () => {
    render(<MetricCard title="Metric Title" rate={5} />);

    const chip = screen.getByText(/5%/i);
    expect(chip).toBeInTheDocument();
    expect(chip.closest('div')).toHaveClass('relative max-w-fit min-w-min inline-flex items-center justify-between box-border whitespace-nowrap text-small rounded-full bg-transparent text-success border-[1.5px] border-success-600 px-0 h-6'); // Adjust based on your class structure
  });

  test('displays chip with danger color when rate is negative', async () => {
    render(<MetricCard title="Metric Title" rate={-5} />);

    const chip = screen.getByText(/-5%/i);
    expect(chip).toBeInTheDocument();
    expect(chip.closest('div')).toHaveClass('relative max-w-fit min-w-min inline-flex items-center justify-between box-border whitespace-nowrap text-small rounded-full bg-transparent text-danger border-[1.5px] border-danger-600 px-0 h-6'); // Adjust based on your class structure
  });

  test('displays chip with default color when rate is zero', async () => {
    render(<MetricCard title="Metric Title" rate={0} />);

    const chip = screen.getByText(/0%/i);
    expect(chip).toBeInTheDocument();
    expect(chip.closest('div')).toHaveClass('relative max-w-fit min-w-min inline-flex items-center justify-between box-border whitespace-nowrap text-small rounded-full bg-transparent text-foreground border-[1.5px] border-default-600 px-0 h-6'); // Adjust based on your class structure
  });
});
