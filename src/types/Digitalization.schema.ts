import { type Static, Type } from '@sinclair/typebox';

import { DigitalData } from './DigitalData.schema';

export const Digitalization = Type.Object({
  id: Type.String(),
  file: Type.Object({
    id: Type.String(),
    name: Type.String(),
    url: Type.String(),
    format: Type.String(),
  }),
  documentType: Type.Union([Type.Literal('CertificateOfAnalysis')]),
  material: Type.Object({ id: Type.String(), name: Type.String() }),
  vendor: Type.Object({ id: Type.String(), name: Type.String() }),
  status: Type.Union([
    Type.Literal('pending'),
    Type.Literal('approved'),
    Type.Literal('rejected'),
  ]),
  reviewedBy: Type.Optional(Type.String()),
  createdAt: Type.String({ format: 'date-time' }),
  json: Type.Optional(Type.Any()),
  flattenJson: Type.Optional(Type.Array(DigitalData)),
});

export type Digitalization = Static<typeof Digitalization>;
