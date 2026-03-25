# unicord

**Official client for Unicord API**

```python
api_key = ...

client = unicord.Client(api_key=api_key)

friends = client.get_friends()
for friend in friends:
	client.send_message(friend.id_, "Hello, World!")
```

## Installation

Required **Python 3.10+**

```bash
pip install -e .
```

## Usage

Start with the [examples](examples/) to quickly understand how to use the library in real-world scenarios.

### Client

To create client you need to use `unicord.Client` class

```python
import unicord

client = unicord.Client()
```

#### Proxy

You can also configure the client to use a proxy by providing a `Proxy` object:

```python
# Setup proxy1
proxy1 = unicord.Proxy(
	host="127.0.0.1",
	port=12345,
	username="username",
	password="password",
	scheme="http"
)

# Initialize client with proxy1
client = unicord.Client(proxy=proxy1)

# Setup proxy2
proxy2 = unicord.Proxy(
	host="127.0.0.1",
	port=23456,
)

# Change client proxy to proxy2
client.proxy = proxy2

# Remove proxy
client.proxy = None
```

### User

You can retrieve your own user using `unicord.Client.me()`.
This method returns an instance of `unicord.User`:

```python
user = client.me()
```

To fetch another user, use `unicord.Client.get_user()`.
It also returns a `unicord.User` instance:

```python
user = client.get_user(user_id)
```

You can update your profile information with `unicord.Client.edit()`.
This method returns the updated `unicord.User`:

```python
user = client.edit(
    username,
    email,
    name,
    biography,
    password
)
```

### Friend

You can retrieve your friends list using `unicord.Client.get_friends()`.
It returns a list of `unicord.Friend`:

```python
friends = client.get_friends()
```

To add a friend, use `unicord.Client.add_friend()`:

```python
client.add_friend(username)
```

To remove a friend, use `unicord.Client.remove_friend()`:

```python
client.remove_friend(username)
```

### Message

You can fetch messages with a specific user using `unicord.Client.get_messages()`.
This method returns a list of `unicord.Message`.

It supports several optional filters:

- `sort` using `unicord.SortMessage`
- `search` to filter messages by text
- `attachment_only` to retrieve only messages containing attachments

```python
messages = client.get_messages(user_id, sort, search, attachment_only)

for message in messages:
    print(message.content)
```

To send a message, use `unicord.Client.send_message()`.
It returns the created `unicord.Message`:

```python
message = client.send_message(user_id, "Hello, World!")
```

To delete a message:

```python
client.delete_message(message_id)
```

To mark messages as read:

```python
client.mark_read_messages(user_id)
```
