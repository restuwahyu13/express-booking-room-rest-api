## Booking Room Rest Api (Refactory)

### Docker Image Registry

```sh
docker pull 705471/express-api:<tag>
```

### Docker Container

- **express-app** on 3000:3000
- **postgres-db** on 5432:5432

### Docker Command

- docker-compose up -d
- docker-compose down

### Express Default Environment

- PG_URI=postgres://restuwahyu13:restuwahyu13@db/booking_room

### Postgres Database Default Environment

- POSTGRES_HOST=db
- POSTGRES_USER=restuwahyu13
- POSTGRES_PASSWORD=restuwahyu13
- POSTGRES_DB=booking_room

### Deploy Docker Container On Heroku

- docker build -t restuwahyu13/express-api .
- heroku container:login
- heroku create <website-name>
- docker tag restuwahyu13/express-api registry.heroku.com/<heroku-website-name>/web
- docker push <heroku-website-name>
- heroku container:release web -a <heroku-website-name>
- heroku open -a <heroku-website-name>
- heroku logs -a <heroku-website-name> --tail

### Rest API Endpoint

| Name         | Endpoint                      | method |
| ------------ | ----------------------------- | ------ |
| **Users**    |                               |        |
| Register     | /api/v1/users/register        | POST   |
| Login        | /api/v1/users/login           | POST   |
| Activation   | /api/v1/users/activation/:id  | GET    |
| Resend       | /api/v1/users/resend          | POST   |
| **admins**   |                               |        |
| Create       | /api/v1/admins                | POST   |
| Results      | /api/v1/admins                | GET    |
| Result       | /api/v1/admins/:id            | GET    |
| Delete       | /api/v1/admins/:id            | DELETE |
| Update       | /api/v1/admins/:id            | PUT    |
| **Bookings** |                               |        |
| Create       | /api/v1/bookings              | POST   |
| Results      | /api/v1/bookings              | GET    |
| Result       | /api/v1/bookings/:id          | GET    |
| Delete       | /api/v1/bookings/:id          | DELETE |
| Update       | /api/v1/bookings/:id          | PUT    |
| **Rooms**    |                               |        |
| Create       | /api/v1/rooms                 | POST   |
| Results      | /api/v1/rooms                 | GET    |
| Result       | /api/v1/rooms/:id             | GET    |
| Delete       | /api/v1/rooms/:id             | DELETE |
| Update       | /api/v1/rooms/:id             | PUT    |
| **Check**    |                               |        |
| Check Order  | /api/v1/check/order?=order_id | GET    |
| Check In     | /api/v1/check/in?=order_id    | GET    |
| Check Out    | /api/v1/check/out?=order_id   | GET    |
