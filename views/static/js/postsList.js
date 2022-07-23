$(document).ready(() => {
    getList();   
});

const getList = () => {

    $(".postsList").empty();

    $.ajax({
        type:'GET',
        url: 'http://localhost:8080/posts/',
        headers: {
            accessToken: $.cookie("accessToken")
        },
        success: (res) => {
            let listData;
            res.map((it, index) => {
                if (sessionStorage.getItem("email") == it.author.email) { // 자기 게시글이면 버튼이 보임
                    listData = `<tr>
                <th scope="row">${index + 1}</th>
                <td>${it.title}</td>
                <td>${it.author.name}</td>
                <td><button type="button" onclick="deletePost('${it.shortId}')" class="btn btn-outline-danger">Delete</button>
                    <button type="button" onclick="updatePost('${it.shortId}')" class="btn btn-outline-warning">Update</button></td>
              </tr>`;
                } else { // 자기 게시글이 아니면 버튼이 안 보임
                    listData = `<tr>
                    <th scope="row">${index + 1}</th>
                    <td>${it.title}</td>
                    <td>${it.author.name}</td>
                    <td>
                  </tr>`;
                }                

              $(".postsList").append(listData);
            })            
        }, 
        error: (res) => {
            alert(res.responseJSON.message);
            location.href="/views/user/login.html";
        }
    });
}

const deletePost= (shortId) => {
    console.log(shortId);
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/posts/${shortId}/delete`,
        headers: {
            accessToken: $.cookie("accessToken")
        }, 
        success: (res) => {
            alert(res.result);
            getList();
        }
    });
}

const updatePost = (shortId) => {
    console.log(shortId);
    window.localStorage.setItem("shortId", shortId);
    location.href="/views/posts/updateEdit.html";
}