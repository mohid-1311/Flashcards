import request from 'supertest';
import { app } from '../src/server';

describe('Decks Router', () => {
  it('GET /decks/test should return a list of decks of user test', async () => {
    const response = await request(app).get('/decks/test');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
  it('PUT /decks/test/nonexistingdeck should return status 400, because of wrong body', async () => {
    const response = await request(app).put('/decks/test/nonexistingdeck').send();
    
    expect(response.status).toBe(400);
  });
  it('PUT /decks/test/nonexistingdeck should return status 404 because deck does not ecist', async () => {
    const response = await request(app).put('/decks/test/nonexistingdeck').send({name: "nonexistingdeck", user_name: "test"});
    
    expect(response.status).toBe(404);
    expect(response.text).toBe("No rows were affected!");
  });
});