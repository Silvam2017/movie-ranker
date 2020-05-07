//global variables attached to their HTML counterparts
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


//This function pulls the title, rating, poster image, and the youtube link from the IMDB fetch.
function test1() {
    fetch('https://www.omdbapi.com/?apikey=2acf9b30&t='  + userInputEl.value )
    .then(response => response.json())
    .then(data => {
        console.log(data)
        var title = data['Title'];
        var score = data['Ratings'][1]['Value'];
        var poster = data['Poster']
        var youtube = data['imdbID']
        
        //setting the fetch calls to html elements
        titleEl.innerHTML = title;
        ratingEl.innerHTML = 'Rotten Tomatoes: ' + score;
        posterEl.setAttribute('src', poster)
        posterEl.setAttribute('id', youtube)
        newPosterlink = posterEl.getAttribute('id')
    }) 
};


//this function takes the youtube link ID from the IMDB fetch in test1 and makes another fetch
//to IMDB to access the youtube link.
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


//This calls the guardian api with the searchword added by the user and filtered through the guardians tag film/films. From there the data arrives as an array
//a for loop accesses each of the article titles in the array as well as their respective links. The information is then assigned to a <li> with an <a> tag
//for the link and is dynamically generated when the user enters the title they wish to see.
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
        var url = data['response']['results'][i]['webUrl']
        console.log(url)
        var previousSerchEl = $('<li>'); 
        var linkClicker = $('<a href = ' + url + '>Click Here</a>')
        previousSerchEl.text( title )
        $('.guard-list').append(previousSerchEl)
        $('.guard-list').append(linkClicker)
       

    }
       guardianTitle.text("Checkout The Guardian for these articles that include your search word.")
       $('.guardian-title').append(guardianTitle)
    });
};


//Simple fetch call to grab the Director's name of any movie searched for by the user. 
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
      var toDoItem = $("<h4>");
      toDoItem.addClass("dynamic-click")
      toDoItem.text(search[i]);


    // Create a button with unique identifiers based on what number it is in the list.
    // Give your button a data attribute called data-search-do and a class called "checkbox".
    // Add a circle inside.
      var toSearchClose = $("<button>");

      toSearchClose.attr("data-search-do", [i]);
      toSearchClose.addClass("checkbox");
      toSearchClose.text("");

      //append the button to the to do item
      toDoItem = toDoItem.prepend(toSearchClose);

    // add the button and the toDoItem to the to-search div in html
      $("#to-search").append(toDoItem);
    }
  };

 
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

//this event listener is set to the parent element of each title the user saves to local storage, since the elements are dynamically generated the program
//cannot assign a listener to an item that doesnt exist on the page on load, this way wach time a new movie is added to local it is assigned an on-click
//event via its parent element. Once the click event is fired the user inputs saved movie fires each of the fetch functions again, bringing the user back
//to that movies information.
  $( "#to-search" ).on( "click", "h4", function( event ) {
    event.preventDefault();
   clickEl = document.querySelector('.dynamic-click')
  userInputEl.value = $(this).text()
  test1();
  test2();
  test3();
  bigTest();
  
  });
  
  $("#theModal").click(function() {
    $(".modal").addClass("is-active");  
  });
  
  $(".modal-close").click(function() {
     $(".modal").removeClass("is-active");
  });