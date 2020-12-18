## Booking Room Rest Api (Refactory)

### DEMO Rest API

demo for this application in [here](https://rest-booking.herokuapp.com/api/v1)

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
