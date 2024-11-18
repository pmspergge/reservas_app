const supertest = require("supertest");
const app = require("../app");

const mongoose = require('mongoose');

describe('POST /api/reservas', () => {
    afterAll(async () => {
        await mongoose.connection.close();
    });

    test('Nueva reserva', async () => {
        const response =  await supertest(app) 
        .post('/api/reservas')
        .send({
          nombreCliente: 'Marcela',
          cantidadDePersonas: 4,
          idMesa: "1",
          fecha: "1970-01-01T00:00:01.995Z",
          turno: "mediodia"
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201);
   
        expect(response.body).toEqual(expect.objectContaining({
            nombreCliente: 'Marcela',
            cantidadDePersonas: 4,
            idMesa: "1",
            fecha: '1970-01-01T00:00:01.995Z',
            turno: "mediodia",
        }));
        expect(response.body._id).toBeDefined();
    });
});
   