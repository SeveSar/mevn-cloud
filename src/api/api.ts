import instance from "./instances";
import AuthService from "./services/auth";
import FileService from "./services/files";

interface Api {
  auth: AuthService;
  files: FileService;
}

export const api: Api = {
  auth: new AuthService(instance),
  files: new FileService(instance),
};
