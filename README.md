## Booking Room Rest Api (Refactory)

### Docker Image Registry

```sh
docker pull 705471/express-api:<tag>
```

### Docker Container

- **express-app** on 3000:3000
- **postgres-db** on 5432:5432

### Docker Command

- ## Mac/Linux Command

  - ```sh
      docker-compose -f docker-compose.prod.yml up -d || docker-compose -f docker-compose.dev.yml up -d
    ```

  - ```sh
      docker-compose -f docker-compose.prod.yml down -d || docker-compose -f docker-compose.dev.yml down -d
    ```

- #### Windows Command

  - ```sh
       npm run cmd
    ```

### Express Container Default Environment

- ### Production

  - PG_URI=postgres://restuwahyu13:restuwahyu13@db/booking_room

- ### Development

  - PG_HOST = db
  - PG_USERNAME = restuwahyu13
  - PG_PASSWORD = restuwahyu13
  - PG_DATABASE = booking_room
  - PG_PORT = 5432

### Postgres Container Default Environment

- POSTGRES_HOST=db
- POSTGRES_USER=restuwahyu13
- POSTGRES_PASSWORD=restuwahyu13
- POSTGRES_DB=booking_room

### Deploy Docker Container On Heroku

- goto [Clever Cloud](https://www.clever-cloud.com) create your cloud database
- docker build -t restuwahyu13/express-api .
- heroku container:login
- heroku create **{website-name}**
- docker tag restuwahyu13/express-api registry.heroku.com/**{heroku-website-name}**/web
- docker push {heroku-website-name}
- heroku container:release web -a **{heroku-website-name}**
- heroku open -a **{heroku-website-name}**
- heroku logs -a **{heroku-website-name}** --tail

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

### Demo Application

express booking room rest api demo application [here](https://rest-booking.herokuapp.com/)
