import React from "react";
import { describe, expect } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import InsightList from '@/app/raw-materials/analytics-insights/_components/InsightPage/InsightList';
import {  MaterialInsight } from "@/types/RawMaterial";

jest.mock('next/navigation', () => ({
  __esModule: true,
  useRouter: () => ({
    push: jest.fn(),
    pathname: '/raw-materials/analytics-insights',
  }),
}));

describe('InsightList Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test('renders Card, CardHeader, and Chip correctly', () => {
    const mockData: MaterialInsight[] = [
      {
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
    ];

    render(<InsightList 
      data={mockData} 
      selectedInsight={{}}
      setSelectedInsight={() => {}}
      materialSelector={[{id: '2345', name: 'Test'}]}
    />);

    expect(screen.getByText('Analytics Insights')).toBeInTheDocument();
    expect(screen.getByText(mockData.length.toString())).toBeInTheDocument();
  });
});