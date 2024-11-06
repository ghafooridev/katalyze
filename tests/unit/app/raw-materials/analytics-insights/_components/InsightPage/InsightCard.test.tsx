import React from "react";
import { describe, expect } from "@jest/globals";
import { fireEvent, render, screen } from "@testing-library/react";
import InsightCard from '@/app/raw-materials/analytics-insights/_components/InsightPage/InsightCard';
import {  MaterialInsight } from "@/types/RawMaterial";
import { useRouter } from "next/navigation";

jest.mock('next/navigation', () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

describe('InsightCard Component', () => {
  let mockPush: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });
  const mockOnSelectCard = jest.fn();
  const mockCardData: MaterialInsight = {
    id: "12345",
    material_id: "2345",
    batch_id: "batch-2024-09",
    process_id: "567",
    card_data: {
      title: "Sample Card Title",
      body: "Sample Body",
      timestamp: new Date().toISOString(),  
    },
    comments_data: [
      {
        comment: "This is the first comment.",
        timestamp: new Date().toISOString(), 
        username: "user1",
        user_email: "user1@example.com",
        user_logo: "",
      },
    ],
  }

  test('renders without crashing', () => {
    render(<InsightCard 
        cardData={mockCardData} 
        overviewPage={true} 
        OnSelectCard={mockOnSelectCard} 
        selectedInsight={mockCardData}
        materialSelector={[{id: '2345', name: 'Test'}]}
        />);
    expect(screen.getByText('Sample Card Title')).toBeInTheDocument();
    expect(screen.getByText('Sample Body')).toBeInTheDocument();

    const reviewLink = screen.getByText('Review');
    fireEvent.click(reviewLink);

    expect(mockPush).toHaveBeenCalledWith(`/raw-materials/analytics-insights?insight=${encodeURIComponent(mockCardData.id)}`);

  });
});