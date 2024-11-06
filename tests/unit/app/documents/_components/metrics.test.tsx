import { Metrics } from '@/app/documents/_components/metrics';
import { describe, it, expect } from '@jest/globals';
import { render, waitFor } from '@testing-library/react';
import { getMetrics } from '@/app/documents/_services';


jest.mock('@/app/documents/_services', () => ({
    getMetrics: jest.fn(),
}))

describe('Metrics', () => {
    let data = { total: 1, approved: 1, rejected: 1, pending: 1 }

    beforeEach(() => {
        (getMetrics as jest.Mock).mockResolvedValue({data});
      });

    afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
    });

    it('renders all metric cards correctly', async () => {
        const Component = await Metrics()
        const {getByText} = render(Component)

        await waitFor(() => {
            expect(getByText('Total Imported Documents')).toBeInTheDocument()
            expect(getByText('Documents Pending Approval')).toBeInTheDocument()
            expect(getByText('Approved Documents')).toBeInTheDocument()
            expect(getByText('Rejected Documents')).toBeInTheDocument()
        })
    })
})