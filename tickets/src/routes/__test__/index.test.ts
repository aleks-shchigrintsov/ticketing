import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';

const createTicket = () => (
  request(app)
    .post('/api/tickets')
    .set('Cookie', global.signup())
    .send({
      title: 'title 1',
      price: 23
    })
)

it('returns a 404 if the ticket is not found', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .get(`/api/tickets/${id}`)
    .send()
    .expect(404);
});

it('can fetch a list of tickets', async () => {
  await createTicket()
  await createTicket()
  await createTicket()

  const response = await request(app)
    .get('/api/tickets/')
    .send()
    .expect(200);

    expect(response.body.length).toEqual(3);
});
