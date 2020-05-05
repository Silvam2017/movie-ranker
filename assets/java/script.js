
userInputEl = document.querySelector('.userInput');
titleEl= document.querySelector('.title');
posterEl= document.querySelector('.poster');
ratingEl= document.querySelector('.ratings');
directorEl= document.querySelector('.director');
linktagEl = document.querySelector('.linktag');
guardianEl = document.querySelector('.guard-list');
guardiantitleEl = document.querySelector('.guardian-title')

var input = document.getElementById("search-do");
var search = JSON.parse(localStorage.getItem("todosearch")) || [];

// this eventlistener allows the user to submit a search with the "Enter" key
input.addEventListener("keyup", function(event)
    {
        if (event.keyCode == 13)
        {
            event.preventDefault();
            document.getElementById("add-search-do").click();
        }
    });

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
    
    fetch('https://content.guardianapis.com/search?q=' + userInputEl.value + '&format=json&tag=film/film,tone/reviews&api-key=4298cb73-e3b3-4b9c-8183-aeceb09d2290')
    .then(response => response.json())
    .then(data =>{
        console.log(data)
        guardianEl.innerHTML = ''
        guardiantitleEl.innerHTML = ''
        var list = data['response']['results']
        var guardianTitle = $('<h2>');
        for(i = 0; i < list.length; i++){
        var title = data['response']['results'][i]['webTitle']
        console.log(title)
        var previousSerchEl = $('<li>'); 
        previousSerchEl.text( title )
        $('.guard-list').append(previousSerchEl)
       }
       guardianTitle.text("Checkout The Guardian for these articles that include your search word.")
       $('.guardian-title').append(guardianTitle)
       //guardianTitle.setAttribute("src", "https://www.theguardian.com/us")
    });
};


function test3() {
    fetch('https://itunes.apple.com/search?term=' + userInputEl.value + '&entity=movie')
    
    .then(response => response.json())
    .then(data => {
        console.log(data)
        var director =data['results'][0]['artistName']
        directorEl.innerHTML = director;
    });
    };

//search history function
function renderSearch(search) {
    $("#to-search").empty(); // empties out the html

    // render our searches to the page
    for (var i = 0; i < search.length; i++) 
    {

      //create a new variable that will hold a <p> tag
      // then set the add-search-do value as text to this <p> element 
      var toDoItem = $("<p>");
      toDoItem.text(search[i]);


    // Create a button with unique identifiers based on what number it is in the list.
    // Give your button a data attribute called data-search-do and a class called "checkbox".
    // Add a circle inside.
      var toSearchClose = $("<button>");

      toSearchClose.attr("data-search-do", [i]);
      toSearchClose.addClass("checkbox");
      toSearchClose.text("°");

      //append the button to the to do item
      toDoItem = toDoItem.prepend(toSearchClose);

    // add the button and the toDoItem to the to-search div in html
      $("#to-search").append(toDoItem);

    }
  }

 
  $("#add-search-do").on("click", function(event) {
    event.preventDefault();

    // get value from textbox and store it as a variable
    var toDoTask = $("#search-do")
      .val()
      .trim();

    // adding our new search-do to our local search and adding to local storage
    search.push(toDoTask);

    //Update the to-search on the page
    renderSearch(search);

    // save the to-search into local storage convert from an array into a string
    localStorage.setItem("todosearch", JSON.stringify(search));

    //clear the textbox when done
    $("#search-do").val("");
  });

// clicking on cirle deletes search item
  $(document).on("click", ".checkbox", function() {

     var toDoNumber = $(this).attr("data-search-do");

    search.splice(toDoNumber, 1);

    renderSearch(search);

    localStorage.setItem("todosearch", JSON.stringify(search));
  });

  // render search history on page
  renderSearch(search);