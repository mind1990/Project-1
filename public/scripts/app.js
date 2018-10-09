console.log("Our app.js is connected");

let memories_url = "http://localhost:3000/api/memories"

$(document).ready(function(){

// Render all existing memories from database
  $.ajax({
    method: 'GET',
    url: memories_url,
    success: (response) => {
      for (var i = 0; i < response.length; i++) {
        var memoryId = response[i]._id;
        $('#render-memories').append(`
          <div class="row" id="${memoryId}">
            <div class="col-lg-2">
              <h3>${response[i].name}</h3>
              <a id="delete-memory" class="btn btn-sm btn-warning">Edit Memory</a>
              <a id="edit-memory" class="btn btn-sm btn-danger">Delete Memory</a>
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

// Create memory helper function for data
  const createMemory = (formData) => {
    let name = $('#create-form').children('#mem-name').val();
    let description = $('#create-form').children('#mem-desc').val();
    let image = $('#create-form').children('#mem-url').val();
    let date = $('#create-form').children('#mem-date').val();

    return newData = {
      name: name,
      description: description,
      image: image,
      date: date,
    }
}

  // Create
  $('#create-form').on('submit', (e) => {
    e.preventDefault();
    e.stopImmediatePropagation();

    $.ajax({
      method: 'POST',
      url: memories_url,
      data: createMemory(),
      success: (response) => {
        console.log(response);
        $('#render-memories').append(response);
      },
      error: (err) => {
        console.log(err);
      }
    });
  });

  $('#render-memories').on('click', '#edit-memory')


  // Delete
  $('#render-memories').on('click', '#delete-memory', function () {
    var memoryId = $(this).parent().parent('.row').attr('id');
    console.log(memoryId);
    console.log('click');

    $.ajax({
      method: 'DELETE',
      url: `${memories_url}/${memoryId}`,
      success: (e) => {
        $(memoryId).remove;
      },
      error: (err) => {
        console.log(err);
      }
    })
  });




});
