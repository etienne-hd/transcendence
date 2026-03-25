from ..model import SortMessage, Message


class MessageMixin:
    def __init__(self):
        pass

    def get_messages(
        self,
        user_id: int,
        sort: SortMessage = SortMessage.ASC,
        search: str | None = None,
        attachment_only: bool = False,
    ) -> list[Message]:
        payload = {"user_id": user_id}
        params = {"sort": sort.value, "search": search, "attachment": attachment_only}

        data = self.fetch("POST", "/messages", payload, params)
        return [Message.build(message) for message in data]

    def send_message(self, user_id: int, content: str) -> Message:
        payload = {"user_id": user_id, "content": content}

        data = self.fetch("POST", "/message", payload)
        return Message.build(data)

    def delete_message(self, message_id: int) -> None:
        payload = {"message_id": message_id}

        self.fetch("DELETE", "/message", payload)

    def mark_read_messages(self, user_id: int) -> None:
        payload = {"user_id": user_id}

        self.fetch("POST", "/messages/mark-read", payload)
