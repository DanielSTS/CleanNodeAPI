import { InvalidParamError, MissingParamError } from "../erros";
import { badRequest, serverError } from "../helpers/";
import {
  Controller,
  EmailValidator,
  HttpRequest,
  HttpResponse,
} from "../protocols/";

export class SignUpController implements Controller {
  constructor(private readonly emailValidator: EmailValidator) {
    this.emailValidator = emailValidator;
  }

  handle(httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = [
        "name",
        "email",
        "password",
        "passwordConfirmation",
      ];
      for (const field of requiredFields) {
        if (!httpRequest.body[field])
          return badRequest(new MissingParamError(field));
      }
      if (httpRequest.body.password !== httpRequest.body.passwordConfirmation)
        return badRequest(new InvalidParamError("passwordConfirmation"));
      if (!this.emailValidator.isValid(httpRequest.body.email))
        return badRequest(new InvalidParamError("email"));
    } catch (error) {
      return serverError();
    }
  }
}
