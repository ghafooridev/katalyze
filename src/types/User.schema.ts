import { type Static, Type } from '@sinclair/typebox';

export const User = Type.Object({ id: Type.String() });

export type User = Static<typeof User>;
