// "username" contain username of user who logged in


function showEditProfilePanel(){

  // Make "Edit" active and "change password" de-active
  $( "#edit-profile-panel" ).addClass("active");
  $( "#change-password-panel" ).removeClass("active");


  // Show "Edit" card  and hide "change password" card
  $("#edit-profile-card").removeClass('d-none');
  $("#change-password-card").addClass('d-none');


  // Show "Submit container"
  $("#submit-container").removeClass('d-none');

  // Set message for "submit" button 
  $("#submit-container #submit-btn").text('Save changes');


  // Set form "typo" to "e"
  $("#edit-or-change-pass").attr('typo', "e");
  

}

function userLogout() {

  // It should change later (using refresh token ) (and make this cookie unavailbe in server (using redis maybe))
  // remove the token from client which is in cookie
  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; 


  // Reload the page
  window.location.reload();
}

function userDeleteAccount() {
  
  console.log("before");

  $.ajax({
    url: `/users/${username}/deleteAccount`,
    type: "DELETE",
    dataType: 'json',
    
    // handle success messages
    success: function(res, status, xhr) {

      // It should change later (using refresh token ) (and make this cookie unavailbe in server (using redis maybe))
      // remove the token from client which is in cookie
      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; 

      // redirect to "/" and user see login page
      window.location.href = "http://localhost:3000";
    

    },

    // handle error messages
    error: function (jqXHR, textStatus, errorThrown) {
      

      // remove previous class of alert 
      $("#form-error").removeClass("alert-success");

      // Set class of alert
      $("#form-error").addClass("alert-danger");

      // Set error message 
      $('#form-error').text(jqXHR.responseText);

      console.log(jqXHR);

      // Show the "form-error"
      $("#form-error").removeClass("d-none");
      
      
      
    }
  });

}




function showChangePasswordPanel() {

  // Make "Change password" active and "Edit" de-active
  $( "#change-password-panel" ).addClass("active");
  $( "#edit-profile-panel" ).removeClass("active");


  // Show "Change password" card  and hide "Edit" card
  $("#change-password-card").removeClass('d-none');
  $("#edit-profile-card").addClass('d-none');

  // Show "Submit container"
  $("#submit-container").removeClass('d-none');


  // Set message for "submit" button 
  $("#submit-container #submit-btn").text('Change password');

  // Set form "typo" to "edit-profile"
  $("form#edit-or-change-pass").attr('typo', "p");
}


function editProfileAjaxRequest() {

  let newData = {
    firstName: $('input[name="firstName"]').val(),
    lastName: $('input[name="lastName"]').val(),
    sex: $('select[name="sex"] option:selected').val(),
    mobile: $('input[name="mobile"]').val()
  }

  $.ajax({
    url: `http://localhost:3000/users/${username}/editProfile`,
    type: "PUT",
    contentType: "application/json",
    dataType: 'json',
    data : JSON.stringify(newData),
    
    // handle success messages
    success: function(res, status, xhr) {
      
      // remove previous class of alert 
      $("#form-error").removeClass("alert-danger");

      // Set class of alert
      $("#form-error").addClass("alert-success");

      // Set error message 
      $('#form-error').text(res.message);

      // Show the "form-error"
      $("#form-error").removeClass("d-none");

      
      // console.log(res.user); // new information
      
    
    },

    // handle error messages
    error: function (jqXHR, textStatus, errorThrown) {
      

      // remove previous class of alert 
      $("#form-error").removeClass("alert-success");

      // Set class of alert
      $("#form-error").addClass("alert-danger");

      // Set error message 
      $('#form-error').text(jqXHR.responseJSON.message);

      // Show the "form-error"
      $("#form-error").removeClass("d-none");
      
      
      
    }
  });

}


function changePasswordAjaxRequest() {
  
  // contain "old password" and "new password" and "password_confirmation"  
  let newData = {
    oldPass: $('input[name="old-pass"]').val(),
    newPass: $('input[name="new-pass"]').val(),
    newPassConfirmation: $('input[name="new-pass-confirmation"]').val(),
  }

  
  $.ajax({
    url: `http://localhost:3000/users/${username}/editProfile/changePassword`,
    type: "PUT",
    contentType: "application/json",
    dataType: 'json',
    data : JSON.stringify(newData),
    
    // handle success messages
    success: function(res, status, xhr) {
      
      // remove previous class of alert 
      $("#form-error").removeClass("alert-danger");

      // Set class of alert
      $("#form-error").addClass("alert-success");

      // Set error message 
      $('#form-error').text(res.message);

      // Show the "form-error"
      $("#form-error").removeClass("d-none");

      
      // console.log(res.user); // new information
      
    
    },

    // handle error messages
    error: function (jqXHR, textStatus, errorThrown) {
      

      // remove previous class of alert 
      $("#form-error").removeClass("alert-success");

      // Set class of alert
      $("#form-error").addClass("alert-danger");

      // Set error message 
      $('#form-error').text(jqXHR.responseJSON.message);

      // Show the "form-error"
      $("#form-error").removeClass("d-none");
      
      
      
    }
  });
}


function uploadAvatarWithAjax() {
  var form = $("#upload-avatar-photo")[0];
  var formData = new FormData(form);

  
  
  $.ajax({
    type: "POST",
    url: `/users/${username}/uploadProfileImage`,
    data: formData,
    processData: false,
    contentType: false,
    success: function(res){
      
      // remove previous class of alert 
      $("#form-error").removeClass("alert-danger");

      // Set class of alert
      $("#form-error").addClass("alert-success");

      // Set error message 
      $('#form-error').text(res.message);

      // Show the "form-error"
      $("#form-error").removeClass("d-none");

      // show new avatar in img tag 
      $("img#avatar-img").attr('src', res.avatarPath);

    },

    error: function (error) {

      // remove previous class of alert 
      $("#form-error").removeClass("alert-success");

      // Set class of alert
      $("#form-error").addClass("alert-danger");

      // Set error message 
      $('#form-error').text(error.responseJSON.message);

      // Show the "form-error"
      $("#form-error").removeClass("d-none");
      
    }
  });

}




$(document).ready(function () {
  
  // when edit profile panel click
  $( "#edit-profile-panel" ).click(function() {
    
    showEditProfilePanel();

  });


  // when change password panel click
  $( "#change-password-panel" ).click(function() {
    
    showChangePasswordPanel()

  });


  // when form below panels submit
  $("form#edit-or-change-pass").submit(function(e){
    
    // Prevent form to reload the page. 
    e.preventDefault();

    // "e" or "p" (for knowing "Edit profile" or "Change password")
    let typo = $(this).attr('typo');


    switch(typo) {
      case "e": 
        editProfileAjaxRequest();
        break;

      case "p": 
        changePasswordAjaxRequest();
        break;
    }
    

  });


  
  // when user try to upload avatar image
  $("button#set-photo-btn").click(function(e){
  
    uploadAvatarWithAjax();

  });



  // when user want to "logout"
  $("button#logout-btn").click(function (e) {

    userLogout();

  });

  
  $("button#delete-account-btn").click(function (e) {

    userDeleteAccount();

  });

});