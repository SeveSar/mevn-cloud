import { type AxiosError, isAxiosError } from "axios";

interface ServerError {
  message: string;
}

const errorHandler = (error: unknown) => {
  if (isAxiosError(error)) {
    const serverError = error as AxiosError<ServerError>;
    if (serverError && serverError.response) {
      return serverError.response.data.message;
    }
    return "something went wrong!";
  }
};

export { errorHandler };
