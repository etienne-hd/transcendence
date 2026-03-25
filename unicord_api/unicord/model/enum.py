from enum import Enum


class StatusUser(Enum):
    ONLINE = "online"
    OFFLINE = "offline"


class StatusFriend(Enum):
    FRIEND = "friend"
    SENT = "sent"
    PENDING = "pending"


class SortMessage(Enum):
    ASC = "asc"
    DESC = "desc"
