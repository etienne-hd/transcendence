from dataclasses import dataclass
from datetime import datetime

from ..model import User


@dataclass
class Message:
    id_: int
    from_user: User
    to_user: User
    created_at: datetime
    content: str

    @staticmethod
    def build(raw: dict) -> "Message":
        return Message(
            id_=raw.get("id"),
            from_user=User.build(raw.get("from_user")),
            to_user=User.build(raw.get("to_user")),
            created_at=datetime.fromisoformat(raw.get("created_at")),
            content=raw.get("content"),
        )
