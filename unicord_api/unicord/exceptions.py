class UnicordException(Exception):
    """Default exception for Unicord Client"""


class NotFoundException(UnicordException):
    """Raise when User or Message cannot be found"""


class UnauthorizedException(UnicordException):
    """Raise when User doesn't have the permission"""


class ConflictException(UnicordException):
    """Raise when conflict happen (e.g: user send (a message)/(friend request) to himself)"""
