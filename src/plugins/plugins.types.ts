export interface ToastMessage {
  id?: string | number;
  text: string;
  type: "error" | "info";
  title?: string;
}
