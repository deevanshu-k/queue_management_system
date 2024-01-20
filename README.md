# queue_management_system

### Development Env
- Make File .env and add below variables

```bash
NODE_ENV=development
PORT=3000
HOST='127.0.0.1'

CLIENT_URL='http://127.0.0.1:4200'
MANAGER_URL='http://127.0.0.1:4200' # Without Slash
VIEWER_URL='http://127.0.0.1:4200'  # Without Slash

## AUTH ##
SECRET='I LOVE YOU'
TOKEN_EXP_TIME='5h'

## DATABASE

# HOST
D_DB_HOST='127.0.0.1'

# USER
D_DB_USER=root

# PASSWORD
D_DB_PSWD=Root@125502

#DB-NAME
D_DB_NAME=queuedb

```

### Production Env
- Make File .env and add below variables

```bash
NODE_ENV=development
PORT=3000
HOST='127.0.0.1'

CLIENT_URL='http://127.0.0.1:4200'
MANAGER_URL='http://127.0.0.1:4200' # Without Slash
VIEWER_URL='http://127.0.0.1:4200'  # Without Slash

## AUTH ##
SECRET='I LOVE YOU'
TOKEN_EXP_TIME='5h'

## DATABASE

# HOST
P_DB_HOST='127.0.0.1'

# USER
P_DB_USER=root

# PASSWORD
P_DB_PSWD=Root@125502

#DB-NAME
P_DB_NAME=queuedb

```
