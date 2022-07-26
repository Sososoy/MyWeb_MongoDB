const insertPost = () => {
    // 유효성 검사
    if(!$("#title").val()) {
        alert("제목을 입력해주세요.");
        $("#title").focus();
        return;
    }

    if(!$("#content").val()) {
        alert("내용을 입력해주세요.");
        $("#content").focus();
        return;
    }

    // ?name=name&age=1 => queryString

    // form 태그 내의 input들을 자동으로 읽어와 queryString형으로 변경해줌.
    let formData = $("#insertForm").serialize();
    formData += '&email=' + sessionStorage.getItem("email");
    //게시글 작성 : 1번
    $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/posts',
        headers: {
            accessToken: $.cookie("accessToken")
        },
        data: formData,
        success: (res) => {
            //게시글 작성 3번
            //json 형태로 응답을 받아 res.result를 통해 data를 받습니다.
            alert(res.result);

             //alert를 실행 한 후 페이지를 list.html로 redirect합니다.           
            location.href="/views/posts/list.html"
            return;
        }
    })
}