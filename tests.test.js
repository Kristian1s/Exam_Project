const cheerio = require('cheerio');
const express = require("express");
const request = require("supertest");
const session = require("supertest-session");
const { writeDataToDb } = require("./public/javascripts/CollectData/InsertDataToDb");


const genreRouter = require('./routes/genre');
const indexRouter = require("./routes/index");
const topRatedRouter = require("./routes/topRated");
const movieRouter = require("./routes/movie");
const profileRouter = require("./routes/profile");
const app = require("./app")

app.use("/", indexRouter);
app.use("/genre",genreRouter)
app.use("/topRated",topRatedRouter)
app.use("/movie",movieRouter)
app.use("/profile",profileRouter)

describe("Testing Apicalls and then DB DataInsert", () => {
  test("should log console messages", async () => {
   
    const originalConsoleLog = console.log;

    const consoleLogMock = jest.fn();

    console.log = consoleLogMock;

    await writeDataToDb();

    expect(consoleLogMock).toHaveBeenCalledWith("---Genres added to database---");
    expect(consoleLogMock).toHaveBeenCalledWith("---Years added to database---");
    expect(consoleLogMock).toHaveBeenCalledWith("---Directors added to database---");
    expect(consoleLogMock).toHaveBeenCalledWith("---Actors added to database---");
    expect(consoleLogMock).toHaveBeenCalledWith("---Ratings added to database---");
    expect(consoleLogMock).toHaveBeenCalledWith("---Movies added to database---");
    expect(consoleLogMock).toHaveBeenCalledWith("---Movie Actors added to database---");
    expect(consoleLogMock).toHaveBeenCalledWith("---Movie Genres added to database---");

    console.log = originalConsoleLog;
  });
  //Alot happens in this function so time set for added security
},7000);


 describe("Testing index", () => {
  test("GET / - success", async () => {
    const response = await request(app).get("/");
    expect(response.body).toBeDefined();
    expect(response.status).toEqual(200);

    const $ = cheerio.load(response.text);
    
    const title = $('title').text();
    expect(title).toEqual("MovieVault");
    const top10Elements = $('.card');
    expect(top10Elements.length).toBe(10); 
  });
});

 


describe("Testing genreRoute", () => {
  test("GET /genre - success", async () => {
    const response = await request(app).get("/genre");
    expect(response.body).toBeDefined();
    expect(response.status).toEqual(200);

    const $ = cheerio.load(response.text);
    
    const title = $('title').text();
    expect(title).toEqual("MovieVault");
  });
});

 describe("Testing TopRated route", () => {
  test("GET /topRated - success", async () => {
    const response = await request(app).get("/topRated");
    expect(response.body).toBeDefined();
    expect(response.status).toEqual(200);

    const $ = cheerio.load(response.text);
    
    const title = $('title').text();
    expect(title).toEqual("MovieVault");

    const topRated = $('.td-cards');
    expect(topRated.length).toBeGreaterThan(200); 
  });
}); 



describe("Testing movie route", () => {
  test("GET /:movie - success", async () => {
    const response = await request(app).get("/movie/The%20Shawshank%20Redemption");
    expect(response.body).toBeDefined();
    expect(response.status).toEqual(200);

    const $ = cheerio.load(response.text);
    
    const title = $('title').text();
    expect(title).toEqual("MovieVault");

    const infoDiv = $('.info');

    const posterValue = infoDiv.find('.posterMovie img').attr('src');
    expect(posterValue).toBeDefined();
    expect(posterValue).not.toBe('');
    
    const titleValue = infoDiv.find('.contentMovie h1').text();
    expect(titleValue).not.toBe('');
  
  });
});
 

describe("Testing ProfileRoute", () => {
  test("GET /profile - success", async () => {
    const response = await request(app).get("/profile");
    expect(response.body).toBeDefined();
    expect(response.status).toEqual(200);
  })
}) 



describe("Profile route security redirect to login", () => {
  let testSession;

  beforeAll(() => {
    testSession = session(app); 
  });

  test("POST /profile - Trying to make a profile without being authenticated", async () => {
    await testSession.post("/login").send({
      username: "testuser",
      password: "testpassword",
    });
    const response = await testSession.post("/profile").send({
      FormData: {
        nickname: "TestNickname",
        age: 25,
        bio: "Test bio",
        avatar: "test.jpg",
      },
    });

    expect(response.status).toEqual(302);
    expect(response.header['location']).not.toEqual(`/profile/testuser`);
  });
  afterAll(() => {
    testSession.destroy(); 
  });
});






  

