import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

// Define the expect assertion
const { expect } = chai;

// chai middleware
chai.use(chaiHttp);

let Token;
let Token1;
const bookingsUrl = '/api/v1/bookings';
const signinUrl = '/api/v1/auth/signin';

describe(`POST ${bookingsUrl}`, () => {
  it('should successfully login user', (done) => {
    chai
      .request(app)
      .post(signinUrl)
      .send({ email: 'kzmobileapp@gmail.com', password: 'Kazeem27' })
      .end((err, res) => {
        const { body } = res;
        Token = body.token;
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
        Token1 = body.token;
        done();
      });
  });
  it('should return 400 if trip has been booked by user', (done) => {
    chai
      .request(app)
      .post(bookingsUrl)
      .set('token', Token)
      .send({ trip_id: 20, seat_number: 2 })
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.equal(400);
        expect(res.status).to.be.a('number');
        expect(body).to.be.an('object');
        expect(body).to.be.have.property('error');
        expect(body.error).to.be.equal('You already booked a seat for the trip');
        done();
      });
  });

  it('should not book a cancel trip', (done) => {
    chai
      .request(app)
      .post(bookingsUrl)
      .set('token', Token)
      .send({ trip_id: 1, seat_number: 2 })
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.equal(400);
        expect(res.status).to.be.a('number');
        expect(body).to.be.an('object');
        expect(body).to.be.have.property('error');
        expect(body.error).to.be.equal('This trip has been cancelled, you can not book it');
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

  it('should return 400 if seat has been occupied for a seat', (done) => {
    chai
      .request(app)
      .post(bookingsUrl)
      .set('token', Token1)
      .send({ trip_id: 20, seat_number: 2 })
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.equal(400);
        expect(res.status).to.be.a('number');
        expect(body).to.be.an('object');
        expect(body).to.be.have.property('error');
        expect(body.error).to.be.equal('Seat has been occuppied, choose another seat');
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
