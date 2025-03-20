let button = document.querySelector('button');
let input = document.getElementById('search-bar');
let span = document.querySelector('.search-bar-span');
let loc = document.querySelector('.current-loc');
let date =document.querySelector('.current-date');
let temperature = document.querySelector('.current-temp');
let minTemp = document.querySelector('.minTemp');
let maxTemp = document.querySelector('.maxTemp');
let img = document.querySelector('img');
let condition = document.querySelector('.condition');
let section3 = document.querySelector('.section3');



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
        let now = new Date();
        let minutes = now.getMinutes();
        loc.textContent = '⟟'+response2.resolvedAddress;
        date.textContent =  response2.days[0].datetime +' , '+ response2.currentConditions.datetime[0]+response2.currentConditions.datetime[1] + response2.currentConditions.datetime[2]+ minutes + ' hrs ';
        temperature.textContent = response2.currentConditions.temp +' °C';
        minTemp.textContent = 'Range: '+ response2.days[0].tempmin +' °C / ';
        maxTemp.textContent = '  '+ response2.days[0].tempmax +' °C';
        condition.textContent = response2.currentConditions.conditions;
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
            img.src = 'sky.jpg';
        }

    }catch{
        console.log('Current weather condition not found');
    }
}


async function givenLocation3(city){

    try{
        let response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/today?unitGroup=metric&key=MUBVBGDSWHC82R9W4ERRGKRH2&contentType=json`);
        let response2 = await response.json();
        for (let i=0; i<12; i++){
            let div = document.createElement('div');
            div.textContent = response2.days[0].hours[i+1].temp + ' °C';
            section3.append(div);
        }
        
    } catch {
        for (let i=0; i<12; i++){
            let div = document.createElement('div');
            div.textContent = 'N/A';
            section3.append(div);
        }
    }
}




button.addEventListener('click', ()=>{
    if (input.value.match(/^[A-Za-z]+$/)){
        let city = input.value.toLowerCase();
        givenLocation(city);
        givenLocation2(city);
        givenLocation3(city);
        
    }
})
