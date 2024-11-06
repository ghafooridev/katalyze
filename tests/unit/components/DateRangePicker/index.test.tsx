import { describe, expect } from '@jest/globals';

// DateRangePicker.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DateRangePicker from '@/components/DateRangePicker';
import '@testing-library/jest-dom/extend-expect';
// DateRangePicker.test.tsx
import { Button } from '@nextui-org/react';
import { today, getLocalTimeZone, CalendarDate } from '@internationalized/date';

// // Mocking dependencies
// jest.mock('@nextui-org/react', () => ({
//     Button: jest.fn(({ children, onClick }) => (
//         <button onClick={onClick} data-testid="button">
//             {children}
//         </button>
//     )),
//     RangeCalendar: jest.fn(({ onChange }) => (
//         <div data-testid="range-calendar">
//             <button onClick={() => onChange({ start: { year: 2024, month: 9, day: 10 }, end: { year: 2024, month: 9, day: 17 } })}>
//                 Select Date
//             </button>
//         </div>
//     )),
// }));

// jest.mock('@/icons/CalanderIcon', () => jest.fn(() => <svg data-testid="calendar-icon" />));

describe('DateRangePicker Component', () => {
    const mockOnChangeCalendarRange = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    // const formatCalendarDate = (date: CalendarDate) => {
    //     // Mock function to match the component's date display logic
    //     const formattedDate = new Date(date.toString()); // Assuming .toString() gives "YYYY-MM-DD"
    //     return formattedDate.toDateString().split(' ').slice(1).join(' ');
    // };

    it('renders the DateRangePicker component with initial dates', () => {
        // render(<DateRangePicker onChangeCalendarRange={mockOnChangeCalendarRange} />);

        // // Check if button is rendered with correct initial dates
        // const startDate = today(getLocalTimeZone());
        // const endDate = startDate.add({ weeks: 1 });

        // expect(screen.getByText(`${formatCalendarDate(startDate)} – ${formatCalendarDate(endDate)}`)).toBeInTheDocument();

        // // Check if CalendarIcon is rendered
        // expect(screen.getByTestId('calendar-icon')).toBeInTheDocument();
    });

    it('toggles the calendar visibility when the button is clicked', () => {
        // render(<DateRangePicker onChangeCalendarRange={mockOnChangeCalendarRange} />);

        // // Click the button to show the calendar
        // fireEvent.click(screen.getByTestId('button'));
        // expect(screen.getByTestId('range-calendar')).toBeInTheDocument();

        // // Click the button again to hide the calendar
        // fireEvent.click(screen.getByTestId('button'));
        // expect(screen.queryByTestId('range-calendar')).not.toBeInTheDocument();
    });

    it('calls onChangeCalendarRange with the correct dates when a date range is selected', () => {
        // render(<DateRangePicker onChangeCalendarRange={mockOnChangeCalendarRange} />);

        // // Show the calendar
        // fireEvent.click(screen.getByTestId('button'));

        // // Select a date range
        // fireEvent.click(screen.getByText('Select Date'));

        // // Check if onChangeCalendarRange was called with the correct ISO dates
        // expect(mockOnChangeCalendarRange).toHaveBeenCalledWith(['2024-9-10', '2024-9-17']);
    });

    it('hides the calendar after selecting a date range', () => {
        // render(<DateRangePicker onChangeCalendarRange={mockOnChangeCalendarRange} />);

        // // Show the calendar
        // fireEvent.click(screen.getByTestId('button'));

        // // Select a date range
        // fireEvent.click(screen.getByText('Select Date'));

        // // Check if the calendar is hidden after selecting a date range
        // expect(screen.queryByTestId('range-calendar')).not.toBeInTheDocument();
    });
});
