import bcrypt from "bcrypt";
import { BcryptAdapter } from "./bcrypt-adapter";

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
});
