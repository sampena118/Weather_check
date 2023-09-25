
var inputEl = document.getElementById('inputss');
var formEl = document.getElementById('form');

function getApi(e) {
  e.preventDefault();
  const inputValue = inputEl.value
  console.log({ inputValue })
  // fetch request gets a list of all the repos for the node.js organization
  var requestUrl1 = `https://weatherapi-com.p.rapidapi.com/current.json?q=${inputValue}`;
  const options1 = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'a28dde1e3emsh3bf2c2a12bad6e6p194d4ejsn43b95fc44c05',
      'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
    }
  }



  fetch(requestUrl1, options1)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
      console.log(data.location.lat)
      console.log(data.location.lon)
      
      const cityname = document.getElementById('city');
      const displayname = document.createTextNode(data.location.name)
      cityname.innerHTML = ''
      cityname.appendChild(displayname);

      const temp = document.getElementById('temp');
      const displaytemp = document.createTextNode("Temp in F "+data.current.temp_f)
      temp.innerHTML = ''
      temp.appendChild(displaytemp);

      const wind = document.getElementById('wind');
      const displaywind = document.createTextNode("Windspeed MPH "+data.current.wind_mph)
      wind.innerHTML = ''
      wind.appendChild(displaywind);

      const wind_dir = document.getElementById('wind_dir');
      const displaywind_dir = document.createTextNode("Wind Direction "+data.current.wind_dir)
      wind_dir.innerHTML = ''
      wind_dir.appendChild(displaywind_dir);

      const condition = document.getElementById('condition');
      const displaycondition = document.createTextNode("Current Condition "+data.current.condition.text)
      condition.innerHTML = ''
      condition.appendChild(displaycondition);

      const last_updated = document.getElementById('last_updated');
      const displaylast_updated = document.createTextNode("Last updated "+data.current.last_updated)
      last_updated.innerHTML = ''
      last_updated.appendChild(displaylast_updated);

      const lat = data.location.lat
      const lon = data.location.lon

      var requestUrl2 = `https://webcamstravel.p.rapidapi.com/webcams/list/nearby=${lat},${lon},2?lang=en&show=webcams%3Aimage%2Clocation`;
      const options2 = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': 'fac8cc4252mshe891f4aa2e7f0e7p188561jsn273536b2823b',
          'X-RapidAPI-Host': 'webcamstravel.p.rapidapi.com'
        }
      }

      fetch(requestUrl2, options2)
        .then(function (response) {
          return response.json();
        })
      
        .then(function (data) {
          console.log(data);

          const image = document.createElement('img');

          image.setAttribute(
            'src',
            data.result.webcams[0].image.current.preview,
          );

          image.setAttribute('alt', 'Webcam Image');
          image.setAttribute('height', 350); // 👈️ height in px
          image.setAttribute('width', 550); // 👈️ width in px

          image.onerror = function handleError() {
            console.log('Image could not be loaded');

            // 👇️ Or hide image
            // image.style.display = 'none';
          };

          image.onload = function handleImageLoaded() {
            console.log('image loaded successfully');
          };


          const FirstImage = document.getElementById('FirstImage');
          FirstImage.innerHTML = '';
          FirstImage.appendChild(image);
          
          const searchedCitiesArr = JSON.parse(localStorage.getItem("searchedCities")) || [];
          searchedCitiesArr.push(inputValue);

          const removeDuplicates = [...new Set(searchedCitiesArr)];

          localStorage.setItem("searchedCities", JSON.stringify(removeDuplicates));

          const resultsHistDisplay = document.getElementById('searchResults');
          
          if (removeDuplicates.length > 0 ) {
            resultsHistDisplay.textContent = removeDuplicates.join(', ');
          } else {
            resultsHistDisplay.textContent = 'No previous searches';
          }
          
        }); 

    });
};

formEl.addEventListener('submit', getApi);
