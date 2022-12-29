type Childs = Array<IFile>;
interface IFile {
  name: string;
  type: string;
  accessLink?: string;
  size: number;
  path: string;
  user: number;
  parent: string;
  date: string;
  _id: string;
  childs: Childs;
}

export type { IFile };
