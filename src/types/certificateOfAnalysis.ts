export interface VendorSigneeInformation {
  vendorName: string;
  vendorAddress?: string;
  vendorSite?: string;
  vendorLevel?: number;
  manufacturerDistributor?: string;
  vendorID?: string;
  parentCompany?: string;
}

export interface DocumentInformation {
  dateOfIssue: string; // Assuming it's always present
  signeeName?: string;
  signeeRole?: string;
  pharmacopiaAdherence?: string;
}

export interface BatchInformation {
  LMID?: number;
  GMID?: number;
  materialName: string;
  chemicalFormula?: string;
  vendorMaterialCatalogID?: string;
  CASNo?: number;
  vendorBatchID?: string;
  batchID?: string;
  bulkTestBatchID?: string;
  dateOfManufacture: string;
  expirationDate?: string;
  testDate?: string;
  retestReassayDate?: string;
  unitOfMeasurement?: string;
  quantity?: number;
  storageConditions?: string;
  countryOfOrigin?: string;
  declarationOfOrigin?: string;
}

export interface MaterialAttributeTestResult {
  attributeName: string;
  attributeID?: string;
  specificationID?: string;
  specification?: string;
  testMethod: string;
  result: number;
  unitOfMeasurement: string;
  disposition: 'Pass' | 'Fail';
}

export interface MicrobiologicalCulturalPerformance {
  testOrganism?: string;
  ATCC?: number;
  testMethodConditions?: string;
  initialInoculum?: number;
  result: string;
  disposition: 'Pass' | 'Fail' | 'No' | 'Yes';
}

export interface AnimalOrigin {
  animalSource: string;
  countryOfOrigin: string;
  tissueCategoryBIC?: string;
  tissueCategorySIC?: string;
  tissueCategoryABC?: string;
}

export interface CertificateOfAnalysis {
  id: string; // Adding the id field
  imageURL: string;
  pdfURL: string;
  status: boolean;
  vendorSigneeInformation: VendorSigneeInformation;
  documentInformation: DocumentInformation;
  batchInformation: BatchInformation;
  materialAttributesTestResults: MaterialAttributeTestResult[];
  microbiologicalCulturalPerformance: MicrobiologicalCulturalPerformance[];
  animalOrigin: AnimalOrigin[];
}
