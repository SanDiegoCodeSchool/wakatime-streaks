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
function getStudentById(userId, token){
    return $.ajax({
        url: `/api/Students/${userId}`,
        success: function(student) {
            return student;
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
$(document).ready(function(){
    if(readCookieByKey('token')){
        changeCTA();
    }
    getAllStudents();
    $("button").click(function(e){
        e.preventDefault();
        var students = [];        
        var wakatimekey = $('#wakatimekey').val();
        var firstname = $('#firstname').val();
        var lastname = $('#lastname').val();
        students.push({firstname, lastname, wakatimekey});
        postStudent({firstname, lastname, wakatimekey});
        console.log(`button was clicked ${JSON.stringify(students)}`);
        $('ul').append(`<li><a href="#">${students[0].firstname} ${students[0].lastname}</a> <a href="#">delete</a></li>`)
        getStreak();
    });
});

function readCookieByKey(key){
    var value = document.cookie.match('(^|[^;]+)\\s*' + key + '\\s*=\\s*([^;]+)');
    return value ? value.pop() : '';
}

function changeCTA(){
    $('#cta-link').html('Edit User');
    $('#cta-link').attr('href','/userEdit');
}