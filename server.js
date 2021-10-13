'use-strict'

//Boilerplate
//Axios
const axios = require('axios');
//Express server
const express = require('express');
//.env file
require('dotenv').config();

//CORS: Security
const cors = require('cors');
const { request } = require('express');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log('Listening on Port:', PORT));

//Setting the root route
app.get('/', (request, response) => {
  response.send('Greetings from the SMASH server');
});
//End Boilerplate
const smashArr = [
  { name: 'Ness', game: 'Earthbound', rating: 'Awesome', misc: 'Stuff' },
  { name: 'Link', game: 'Legend of Zelda', rating: 'Great', misc: 'Stuff' },
  { name: 'Mario', game: 'SMB', rating: 'Cool', misc: 'Stuff' },
  { name: 'Terry Bogard', game: 'King of Fighters', rating: 'Swell', misc: 'Stuff' }
]

app.get('/allGames', getAllGames);
//Some status are: 200 OK  300 Further action  400 Bad Request (404 -not found)
app.get('/captainfalcon', (request, response) => response.json({ name: 'Captain Falcon', Game: 'F-Zero' }));

app.get('/photos', getPhotos);

app.get('*', (request, response) => {
  response.status(404).send('That route does not exist.  Sorry. :(');
})

async function getPhotos(request, response) {
  let sampleQuery = 'cats'
  let { query } = request.query;

  let URL = `https://api.unsplash.com/search/photos/?client_id=${process.env.UNSPLASH_API_KEY}&query=${query}`;
  try {
    let getPhoto = await axios.get(URL);
    console.log(getPhoto.data);
    response.status(200).send(getPhoto.data);
  }
  catch (error) {
    response.status(404).send('Unable to get photo');
  }
}
function getAllGames(request, response) {
  //See Query params
  console.log('req query:', request.query.lat);

  //Shape the response data
  const allGamesArr = smashArr.map(character => {
    return { name: character.name, game: character.game }
  });

  //send it to the requestor (client)
  response.status(200).send(allGamesArr);

}
