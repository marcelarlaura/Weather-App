let button = document.querySelector('button');
let input = document.getElementById('search-bar');
let span = document.querySelector('.search-bar-span');
let loc = document.querySelector('.current-loc');
let date =document.querySelector('.current-date');
let temperature = document.querySelector('.current-temp');
let minTemp = document.querySelector('.minTemp');
let maxTemp = document.querySelector('.maxTemp');
let img = document.querySelector('img');


input.addEventListener('input', ()=>{
    if(!(input.value.match(/^[A-Za-z]+$/))){
        span.style.backgroundColor = 'red';
        span.textContent = 'Special characters ($%^&@!?/-=) nor numbers are allowed';
    } 
    if (input.value == ''){
        span.style.backgroundColor = 'red';
        span.textContent = 'Do not leave this field empty';
    }
    if (input.value.match(/^[A-Za-z]+$/)){
        span.style.backgroundColor = 'white';
        span.textContent = '';
    }
})

async function givenLocation(city){
    try{
        let url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/today?unitGroup=metric&key=MUBVBGDSWHC82R9W4ERRGKRH2&contentType=json`;
        const response = await fetch(url);
        const response2 = await response.json();
        loc.textContent = '⟟'+response2.resolvedAddress;
        date.textContent =  response2.days[0].datetime +' , '+ response2.currentConditions.datetime[0]+response2.currentConditions.datetime[1] + response2.currentConditions.datetime[2]+response2.currentConditions.datetime[3] + response2.currentConditions.datetime[4] + ' hrs ';
        temperature.textContent = response2.currentConditions.temp +' °C';
        minTemp.textContent = 'Range: '+ response2.days[0].tempmin +' °C / ';
        maxTemp.textContent = '  '+ response2.days[0].tempmax +' °C';
        console.log(response2);
    } catch {
        loc.textContent = 'Non-available location';
        date.textContent =  'Did you mean somewhere else?';
        temperature.textContent = 'Weather data not available';
    }
}

async function givenLocation2(city){
    try{
        let url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/today?unitGroup=metric&key=MUBVBGDSWHC82R9W4ERRGKRH2&contentType=json`;
        const response = await fetch(url);
        const response2 = await response.json();
        let search = response2.currentConditions.icon;
        try{
            let gif = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=O2FYvU8rEHqKUM7mY9wXLGm3Fv9QqBzH&s=${search}`, {mode: 'cors'});
            let gif2 = await gif.json();
            img.src =  gif2.data.images.original.url;
        } catch {
            console.log('Image not found');
        }

    }catch{
        console.log('Current weather condition not found');
    }
}

button.addEventListener('click', ()=>{
    if (input.value.match(/^[A-Za-z]+$/)){
        let city = input.value.toLowerCase();
        givenLocation(city);
        givenLocation2(city);
    }
})
