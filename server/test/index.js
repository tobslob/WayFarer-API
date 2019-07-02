import chai from 'chai';
import chaiHttp from 'chai-http';
import assert from 'assert';
import http from 'http';
import app from '../index';

// Define the expect assertion
const { expect } = chai;

// chai middleware
chai.use(chaiHttp);

describe('INDEX js', () => {
  it('should get home successfully', (done) => {
    chai
      .request(app)
      .get('/')
      .then((res) => {
        expect(res.status).to.be.equal(200);
        done();
      })
      .catch(error => done(error));
  });
  it('should return 404 if route not found', (done) => {
    chai
      .request(app)
      .get('/api/v1/home')
      .then((res) => {
        expect(res.status).to.be.equal(404);
        expect(res.body).to.have.property('error');
        done();
      })
      .catch(error => done(error));
  });
});
it('should handle internal server error', (done) => {
  chai
    .request(app)
    .get('/api/v1/loans%/')
    .then((res) => {
      expect(res.status).to.be.equal(404);
      expect(res.body).to.have.property('error');
      done();
    })
    .catch(error => done(error));
});

describe('HTTP Server', () => {
  it('should return 200', (done) => {
    http.get('http://localhost:5500', (res) => {
      assert.equal(200, res.statusCode);
      done();
    });
  });
});
