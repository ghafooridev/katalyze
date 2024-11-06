import Browse from "@/app/documents/page";
import { render } from "@testing-library/react";
import { expect } from "@jest/globals";
jest.mock('@/app/documents/browse/page', () => ({
  __esModule: true,
  default: jest.fn(() => <div>Mocked BrowseDocuments</div>),
}));

describe('Browse Component', () => {
  test('renders BrowseDocuments component', () => {
    const { getByText } = render(<Browse />);
    expect(getByText('Mocked BrowseDocuments')).toBeInTheDocument();
  });
});