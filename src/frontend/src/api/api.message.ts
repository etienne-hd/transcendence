import { apiClient } from "./api.service";
import { type Message } from "./types/message";

export const messageService = {
  async getMessage(id: number): Promise<Message[]> {
    const response = await apiClient.post<Message[]>("/messages", {
      user_id: id,
    });

    return response.data;
  },

  async downloadAttachement(
    id: number,
    onProgress: (percent: number | undefined) => void,
  ): Promise<{ message: string }> {
    const response = await apiClient.get("/message/" + id + "/attachment", {
      responseType: "blob",
      onDownloadProgress: (progressEvent) => {
        if (progressEvent.total) {
          if (progressEvent.total == progressEvent.loaded) {
            onProgress(undefined);
            return;
          }
          const completedPercent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total,
          );
          onProgress(completedPercent);
        }
      },
    });

    const fileName = "unicord_download";

    const blob = response.data;

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();

    a.remove();
    window.URL.revokeObjectURL(url);

    return response.data;
  },

  async loadAttachement(
    id: number,
    imgRef: HTMLImageElement,
  ): Promise<{ message: string }> {
    const response = await apiClient.get("/message/" + id + "/attachment", {
      responseType: "blob",
    });

    const blob = response.data;

    const url = window.URL.createObjectURL(blob);

    imgRef.src = url;

    imgRef.onload = () => window.URL.revokeObjectURL(url);

    return response.data;
  },

  async sendMessage(
    friendId: number,
    content: string,
    attachment?: File,
  ): Promise<Message> {
    const formData = new FormData();

    formData.append("user_id", friendId.toString());
    formData.append("content", content);

    if (attachment) {
      formData.append("file", attachment);
    }

    const response = await apiClient.post<Message>("/message", formData);

    return response.data;
  },

  async removeMessage(id: number): Promise<{ message: string }> {
    const response = await apiClient.delete<{ message: string }>("/message", {
      data: { message_id: id },
    });

    return response.data;
  },
};
