import { describe, expect, test } from '@jest/globals';
import React, { useContext } from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { HighlightRegionCtx } from '@/components/OriginalDocumentViewer/HighLightRegionCtx';

describe('HighlightRegionCtx', () => {
  it('provides initial context values', async () => {
    // Render a component that consumes HighlightRegionCtx to access its context values
    let contextValues: any;
    const ConsumerComponent = () => {
      contextValues = useContext(HighlightRegionCtx);
      return (
        <>
          <button
            data-testid="toggle-visibility-button"
            onClick={() => contextValues.setVisibility(!contextValues.visible)}
          >
            Toggle Visibility
          </button>
          <button
            data-testid="increment-index-button"
            onClick={() => contextValues.setIndex(contextValues.index + 1)}
          >
            Increment Index
          </button>
        </>
      );
    };

    const { getByTestId } = render(<ConsumerComponent />);

    // Assert initial context values
    expect(contextValues.visible).toBe(false);
    expect(typeof contextValues.setVisibility).toBe('function');
    expect(typeof contextValues.setIndex).toBe('function');
    expect(contextValues.index).toBe(0);

    fireEvent.click(getByTestId('toggle-visibility-button'));
    await waitFor(() => {
      expect(contextValues.visible).toBe(false);
    });

    fireEvent.click(getByTestId('increment-index-button'));
    await waitFor(() => {
      expect(contextValues.index).toBe(0);
    });

  });

});
