function getAllStudents(){
    $.ajax({
        url: "/api/Students",
        success: function(result) {
            let students = result.map(function(student){
                return `<li id="${student.id}">${student.firstname} ${student.lastname} <a href="#">delete</a></li>`  
            });
            $('ul').append(students.join(""));
            $("li").click(function() {
                getStreak($(this).attr('id'));
            });
        },
        failure: function(response) {
            console.log(response);
        }
    });
}
function getStreak(id) {
    $.ajax({
        url: `/api/Students/getStreaks?id=${id}`,
        success: function(result) {
            $("#wakaResult").html(`Streak: ${result.days}`);
        },
        failure: function(response) {
            console.log(response);
        }
    });
}
function postStudent(student){
    $.ajax({
        type: "post",
        url: "/api/Students",
        data: student,
        success: function(result) {
        },
        failure: function(response) {
            console.log(response);
        }
    });
}
//returns login boolean

// todo: test functionality on login page, redirect to new page
//todo: store token in a cookie, 
function loginVerify(student){
    $.ajax({
        type: "post",
        url: "/api/Students/login",
        data: student,
        success: function(result) {
        },
        failure: function(response) {
            console.log(response);
        }
    });
}

$(document).ready(function(){
    $("#login-button").click(function(e){
        e.preventDefault();      
        var username = $('#username').val();
        var password = $('#password').val();
        var login = loginVerify({username, password});
    });
});
