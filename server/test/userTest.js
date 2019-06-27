import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import {
  correctUser, undefinedFirstName, undefinedAddress, invalidFirstNameLength,
  invalidFirstNameCharacter, undefinedLastName, invalidLastNameLength,
  invalidLastNameCharacter, undefinedEmail, invalidAddressLength, invalidEmailCharacter,
  existingEmail, undefinedPassword, invalidPasswordLength, emptyAddress, emptyEmail,
  emptyFirstName, emptyLastName,
} from './mockData/mockUser';

// Define the expect assertion
const { expect } = chai;

// chai middleware
chai.use(chaiHttp);

const signupUrl = '/api/v1/auth/signup';


describe(`POST ${signupUrl}`, () => {
  it('should signup user successful', (done) => {
    chai
      .request(app)
      .post(signupUrl)
      .send(correctUser)
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.equal(201);
        expect(res.status).to.be.a('number');
        expect(body).to.be.an('object');
        expect(body).to.be.have.property('token');
        expect(body.data).to.be.have.property('first_name');
        expect(body.data).to.be.have.property('last_name');
        expect(body.data).to.be.have.property('address');
        expect(body.data).to.be.have.property('is_admin');
        expect(body.data).to.be.have.property('email');
        done();
      });
  });

  it('Should return 400 if first name is ommited', (done) => {
    chai
      .request(app)
      .post(signupUrl)
      .send(undefinedFirstName)
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.equal(400);
        expect(res.status).to.be.a('number');
        expect(body).to.be.an('object');
        expect(body).to.be.have.property('error');
        expect(body.error).to.be.equal('First name field is required with min length of 3 and must be alphabet');
        done();
      });
  });

  it('Should return 400 if Address is ommited', (done) => {
    chai
      .request(app)
      .post(signupUrl)
      .send(undefinedAddress)
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.equal(400);
        expect(res.status).to.be.a('number');
        expect(body).to.be.an('object');
        expect(body).to.be.have.property('error');
        expect(body.error).to.be.equal('Address field is required and should not be less than 25 characters');
        done();
      });
  });

  it('Should return 400 if fist name lenght less is than 2', (done) => {
    chai
      .request(app)
      .post(signupUrl)
      .send(invalidFirstNameLength)
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.equal(400);
        expect(res.status).to.be.a('number');
        expect(body).to.be.an('object');
        expect(body).to.be.have.property('error');
        expect(body.error).to.be.equal('First name field is required with min length of 3 and must be alphabet');
        done();
      });
  });

  it('Should return 400 if Invalid first name format is entered', (done) => {
    chai
      .request(app)
      .post(signupUrl)
      .send(invalidFirstNameCharacter)
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.equal(400);
        expect(res.status).to.be.a('number');
        expect(body).to.be.an('object');
        expect(body).to.be.have.property('error');
        expect(body.error).to.be.equal('First name field is required with min length of 3 and must be alphabet');
        done();
      });
  });

  it('Should return 400 if lastName is empty', (done) => {
    chai
      .request(app)
      .post(signupUrl)
      .send(undefinedLastName)
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.equal(400);
        expect(res.status).to.be.a('number');
        expect(body).to.be.an('object');
        expect(body).to.be.have.property('error');
        expect(body.error).to.be.equal('last name field is required with min length of 3 and must be alphabet');
        done();
      });
  });

  it('Should return 400 if last name lenght less is than 2', (done) => {
    chai
      .request(app)
      .post(signupUrl)
      .send(invalidLastNameLength)
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.equal(400);
        expect(res.status).to.be.a('number');
        expect(body).to.be.an('object');
        expect(body).to.be.have.property('error');
        expect(body.error).to.be.equal('last name field is required with min length of 3 and must be alphabet');
        done();
      });
  });

  it('Should return 400 if Invalid last name format is entered', (done) => {
    chai
      .request(app)
      .post(signupUrl)
      .send(invalidLastNameCharacter)
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.equal(400);
        expect(res.status).to.be.a('number');
        expect(body).to.be.an('object');
        expect(body).to.be.have.property('error');
        expect(body.error).to.be.equal('last name field is required with min length of 3 and must be alphabet');
        done();
      });
  });

  it('Should return 400 if email is ommited', (done) => {
    chai
      .request(app)
      .post(signupUrl)
      .send(undefinedEmail)
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.equal(400);
        expect(res.status).to.be.a('number');
        expect(body).to.be.an('object');
        expect(body).to.be.have.property('error');
        expect(body.error).to.be.equal('Valid email field is required');
        done();
      });
  });

  it('Should return 400 if address length does not meet the minimum', (done) => {
    chai
      .request(app)
      .post(signupUrl)
      .send(invalidAddressLength)
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.equal(400);
        expect(res.status).to.be.a('number');
        expect(body).to.be.an('object');
        expect(body).to.be.have.property('error');
        expect(body.error).to.be.equal('Address field is required and should not be less than 25 characters');
        done();
      });
  });

  it('Should return 400 if Invalid Email Address is entered', (done) => {
    chai
      .request(app)
      .post(signupUrl)
      .send(invalidEmailCharacter)
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.equal(400);
        expect(res.status).to.be.a('number');
        expect(body).to.be.an('object');
        expect(body).to.be.have.property('error');
        expect(body.error).to.be.equal('Valid email field is required');
        done();
      });
  });

  it('Should return 409 if Email Address already exist', (done) => {
    chai
      .request(app)
      .post(signupUrl)
      .send(existingEmail)
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.equal(409);
        expect(res.status).to.be.a('number');
        expect(body).to.be.an('object');
        expect(body).to.be.have.property('error');
        expect(body.error).to.be.equal('User already exist');
        done();
      });
  });

  it('Should return 400  if Password field is omitted', (done) => {
    chai
      .request(app)
      .post(signupUrl)
      .send(undefinedPassword)
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.equal(400);
        expect(res.status).to.be.a('number');
        expect(body).to.be.an('object');
        expect(body).to.be.have.property('error');
        expect(body.error).to.be.equal('Password field is required with mininum 6 characters');
        done();
      });
  });

  it('Should return 400 if Password length does not meet the minimum', (done) => {
    chai
      .request(app)
      .post(signupUrl)
      .send(invalidPasswordLength)
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.equal(400);
        expect(res.status).to.be.a('number');
        expect(body).to.be.an('object');
        expect(body).to.be.have.property('error');
        expect(body.error).to.be.equal('Password field is required with mininum 6 characters');
        done();
      });
  });

  it('Should return 400 if address is omitted', (done) => {
    chai
      .request(app)
      .post(signupUrl)
      .send(emptyAddress)
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.equal(400);
        expect(res.status).to.be.a('number');
        expect(body).to.be.an('object');
        expect(body).to.be.have.property('error');
        expect(body.error).to.be.equal('Address field is required and should not be less than 25 characters');
        done();
      });
  });

  it('Should return 400 if email is empty', (done) => {
    chai
      .request(app)
      .post(signupUrl)
      .send(emptyEmail)
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.equal(400);
        expect(res.status).to.be.a('number');
        expect(body).to.be.an('object');
        expect(body).to.be.have.property('error');
        expect(body.error).to.be.equal('Valid email field is required');
        done();
      });
  });

  it('Should return 400 if firstName is empty', (done) => {
    chai
      .request(app)
      .post(signupUrl)
      .send(emptyFirstName)
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.equal(400);
        expect(res.status).to.be.a('number');
        expect(body).to.be.an('object');
        expect(body).to.be.have.property('error');
        expect(body.error).to.be.equal('First name field is required with min length of 3 and must be alphabet');
        done();
      });
  });

  it('Should return 400 if lastName is empty', (done) => {
    chai
      .request(app)
      .post(signupUrl)
      .send(emptyLastName)
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.equal(400);
        expect(res.status).to.be.a('number');
        expect(body).to.be.an('object');
        expect(body).to.be.have.property('error');
        expect(body.error).to.be.equal('last name field is required with min length of 3 and must be alphabet');
        done();
      });
  });
});
