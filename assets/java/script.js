
userInputEl = document.querySelector('.userInput')
titleEl= document.querySelector('.title')
posterEl= document.querySelector('.poster')
ratingEl= document.querySelector('.ratings')
directorEl= document.querySelector('.director')
linktagEl = document.querySelector('.linktag')

function test1() {
    fetch('https://www.omdbapi.com/?apikey=2acf9b30&t='  + userInputEl.value )
    .then(response => response.json())
    .then(data => {
        console.log(data)
        var title = data['Title'];
        var score = data['Ratings'][1]['Value'];
        var poster = data['Poster']
        var youtube = data['imdbID']

        titleEl.innerHTML = title;
        ratingEl.innerHTML = 'Rotten Tomatoes: ' + score;
        posterEl.setAttribute('src', poster)
        posterEl.setAttribute('id', youtube)
        newPosterlink = posterEl.getAttribute('id')
    }) 
};



function bigTest(){
    console.log('howdily doodily')
    fetch('https://imdb-api.com/en/API/YouTubeTrailer/k_xGWs0T08/' + newPosterlink)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        videoURL = data['videoUrl']
        linktagEl.setAttribute('href', videoURL)
    })
}

function test2() {
    
    fetch('https://content.guardianapis.com/search?q=' + userInputEl.value + '&api-key=4298cb73-e3b3-4b9c-8183-aeceb09d2290')
    .then(response => response.json())
    .then(data =>
        console.log(data))
}


function test3() {
    fetch('https://itunes.apple.com/search?term=' + userInputEl.value + '&entity=movie')
    
    .then(response => response.json())
    .then(data => {
        console.log(data)
        var director =data['results'][0]['artistName']
        directorEl.innerHTML = director;
    });
    };