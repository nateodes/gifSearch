// Create Topics array

const topics = ["Kenny Powers", "South Park", "The Office", "Friends", "puppies", "boss", "kittens", "golf", "whoops"]

//create on click function to handle event 
$(".gifSearch").on("click", function(event) {
        event.preventDefault();
        
        //Add new topic to array
        let newTopic = $("#search").val().trim();
        
        if (newTopic === "") {
          return
        }

        topics.push(newTopic);
        renderButtons();
      });

// Create function to show buttons on the page      
function renderButtons() {
        
        $(".gifButtons").empty();
        for (let i = 0; i < topics.length; i++) {
          let gifButton = $("<button>");
              gifButton.addClass("btn-sm btn-info");
              gifButton.attr({ "data-name": topics[i] });
              gifButton.html(topics[i]);
              $(".gifButtons").append(gifButton);

        }
      }

//When document loads show buttons       
$(document).ready(renderButtons()) 
	


//Clearing the div when user clicks clear
$("#clear").on("click", function () {
	$("#gifBin").empty();
})

//Using document.body lets any newly created search button handle the same as buttons rendered on load

$(document.body).on("click", ".btn-sm", function () {
        
        let searchGif = ($(this).attr("data-name"));
        //Take searchGif variable and insert into url for ajax call 
        let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchGif + "&limit=10&rating=pg&rating=g&sort=recent&api_key=dc6zaTOxFJmzC";  
        
        $.ajax({
                url: queryURL,
                method: "GET"
                  }).done(function(response) {
        let results = response.data;
       //loop through results creating a div for each result
        for (let i = 0; i < results.length; i++) {
            
            let gifDiv = $("<div class='item'><span class='rating'>");
            let rating = results[i].rating;
            let personImage = $("<img class='gif'>");
            
            personImage.attr("data-still", results[i].images.original_still.url);
            gifDiv.prepend(personImage);
            $("#gifBin").prepend(gifDiv);
            personImage.attr("data-animate", results[i].images.original.url)
          
            personImage.attr("src", results[i].images.original_still.url);

          }
        
    });



});


//Function to change the state for each GIF from playing to paused and reverse
$(document.body).on("click", ".gif", function() {

	
	let state = $(this).attr("data-state");

            if (state === "still") {
		        console.log("I've been clicked")
		        $(this).attr("src", $(this).attr("data-animate"));

		        $(this).attr("data-state", "animate");
		      } else {
		        $(this).attr("src", $(this).attr("data-still"));
		        $(this).attr("data-state", "still");
		      }
          });
