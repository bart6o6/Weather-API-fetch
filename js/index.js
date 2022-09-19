//var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
//var tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
//  return new bootstrap.Tooltip(tooltipTriggerEl)
//}) bootstrap popover
//document.getElementById("chem-comp-calculate").addEventListener('click', test);

async function test() {
  const api_url = 'https://api.open-meteo.com/v1/forecast?latitude=50.8498&longitude=16.4754&hourly=temperature_2m,rain&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,rain_sum&timezone=Europe%2FMoscow';



  var d = new Date();
  var next_day = d.getDate()+1;
  next_day = next_day.toString().padStart(2, '0');

  var curr_day = d.getDate().toString().padStart(2, '0');
 

  var curr_month = d.getMonth() + 1; //Months are zero based

  if (curr_month<10) {
    curr_month = "0"+curr_month
    
  }

  var curr_year = d.getFullYear();
  var curr_hour= d.getHours();
  if (d.getMinutes()>=30) {
   curr_hour+=1;
  }
  curr_hour= d.getHours().toString().padStart(2, '0')


  // function funcName(url){
    //const response = await fetch(url);
    //var data = await response.json();
    //}


   
      // Making an API call (request)
      // and getting the response back
      const response = await fetch(api_url);
   
      // Parsing it to JSON format
      const data = await response.json();
      //data.hourly.temperature_2m
     //console.log(data.hourly.time.indexOf(curr_year + "-" + curr_month + "-" + curr_day + "T" + curr_hour +":00"))
      // dupa.innerHTML = curr_year + "-" + curr_month + "-" + curr_day + "T" + curr_hour +":00";

     var todaySunrise = new Date(data.daily.sunrise[data.daily.time.indexOf(curr_year + "-" + curr_month + "-" + curr_day)]);
     var todaySunset = new Date(data.daily.sunset[data.daily.time.indexOf(curr_year + "-" + curr_month + "-" + curr_day)]);

      $("#title").text("Świdnica - pogoda na dzień: " + curr_day + "-" + curr_month + "-" + curr_year)

      $(".temperature > p").text("Aktualna temperatura: " + data.hourly.temperature_2m[data.hourly.time.indexOf(curr_year + "-" + curr_month + "-" + curr_day + "T" + curr_hour +":00")] + "°C")

      $(".temp-min > p").text("Temp. minimalna: " + data.daily.temperature_2m_min[data.daily.time.indexOf(curr_year + "-" + curr_month + "-" + curr_day)] + "°C")

      $(".temp-max > p").text("Temp. maksymalna: " + data.daily.temperature_2m_max[data.daily.time.indexOf(curr_year + "-" + curr_month + "-" + curr_day)] + "°C")

      $(".sunrise > p").text("Wschód słońca: " + todaySunrise.getHours()+":" + todaySunrise.getMinutes().toString().padStart(2, '0'));

      $(".sunset > p").text("Zachód słońca: " + todaySunset.getHours()+":" + todaySunset.getMinutes().toString().padStart(2, '0'));

currentDay_startIndex = data.hourly.time.indexOf(curr_year + "-" + curr_month + "-" + curr_day + "T" + curr_hour +":00");

$(".rain-sum > p").text("Suma opadów na dziś: " + data.hourly.rain.slice(currentDay_startIndex,currentDay_startIndex+24).reduce((a,b)=>a+b,0) + "mm");


//plotly start

var rain_today = data.hourly.rain.slice(currentDay_startIndex,currentDay_startIndex+24);
var temperatures_today = data.hourly.temperature_2m.slice(currentDay_startIndex,currentDay_startIndex+24)
var hours_today = data.hourly.time.slice(currentDay_startIndex,currentDay_startIndex+24)



var trace1 = {
  x: hours_today,
  y: rain_today,
  type: 'bar',
  name:'Rain'
};

var trace2 = {
  x: hours_today,
  y: temperatures_today,
  type: 'scatter',
  mode: 'lines+markers',
  name:'Temp'


/*
var trace1 = {
  x: data.hourly.time,
  y: data.hourly.rain,
  type: 'bar',
  name:'Rain'
};

var trace2 = {
  x: data.hourly.time,
  y: data.hourly.temperature_2m,
  type: 'scatter',
  mode: 'lines',
  name:'Temp'
*/
};

var data2 = [trace1, trace2];

Plotly.newPlot('tester', data2);
//plotly end


//console.log(data.hourly.time.indexOf(curr_year + "-" + curr_month + "-" + next_day + "T" + curr_hour +":00"));


      //$(".rain-sum > p").text("Suma opadów na dziś: " + todaySunset.getHours()+":" + todaySunset.getMinutes().toString().padStart(2, '0'));

      
      


        // Retrieving data from JSON
    /*const user = data.results[0];
    let { title, first, last } = user.name;
    let { gender, email, phone } = user;
    let image = user.picture.large;
    let image_icon = user.picture.thumbnail;
    let age = user.dob.age;
    let { city, state, country } = user.location;
 
    let fullName = title + ". " + first + " " + last;
    document.title = fullName;

    // Accessing the div container and modify/add
   

  var dupa = fetch()
  .then(response => {return response.json()})
  .then(json => console.log(json))
*/ 
 
}
test()