const states = {
    users: "users",
    posts: "posts",
    comments: "comments"
};

let currentState = states.users;
let postId = null;
let commentId = null;

function handleBack() {
    if (currentState === states.posts) {
        usersWrapper.classList.remove("hidden");
        postsWrapper.classList.add("hidden");
        commentsWrapper.classList.add("hidden");
        currentState = states.users;
    } else if (currentState === states.comments) {
        postsWrapper.classList.remove("hidden");
        commentsWrapper.classList.add("hidden");
        usersWrapper.classList.add("hidden");
        currentState = states.posts;
    }
}

function handleNext() {
    if (currentState === states.users) {
        showUserPosts(postId);
        currentState = states.posts;
    } else if (currentState === states.posts) {
        showComment(commentId);
        currentState = states.comments;
    }
}   

function handleUsersList() {
    list.classList.toggle("hidden");
}

function handlePostsList() {
    postList.classList.toggle("hidden")
}

function handleCommentsList() {
    commentList.classList.toggle("hidden")
}

let loading = document.createElement("div");
loading.className = "loading hidden relative"
loading.innerHTML = `
<div class="spinner center fixed top-0 left-0 bottom-0 right-0">
<div class="spinner-blade"></div>
<div class="spinner-blade"></div>
<div class="spinner-blade"></div>
<div class="spinner-blade"></div>
<div class="spinner-blade"></div>
<div class="spinner-blade"></div>
<div class="spinner-blade"></div>
<div class="spinner-blade"></div>
<div class="spinner-blade"></div>
<div class="spinner-blade"></div>
<div class="spinner-blade"></div>
<div class="spinner-blade"></div>
</div>
`


let usersWrapper = document.querySelector(".usersWrapper");
let postsWrapper = document.querySelector(".postsWrapper");
postsWrapper.classList.add("hidden")
let commentsWrapper = document.querySelector(".commentsWrapper");
commentsWrapper.classList.add("hidden")

let list = document.querySelector(".users"); 
function renderPosts() {
    currentState = "users";
    usersWrapper.classList.remove("hidden");
    postsWrapper.classList.add("hidden");
    commentsWrapper.classList.add("hidden");
    list.innerHTML = "";
    loading.classList.remove("hidden");
    list.appendChild(loading);
    fetch("https://jsonplaceholder.typicode.com/users")
    .then(res => res.json())
    .then(data => {
        data.forEach(user => {
            let li = document.createElement("li");
            li.className = "p-2 text-white border border-[#2f3336] duration-200 text-white rounded-lg"
            li.innerHTML = `
            <p class="text-[14px]"><strong>Name:</strong> ${user.name}</p>
            <p class="text-[14px]"><strong>Username:</strong> ${user.username}</p>
            <button onclick="showUserPosts(${user.id})" class=" w-full p-2 mt-4 border border-[#2f3336] rounded-lg">Show posts</button>
            `
            list.appendChild(li);
            loading.classList.add("hidden");
            
        })
    })
    .catch(err=>console.log(err));
}
renderPosts()

// Show 

let postList = document.querySelector(".posts");
function showUserPosts(id) {
    if (id == null) {

    }
    postId = id;
    currentState = "posts";
    usersWrapper.classList.add("hidden")
    postsWrapper.classList.remove("hidden")
    commentsWrapper.classList.add("hidden");
    postList.classList.remove("hidden")
    postList.innerHTML = "";
    loading.classList.remove("hidden");
    postList.appendChild(loading)
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
    .then(res => res.json()) 
    .then(data => {
        postList.innerHTML = "";
        data.forEach(post => {
            let div = document.createElement("li");
            div.className = "p-2 text-white border border-[#2f3336] duration-200 text-white rounded-lg";
            div.innerHTML = `
            <p><strong>Title:</strong> ${post.title}</p>
            <p><strong>Body:</strong> ${post.body}</p>
            <button onclick="showComment(${post.id})" class=" w-full p-2 mt-4 border border-[#2f3336] rounded-lg">Show comments</button>
            `
            postList.appendChild(div);
            loading.classList.add("hidden");
        })
    })
    .catch(err => {
        console.log(err);
        postList.innerHTML = "<p class='text-red-500'>Failed to load posts. Please try again later.</p>";
    })
}

// Comments

let commentList = document.querySelector(".comments");
function showComment(id) {
    commentId = id;
    currentState = "comments";
    usersWrapper.classList.add("hidden")
    postsWrapper.classList.add("hidden");
    commentsWrapper.classList.remove("hidden");
    commentList.classList.remove("hidden")
    commentList.innerHTML = "";
    loading.classList.remove("hidden");
    commentList.appendChild(loading);
    fetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`)
    .then(res => res.json())
    .then(data => {
        commentList.innerHTML = "";
        data.forEach(post => {
            let div = document.createElement("li");
            div.className = "p-2 text-white border border-[#2f3336] duration-200 text-white rounded-lg";
            div.innerHTML = `
            <p><strong>Title:</strong> ${post.name}</p>
            <p><strong>Body:</strong> ${post.body}</p>
            `
            commentList.appendChild(div);
            loading.classList.add("hidden")
        })
    })
    .catch(err => {
        console.log(err);
        commentList.innerHTML = "<p class='text-red-500'>Failed to load comments. Please try again later.</p>";
    });
}

function handleWindow(){
    renderPosts()
}