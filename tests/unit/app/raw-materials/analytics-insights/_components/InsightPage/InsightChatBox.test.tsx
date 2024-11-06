import React from "react";
import { describe, expect } from "@jest/globals";
import { fireEvent, render, screen } from "@testing-library/react";
import InsightChatBox from '@/app/raw-materials/analytics-insights/_components/InsightPage/InsightChatBox';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('InsightChatBox Component', () => {
  test('renders without crashing', () => {
    render(
      <InsightChatBox 
        selectedInsight={{}} 
        postComment={() => null} 
        materialSelector={[{id: '2345', name: 'Test'}]} />);
    expect(screen.getByText('Select an insight to continue')).toBeInTheDocument();
  });
});