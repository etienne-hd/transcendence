import os
from dotenv import load_dotenv
import unicord

load_dotenv()


def show_user(user: unicord.User) -> None:
    print(f"ID: {user.id_}")
    print(f"Name: {user.name}")
    print(f"Username: {user.username}")
    print(f"Email: {user.email}")


def main() -> None:
    api_key = os.getenv("API_KEY")

    client = unicord.Client(api_key=api_key)
    
    user = client.me()
    show_user(user=user)


if __name__ == "__main__":
    main()
