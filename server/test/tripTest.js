import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import {
  correctTripDetails,
  undefinedTripBusId,
  incorrectTripBusId,
  undefinedTripOrigin,
  undefinedTripDestination,
  undefinedTripDate,
  undefinedTripFare,
  correctBusDetails,
  undefinedNumberPlate, undefinedBusManufacturer, undefinedBusModel, undefinedBusYear,
  undefinedBusCapacity,
} from './mockData/mockTrip';


// Define the expect assertion
const { expect } = chai;

// chai middleware
chai.use(chaiHttp);

let Token;
const tripUrl = '/api/v1/trips';
const signinUrl = '/api/v1/auth/signin';
const busUrl = '/api/v1/trips/bus';

describe(`POST ${tripUrl}`, () => {
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
  it('should create a trip successful', (done) => {
    chai
      .request(app)
      .post(tripUrl)
      .set('token', Token)
      .send(correctTripDetails)
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.equal(201);
        expect(res.status).to.be.a('number');
        expect(body).to.be.an('object');
        expect(body.data).to.be.have.property('bus_id');
        expect(body.data).to.be.have.property('origin');
        expect(body.data).to.be.have.property('destination');
        expect(body.data).to.be.have.property('trip_date');
        expect(body.data).to.be.have.property('status');
        done();
      });
  });

  it('Should return 400 if bus ID is omitted', (done) => {
    chai
      .request(app)
      .post(tripUrl)
      .set('token', Token)
      .send(undefinedTripBusId)
      .set('token', Token)
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.equal(400);
        expect(res.status).to.be.a('number');
        expect(body).to.be.an('object');
        expect(body).to.be.have.property('error');
        expect(body.error).to.be.equal('bus id is required and should be an integer number');
        done();
      });
  });

  it('Should return 400 if bus id is incorrect', (done) => {
    chai
      .request(app)
      .post(tripUrl)
      .set('token', Token)
      .send(incorrectTripBusId)
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.equal(400);
        expect(res.status).to.be.a('number');
        expect(body).to.be.an('object');
        expect(body).to.be.have.property('error');
        expect(body.error).to.be.equal('No bus with such ID found');
        done();
      });
  });

  it('Should return 400 if destination is omitted', (done) => {
    chai
      .request(app)
      .post(tripUrl)
      .set('token', Token)
      .send(undefinedTripDestination)
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.equal(400);
        expect(res.status).to.be.a('number');
        expect(body).to.be.an('object');
        expect(body).to.be.have.property('error');
        expect(body.error).to.be.equal('destination is required and should not be less than 3 characters');
        done();
      });
  });

  it('Should return 400 if trip origin is omitted', (done) => {
    chai
      .request(app)
      .post(tripUrl)
      .set('token', Token)
      .send(undefinedTripOrigin)
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.equal(400);
        expect(res.status).to.be.a('number');
        expect(body).to.be.an('object');
        expect(body).to.be.have.property('error');
        expect(body.error).to.be.equal('origin is required and should not be less than 3 characters');
        done();
      });
  });

  it('Should return 400 if trip date is omitted', (done) => {
    chai
      .request(app)
      .post(tripUrl)
      .set('token', Token)
      .send(undefinedTripDate)
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.equal(400);
        expect(res.status).to.be.a('number');
        expect(body).to.be.an('object');
        expect(body).to.be.have.property('error');
        expect(body.error).to.be.equal('trip date is required');
        done();
      });
  });
  it('Should return 400 if trip Fare is omitted', (done) => {
    chai
      .request(app)
      .post(tripUrl)
      .set('token', Token)
      .send(undefinedTripFare)
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.equal(400);
        expect(res.status).to.be.a('number');
        expect(body).to.be.an('object');
        expect(body).to.be.have.property('error');
        expect(body.error).to.be.equal('fare is required and can not be less than $1');
        done();
      });
  });
});


describe(`POST ${busUrl}`, () => {
  it('should add a bus successful', (done) => {
    chai
      .request(app)
      .post(busUrl)
      .set('token', Token)
      .send(correctBusDetails)
      .end((err, res) => {
        const { body } = res;
        console.log(body);
        expect(res.status).to.equal(201);
        expect(res.status).to.be.a('number');
        expect(body).to.be.an('object');
        expect(body.data).to.be.have.property('number_plate');
        expect(body.data).to.be.have.property('manufacturer');
        expect(body.data).to.be.have.property('model');
        expect(body.data).to.be.have.property('year');
        expect(body.data).to.be.have.property('capacity');
        done();
      });
  });

  it('Should return 400 if number plate is omitted', (done) => {
    chai
      .request(app)
      .post(busUrl)
      .set('token', Token)
      .send(undefinedNumberPlate)
      .set('token', Token)
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.equal(400);
        expect(res.status).to.be.a('number');
        expect(body).to.be.an('object');
        expect(body).to.be.have.property('error');
        expect(body.error).to.be.equal('Number plate is required and must be correct plate-number format');
        done();
      });
  });

  it('Should return 400 if bus manufacturer is omitted', (done) => {
    chai
      .request(app)
      .post(busUrl)
      .set('token', Token)
      .send(undefinedBusManufacturer)
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.equal(400);
        expect(res.status).to.be.a('number');
        expect(body).to.be.an('object');
        expect(body).to.be.have.property('error');
        expect(body.error).to.be.equal('bus manufacturer is required');
        done();
      });
  });

  it('Should return 400 if bus model is omitted', (done) => {
    chai
      .request(app)
      .post(busUrl)
      .set('token', Token)
      .send(undefinedBusModel)
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.equal(400);
        expect(res.status).to.be.a('number');
        expect(body).to.be.an('object');
        expect(body).to.be.have.property('error');
        expect(body.error).to.be.equal('bus model is required');
        done();
      });
  });

  it('Should return 400 bus year is omitted', (done) => {
    chai
      .request(app)
      .post(busUrl)
      .set('token', Token)
      .send(undefinedBusYear)
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.equal(400);
        expect(res.status).to.be.a('number');
        expect(body).to.be.an('object');
        expect(body).to.be.have.property('error');
        expect(body.error).to.be.equal('Correct year format is required');
        done();
      });
  });

  it('Should return 400 error if bus capacity is omitted', (done) => {
    chai
      .request(app)
      .post(busUrl)
      .set('token', Token)
      .send(undefinedBusCapacity)
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.equal(400);
        expect(res.status).to.be.a('number');
        expect(body).to.be.an('object');
        expect(body).to.be.have.property('error');
        expect(body.error).to.be.equal('Bus capacity is required');
        done();
      });
  });
});


describe(`GET ${tripUrl}`, () => {
  it('should create a trip successful', (done) => {
    chai
      .request(app)
      .get(tripUrl)
      .set('token', Token)
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.equal(200);
        expect(res.status).to.be.a('number');
        expect(body).to.be.an('object');
        expect(body).to.have.property('data');
        expect(body.data).to.be.an('array');
        done();
      });
  });
});
