import os
from dotenv import load_dotenv
import unicord

load_dotenv()


def main() -> None:
    api_key = os.getenv("API_KEY")

    client = unicord.Client(api_key=api_key)
    
    friends = client.get_friends()
    for friend in friends:
        print(friend.user.status, friend.user.name)


if __name__ == "__main__":
    main()
