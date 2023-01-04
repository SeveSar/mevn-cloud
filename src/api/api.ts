import instance from "./instances";
import AuthService from "./services/auth";
import FileService from "./services/files";
import axios from "axios";
interface Api {
  auth: AuthService;
  files: FileService;
}

export const api: Api = {
  auth: new AuthService(instance, axios),
  files: new FileService(instance),
};
