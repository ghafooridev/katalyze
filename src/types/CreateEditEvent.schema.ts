import { type Static, Type } from '@sinclair/typebox';

export const CreateEditEvent = Type.Object({
  path: Type.String(),
  value: Type.Union([Type.String(), Type.Number(), Type.Boolean()]),
});

export type CreateEditEvent = Static<typeof CreateEditEvent>;
