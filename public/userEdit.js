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

function patchStudent(student){
    var id = readCookieByKey('userId');
    if (!!id) {
        student.id = id;
        return $.ajax({
            type: "patch",
            url: `/api/Students/${id}`,
            data: student,
            success: function(result) {
            },
            failure: function(response) {
                console.log(response);
            }
        });
    } else {
        return Promise.reject('Error: user not found');
    }
    
}

function readCookieByKey(key){
    var value = document.cookie.match('(^|[^;]+)\\s*' + key + '\\s*=\\s*([^;]+)');
    return value ? value.pop() : '';
}

function prePopUserData(){
    getStudentById(readCookieByKey('userId'), readCookieByKey('token'))
    .then((student) => {
        $('#firstname').val(student.firstname);
        $('#lastname').val(student.lastname);
        $('#email').val(student.email);
        $('#wakatimekey').val(student.wakatimekey);
    }) 
    .catch(error => console.log(error));
}

$(document).ready(function(){
    prePopUserData();
    $("button").click(function(e){
        e.preventDefault();
        var students = [];        
        var wakatimekey = $('#wakatimekey').val();
        var firstname = $('#firstname').val();
        var lastname = $('#lastname').val();
        students.push({firstname, lastname, wakatimekey});
        patchStudent({firstname, lastname, wakatimekey})
        .then(response => window.location.href = "/")
        .catch(error => alert(error));
    });
});
