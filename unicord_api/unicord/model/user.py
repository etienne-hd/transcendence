from .enum import StatusUser

from dataclasses import dataclass
from datetime import datetime


@dataclass
class User:
    id_: str
    created_at: datetime
    last_seen_at: datetime
    username: str
    name: str
    email: str
    biography: str | None
    status: StatusUser
    api_key: str

    @staticmethod
    def build(raw: dict) -> "User":
        return User(
            id_=raw.get("id"),
            created_at=datetime.fromisoformat(raw.get("created_at")),
            last_seen_at=datetime.fromisoformat(raw.get("last_seen_at")),
            username=raw.get("username"),
            name=raw.get("name"),
            email=raw.get("email"),
            biography=raw.get("biography"),
            status=StatusUser(raw.get("status")),
            api_key=raw.get("api_key"),
        )
