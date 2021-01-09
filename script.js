const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

function toggleButton() {
  button.disabled = !button.disabled;
}

function sendToSpeech(joke) {
  VoiceRSS.speech({
    key: '40292ee9f1994e62ad9594b0c1ec7576',
    src: joke,
    hl: 'en-us',
    v: 'Linda',
    r: 0,
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false,
  });
}

async function getJokes() {
  let joke = '';
  const apiUrl = 'https://v2.jokeapi.dev/joke/Programming';
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.setup) {
      joke = `${data.setup}... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    sendToSpeech(joke);
    toggleButton();
  } catch (error) {
    console.log('Joke API Error: ', error);
  }
}

button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);
