import { describe, expect, it } from "@jest/globals";
import ky from "ky";

jest.mock("ky", () => ({
  create: jest.fn().mockReturnThis(),
  post: jest.fn().mockReturnThis(),
  json: jest.fn().mockResolvedValue({
    access_token: 'new-access-token'
  }),
}));
beforeEach(() => {
  process.env.COGNITO_CLIENT_ID = "client-id";
  process.env.COGNITO_CLIENT_SECRET = "client-secret";
  process.env.COGNITO_DOMAIN =
    "https://cognito-idp.us-east-1.amazonaws.com/us-east-test";
});
describe("oauth", () => {
  it("should rotate access token", async () => {
    const { rotateAccessToken } = require("@/lib/oauth");
    expect(ky.create).toHaveBeenCalledWith({
      prefixUrl: process.env.COGNITO_DOMAIN,
      headers: {
        Authorization: `Basic ${btoa(`${process.env.COGNITO_CLIENT_ID}:${process.env.COGNITO_CLIENT_SECRET}`)}`,
      },
    });
    const result = await rotateAccessToken("refresh-token");
    expect(result.access_token).toBe("new-access-token");
  });
})
