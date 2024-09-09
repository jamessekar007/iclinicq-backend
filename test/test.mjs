//const chai = await import('chai');
import  chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../app.js';

chai.use(chaiHttp);
const { expect } = chai;


describe('Simple Test', () => {
    it('should run without errors', (done) => {
        expect(true).to.be.true;
        done();
    });
});

describe('API Test', () => {
  it('should respond with status 200', (done) => {
    chai.request('http://localhost:3000') 
      .get('/hello') 
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(true).to.be.true;
        done(); 
      });
  });
});

describe('POST /users/signup', () => {
  it('should send data and receive a successful response', async () => {
    const payload = {
      name: 'James Sekar',
      email: 'jamessekar007@gmail.com',
      mobile:"741852964",
      password: "James@123"
    };

    const res = await chai.request(app)
      .post('/users/signup')
      .send(payload);

    expect(res).to.have.status(201);
    expect(res.body).to.be.an('object');
    //expect(res.body).to.have.property('message', 'Data received');
  });
});

describe('POST /users/login', () => {
  it('should send data and receive a successful response', async () => {
    const payload = {
      email: 'jamessekar007@gmail.com',
      password: "James@123"
    };

    const res = await chai.request(app)
      .post('/users/login')
      .send(payload);

    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
  });
});

describe('GET /users/products', () => {
  it('should send data and receive a successful response', async () => {

    const res = await chai.request(app)
      .get('/users/products')

    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
  });
});

describe('POST /users/cart', () => {
  it('should send data and receive a successful response', async () => {
    const payload = {
      "product_id":9,
      "amount": "2000",
      "qty": 2
    };

    const res = await chai.request(app)
      .post('/users/cart')
      .send(payload);

    expect(res).to.have.status(201);
    expect(res.body).to.be.an('object');
  });
});

describe('GET /users/cart', () => {
  it('should send data and receive a successful response', async () => {

    const res = await chai.request(app)
      .get('/users/products')

    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
  });
});

describe('PUT /users/cart', () => {
  it('should send data and receive a successful response', async () => {
    const payload = {
      "product_id":9,
      "amount": "2000",
      "qty": 2
    };

    const res = await chai.request(app)
      .post('/users/cart/1')
      .send(payload);

    expect(res).to.have.status(201);
    expect(res.body).to.be.an('object');
  });
});

describe('DELETE /users/cart', () => {
  it('should send data and receive a successful response', async () => {

    const res = await chai.request(app)
      .delete('/users/cart/1')

    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
  });
});

describe('GET /users/checkout', () => {
  it('should send data and receive a successful response', async () => {

    const res = await chai.request(app)
      .get('/users/checkout')

    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
  });
});
