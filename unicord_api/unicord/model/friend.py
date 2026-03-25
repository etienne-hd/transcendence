from .enum import StatusUser, StatusFriend
from .user import User

from dataclasses import dataclass
from datetime import datetime


@dataclass
class Friend:
    id_: str
    user: User
    status: StatusFriend
    created_at: datetime
    friend_at: datetime
    unread_messages: int

    @staticmethod
    def build(raw: dict) -> "Friend":
        return Friend(
            id_=raw.get("id"),
            user=User.build(raw.get("user")),
            status=StatusFriend(raw.get("status")),
            created_at=datetime.fromisoformat(raw.get("created_at")),
            friend_at=datetime.fromisoformat(raw.get("friend_at")),
            unread_messages=raw.get("unread_messages"),
        )
