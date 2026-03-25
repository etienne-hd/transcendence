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

    client = unicord.Client(api_key=api_key, base_url="http://127.0.0.1:3000")
    
    user_id = input("Enter user id: ")
    user = client.get_user(user_id=user_id)
    show_user(user=user)


if __name__ == "__main__":
    main()
