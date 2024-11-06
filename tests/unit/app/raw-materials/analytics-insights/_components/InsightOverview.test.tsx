import React from "react";
import { describe, expect } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import AnalyticsInsights from '@/app/raw-materials/analytics-insights/page';
import MaterialNavbar from '@/app/raw-materials/_components/MaterialNavbar';
import { useRouter } from 'next/router';
import InsightOverview from '@/app/raw-materials/analytics-insights/_components/InsightOverview';
import InsightCard from '@/app/raw-materials/analytics-insights/_components/InsightPage/InsightCard';
import { MaterialInsight } from "@/types/RawMaterial";

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/app/raw-materials/analytics-insights/_components/InsightPage/InsightCard', () => ({
  __esModule: true,
  default: jest.fn(() => <div>Mocked InsightCard</div>),
}));

describe('InsightOverview Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders InsightCard correctly', () => {

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
      },
      {
        id: "67890",
        material_id: "2345",
        batch_id: "batch-2024-09",
        process_id: "890",
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

    render(<InsightOverview data={mockData} materialSelector={[{id: '2345', name: 'Test'}]} />);
    expect(screen.getAllByText('Mocked InsightCard').length).toBe(2);
    expect(InsightCard).toHaveBeenCalledTimes(2);
  });
});