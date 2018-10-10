console.log("Our app.js is connected");

let memories_url = "http://localhost:3000/api/memories"

$(document).ready(function(){

  function renderMemories (response) {
    $('#render-memories').empty();
    for (var i = 0; i < response.length; i++) {
      var memoryId = response[i]._id;
      $('#render-memories').append(`
        <div class="row" id="${memoryId}">
          <div class="col-lg-2">
            <h3>${response[i].name}</h3>
            <div id="render-form"></div>
            <a id="edit-memory" class="btn btn-sm btn-warning">Edit Memory</a>
            <a id="delete-memory" class="btn btn-sm btn-danger">Delete Memory</a>
          </div>
          <div class="col-lg-8">
            <img src="${response[i].image}">
            <h4 class="memory-desc">${response[i].description}</h4> on <h4 class="memory-date">${response[i].date}</h4>
          </div>
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
      }
    });
  });

// Edit click listener
  $('#render-memories').on('click', '#edit-memory', function() {
    let editMemoryDesc = $(this).parent().siblings('.col-lg-8').children('.memory-desc').text();
    let editMemoryDate = $(this).parent().siblings('.col-lg-8').children('.memory-date').text();
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
    var memoryId = $(this).parent().parent().parent('.row').attr('id');
    console.log(memoryId)
    console.log(data);

    $.ajax({
      method: 'PUT',
      url: `${memories_url}/${memoryId}`,
      data: data,
      success: (response) =>  {
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
    var memoryId = $(this).parent().parent('.row').attr('id');
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


});



