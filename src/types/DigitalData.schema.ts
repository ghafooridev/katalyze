import { type Static, Type } from '@sinclair/typebox';

export const DigitalData = Type.Object({
  path: Type.String(),
  value: Type.String(),
  type: Type.Union([
    Type.Literal('Object'),
    Type.Literal('String'),
    Type.Literal('Array'),
  ]),
  region: Type.Object({
    x: Type.Number(),
    y: Type.Number(),
    width: Type.Number(),
    height: Type.Number(),
  }),
  flagReasons: Type.Optional(Type.String()),
  createdBy: Type.Optional(
    Type.Object({
      id: Type.String(), // Assuming id is a string property
    }),
  ),
  createdAt: Type.String({ format: 'date-time' }),
  version: Type.Number(),
});

export type DigitalData = Static<typeof DigitalData>;
