from ..model import Friend


class FriendMixin:
    def __init__(self):
        pass

    def get_friends(self) -> list[Friend]:
        data = self.fetch("GET", "/friends")
        return [Friend.build(friend) for friend in data]

    def add_friend(self, username: str):
        payload = {"username": username}

        self.fetch("POST", "/friend", payload)

    def remove_friend(self, username: str) -> None:
        payload = {"username": username}

        self.fetch("DELETE", "/friend", payload)
