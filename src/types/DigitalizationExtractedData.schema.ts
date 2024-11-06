import { Static, Type } from '@sinclair/typebox';

export const DigitizationExtractedData = Type.Object({
  id: Type.String(),
  path: Type.String(),
  value: Type.String(),
  createdAt: Type.String({ format: 'date-time' }),
  type: Type.String(),
  flagReasons: Type.String(),
  createdBy: Type.Object({ id: Type.String() }),
  version: Type.Integer(),
  region: Type.Object({
    x: Type.Number(),
    y: Type.Number(),
    width: Type.Number(),
    height: Type.Number(),
  }),
});

export type DigitizationExtractedData = Static<
  typeof DigitizationExtractedData
>;
