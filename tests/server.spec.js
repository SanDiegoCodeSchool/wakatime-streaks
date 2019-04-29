'use strict';
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server/server');

chai.use(chaiHttp);
const expect = chai.expect;

describe('the server module', function() {

  it('responds to get request to /', (done) => {
    chai.request(server)
      .get('/')
      .end((err, res) => {
        expect(err).not.exist;
        expect(res).to.have.status(200);
        done();
      });
  });

  it('responds with html', (done) => {
    chai.request(server)
      .get('/')
      .end((err, res) => {
        expect(err).not.exist;
        expect(res).to.be.html;
        done();
      });
  });

  it('responds to get request to /login', (done) => {
    chai.request(server)
      .get('/login')
      .end((err, res) => {
        expect(err).not.exist;
        expect(res).to.have.status(200);
        done();
      });
  });

  it('login responds with html', (done) => {
    chai.request(server)
      .get('/login')
      .end((err, res) => {
        expect(err).not.exist;
        expect(res).to.be.html;
        done();
      });
  });

  it('responds to get request to /signup', (done) => {
    chai.request(server)
      .get('/signup')
      .end((err, res) => {
        expect(err).not.exist;
        expect(res).to.have.status(200);
        done();
      });
  });

  it('signup responds with html', (done) => {
    chai.request(server)
      .get('/signup')
      .end((err, res) => {
        expect(err).not.exist;
        expect(res).to.be.html;
        done();
      });
  });

  it('responds to get request to /userEdit', (done) => {
    chai.request(server)
      .get('/userEdit')
      .end((err, res) => {
        expect(err).not.exist;
        expect(res).to.have.status(200);
        done();
      });
  });

  it('userEdit responds with html', (done) => {
    chai.request(server)
      .get('/userEdit')
      .end((err, res) => {
        expect(err).not.exist;
        expect(res).to.be.html;
        done();
      });
  });

  it('responds to get request to /privacy', (done) => {
    chai.request(server)
      .get('/privacy')
      .end((err, res) => {
        expect(err).not.exist;
        expect(res).to.have.status(200);
        done();
      });
  });

  it('privacy responds with html', (done) => {
    chai.request(server)
      .get('/privacy')
      .end((err, res) => {
        expect(err).not.exist;
        expect(res).to.be.html;
        done();
      });
  });

});