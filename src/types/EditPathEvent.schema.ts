import { Static, Type } from '@sinclair/typebox';

export const EditPathEvent = Type.Object({
  id: Type.Number(),
  value: Type.Union([
    Type.String(),
    Type.Number(),
    Type.Boolean(),
    Type.Null(),
  ]),
  createdAt: Type.String({ format: 'date-time' }),
  createdBy: Type.String(),
  version: Type.Number(),
});

export type EditPathEvent = Static<typeof EditPathEvent>;
