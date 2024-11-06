import { type ClassValue, clsx } from 'clsx';
import { SearchParamsOption } from 'ky';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function download(jsonData: object) {
  const blob = new Blob([JSON.stringify(jsonData)], {
    type: 'application/json',
  });

  const downloadELM = document.createElement('a');
  downloadELM.setAttribute('download', 'batch_digitized_document.json');
  downloadELM.setAttribute('href', URL.createObjectURL(blob));
  document.body.append(downloadELM);
  downloadELM.click();
  downloadELM.remove();
}

export const convertToTitleCase = (str: string | undefined): string => {
  if (typeof str !== 'string') {
    return '';
  }

  return str
    .replace(/\./g, ' ')
    .split(/(?<=[a-z])(?=[A-Z]{2,})|(?<=[a-zA-Z])(?=[A-Z][a-z])/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export const parseQueryParams = (params: Partial<Record<string, any>>) => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((val) => {
        if (val !== undefined && val !== null) {
          searchParams.append(key, val); // Append each item in the array
        }
      });
    } else if (value !== undefined && value !== null && value.length) {
      // For non-array values
      searchParams.append(key, value);
    }
  });

  return searchParams as SearchParamsOption;
};

export const getAllMonths = (data) => {
  const months = ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];
  const monthValueMap = months.reduce((acc, month) => {
    acc[month] = 0;
    return acc;
  }, {});

  data?.forEach(({ month, value }) => {
    if (Object.prototype.hasOwnProperty.call(monthValueMap, month)) {
      monthValueMap[month] = value;
    }
  });
  const reqData = months.map((month) => ({
    month,
    value: monthValueMap[month],
  }));
  return reqData;
};

export const getMaterialNameById = (materialSelector, selectedMaterial) => {
  const material = materialSelector?.find((_material) => _material.id === selectedMaterial);
  if (material) return material.name;
  return '';
};

export const updateGroupedPaths = (paths, groupedPaths) => {
  paths.forEach((path) => {
    const parts = path.split('.');
    if (parts.length > 1) {
      const key = parts.slice(0, -1).join('.');
      Object.assign(groupedPaths, { [key]: (groupedPaths[key] || []).concat([path]) });
    } else {
      Object.assign(groupedPaths, { '': (groupedPaths[''] || []).concat([path]) });
    }
  });
};
