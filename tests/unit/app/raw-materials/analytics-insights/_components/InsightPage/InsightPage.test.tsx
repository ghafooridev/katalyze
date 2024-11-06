import React from "react";
import { describe, expect } from "@jest/globals";
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import InsightPage from '@/app/raw-materials/analytics-insights/_components/InsightPage/InsightPage';
import * as service from '@/app/raw-materials/_services';

jest.mock('next/navigation', () => ({
  __esModule: true,
  useRouter: () => ({
    push: jest.fn(),
    pathname: '/raw-materials/analytics-insights',
  }),
}));

jest.mock('@/app/raw-materials/_services', () => ({
  getMaterialSelector: jest.fn(),
  getMaterialInsights: jest.fn(),
  postMaterialInsightComment: jest.fn(),
}));

const mockMaterialData = [{ id: '12345', name: 'test' }]

const mockMaterialInsights = [
  {
    id: "12345",
    material_id: "2345",
    batch_id: "batch-2024-09",
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

const updatedMockMaterialInsight = {
  ...mockMaterialInsights[0],
  comments_data: [
    ...mockMaterialInsights[0].comments_data,
    {
      comment: "This is a new comment.",
      timestamp: new Date().toISOString(),
      username: "user2",
      user_email: "user2@example.com",
      user_logo: "",
    },
  ],
};

describe('InsightPage Component', () => {
  beforeEach(() => {
    Object.defineProperty(Element.prototype, 'scrollIntoView', {
      value: jest.fn(),
      writable: true
    });

    jest.spyOn(service, 'getMaterialSelector').mockResolvedValue(mockMaterialData as any);
    jest.spyOn(service, 'getMaterialInsights').mockResolvedValue(mockMaterialInsights as any);
    jest.spyOn(service, 'postMaterialInsightComment').mockResolvedValue(updatedMockMaterialInsight as any);
  })
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders InsightList and InsightChatBox correctly', async () => {
    render(<InsightPage />);

    await waitFor(() => {
      expect(service.getMaterialSelector).toHaveBeenCalled();
      expect(service.getMaterialInsights).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(screen.getByText('Sample Card Title')).toBeInTheDocument();
    });

    const selectInsight = screen.getByText('Sample Card Title')
    fireEvent.click(selectInsight)

    const commentInput = screen.getByPlaceholderText('Start typing your note on this insight....');
    fireEvent.change(commentInput, { target: { value: 'This is a new comment.' } });
    const postButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(postButton);

    await waitFor(() => {
      expect(screen.getByText('This is a new comment.')).toBeInTheDocument();
    });

    expect(service.postMaterialInsightComment).toHaveBeenCalledWith(
      '12345', 
      {"comment": "This is a new comment."}
    );
    
  });
});