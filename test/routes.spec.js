const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../app.js');
chai.use(chaiHttp);
const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)
pry = require('pryjs')

describe('Food Endpoints', function() {
  this.timeout(0);
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
    it("returns all foods", () => {
      return chai.request(server)
      .get('/api/v1/foods')
      .then((response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.should.be.a('object');
        response.body.length.should.equal(3)
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

  describe('POST /api/v1/foods', function() {
    it("creates a new food", () => {
      return chai.request(server)
      .post('/api/v1/foods')
      .send({food: { name: "twinkies", calories: 1000}})
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

  describe('PATCH /api/v1/foods', function() {
    it("updates a food", () => {
      return chai.request(server)
      .patch('/api/v1/foods/1')
      .send({food: { name: "Mint", calories: 2}})
      .then((response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.should.be.a('object');
        response.body[0].should.have.property('id');
        response.body[0].id.should.equal(1);
        response.body[0].should.have.property('name');
        response.body[0].name.should.equal('Mint');
        response.body[0].should.have.property('calories');
        response.body[0].calories.should.equal(2);
      })
    })
  })

  describe('DELETE /api/v1/foods/:id', function() {
    it('deletes a food', () => {
      return chai.request(server)
      .delete('/api/v1/foods/1')
      .then((response) => {
        response.status.should.equal(204);
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
      this.timeout(0);
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
        response.body[0].name.should.equal('Breakfast');
      })
      .catch((error) => {throw error})
    })
  })

  describe('GET /api/v1/meals/:meal_id/foods', function() {
      this.timeout(0);
    it('returns all foods associated with meal', function() {
      return chai.request(server)
      .get('/api/v1/meals/1/foods')
      .then((response) => {
        response.should.have.status(200);
        response.body.length.should.equal(1);
        response.body[0].id.should.equal(1);
        response.body[0].name.should.equal('Breakfast');
        response.body[0].should.have.property('foods');
        response.body[0].foods.length.should.equal(2);
        response.body[0].foods[0].id.should.equal(1);
        response.body[0].foods[0].name.should.equal('Quinoa');
        response.body[0].foods[0].calories.should.equal(10);
      })
    })
  })

  describe('POST /api/v1/meals/:meal_id/foods/:id', function() {
    this.timeout(0);
    it('creates a new association between a food and a meal', function() {
      return chai.request(server)
      .post('/api/v1/meals/4/foods/3')
      .then((response) => {
        response.should.have.status(200);
        response.body.message.should.equal("Successfully added Chocolate Chips to Dinner")
      })
    })
  })

  describe('DELETE /api/v1/meals/:meal_id/foods/:id', function() {
    this.timeout(0);
    it('deletes an association between a food and a meal', function() {
      return chai.request(server)
      .delete('/api/v1/meals/4/foods/3')
      .then((response) => {
        response.should.have.status(200);
        response.body.message.should.equal("Successfully removed Chocolate Chips from Dinner")
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
