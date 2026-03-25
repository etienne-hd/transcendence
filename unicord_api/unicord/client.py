from .model import Proxy
from .mixin import SessionMixin, UserMixin, FriendMixin, MessageMixin
from .exceptions import *

import os


class Client(SessionMixin, UserMixin, FriendMixin, MessageMixin):
    def __init__(
        self,
        api_key: str,
        base_url: str = "https://unicord.fr/api/",
        proxy: Proxy | None = None,
    ):
        self._base_url = base_url
        super().__init__(api_key=api_key, proxy=proxy)

    def fetch(
        self,
        method: str,
        path: str,
        payload: dict | None = None,
        params: dict | None = {},
    ) -> dict | str | None:
        response = self.session.request(
            method=method,
            url=os.path.join(self._base_url + path),
            json=payload,
            params=params,
        )

        if response.status_code == 404:
            raise NotFoundException(response.json()["message"])
        elif response.status_code == 403:
            raise UnauthorizedException(response.json()["message"])
        elif response.status_code == 409:
            raise ConflictException(response.json()["message"])

        response.raise_for_status()

        try:
            return response.json()
        except:
            return response.text if response.text != "" else None
