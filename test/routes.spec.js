const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../app.js');
chai.use(chaiHttp);
const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)
pry = require('pryjs')

describe('Food Endpoints', () => {
  before((done) => {
    database.migrate.latest()
    .then(() => done())
    .catch((error) => {
      throw error
    })
    .done()
  })

  beforeEach((done) => {
    database.seed.run()
    .then(() => done())
    .catch((error) => {
      throw error
    })
    .done()
  })

  describe('GET /api/v1/foods', function() {
    this.timeout(0);
    it("returns all foods", () => {
      return chai.request(server)
      .get('/api/v1/foods')
      .then((response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.should.be.a('object');
        response.body.length.should.equal(2)
        response.body[0].should.have.property('name')
      })
    })
  })

  describe('GET /api/v1/foods/:id', function() {
    it("returns foods based on id", () => {
      return chai.request(server)
      .get('/api/v1/foods/1')
      .then((response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.should.be.a('object');
        response.body[0].should.have.property('id');
        response.body[0].should.have.property('name');
        response.body[0].should.have.property('calories');
      })
    })
  })
})

describe('Meal Endpoints', function(){
  before((done) => {
    database.migrate.latest()
    .then(() => done())
    .catch((error) => {
      throw error
    })
    .done()
  })

  beforeEach((done) => {
    database.seed.run()
    .then(() => done())
    .catch((error) => {
      throw error
    })
    .done()
  })

  describe("GET /api/v1/meals", function() {
    it('should return all 4 meals', function() {
      return chai.request(server)
      .get('/api/v1/meals')
      .then((response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.should.be.a('object');
        response.body.length.should.equal(4);
        response.body[0].should.have.property('id');
        response.body[0].should.have.property('name');
        response.body[0].should.not.have.property('created_at');
        response.body[0].name.should.equal("Breakfast");
      })
      .catch((error) => {
        throw error
      })
    })
  })
  
  it('should return 404 if unknown path', function() {
    return chai.request(server)
    .get('/escargot')
    .then((response) => {
      response.should.have.status(404);
    })
    .catch((error) => {
      throw error
    })
  })
})
