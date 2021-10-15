/// <reference types="cypress" />
let id;
let firstName;
let lastName;

it("should create a user and extract its id", () => {
  cy.request({
    method: "POST",
    url: "/",
    body: {
      name: "Tala",
      job: "QA",
    },
  }).then((response) => {
    id = response.body.id;
    console.log("The returned id is " + id);
    expect(response.body.name).to.eq("Tala");
    expect(response.body.job).to.eq("QA");
    expect(response.status).to.eq(201);
  });
});

it("should get user data", () => {
  cy.request({
    method: "GET",
    url: "/7",
  }).then((response) => {
    firstName = response.body.data.first_name;
    lastName = response.body.data.last_name;
    console.log("The user with ID #7 is " + firstName + " " + lastName);
    expect(response.status).to.eq(200);
  });
});
it("should return error when requesting a non existing id", () => {
  cy.request({
    method: "GET",
    url: "/872382",
    failOnStatusCode: false,
  }).then((response) => {
    expect(response.status).to.eq(404);
  });
});
