// kyInstance.test.ts
import { authorizationHook } from "@/lib/http";
import { describe, expect, it } from "@jest/globals";
import ky from "ky";

jest.mock("ky", () => ({
  create: jest.fn(),
}));

jest.mock("@/lib/auth", () => ({
  getAuthSession: jest.fn(),
}));
describe("kyInstance", () => {
  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });
  const baseUrl = "http://localhost:8081";
  process.env.NEXT_PUBLIC_API_BASE_URL = baseUrl;

  it("should create a ky instance with the correct configuration", () => {
    const expectedConfig = {
      prefixUrl: new URL(baseUrl).toString(),
      cache: "no-cache",
      hooks: {
        beforeRequest: [expect.any(Function)],
      },
    };

    require("@/lib/http");
    expect(ky.create).toHaveBeenCalledWith(expectedConfig);
  });
});
describe("authorizationHook", () => {
  it("should set the Authorization header correctly", async () => {
    const mockRequest = {
      headers: {
        set: jest.fn(),
      },
    };
    const mockSession = {
      token: {
        accessToken: "mockAccessToken",
        idToken: "mockIdToken",
      },
    };
    const getAuthSession = require("@/lib/auth").getAuthSession;
    getAuthSession.mockResolvedValue(mockSession);

    await authorizationHook(mockRequest as any, {} as any);

    expect(mockRequest.headers.set).toHaveBeenCalledWith(
      "Authorization",
      `Bearer ${mockSession.token.idToken}`
    );
  });

  it("should throw an error if the session is not found", async () => {
    const mockRequest = {
      headers: {
        set: jest.fn(),
      },
    };
    const getAuthSession = require("@/lib/auth").getAuthSession;
    getAuthSession.mockResolvedValue(null);

    await expect(authorizationHook(mockRequest as any, {} as any)).rejects.toThrow(
      "Session not found"
    );
  });
});
