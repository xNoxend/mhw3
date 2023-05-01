

function getOpenAI(){
  const prompt = document.querySelector('#prompt');
  const apikey = "4a040da052msh3cfd5e6d7dad317p1f274ajsn1a42115b9daa";

  const options = {
      method: 'POST',
      headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': `${apikey}`,
          'X-RapidAPI-Host': 'chatgpt-api6.p.rapidapi.com'
      },
      body: JSON.stringify({
          conversation: [{"role":"user","content": `Che sapore ha la birra con nome: ${prompt.value}`}]
      })
  };

  fetch('https://chatgpt-api6.p.rapidapi.com/standard-gpt', options)
  .then(response => {
      if (!response.ok) {
        throw new Error("Errore nel recupero dei dati");
      }
      return response.json();
    })
    .then(data => {
      console.log("Risposta: " + data.answer.content);
      document.querySelector('#results').innerText = data.answer.content    
    })
    .catch(error => {
      console.error("Si è verificato un errore:", error);
    });
}


const clientId = 'e90c42c94365498b9a02cfc60d7885ed';
const clientSecret = '4fe417c59e8b497a8e28988d8caac24e';

const tokenUrl = 'https://accounts.spotify.com/api/token';
const searchUrl = 'https://api.spotify.com/v1/search';

const form = document.querySelector('form');
const resultsSong = document.querySelector('#results-song');

async function getToken() {
  const response = await fetch(tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
    },
    body: 'grant_type=client_credentials'
  });

  const data = await response.json();
  return data.access_token;
}

async function searchSongs(query) 
{
  resultsSong.innerHTML = '';

  const token = await getToken();

  const response = await fetch(`${searchUrl}?q=${query}&type=track&market=IT`, {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  });

  const data = await response.json();

  const songs = data.tracks.items;

  songs.forEach((song, index) => {
    console.log(`${index + 1}. ${song.name} - ${song.artists[0].name}`);

    const p = document.createElement('p');
    const audio = document.createElement('audio');
    audio.controls = true;
    audio.src = song.preview_url;

    p.innerHTML = `${index + 1}. ${song.name} - ${song.artists[0].name}`;
    p.appendChild(audio);

    resultsSong.appendChild(p);
  });

}





form.addEventListener('submit', (event) => 
{
  event.preventDefault();
  const query = document.querySelector('#song').value;
  searchSongs(query);
});

const gpt = document.querySelector('#cercagpt');
gpt.addEventListener('click', getOpenAI)


