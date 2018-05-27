

$.getJSON('/articles', function(data) {
    for (var i in data) {
        $('#articles').append(`<div class="card mb-2 mx-auto"  style="width: 30rem;"><img class="card-img-top" src="${data[i].picture}" alt="Card image cap"><div class="card-body"><h5 class="card-title" data-id="${data[i]._id}">${data[i].article} (click to comment)</h5><p class="card-text" id="${data[i]._id}" ></p><a href="https://www.mlssoccer.com${data[i].link}" class="btn btn-primary">Go to Story</a></div></div>`)
    }
    
});

$(document).on('click', 'h5', function() {
    $('.notes').empty();
    let thisId = $(this).attr('data-id');
    console.log(`thisId ${thisId}`);
    
    $.ajax({
        method: 'GET',
        url: `/articles/${thisId}`
    })
        .then((data) => {
            console.log(data);
            let notes = $('#' + thisId);
            notes.append("<label for='bodyinput'></label><textarea id='bodyinput' name='body'></textarea>");
            notes.append(`<button class="btn btn-primary" data-id=${data._id} id='savenote'>Save Note</button>`);
            if (data.note) {
                $('p').text(data.note.body);
            }
        });
});

$(document).on('click', '#savenote', function() {
    let thisId = $(this).attr('data-id');
    $.ajax({
        method: 'POST',
        url: `/articles/${thisId}`,
        data: {
            body: $('#bodyinput').val()
        }
    })
        .then((data) => {
            console.log(data);
            $('#notes').empty();
        });
    $("#bodyinput").val("");
          
});