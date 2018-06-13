var posts;
var users;
var comments;

if (!localStorage.users && !localStorage.posts && !localStorage.comments) {

} else {
    $("#getdata").hide();
    populateData();
}

function fetchdata() {
    Promise.all([getUsers(), getPosts(), getComments()]).then((data) => {
        localStorage.users = JSON.stringify(data[0]);
        localStorage.posts = JSON.stringify(data[1]);
        localStorage.comments = JSON.stringify(data[2]);
        populateData();
    });
}

function getUsername(id) {
    for(var i=0;i<users.length;i++){
        if(users[i].id == id){
            return users[i].username;
        }
    }
}


function populateData() {
    var htmldata = "";
    posts = JSON.parse(localStorage.posts);
    users = JSON.parse(localStorage.users);
    comments = JSON.parse(localStorage.comments);

    var len = posts.length;
    for (var i = 0; i < len; i++) {
     
        var username = getUsername(posts[i].userId);
        htmldata += `<section id="section_${i}"><h5>${username}</h5><h6>${posts[i].title}</h6><p>${posts[i].body}</p>
        <button id="like_${i}" onclick="likeit(this.id)">Like</button>
        <button id="delete_${i}" onclick="deleteit(this.id)">Delete</button>
        <button id="comment_${i}" onclick="getcomments(this.id)">Comments</button><div class="coms"id="comments_${i}" ></div></section>`;
             
    }
  
    document.getElementById("display").innerHTML = htmldata;
}
function deleteit(id){
    var i = parseInt(id.split('_')[1]);
    $(`#section_${i}`).remove();
    for(var k=0;k<localStorage.posts.length;k++){
        console.log(localStorage.posts[k].id );
        if(localStorage.posts[k].id == i){
            localStorage.posts.splice(k,1);
        }
    }

}

function likeit(id){
    document.getElementById(id).innerHTML = "Liked";
    document.getElementById(id).style.backgroundColor="lightblue";
}

function getcomments(id){
    var post_id = parseInt(id.split('_')[1]);
    var commentsArr = [];
    var htm = "";
    for(var i=0;i<comments.length;i++){
        if(comments[i].postId == (post_id+1)){
            var str = `${comments[i].name}: ${comments[i].body}`;
            commentsArr.push(str);
        }
    }
    for(var j = 0; j<commentsArr.length; j++){
        htm += `<p>${commentsArr[j]}</p>`
    }
    console.log(htm);
    document.getElementById(`comments_${post_id}`).innerHTML = htm;
}


function getPosts() {
    var posts = new Promise((resolve, reject) => {
        resolve(jQuery.ajax({
            url: "https://jsonplaceholder.typicode.com/posts", success: function (data) {
                return data;
            }
        }));
    });
    return posts;
}

function getComments() {
    var comments = new Promise((resolve, reject) => {
        resolve(jQuery.ajax({
            url: "https://jsonplaceholder.typicode.com/comments", success: function (data) {
                return data;
            }
        }));
    });
    return comments;
}

function getUsers() {
    var users;
    var users = new Promise((resolve, reject) => {
        resolve(jQuery.ajax({
            url: "https://jsonplaceholder.typicode.com/users", success: function (data) {
                return data;
            }
        }));
    });
    return users;
}

