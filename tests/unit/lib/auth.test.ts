import {
  isExpired,
  getExpiresAt,
  jwtCallback,
  sessionCallback,
  getAuthSession,
} from "@/lib/auth";
import { describe, it, expect, jest } from "@jest/globals";
import { rotateAccessToken } from "@/lib/oauth";
import { JWT } from "next-auth/jwt";
import { Account } from "next-auth";

jest.mock("@/lib/oauth", () => ({
  rotateAccessToken: jest.fn(),
}));
jest.mock("@/lib/auth-client", () => ({
  getClientSession: jest.fn(),
}));
jest.mock("next-auth");

describe("auth module", () => {
  describe("isExpired", () => {
    it("should return true if token is expired", () => {
      const token = { expiresAt: Date.now() / 1000 - 10 } as any;
      expect(isExpired(token)).toBe(true);
    });

    it("should return false if token is not expired", () => {
      const token = { expiresAt: Date.now() / 1000 + 10 } as any;
      expect(isExpired(token)).toBe(false);
    });
  });

  describe("getExpiresAt", () => {
    it("should return correct expiration time", () => {
      const expiresIn = 3600;
      const expectedExpiresAt = Math.floor(Date.now() / 1000) + expiresIn;
      expect(getExpiresAt(expiresIn)).toBeCloseTo(expectedExpiresAt, -1);
    });
  });

  describe("jwtCallback", () => {
    const now = Date.now() / 1000;
    const account = {
      expires_at: now,
      access_token: "access_token",
      refresh_token: "refresh_token",
      id_token: "id_token",
    } as Account;
    it("should return token with account details if account is provided", async () => {
      const token = {} as JWT;
      const result = await jwtCallback({ token, account });
      expect(result).toEqual({
        ...token,
        expiresAt: account.expires_at,
        accessToken: account.access_token,
        refreshToken: account.refresh_token,
        idToken: account.id_token,
      });
    });

    it("should rotate access token if token is expired", async () => {
      const token = {
        expiresAt: now - 1000,
      } as JWT;
      const rotatedToken = {
        expires_in: now + 1000,
        access_token: "new_access_token",
        id_token: "new_id_token",
      };
      (rotateAccessToken as jest.Mock<any>).mockResolvedValue(rotatedToken);
      const result = await jwtCallback({ token, account: null });
      expect(result.expiresAt).toEqual(getExpiresAt(rotatedToken.expires_in));
    });

    it("should return token if it is not expired", async () => {
      const token = { expiresAt: now + 10 } as JWT;
      const result = await jwtCallback({ token, account: null });
      expect(result.expiresAt).toEqual(token.expiresAt);
    });
  });

  describe("sessionCallback", () => {
    it("should merge session and token", () => {
      const session = { user: "user" };
      const token = { accessToken: "access_token" };
      const result = sessionCallback({ session, token });
      expect(result).toEqual({ ...session, token });
    });
  });

  // describe("getAuthSession", () => {
  //   it("should call getServerSession if window is undefined", () => {
  //     (getServerSession as jest.Mock<any>).mockResolvedValue("server_session");
  //     const result = getAuthSession();
  //     expect(result).resolves.toBe("server_session");
  //   });

  //   it("should call getClientSession if window is defined", () => {
  //     (getClientSession as jest.Mock<any>).mockResolvedValue("client_session");
  //     global.window = {} as any;
  //     const result = getAuthSession();
  //     expect(result).resolves.toBe("client_session");
  //   });
  // });
});
