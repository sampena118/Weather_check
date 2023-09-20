
var fetchButton = document.getElementById('inputss');

function getApi() {
  // fetch request gets a list of all the repos for the node.js organization
  var requestUrl1 = `https://weatherapi-com.p.rapidapi.com/current.json?q=SFO`;
  const options1 = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'a28dde1e3emsh3bf2c2a12bad6e6p194d4ejsn43b95fc44c05',
      'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'}
    }

    

  fetch(requestUrl1, options1)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
      console.log(data.location.lat)
      console.log(data.location.lon)

      const lat = data.location.lat
      const lon = data.location.lon

      var requestUrl2 = `https://webcamstravel.p.rapidapi.com/webcams/list/nearby=${lat},${lon},2?lang=en&show=webcams%3Aimage%2Clocation`;
    const options2 = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'fac8cc4252mshe891f4aa2e7f0e7p188561jsn273536b2823b',
        'X-RapidAPI-Host': 'webcamstravel.p.rapidapi.com'}
      }

      fetch(requestUrl2, options2)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
      
      
    });
      
    
      
    });
}

fetchButton.addEventListener('enter', getApi);
