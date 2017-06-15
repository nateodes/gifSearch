// Set Globals  ---------------------------------------------------

// The public beta key is "dc6zaTOxFJmzC”


var topics = ["baseball", "baskeball", "football", "hockey", "olympics", "golf", "curling"]



for (var i = 0; i < topics.length; i++) {
            var gifButton = $("<button>");
              gifButton.addClass("btn-sm");
              gifButton.attr({ "data-name": topics[i] });
              gifButton.html(topics[i]);
              $(".gifButtons").append(gifButton);
          }
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
            var personImage = $("<img>");
            personImage.attr("src", results[i].images.fixed_height.url);
            gifDiv.prepend(p);
            gifDiv.prepend(personImage);
            $("#gifBin").prepend(gifDiv);
          }
        
    });



});



//