

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
        var input = $('#key').val();
        console.log(`button was clicked ${input}`);
        getStreak();
    });
});
