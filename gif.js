// Set Globals  ---------------------------------------------------

// The public beta key is "dc6zaTOxFJmzC”


var topics = ["Kenny Powers", "South Park", "baseball", "baskeball", "football", "hockey", "olympics", "golf", "curling"]

$(".gifSearch").on("click", function(event) {
        event.preventDefault();
        
        var newTopic = $("#search").val().trim();
        
        topics.push(newTopic);
        renderButtons();
      });

function renderButtons() {
        
        $(".gifButtons").empty();
        for (var i = 0; i < topics.length; i++) {
          var gifButton = $("<button>");
              gifButton.addClass("btn-sm btn-d btn-info");
              gifButton.attr({ "data-name": topics[i] });
              gifButton.html(topics[i]);
              $(".gifButtons").append(gifButton);

        }
      }

renderButtons();










$(document.body).on("click", ".btn-sm", function() {
		var searchGif = ($(this).attr("data-name"));
		// var newGif = $("#email").val().trim();
        // URL
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchGif + "&limit=10&rating=pg&rating=g&sort=recent&api_key=dc6zaTOxFJmzC";  
        
        $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {
        console.log(response.data[0].embed_url);
        var results = response.data;
          for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div class='item'><span class='rating'>");
            var rating = results[i].rating;
            // var p = $("<span class='rating'>").text("Rating: " + rating);
            var personImage = $("<img class='gif'>");
            
            personImage.attr("data-still", results[i].images.original_still.url);
            // $(".rating").text(rating);
            gifDiv.prepend(personImage);
            // $(".newDiv").append(p);
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