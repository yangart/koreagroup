$(function() {
    $('#loginForm [name=loginId]').focus();
    if ($('#loginForm #rememberId').prop('checked') == true) {
        $('#loginForm [name=loginPwd]').focus();
    }    
    $('#loginForm [name=loginId]').keyup(function (event){
        if (event.keyCode == 13) {
            fnCmdLogin();
            return;
        }
    });
    $('#loginForm [name=loginPwd]').keyup(function (event){
        if (event.keyCode == 13) {
            fnCmdLogin();
            return;
        }
    });
    
    $('[name=mobileno]').phoneFormat();
    $('[name=birth]').datepicker();
});

function fnCmdLoginForm(type) {
	if (type == 'ID') {
        $('#findIdArea').show();
        $('#findIdSmsArea').hide();

	    $('#findId').layerPop();
	}
	else if (type == 'PWD') {
    	$('#findPwdArea').show();
    	$('#findPwdSmsArea').hide();
    		
	    $('#findPwd').layerPop();
	}
	else {
	    $('#loginPop').layerPop();
	}
}

function fnCmdLogin() {
    $('#loginForm #loginPwd').blur();
    if($('#loginForm #loginId').val() == ''){
        $.message('아이디를 입력해 주세요.');
        $('#loginForm #loginId').focus();
        return;
    }
    if($('#loginForm #loginPwd').val() == ''){
        $.message('비밀번호를 입력해 주세요.');
        $('#loginForm #loginPwd').focus();
        return;
    }
    
    $.commandSubmit({
        commandUrl  : BASE_ROOT + '/user/login',
        commandForm : 'loginForm'
    });
}

function fnCmdLoginIdentification() {
    if($('#loginForm [name=mobileno]').val() == ''){
        $.message('휴대폰 번호를 입력해 주세요.');
        $('#loginForm [name=mobileno]').focus();
        return;
    }
    if($('#loginForm [name=userNm]').val() == ''){
        $.message('이름을 입력해 주세요.');
        $('#loginForm [name=userNm]').focus();
        return;
    }
    
    $.commandConfirm({
        confirm     : false,
        commandUrl  : BASE_ROOT + '/user/login/LoginUserSmsIdentityUpdate.do',
        commandForm : 'loginForm',
        onSuccessOK : function () {
            $('#loginSmsAuth1').hide();
            $('#loginSmsAuth2').show();
        }
    });
}

function fnCmdLoginIdentificationComplete() {
    if($('#loginForm [name=smsAuthNo]').val() == ''){
        $.message('인증번호를 입력해 주세요.');
        $('#loginForm [name=smsAuthNo]').focus();
        return;
    }
    
    $.commandConfirm({
        confirm     : false,
        messageShow : false,
        commandUrl  : BASE_ROOT + '/user/login/LoginUserSmsIdentityConfirmUpdate.do',
        commandForm : 'loginForm',
        onSuccessOK : function () {
            location.reload();
        }
    });
}

function fnCmdFindIdSmsAuth() {
    if($('#findIdForm [name=userNm]').val() == ''){
        $.message('이름을 입력해 주세요.');
        $('#findIdForm [name=userNm]').focus();
        return;
    }
    else if($('#findIdForm [name=mobileno]').val() == ''){
        $.message('휴대폰 번호를 입력해 주세요.');
        $('#findIdForm [name=mobileno]').focus();
        return;
    }
    
    $.commandConfirm({
        confirm     : false,
        autoClose   : false,
        commandUrl  : BASE_ROOT + '/user/login/FindIdPwdUserIdSmsIdentityUpdate.do',
        commandForm : 'findIdForm',
        onFailOK : function () {
            $('#findIdForm [name=userNm]').val('');
            $('#findIdForm [name=mobileno]').val('');
        },
        onSuccessOK : function () {
        	$('#findIdForm [name=mobileno1]').val($('#findIdForm [name=mobileno]').val());
        	$('#findIdArea').hide();
        	$('#findIdSmsArea').show();
        }
    });	
}
function fnCmdFindId() {
    if($('#findIdForm [name=smsAuthNo]').val() == '') {
        $.message('인증 번호를 입력해 주세요.');
        $('#findIdForm [name=smsAuthNo]').focus();
        return;
    }
    
    $.commandConfirm({
        confirm     : false,
        messageShow : false,
        commandUrl  : BASE_ROOT + '/user/login/FindIdPwdUserIdView.do',
        commandForm : 'findIdForm',
        onSuccessOK : function (result) {
            $('#findIdResultInfo').html(result.loginId);
            $('#findIdResultArea').show();
        }
    });
}
function fnCmdFindPwdSmsAuth() {
    if($('#findPwdForm [name=userNm]').val() == ''){
        $.message('이름을 입력해 주세요.');
        $('#findPwdForm [name=userNm]').focus();
        return;
    }
    else if($('#findPwdForm [name=loginId]').val() == ''){
        $.message('아이디를 입력해 주세요.');
        $('#findPwdForm [name=loginId]').focus();
        return;
    }
    else if($('#findPwdForm [name=mobileno]').val() == ''){
        $.message('휴대폰 번호를 입력해 주세요.');
        $('#findPwdForm [name=mobileno]').focus();
        return;
    }
    
    $.commandConfirm({
        confirm     : false,
        autoClose   : false,
        commandUrl  : BASE_ROOT + '/user/login/FindIdPwdUserPwdSmsIdentityUpdate.do',
        commandForm : 'findPwdForm',
        onFailOK : function () {
            $('#findPwdForm [name=userNm]').val('');
            $('#findPwdForm [name=mobileno]').val('');
        },
        onSuccessOK : function () {
            $('#findPwdForm [name=mobileno1]').val($('#findPwdForm [name=mobileno]').val());
            $('#findPwdArea').hide();
            $('#findPwdSmsArea').show();
        }
    });	
}

function fnCmdFindPwd() {
    if($('#findPwdForm [name=smsAuthNo]').val() == '') {
        $.message('인증 번호를 입력해 주세요.');
        $('#findPwdForm [name=smsAuthNo]').focus();
        return;
    }
    
    $.commandConfirm({
        confirm     : false,
        autoClose   : false,
        commandUrl  : BASE_ROOT + '/user/login/FindIdPwdUserResetPasswd.do',
        commandForm : 'findPwdForm',
        onFailOK : function () {
            $('#findPwdArea').show();
            $('#findPwdSmsArea').hide();
        },
        onSuccessOK : function () {
            top.location.href = '/user/login/LoginForm.do';
        }
    });
}