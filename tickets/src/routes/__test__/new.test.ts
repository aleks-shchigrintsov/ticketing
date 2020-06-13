import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/ticket';

it('has a route handler listening to /api/tickets for post requests', async () => {
  const response = await request(app)
    .post('/api/tickets')
    .send({});

    expect(response.status).not.toEqual(404);
})

it('can only be accssed if user is signed in', async () => {
  await request(app)
    .post('/api/tickets')
    .send({})
    .expect(401);
})

it('reeturns a status other than 401 if user is signd in', async () => {
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signup())
    .send({});

    expect(response.status).not.toEqual(401);
})

it('returns an error if an invalid title is provided', async () => {
  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signup())
    .send({
      title: '',
      price: 10
    })
    .expect(400)

    await request(app)
      .post('/api/tickets')
      .set('Cookie', global.signup())
      .send({
        price: 10
      })
      .expect(400)
})

it('returns an error if an invalid price is provided', async () => {
  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signup())
    .send({
      title: 'some title',
      price: -10
    })
    .expect(400)

  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signup())
    .send({
      title: 'some title',
    })
    .expect(400)
})

it('creats ticket with valid inputs', async () => {
  let tickets = await Ticket.find({});

  expect(tickets.length).toEqual(0);

  const title = 'Some title';
  const price = 20;

  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signup())
    .send({
      title,
      price
    })
    .expect(201);

  tickets = await Ticket.find({});

   expect(tickets.length).toEqual(1);
   expect(tickets[0].title).toEqual(title);
   expect(tickets[0].price).toEqual(price);
})
