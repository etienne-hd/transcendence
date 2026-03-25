from ..model import Proxy

import requests


class SessionMixin:
    def __init__(
        self, api_key: str, proxy: Proxy | None = None, verify_ssl: bool = False
    ):
        self._proxy = proxy
        self.session = self._init_session(api_key, proxy, verify_ssl)

    def _init_session(
        self, api_key: str, proxy: Proxy | None = None, verify_ssl: bool = False
    ) -> requests.Session:
        session = requests.Session()

        if proxy:
            session.proxies = {"http": proxy.url, "https": proxy.url}

        session.headers.update({"x-api-key": api_key})

        session.verify = verify_ssl

        return session

    @property
    def proxy(self) -> Proxy | None:
        return self._proxy

    @proxy.setter
    def proxy(self, proxy: Proxy | None) -> None:
        if isinstance(proxy, Proxy):
            self.session.proxies = {"http": proxy.url, "https": proxy.url}
        else:
            self.session.proxies = None
