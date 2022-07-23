const signUp = () => {
    // 유효성 검사
    if (!$('#email').val()) {
        alert("이메일을 입력해주세요.");
        $('#email').focus();
        return;
    }

    if (!$('#password').val()) {
        alert("비밀번호를 입력해주세요.");
        $('#password').focus();
        return;
    }

    if (!$('#rePassword').val()) {
        alert("비밀번호 확인을 입력해주세요.");
        $('#rePassword').focus();
        return;
    }

    if (!$('#name').val()) {
        alert("이름을 입력해주세요.");
        $('#name').focus();
        return;
    }

    if ($('#password').val() !== $('#rePassword').val()) {
        alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
        $('#password').val("");
        $('#rePassword').val("");
        $('#password').focus();
        return;
    } 

    // 회원가입 form 가지고 옴
    let signUpData = $("#signUpForm").serialize(); 
    
    // 회원가입: 1번
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/user/signUp",
        data: signUpData,
        success: (res) => {
            alert(res.result); // 응답처리
            location.href="/views/user/login.html"; // 로그인 페이지로 이동
        }, error: (err) => {
            console.log(err);
            alert(err.responseJSON.error);
            $("#email").val("");
            $("#password").val("");
            $("#rePassword").val("");
            $("#name").val("");
            $("#email").focus();
        }
    });

}