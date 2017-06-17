// Set Globals  ---------------------------------------------------

// The public beta key is "dc6zaTOxFJmzC”


var topics = ["baseball", "baskeball", "football", "hockey", "olympics", "golf", "curling"]

$(".gifSearch").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var newTopic = $("#search").val().trim();
        // var newButton = $("<button>");
        // newButton.addClass("btn-sm");
        // newButton.html(newTopic);
        // newButton.attr({ "data-name": newTopic });
        topics.push(newTopic);
        // Calling renderButtons which handles the processing of our movie array
        renderButtons();
      });

function renderButtons() {
        // Deleting the movie buttons prior to adding new movie buttons
        // (this is necessary otherwise we will have repeat buttons)
        $(".gifButtons").empty();
        // Looping through the array of movies
        for (var i = 0; i < topics.length; i++) {
          var gifButton = $("<button>");
              gifButton.addClass("btn-sm");
              gifButton.attr({ "data-name": topics[i] });
              gifButton.html(topics[i]);
              $(".gifButtons").append(gifButton);

        }
      }

renderButtons();








// for (var i = 0; i < topics.length; i++) {
//             var gifButton = $("<button>");
//               gifButton.addClass("btn-sm");
//               gifButton.attr({ "data-name": topics[i] });
//               gifButton.html(topics[i]);
//               $(".gifButtons").append(gifButton);
//           }
// Set Functions--------------------------------------------------

$(document.body).on("click", ".btn-sm", function() {
		var searchGif = ($(this).attr("data-name"));
		// var newGif = $("#email").val().trim();
        // URL
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchGif + "&api_key=dc6zaTOxFJmzC";  
        
        $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {
        console.log(response.data[0].embed_url);
        var results = response.data;
          for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div class='item'>");
            var rating = results[i].rating;
            var p = $("<p>").text("Rating: " + rating);
            var personImage = $("<img class='gif'>");
            
            personImage.attr("data-still", results[i].images.original_still.url);
            gifDiv.prepend(p);
            gifDiv.prepend(personImage);
            $("#gifBin").prepend(gifDiv);
            // personImage.attr("data-state", "still");
            // gifDiv.attr("data-state", "still");
            personImage.attr("data-animate", results[i].images.original.url)
          
            personImage.attr("src", results[i].images.original_still.url);

          }
        
    });



});

$(document.body).on("click", ".gif", function() {

	
	var state = $(this).attr("data-state");

            if (state === "still") {
		        console.log("I've been clicked")
		        $(this).attr("src", $(this).attr("data-animate"));

		        $(this).attr("data-state", "animate");
		      } else {
		        $(this).attr("src", $(this).attr("data-still"));
		        $(this).attr("data-state", "still");
		      }
          })

//