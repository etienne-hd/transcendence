import { apiClient } from "./api.service";
import { type Message } from "./types/message";

const attachmentCache: Map<number, Blob> = new Map();

export const messageService = {
  async getMessage(
    id: number,
    sort?: string,
    search?: string,
    attachment?: boolean,
  ): Promise<Message[]> {
    const response = await apiClient.post<Message[]>(
      "/messages",
      {
        user_id: id,
      },
      {
        params: {
          sort: sort,
          search: search,
          attachment: attachment,
        },
      },
    );

    return response.data;
  },

  async markReadAll(id: number): Promise<{ message: string }> {
    const response = await apiClient.post<{ message: string }>(
      "/messages/mark-read",
      {
        user_id: id,
      },
    );

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

  async loadAttachement(id: number): Promise<Blob> {
    const requestUrl = `/message/${id}/attachment`;

    if (attachmentCache.get(id) != undefined) {
      return attachmentCache.get(id)!;
    }

    const response = await apiClient.get(requestUrl, {
      responseType: "blob",
    });

    attachmentCache.set(id, response.data);

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

    attachmentCache.delete(id);

    return response.data;
  },
};
