import { MissingParamError } from "../erros/missing-param-error";
import { SignUpController } from "./signup";

const makeSut = () => new SignUpController();

describe("SignUp Controller", () => {
  test("Should retun 400 if no name is provided", () => {
    const sut = makeSut();
    const httpRequest = {
      body: {
        email: "any_email@gmail.com",
        password: "any_password",
        passwordConfirmation: "any_password",
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("name"));
  });

  test("Should retun 400 if no email is provided", () => {
    const sut = makeSut();
    const httpRequest = {
      body: {
        name: "any name",
        password: "any_password",
        passwordConfirmation: "any_password",
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("email"));
  });

  test("Should retun 400 if no password is provided", () => {
    const sut = makeSut();
    const httpRequest = {
      body: {
        name: "any name",
        email: "any_email@gmail.com",
        passwordConfirmation: "any_password",
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("password"));
  });

  test("Should retun 400 if no passwordConfirmation is provided", () => {
    const sut = makeSut();
    const httpRequest = {
      body: {
        name: "any name",
        email: "any_email@gmail.com",
        password: "any_password",
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(
      new MissingParamError("passwordConfirmation")
    );
  });
});
