export type MainMaterial = {
  id: string;
  gmid: string;
  lmid: string;
  name: string;
};

export enum MaterialAvailability {
  SUFFICIENT = 'Sufficient',
  SPARE = 'Sparse',
  INSUFFICIENT = 'Insufficient',
  NODATA = 'No Data'
}

export type Material = MainMaterial & {
  category: string;
  vendors: {
    id: string;
    name: string;
    country: string
  }[];
  products: {
    id: string;
    name: string;
  }[];
  rating: {
    value: number;
    trend: number;
  }
  batchIds: string[];
  vendorBatchIds: string[];
  plantIds: string[];
  digitizedVendorBatches: number,
  availability: string
};

export type MaterialMetrics = {
  type: string;
  value: number;
  rate: number;
};

export type MaterialProfile = {
  material_id: string,
  description: string,
  cas: string,
  formType: string,
  source: string[],
  usedIn: string[],
  vendors: string[],
  altVendors: string[],
}

export type MaterialInsight = {
    id: string;
    material_id: string;
    batch_id: string;
    process_id: string
    card_data: {
        title: string;
        body: string;
        timestamp: string;
    };
    comments_data: {
        comment: string;
        timestamp: string;
        username: string;
        user_email: string;
        user_logo: string;
    }[];
}

export type MaterialDetails = {
  id: string,
  gmid: string,
  lmid: string,
  name: string,
  products: { id: string, name: string }[],
  vendors: { id: string, name: string, country: string }[],
  category: string,
  rating: {
    value: number,
    trend: number
  },
  batchIds: string[],
  vendorBatchIds: string[],
}

export type MaterialBatch = {
  id?: string;
  batchId: string;
  status: 'missing' | 'available';
  rating: {
    value: string;
    trend: string;
  };
  vendor: {
    id: string;
    name: string;
  };
  expiryDate: string,
  vendorBatchId: string;
  material: MainMaterial;
  expiresOn: string;
};

export type BatchCharacteristicSpecification = {
  name: string;
  value: number | string;
  unit: string;
  method: string;
  source: string;
  range: string;
  quartiles?: number[];
};

export type BatchCharacteristic = {
  batchId: string;
  material: MainMaterial;
  rating: {
    trend: number;
    value: number;
  };
  status: string;
  vendor: {
    id: string;
    name: string;
  };
  expiryDate: string;
  vendorBatchId: string;
  quantity: string;
  dates: Array<{
    type: string;
    value: string;
  }>;
  specifications: Array<BatchCharacteristicSpecification>;
  document: {
    id?: string;
    name?: string;
    url?: string;
    format?: string;
  };
};

export type MaterialVendor = {
  vendorId: string;
  vendorName: string;
};

export type MaterialProduct = {
  building: string;
  productName: string;
  category: string;
};

export type MaterialSpecification = {
  characteristicName: string;
  averageValue: string;
  UoM: string;
  range: string;
  testMethod: string;
};

export type ApiResponse<T> = {
  data: T;
  pagination: {
    total: number;
    page: number;
    size: number;
  };
};

export type TrendsValue = {
  batchId: string;
  material: string;
  process: string;
};

export type Deviations = {
  month: string;
  deviation: {
    minor: number;
    major: number;
    critical: number;
    total: number;
  };
};

export interface InsightCardProps {
  cardData: MaterialInsight;
  overviewPage?: boolean;
  OnSelectCard?: (card: MaterialInsight) => void;
  selectedInsight?: MaterialInsight | Record<string, never>;
  materialSelector: {
    id: string;
    name: string;
}[] | undefined
}

export interface InsightListProps {
  data: MaterialInsight[];
  selectedInsight: MaterialInsight | Record<string, never>;
  setSelectedInsight: (
    insight: MaterialInsight | Record<string, never>
  ) => void;
  materialSelector: {
    id: string;
    name: string;
}[] | undefined
}

export interface InsightOverviewProps {
  data: MaterialInsight[];
  materialSelector: {
    id: string;
    name: string;
}[] | undefined
}

export type Process = {
  month: string;
  value: number
}

export type MaterialMetaData = {
  materials: { id: string; name: string }[],
  vendors?: { id: string; name: string }[]
}

export type MaterialProcessMetaData = {
  dateRange: string[],
  process: string,
  product: string,
  uiProduct: string,
  site: string,
  steps: { name: string, uiName: string }[]
}

export type MaterialTrends = {
  date: string,
  processData: {
    batchId: string,
    materialAttributeAvg: string,
    value: string,
    materialData: {
      batchId: string,
      proportion: string,
      value: string,
    }[]
  }[],

}

export type MaterialTrendsProcess = {
  attributes: string[],
  materialId: string,
  processes: {
    process: string,
    product: string,
    site: string
    uiProduct: string,
    steps: {
      attributes: string[],
      dateRange: string[],
      name: string,
      uiName: string
    }[]
  }[]
}

export type AverageMaterialRating = {
  id: string;
  data: {
    x: string;
    y: number;
  }[];
}

export type MaterialOverviewSpecification = {
  id: string,
  specs: {
    name: string;
    UoM: string;
    range: string;
    testMethod: string;
  }[]
};
