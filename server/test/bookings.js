import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import { correctTripDetails } from './mockData/mockTrip';

// Define the expect assertion
const { expect } = chai;

// chai middleware
chai.use(chaiHttp);

let Token;
let Token1;
// let Booking_id;
let Trip_id;
const bookingsUrl = '/api/v1/bookings';
const signinUrl = '/api/v1/auth/signin';
const tripUrl = '/api/v1/trips';

describe(`POST ${bookingsUrl}`, () => {
  it('should successfully login user', (done) => {
    chai
      .request(app)
      .post(signinUrl)
      .send({ email: 'kzmobileapp@gmail.com', password: 'Kazeem27' })
      .end((err, res) => {
        const { body } = res;
        Token = body.data.token;
        done();
      });
  });

  it('should successfully login user', (done) => {
    chai
      .request(app)
      .post(signinUrl)
      .send({ email: 'jamesdoe@gmail.com', password: 'jamesdoe' })
      .end((err, res) => {
        const { body } = res;
        Token1 = body.data.token;
        done();
      });
  });

  it('should create a trip successful', (done) => {
    chai
      .request(app)
      .post(tripUrl)
      .set('token', Token)
      .send(correctTripDetails)
      .end((err, res) => {
        const { body } = res;
        Trip_id = body.data.trip_id;
        done();
      });
  });

  it('should return 404 if trip is not found', (done) => {
    chai
      .request(app)
      .post(bookingsUrl)
      .set('token', Token)
      .send({ trip_id: 90000000, seat_number: 2 })
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.equal(404);
        expect(res.status).to.be.a('number');
        expect(body).to.be.an('object');
        expect(body).to.be.have.property('error');
        expect(body.error).to.be.equal('Trip not found!');
        done();
      });
  });

  it('should return 400 if trip_id is not a number', (done) => {
    chai
      .request(app)
      .post(bookingsUrl)
      .set('token', Token1)
      .send({ trip_id: 'kas', seat_number: 2 })
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.equal(400);
        expect(res.status).to.be.a('number');
        expect(body).to.be.an('object');
        expect(body).to.be.have.property('error');
        expect(body.error).to.be.equal('Trip ID must be an Integer number!');
        done();
      });
  });

  it('should return 400 if seat number is not a number', (done) => {
    chai
      .request(app)
      .post(bookingsUrl)
      .set('token', Token1)
      .send({ trip_id: 18, seat_number: 'yt' })
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.equal(400);
        expect(res.status).to.be.a('number');
        expect(body).to.be.an('object');
        expect(body).to.be.have.property('error');
        expect(body.error).to.be.equal('Seat number must be an Integer number!');
        done();
      });
  });
});


describe(`GET ${bookingsUrl}`, () => {
  it('should successfully login user', (done) => {
    chai
      .request(app)
      .post(signinUrl)
      .send({ email: 'kzmobileapp@gmail.com', password: 'Kazeem27' })
      .end((err, res) => {
        const { body } = res;
        Token = body.data.token;
        done();
      });
  });

  it('should successfully login user', (done) => {
    chai
      .request(app)
      .post(signinUrl)
      .send({ email: 'jamesdoe@gmail.com', password: 'jamesdoe' })
      .end((err, res) => {
        const { body } = res;
        Token1 = body.data.token;
        done();
      });
  });

  it('should all bookings in peculiar to a user', (done) => {
    chai
      .request(app)
      .get(bookingsUrl)
      .set('token', Token1)
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.equal(404);
        expect(res.status).to.be.a('number');
        expect(body).to.have.property('error');
        expect(body.error).to.be.equal('Not found');
        done();
      });
  });
});


describe(`PATCH ${bookingsUrl}`, () => {
  it('should successfully login user', (done) => {
    chai
      .request(app)
      .post(signinUrl)
      .send({ email: 'kzmobileapp@gmail.com', password: 'Kazeem27' })
      .end((err, res) => {
        const { body } = res;
        Token = body.data.token;
        done();
      });
  });

  it('should successfully login user', (done) => {
    chai
      .request(app)
      .post(signinUrl)
      .send({ email: 'jamesdoe@gmail.com', password: 'jamesdoe' })
      .end((err, res) => {
        const { body } = res;
        Token1 = body.data.token;
        done();
      });
  });
});


describe(`DELETE ${bookingsUrl}`, () => {
  it('should successfully login user', (done) => {
    chai
      .request(app)
      .post(signinUrl)
      .send({ email: 'kzmobileapp@gmail.com', password: 'Kazeem27' })
      .end((err, res) => {
        const { body } = res;
        Token = body.data.token;
        done();
      });
  });

  it('should successfully login user', (done) => {
    chai
      .request(app)
      .post(signinUrl)
      .send({ email: 'jamesdoe@gmail.com', password: 'jamesdoe' })
      .end((err, res) => {
        const { body } = res;
        Token1 = body.data.token;
        done();
      });
  });

  it('should return 404 if booking is not found', (done) => {
    chai
      .request(app)
      .delete(`${bookingsUrl}/78`)
      .set('token', Token1)
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.equal(404);
        expect(res.status).to.be.a('number');
        expect(body).to.have.property('error');
        expect(body.error).to.be.equal('Not Found');
        done();
      });
  });

  it('should return 400 if booking id is not an integer', (done) => {
    chai
      .request(app)
      .delete(`${bookingsUrl}/ure`)
      .set('token', Token1)
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.equal(400);
        expect(res.status).to.be.a('number');
        expect(body).to.have.property('error');
        expect(body.error).to.be.equal('Params must be integer!');
        done();
      });
  });

  it('should cancel a trip successful', (done) => {
    chai
      .request(app)
      .patch(`/api/v1/trips/${Trip_id}`)
      .set('token', Token)
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.equal(200);
        expect(res.status).to.be.a('number');
        expect(body).to.be.an('object');
        expect(body).to.have.property('data');
        done();
      });
  });
  it('should not book a cancel trip', (done) => {
    chai
      .request(app)
      .post(bookingsUrl)
      .set('token', Token1)
      .send({ trip_id: `${Trip_id}`, seat_number: 2 })
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.equal(400);
        expect(res.status).to.be.a('number');
        expect(body).to.be.an('object');
        expect(body).to.be.have.property('error');
        expect(body.error).to.be.equal('This trip has been canceled, you can not book it');
        done();
      });
  });
});
