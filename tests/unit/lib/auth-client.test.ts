import { Session } from "next-auth";
import { describe, expect, it } from "@jest/globals";
import ky from "ky";

jest.mock("ky", () => ({
  create: jest.fn().mockReturnThis(),
  get: jest.fn().mockReturnThis(),
  json: jest.fn().mockReturnThis(),
}));

describe("authClient", () => {
  const mockPrefixUrl = "http://localhost:3000/";
  beforeEach(() => {
    process.env.NEXT_PUBLIC_NEXTAUTH_URL = mockPrefixUrl;
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });
  it("should get client session", async () => {
    const { getClientSession } = require("@/lib/auth-client");
    expect(ky.create).toHaveBeenCalledWith({ prefixUrl: mockPrefixUrl });
    await getClientSession();
    expect(ky.get).toHaveBeenCalledWith("session");
  });
});
