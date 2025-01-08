const { describe, it } = require('mocha');
const { expect } = require('chai');
const { app, server, addPet } = require('../index');
const chai = require('chai');
const chaiHttp = require('chai-http');
// In the test file
//const { createPetWithCondition } = require('../createPet');

const sinon = require('sinon');


chai.use(chaiHttp);

let baseUrl;

describe('Resource API', () => {
    before(async () => {
        const { address, port } = await server.address();
        baseUrl = `http://${address === '::' ? 'localhost' : address}:${port}`;
    });

    after(() => {
        return new Promise((resolve) => {
            server.close(() => {
                resolve();
            });
        });
    });

    let count = 0;

    describe("POST /add-pet", () => {
        // Test for valid data
        it('should add a new pet', (done) => {
            chai.request(baseUrl)
                .post('/add-pet')
                .send({
                    name: "Jacob",
                    type: "Dog",
                    age: 14,
                    breed: "Husky",
                    price: 1000,
                    gender: "Male",
                    picture: "images/Husky.png",
                })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body.message).to.equal("Pet added successfully");
                    //resourceId = res.body[res.body.length - 1].id; // Store the ID of the newly added resource
                    done();
                });
        });

        it('should return 400 if request body is missing', async () => {
            const res = await chai.request(app).post('/add-pet').send({});
            expect(res).to.have.status(400);
            expect(res.body.message).to.equal('All fields are required');
        });

        // Test for empty strings
        it("should return 400 when fields are empty", (done) => {
            chai.request(server)
                .post("/add-pet")
                .send({
                    name: "",
                    type: "",
                    age: "",
                    breed: "",
                    price: "",
                    gender: "",
                    picture: "",
                })
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body).to.have.property("message").eql("All fields are required");
                    done();
                });
        });

        it('should throw an error if name is missing', async () => {
            const res = await chai.request(app)
                .post('/add-pet')
                .send({ type: 'Dog', age: 3, breed: 'Labrador', price: 200, gender: 'Male', picture: 'url' });
            expect(res).to.have.status(400);
            expect(res.body.message).to.equal('All fields are required'); // Update the expected message
        });

        it('should throw an error if age is missing', async () => {
            const res = await chai.request(app)
                .post('/add-pet')
                .send({ name: 'Buddy', type: 'Dog' }); // Missing age

            expect(res).to.have.status(400);
            expect(res.body.message).to.equal('All fields are required'); // The expected error message
        });



    });

});
