import { type Static, Type } from '@sinclair/typebox';

export const DigitalizationMetrics = Type.Object({
  total: Type.Number(),
  approved: Type.Number(),
  rejected: Type.Number(),
  pending: Type.Number(),
});

export type DigitalizationMetrics = Static<typeof DigitalizationMetrics>;
