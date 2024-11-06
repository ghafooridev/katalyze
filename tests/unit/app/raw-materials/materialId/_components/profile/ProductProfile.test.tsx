
import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect } from '@jest/globals';
import ProductProfile from '@/app/raw-materials/[materialId]/_components/profile/ProductProfile';

global.URL.createObjectURL = jest.fn(() => 'http://mock-url');

describe('ProductProfile', () => {
  const mockMaterialDetails = {
    products: [
      {name: 'product'}
    ],
    vendors: [
      {name: 'vendor'}
    ]
  }   
  it('renders without crashing', () => {
    const mockMaterialProfile = [
      {
        description: 'Test Description', formula: 'C1', img: '', source: [{ name: '' }],
        
      }
    ];
    
    render(<ProductProfile materialProfile={mockMaterialProfile} materialName={'NA'} materialDetails={mockMaterialDetails} />);
    const productProfileElement = screen.getByTestId('product-profile');
    expect(productProfileElement).toBeInTheDocument();
  });

  it('displays the correct materialProfile description', () => {
    const mockMaterialProfile = [{
      description: 'Test Description', formula: 'C1', img: '', source: [{ name: '' }],
      
    }
    ];
    render(<ProductProfile materialProfile={mockMaterialProfile} materialName={'NA'} materialDetails={mockMaterialDetails}/>);
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('displays the correct ChipBox title and chips', () => {
    const mockMaterialProfile = [{
      description: 'Test Description', formula: 'C1', img: '', source: [{ name: 'Chip1' }],
    }
    ];
    render(<ProductProfile materialProfile={mockMaterialProfile} materialName={'NA'} materialDetails={mockMaterialDetails}/>);
    expect(screen.getByText('Source')).toBeInTheDocument();
    expect(screen.getByText('Used in')).toBeInTheDocument();
    expect(screen.getByText('Vendors')).toBeInTheDocument();
    expect(screen.getByText('Chip1')).toBeInTheDocument();
    expect(screen.getByText('vendor')).toBeInTheDocument();
    expect(screen.getByText('product')).toBeInTheDocument();
  });
  it('returns null when chips is null or empty', () => {
    const mockMaterialProfile = [
      {
        description: 'Test Description', 
        formula: 'C1', 
        img: '', 
        source: []
      }
    ];
    render(<ProductProfile materialProfile={mockMaterialProfile} materialName={'NA'} materialDetails={{}} />);
  });
  it('renders MultipleChips when chips has multiple items', () => {
    const mockMaterialProfile = [
      {
        description: 'Test Description', 
        formula: 'C1', 
        img: '', 
        source: [{ name: 'Chip1' }, { name: 'Chip2' }]
      }
    ];
    render(<ProductProfile materialProfile={mockMaterialProfile} materialName={'NA'} materialDetails={{}} />);
    expect(screen.getByText('Chip1')).toBeInTheDocument();
  });
});