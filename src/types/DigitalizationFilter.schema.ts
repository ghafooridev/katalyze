import { type Static, Type } from '@sinclair/typebox';

export const DigitalizationFilter = Type.Object({
  status: Type.Optional(
    Type.Union([
      Type.Literal('pending'),
      Type.Literal('approved'),
      Type.Literal('rejected'),
    ]),
  ),
  search: Type.Optional(Type.String({ minLength: 1, maxLength: 255 })),
  page: Type.Number({ minimum: 1, default: 1 }),
  pageSize: Type.Number({ minimum: 1, maximum: 50, default: 10 }),
  orderBy: Type.Optional(
    Type.Union([
      Type.Literal('status'),
      Type.Literal('fileName'),
      Type.Literal('createdAt'),
      Type.Literal('material'),
      Type.Literal('vendor'),
    ]),
  ),
  desc: Type.Optional(Type.Boolean({ default: false })),
});

export type DigitalizationFilter = Static<typeof DigitalizationFilter>;
