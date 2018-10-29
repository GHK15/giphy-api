var fruits = ["strawberry", "watermelon", "lemon", "pineapple"];

    function displayFruitInfo() {

        var fruit = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + fruit + "&api_key=Zzr283Wxs9cdxOHkBglvUGGm9M6ksBPI&limit=10";

        $.ajax({
        url: queryURL,
        method: "GET"
        }).then(function(response) {
        var gifs = response.data;

        for (var i = 0; i < gifs.length; i++) {
        var fruitDiv = $("<div class='fruit jumbotron mx-auto'>");
        var rtDiv = $('<div>');
        var ratings = response.data[i].rating;
        var pOne = $("<h2 class='text-center'>").text("Rated: " + capitalizeRating(ratings));
        rtDiv.append(pOne);

        function capitalizeRating(string) {
            // return string.charAt(0).toUpperCase() + string.slice(0);
            return string.toUpperCase();
        }


        var imgUrl = response.data[i].images.fixed_height_still.url;
        var moveUrl = response.data[i].images.fixed_height.url;

        var image = $("<img class='img-responsive mx-auto gif' style='display:block'>").attr("src", imgUrl);
        image.attr("data-state", "still");
        image.attr("alt", "fruit gif");
        image.attr("data-still", imgUrl);
        image.attr("data-animate", moveUrl);

        fruitDiv.append(rtDiv)
        fruitDiv.append(image);

        $("#fruits-view").prepend(fruitDiv);

        
        
        }

        });

    }


    $(document).on("click",".gif", function() {
        var state = $(this).attr("data-state");

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
            console.log("it was still");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
            console.log("it was animated")
        }
    });

    function renderButtons() {

        $("#buttons-view").empty();

        for (var i = 0; i < fruits.length; i++) {
        var a = $("<button>");
        a.addClass("fruit-btn btn btn-danger ml-4 mb-3");
        a.attr("data-name", fruits[i]);
        a.text(fruits[i]);
        $("#buttons-view").append(a);
        }
    }

    $("#add-fruit").on("click", function(event) {
        event.preventDefault();
        var fruit = $("#fruit-input").val().trim();
        fruits.push(fruit);

        renderButtons();
    });

    $(document).on("click", ".fruit-btn", displayFruitInfo);

    renderButtons();