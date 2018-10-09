console.log("Our app.js is connected");

let memories_url = "http://localhost:3000/api/memories"

$(document).ready(function(){

  $.ajax({
    method: 'GET',
    url: memories_url,
    success: (response) => {
      for (var i = 0; i < response.length; i++) {
        $('#render-memories').append(`
          <div class="row">
            <div class="col-lg-2">
              <h3>${response[i].title} ${response[i].name}</h3>
            </div>
            <div class="col-lg-8">
              <img src="${response[i].image}">
              <h4>${response[i].description} on ${response[i].date}</h4>
            </div>
          </div>
        `)
      }

    },
    error: (err) => {
      console.log(err);
    },
  });


});
