import { describe, expect, it } from '@jest/globals';
import { cn, download, convertToTitleCase, parseQueryParams, getAllMonths, getMaterialNameById } from '@/lib/utils';

describe('cn function', () => {
  it('merges class names correctly', () => {
    expect(cn('class1', 'class2')).toBe('class1 class2');
  });

  it('handles empty strings and undefined values', () => {
    expect(cn('', undefined, 'class3')).toBe('class3');
  });

  it('removes duplicates and merges with Tailwind rules', () => {
    // Assuming twMerge works similarly, we are testing the merge functionality
    expect(cn('px-2', 'px-4', 'text-center')).toBe('px-4 text-center');
  });
});


describe('download', () => {
  let createElementSpy;
  let appendChildSpy;
  let removeSpy;
  let clickSpy;
  let setAttributeSpy;

  beforeEach(() => {
    createElementSpy = jest.spyOn(document, 'createElement');
    appendChildSpy = jest.spyOn(document.body, 'appendChild');
    global.URL.createObjectURL = jest.fn();
    clickSpy = jest.fn();
    setAttributeSpy = jest.fn();
    removeSpy = jest.fn();

    createElementSpy.mockReturnValue({
      setAttribute: setAttributeSpy,
      click: clickSpy,
      remove: removeSpy,
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  test('should create a Blob and trigger a download', () => {
    const jsonData = { key: 'value' };
    download(jsonData);

    expect(createElementSpy).toHaveBeenCalledWith('a');
  });
});

describe('convertToTitleCase function', () => {
  it('converts camelCase and PascalCase to Title Case', () => {
    expect(convertToTitleCase('camelCaseExample')).toBe('Camel Case Example');
    expect(convertToTitleCase('PascalCaseExample')).toBe('Pascal Case Example');
  });

  it('handles strings with dots and splits on uppercase', () => {
    expect(convertToTitleCase('example.With.Dots')).toBe('Example With Dots');
  });

  it('returns an empty string when input is not a string', () => {
    expect(convertToTitleCase(undefined)).toBe('');
    expect(convertToTitleCase(null as unknown as string)).toBe('');
  });
});

describe('parseQueryParams function', () => {
  it('converts object to URLSearchParams correctly', () => {
    const params = {
      search: 'test',
      filter: ['one', 'two'],
      empty: '',
      none: null,
      undefinedValue: undefined,
    };
    const searchParams = parseQueryParams(params);

    expect(searchParams?.toString()).toBe('search=test&filter=one&filter=two');
  });

  it('ignores undefined, null, and empty string values', () => {
    const params = {
      key1: undefined,
      key2: null,
      key3: '',
    };
    const searchParams = parseQueryParams(params);

    expect(searchParams?.toString()).toBe('');
  });

  it('handles single values and arrays', () => {
    const params = {
      arrayKey: ['value1', 'value2'],
      singleKey: 'singleValue',
    };
    const searchParams = parseQueryParams(params);

    expect(searchParams?.toString()).toBe('arrayKey=value1&arrayKey=value2&singleKey=singleValue');
  });

  it('should map provided month values correctly and set missing months to 0', () => {
    const data = [
      { month: 'Jan', value: 1 },
      { month: 'Mar', value: 3 },
      { month: 'Jul', value: 7 },
    ];

    const result = getAllMonths(data);

    expect(result).toEqual([
      { month: 'Nov', value: 0 },
      { month: 'Dec', value: 0 },
      { month: 'Jan', value: 1 },
      { month: 'Feb', value: 0 },
      { month: 'Mar', value: 3 },
      { month: 'Apr', value: 0 },
      { month: 'May', value: 0 },
      { month: 'Jun', value: 0 },
      { month: 'Jul', value: 7 },
      { month: 'Aug', value: 0 },
      { month: 'Sep', value: 0 },
      { month: 'Oct', value: 0 },
    ]);
  });


});


describe('getMaterialNameById', () => {
  const materialSelector = [
    { id: 1, name: 'Material A' },
    { id: 2, name: 'Material B' },
    { id: 3, name: 'Material C' },
  ];

  test('should return the name of the material when the ID is found', () => {
    const result = getMaterialNameById(materialSelector, 2);
    expect(result).toBe('Material B');
  });

  test('should return an empty string when the ID is not found', () => {
    const result = getMaterialNameById(materialSelector, 999);
    expect(result).toBe('');
  });

  test('should return an empty string when the materialSelector is undefined', () => {
    const result = getMaterialNameById(undefined, 1);
    expect(result).toBe('');
  });

  test('should return an empty string when the materialSelector is empty', () => {
    const result = getMaterialNameById([], 1);
    expect(result).toBe('');
  });
})