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

    // form 태그 내의 input들을 자동으로 읽어와 queryString형으로 변경 해줌.
    let formData = $("#insertForm").serialize();
    formData += '&email=' + sessionStorage.getItem("email");
    $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/posts',
        headers: {
            accessToken: $.cookie("accessToken")
        },
        data: formData,
        success: (res) => {
            alert(res.result);
            location.href="/views/posts/list.html"
            return;
        }
    })
}