console.log("Our app.js is connected");

let memories_url = "http://localhost:3000/api/memories"

$(document).ready(function(){

  $.ajax({
    method: 'GET',
    url: memories_url,
    success: (response) => {
      console.log(response);
    },
    error: (err) => {
      console.log(err);
    },
  });


});
