var data =[];
document.getElementById("getdata").addEventListener("click", () => {
    if(!localStorage.users){



    }
    else{

    }
});
function getPosts(){
    var posts = new Promise((resolve, reject) => {
        resolve(jQuery.ajax({
            url: "https://jsonplaceholder.typicode.com/posts", success: function (data) {
                //console.log(data);
                return data;
            }}));
    });
console.log(posts);
    return posts;
}