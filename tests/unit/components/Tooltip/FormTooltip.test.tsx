import React from 'react';
import { describe, expect } from '@jest/globals';
import { DigitalData } from '@/types/DigitalData.schema';
import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from '@testing-library/react';
import { TooltipMultipleVersion } from '@/components/Tooltip/FormToolTip';
import { EditPathEvent } from '@/types/EditPathEvent.schema';
import { useParams } from 'next/navigation';
import { getDocumentEditsById } from '@/app/documents/_services';
import FormTooltip from '@/components/Tooltip/FormToolTip';

describe('TooltipMultipleVersion', () => {
  it('renders latest edit information correctly', () => {
    const edits: EditPathEvent[] = [
      {
        value: 'Latest Edit Value',
        createdBy: 'User1',
        createdAt: '2023-01-02T12:00:00Z',
        version: 0,
        id: 0,
      },
      {
        value: 'Last Edit Before Latest Value',
        createdBy: 'User2',
        createdAt: '2023-01-01T12:00:00Z',
        version: 1,
        id: 1,
      },
      {
        value: 'Old Edit Value',
        createdBy: 'User3',
        createdAt: '2022-12-31T12:00:00Z',
        version: 2,
        id: 2,
      },
    ];

    render(
      <TooltipMultipleVersion
        edits={edits}
        flagReasons={''}
        version={0}
        isDirty={false}
      />
    );

    const latestEditValueElement = screen.getByText(
      'Last Edit Before Latest Value'
    );
    expect(latestEditValueElement).toBeInTheDocument();

    const latestEditCreatedByElement = screen.getByText('User2');
    expect(latestEditCreatedByElement).toBeInTheDocument();

    const latestEditCreatedAtElement = screen.getByText('01 Jan 23');
    expect(latestEditCreatedAtElement).toBeInTheDocument();
  });

  it('renders last edit before latest information when edit length is greater than 1', () => {
    const edits: EditPathEvent[] = [
      {
        value: 'Latest Edit Value',
        createdBy: 'User1',
        createdAt: '2023-01-02T12:00:00Z',
        version: 0,
        id: 0,
      },
      {
        value: 'Last Edit Before Latest Value',
        createdBy: 'User2',
        createdAt: '2023-01-01T12:00:00Z',
        version: 1,
        id: 1,
      },
      {
        value: 'Old Edit Value',
        createdBy: 'User3',
        createdAt: '2022-12-31T12:00:00Z',
        version: 2,
        id: 2,
      },
    ];

    render(
      <TooltipMultipleVersion
        edits={edits}
        flagReasons={''}
        version={2}
        isDirty={false}
      />
    );

    // Assert that last edit before latest information is rendered correctly
    const lastEditBeforeLatestValueElement = screen.getByText(
      'Last Edit Before Latest Value'
    );
    expect(lastEditBeforeLatestValueElement).toBeInTheDocument();

    const lastEditBeforeLatestCreatedByElement = screen.getByText('User2');
    expect(lastEditBeforeLatestCreatedByElement).toBeInTheDocument();

    const lastEditBeforeLatestCreatedAtElement = screen.getByText('01 Jan 23');
    expect(lastEditBeforeLatestCreatedAtElement).toBeInTheDocument();
  });

  it('renders danger chip when confidence is low', () => {
    const edits: EditPathEvent[] = [
      {
        value: 'Latest Edit Value',
        createdBy: 'User1',
        createdAt: '2023-01-02T12:00:00Z',
        version: 0,
        id: 0,
      },
    ];

    render(
      <TooltipMultipleVersion
        edits={edits}
        flagReasons={'highlighting'}
        version={0}
        isDirty={false}
      />
    );

    const dangerChip = screen.getByText('Flagged');
    expect(dangerChip).toBeInTheDocument();
  });
});

jest.mock('next/navigation', () => ({
  useParams: jest.fn(),
}));

jest.mock('@/app/documents/_services', () => ({
  getDocumentEditsById: jest.fn(),
}));

const mockUseParams = useParams as jest.MockedFunction<typeof useParams>;
const mockGetDocumentEditsById = getDocumentEditsById as jest.MockedFunction<
  typeof getDocumentEditsById
>;

describe('FormTooltip', () => {
  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  it('renders original tooltip when pathData.version is 0 and not editing', () => {
    mockUseParams.mockReturnValue({ id: '1' });

    render(
      <FormTooltip
        path='somePath'
        pathData={{ version: 0, flagReasons: 'highlighting' } as DigitalData}
        fieldStateIsDirty={false}
        inputValue='Some value'
        isEditing={true}
        originalCreatedAt='2023-01-01T12:00:00Z'
      />
    );

    expect(
      screen.queryByTestId('tooltip-multiple-version')
    ).not.toBeInTheDocument();

    const confidenceLowIcon = screen.getByTestId('confidence-low-icon');
    expect(confidenceLowIcon).toBeInTheDocument();
  });

  it('renders edit tooltip when field is dirty and not editing', async () => {
    mockUseParams.mockReturnValue({ id: '1' });

    mockGetDocumentEditsById.mockResolvedValue([
      {
        value: 'Edit 1',
        createdBy: 'User1',
        createdAt: '2023-01-02T12:00:00Z',
      } as EditPathEvent,
    ]);

    render(
      <FormTooltip
        path='somePath'
        pathData={{ version: 1 } as DigitalData}
        fieldStateIsDirty={true}
        inputValue='Edited value'
        isEditing={false}
        originalCreatedAt='2023-01-01T12:00:00Z'
      />
    );

    const editInputIcon = screen.getByTestId('edit-input-icon');
    fireEvent.click(editInputIcon);
  });

  it('updates edits when Tooltip is opened due to changes in path or id', async () => {
    mockUseParams.mockReturnValue({ id: '1' });

    mockGetDocumentEditsById.mockResolvedValue([
      {
        value: 'Edit 1',
        createdBy: 'User1',
        createdAt: '2023-01-02T12:00:00Z',
      } as EditPathEvent,
    ]);

    const { rerender } = render(
      <FormTooltip
        path='somePath'
        pathData={{ version: 1 } as DigitalData}
        fieldStateIsDirty={true}
        inputValue='Edited value'
        isEditing={false}
        originalCreatedAt='2023-01-01T12:00:00Z'
      />
    );

    mockUseParams.mockReturnValue({ id: '2' });

    rerender(
      <FormTooltip
        path='somePath'
        pathData={{ version: 1 } as DigitalData}
        fieldStateIsDirty={false}
        inputValue='Edited value'
        isEditing={false}
        originalCreatedAt='2023-01-01T12:00:00Z'
      />
    );

    const editInputIcon = screen.getByTestId('edit-input-icon');
    fireEvent.click(editInputIcon);

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0)); // Ensure promises are resolved
    });
  });
});
