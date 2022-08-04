import { ServerError } from "../erros/server-error";
import { HttpResponse } from "../protocols/http";

export const serverError = (): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(),
});
