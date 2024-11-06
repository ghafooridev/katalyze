import { transformResponse } from "@/app/raw-materials/[materialId]/correlations/utils";
import { describe, expect } from '@jest/globals';

describe('transformResponse', () => {
    it('should transform API response to the correct format', () => {
        const apiResponse = {
            'key1': [
                { name: 'Item 1', value: '10.123' },
                { name: 'Item 2', value: '20.456' }
            ],
            'key2': [
                { name: 'Item 3', value: '30.789' }
            ],
        };

        const expectedResult = [
            {
                id: 'key1',
                data: [
                    { x: 'Item 1', y: '10.123' },
                    { x: 'Item 2', y: '20.456' }
                ]
            },
            {
                id: 'key2',
                data: [
                    { x: 'Item 3', y: '30.789' }
                ]
            }
        ];

        expect(transformResponse(apiResponse)).toEqual(expectedResult);
    });

    it('should handle empty API response', () => {
        const apiResponse = {};

        const expectedResult = [];

        expect(transformResponse(apiResponse)).toEqual(expectedResult);
    });

    it('should handle API response with missing fields', () => {
        const apiResponse = {
            'key1': [
                { name: 'Item 1', value: '10.123' },
                { name: null, value: null }
            ],
            'key2': [
                { name: 'Item 3' } // Missing value
            ],
        };

        const expectedResult = [
            {
                id: 'key1',
                data: [
                    { x: 'Item 1', y: '10.123' },
                    { x: null, y: 'NaN' } // Handles missing value
                ]
            },
            {
                id: 'key2',
                data: [
                    { x: 'Item 3', y: 'NaN' } // Handles missing value
                ]
            }
        ];

        expect(transformResponse(apiResponse)).toEqual(expectedResult);
    });
});