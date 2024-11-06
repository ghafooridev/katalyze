import { render } from '@testing-library/react';
import { describe, expect } from '@jest/globals';
import RootLayout from '@/app/layout';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

jest.mock('next/font/google', () => ({ Inter: jest.fn().mockReturnValue({ className: 'test-class' }) }));
jest.mock('next/navigation', () => ({
  redirect: jest.fn(),
}));
jest.mock('next-auth');
jest.mock('@/components/Nav/Navbar')
jest.mock('@/components/Toast/ToastContainerShell')
describe('RootLayout Component', () => {
  const mockPolyfillPromiseWithResolvers = jest.fn();

  beforeEach(() => {
    jest.mock('@/components/OriginalDocumentViewer/PromiseWithResolvers', () => ({
      polyfillPromiseWithResolvers: mockPolyfillPromiseWithResolvers,
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  it('renders correctly', async () => {
    const session = { user: { name: 'Test User' } };

    (getServerSession as jest.Mock).mockResolvedValue(session);
    const component = await RootLayout({ children: <div>Test Child</div> });
    const { getByText } = render(
      component
    );

    expect(getByText('Test Child')).toBeInTheDocument();
  });

  it('redirects when there is no session', async () => {
    (getServerSession as jest.Mock).mockResolvedValue(null);

    const component = await RootLayout({ children: <div>Test Child</div> });

    render(
      component
    );

    expect(redirect).toHaveBeenCalledWith('/api/auth/signin');
  });
});