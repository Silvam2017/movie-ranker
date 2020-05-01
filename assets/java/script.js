var userInput = document.querySelector('.test1')
var secondInput = document.querySelector('.test2')
var thirdInput = document.querySelector('.test3')

var titletest1El = document.querySelector('.title')
var scoretest1El = document.querySelector('.ratings')
var imgtest1El = document.querySelector('.image')
var directortestEl = document.querySelector('.director')

function test1() {
    fetch('https://www.omdbapi.com/?apikey=2acf9b30&t='  + userInput.value )
    .then(response => response.json())
    .then(data => {
        console.log(data)
        var title = data['Title'];
        var score = data['Ratings'][1]['Value'];
        var poster = data['Poster']

        titletest1El.innerHTML = title;
        scoretest1El.innerHTML = 'Rotten Tomatoes: ' + score;
        imgtest1El.setAttribute('src', poster)
    }) 
};

function test2() {
    let term = secondInput.value;
    fetch('https://content.guardianapis.com/search?q=' + secondInput.value + '&api-key=4298cb73-e3b3-4b9c-8183-aeceb09d2290')
    .then(response => response.json())
    .then(data =>
        console.log(data))
}

function test3() {
    let term = thirdInput.value;
    fetch('https://itunes.apple.com/search?term=' + term + '&entity=movie')
    
    .then(response => response.json())
    .then(data => {
        console.log(data)
        var director =data['results'][0]['artistName']
        directortestEl.innerHTML = director;
    });
    };