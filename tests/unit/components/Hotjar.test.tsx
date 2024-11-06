import { render } from '@testing-library/react';
import HotjarComponent from '@/components/HotJar';
import useHotjar from '@/hooks/useHotjar';
import { describe, expect } from '@jest/globals';
// Mock the useHotjar hook
jest.mock('@/hooks/useHotjar', () => jest.fn());

describe('HotjarComponent', () => {
    const mockUseHotjar = useHotjar as jest.Mock;

    beforeEach(() => {
        // Clear mock before each test
        jest.clearAllMocks();
    });

    test('should call useHotjar with the correct Hotjar ID and version', () => {
        const hotjarId = '12345'; // You can simulate process.env value here
        process.env.NEXT_PUBLIC_HOTJAR_ID = hotjarId;

        render(<HotjarComponent />);

        // Expect useHotjar to have been called with the correct arguments
        expect(mockUseHotjar).toHaveBeenCalledWith(hotjarId, 6);
    });

    test('should not render anything in the DOM', () => {
        const { container } = render(<HotjarComponent />);

        // Expect the component to render nothing (null)
        expect(container.firstChild).toBeNull();
    });
});
