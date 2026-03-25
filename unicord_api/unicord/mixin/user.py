from ..model import User


class UserMixin:
    def __init__(self):
        pass

    def me(self) -> User:
        data = self.fetch("GET", "/me")
        return User.build(data)

    def edit(
        self,
        username: str | None = None,
        email: str | None = None,
        name: str | None = None,
        biography: str | None = None,
        password: str | None = None,
    ) -> User:
        payload = {}

        if username:
            payload["username"] = username
        if email:
            payload["email"] = email
        if name:
            payload["name"] = name
        if biography:
            payload["biography"] = biography
        if password:
            payload["password"] = password

        data = self.fetch("PUT", "/me", payload)
        return User.build(data)

    def get_user(self, user_id: int) -> User:
        data = self.fetch("GET", f"/user/{user_id}")
        return User.build(data)
