import { apiClient } from "./api.service";
import { type Message } from "./types/message";

export const messageService = {
  async getMessage(id: number): Promise<Message[]> {
    const response = await apiClient.post<Message[]>("/messages", {
      user_id: id,
    });

    return response.data;
  },

  async sendMessage(friendId: number, content: string): Promise<Message> {
    const response = await apiClient.post<Message>("/message", {
      user_id: friendId,
      content: content,
    });

    return response.data;
  },

  async removeMessage(id: number): Promise<{ message: string }> {
    const response = await apiClient.delete<{ message: string }>("/message", {
      data: { message_id: id },
    });

    return response.data;
  },
};
