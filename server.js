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

app.get('/photos', getPhotos);

app.get('*', (request, response) => {
  response.status(404).send('That route does not exist.  Sorry. :(');
})

async function getPhotos(request, response) {
  let { query } = request.query;

  let URL = `https://api.unsplash.com/search/photos/?client_id=${process.env.UNSPLASH_API_KEY}&query=${query}`;
  try {
    let getPhoto = await axios.get(URL);
    //console.log(getPhoto.data.results);
    let photosToSend = getPhoto.data.results.map(photoObj => {
      return new Photo(photoObj);
    });

    response.status(200).send(photosToSend);
  }
  catch (error) {
    response.status(404).send('Unable to get photo');
  }
}


class Photo {
  constructor(photo) {
    this.artist = photo.user.name;
    this.image_url = photo.urls.raw;
    this.description = photo.description;
  }
}
