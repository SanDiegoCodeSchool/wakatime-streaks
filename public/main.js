function getStreak() {
    $.ajax({
        url: "/streaks",
        success: function(result) {
            console.log(result);
            $("#wakaResult").html(`Streak: ${result.days}`);
        },
        failure: function(response) {
            console.log(response);
        }
    });
}

$(document).ready(function(){
    $("button").click(function(e){
        e.preventDefault();
        var students = [];        
        var wakatimekey = $('#wakatimekey').val();
        var firstname = $('#firstname').val();
        var lastname = $('#lastname').val();
        students.push({firstname, lastname, wakatimekey});
        console.log(`button was clicked ${JSON.stringify(students)}`);
        $('ul').append(`<li><a href="#">${students[0].firstname} ${students[0].lastname}</a> <a href="#">delete</a></li>`)
        getStreak();
    });
});
