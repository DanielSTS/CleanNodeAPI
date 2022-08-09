import bcrypt from "bcrypt";
import { resolve } from "path";
import { BcryptAdapter } from "./bcrypt-adapter";

jest.mock("bcrypt", () => ({
  async hash(): Promise<string> {
    return new Promise((resolve) => resolve("hash"));
  },
}));

const makeSut = (salt: number): BcryptAdapter => {
  return new BcryptAdapter(salt);
};

describe("Bcrypt Adapter", () => {
  test("Should call bcrypt with correct value", async () => {
    const salt = 12;
    const sut = makeSut(salt);
    const hashSpy = jest.spyOn(bcrypt, "hash");
    await sut.encrypt("any_value");
    expect(hashSpy).toHaveBeenCalledWith("any_value", salt);
  });

  test("Should return a hashed on sucess", async () => {
    const salt = 12;
    const sut = makeSut(salt);
    const hash = await sut.encrypt("any_value");
    expect(hash).toBe("hash");
  });
});
