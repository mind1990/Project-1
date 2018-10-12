console.log("Our app.js is connected");

let memories_url = "http://localhost:3000/api/memories"
var map;

$(document).ready(function(){

  function renderMemories (response) {
    $('#render-memories').empty();
    for (var i = 0; i < response.length; i++) {
      var memoryId = response[i]._id;
      $('#render-memories').append(`
        <div class="dateAndPhotos" id="${memoryId}">
          <aside>
            <div class="date sticky"><h3 class="sticky">${response[i].date}</h3></div>
          </aside>
          <main class="jumbotron">
            <div class="photo"><img src="${response[i].image}" alt="image">
              <div class="photo-body">
                <h3 class="photo-title">${response[i].name}</h3>
                <h4 class="photo-text">${response[i].description}</h4>
                <div id="render-form"></div>
                <a id="edit-memory" class="btn btn-sm">Edit Memory</a>
                <a id="delete-memory" class="btn btn-sm">Delete Memory</a>
              </div>
            </div>
          </main>
        </div>
      `)
    }
  }

// Render all existing memories from database
  function getMemories() {
    $.ajax({
      method: 'GET',
      url: memories_url,
      success: renderMemories,
      error: (err) => {
        console.log(err);
      },
    });
  }

  getMemories();

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
        $('h1').append(`
          <div class='alert alert-success'>Memory successfully created!</div>
        `)
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        $('.alert').fadeOut(3000);
      }
    });
  });

// Edit click listener
  $('#render-memories').on('click', '#edit-memory', function() {
    let editMemoryDesc = $(this).siblings('.photo-text').text();
    // Ewwwww this chaininggg thoughhhh
    let editMemoryDate = $(this).parent().parent().parent().siblings('aside').children('.date').children('h3').text();
    console.log(editMemoryDesc);
    console.log(editMemoryDate);
    $(this).hide();
    $(this).siblings('#render-form').append(`
      <form class="formInfo">
        <input class="edit-form" type="text" name="description" value="${editMemoryDesc}">
        <input class="edit-form" type="text" name="date" value="${editMemoryDate}">
        <input id="submit-form" class="btn btn-success btn-sm" type="submit">
        <a id="cancel-form" class="btn btn-danger btn-sm">Cancel</a>
      </form>
    `)
  })

// Toggle edit form
  $('#render-memories').on('click', '#cancel-form', function() {
    $(this).parent('form').parent().siblings('#edit-memory').show();
    $(this).parent('form').hide()
  });

  // Edit a memory
  $('#render-memories').on('submit', 'form', function(e) {
    e.preventDefault();
    e.stopImmediatePropagation();

    var data = $('.formInfo').serialize();
    var memoryId = $(this).parent().parent().parent().parent().parent('.dateAndPhotos').attr('id');
    console.log(memoryId)
    console.log(data);

    $.ajax({
      method: 'PUT',
      url: `${memories_url}/${memoryId}`,
      data: data,
      success: (response) =>  {
        getMemories();
        $(this).siblings('.memory-desc').text(response.description);
        $(this).siblings('.memory-date').text(response.date);
      },
      error: (err) => {
        console.log(err);
      },
      complete: getMemories,
    });
  });

  // Delete
  $('#render-memories').on('click', '#delete-memory', function () {
    var memoryId = $(this).parent().parent().parent().parent('.dateAndPhotos').attr('id');
    console.log(memoryId);
    console.log('click');

    $.ajax({
      method: 'DELETE',
      url: `${memories_url}/${memoryId}`,
      success: (res) => {
        getMemories()
      },
      error: (err) => {
        console.log(err);
      },
      complete: getMemories,
    })
  });

  // Initialize map
  function initMap() {
   map = new google.maps.Map(document.getElementById('map'), {
     center: {lat: 40.730610, lng: -73.935242},
     zoom: 8,
   });
  }

  initMap();

});
