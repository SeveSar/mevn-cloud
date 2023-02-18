import type { IUser } from "@/models/IUser";
import type { IFile } from "@/models/IFile";
import type { AxiosInstance } from "axios";
import { useUploaderStore } from "@/store/uploader";

class FileService {
  private readonly $http: AxiosInstance;
  constructor(axiosInstance: AxiosInstance) {
    this.$http = axiosInstance;
  }
  async getFiles(dirId: string | null = null, sort: string | null = null) {
    let URL = "/api/files";
    if (dirId) {
      URL = `/api/files?parent=${dirId}`;
    }
    if (sort) {
      URL = `/api/files?sort=${sort}`;
    }
    if (dirId && sort) {
      URL = `/api/files?parent=${dirId}&sort=${sort}`;
    }
    const res = await this.$http.get<IFile[]>(URL);

    return res.data;
  }
  async createDir(name: string, dirId: string | null = null) {
    const dataPostFiles = {
      name,
      parent: dirId,
      type: "dir",
    };

    const res = await this.$http.post<IFile>("/api/files", dataPostFiles);

    return res.data;
  }
  async uploadFile(dirId: string | null = null, file: File) {
    const uploaderStore = useUploaderStore();
    const formData = new FormData();
    formData.append("file", file);
    if (dirId) {
      formData.append("parent", dirId);
    }
    const uploadFile = { name: file.name, progress: 25, id: Date.now() };
    uploaderStore.addFile(uploadFile);
    const res = await this.$http.post<IFile>("/api/files/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: function (progressEvent: any) {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        uploadFile.progress = percentCompleted;
        uploaderStore.updateFile(uploadFile);
      },
    });

    return res.data;
  }

  async downloadFile(file: IFile) {
    const res = await this.$http.get<Blob>(
      `/api/files/download?id=${file._id}`,
      {
        responseType: "blob",
      }
    );

    const linkElement = document.createElement("a");
    const blob = res.data;
    linkElement.href = URL.createObjectURL(blob);
    console.log(linkElement.href);
    linkElement.download = file.name;
    document.body.appendChild(linkElement);
    linkElement.click();
    linkElement.remove();
  }
  async removeFile(id: string) {
    await this.$http.delete(`/api/files?id=${id}`);
  }
  async searchFiles(search: string) {
    const res = await this.$http.get<IFile[]>(
      `/api/files/search?search=${search}`
    );
    return res.data;
  }
  async uploadAvatar(file: File) {
    const formData = new FormData();
    formData.append("file", file);
    const res = await this.$http.post<IUser>("/api/files/avatar", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  }
  async deleteAvatar() {
    const res = await this.$http.delete<IUser>("/api/files/avatar");
    return res.data;
  }
}

export default FileService;
