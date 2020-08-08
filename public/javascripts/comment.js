// "articleId" contains article id.






function postComment() {

  // Get content comment
  let commentContent = $('#message').val();
  let comment = {
    content: commentContent
  }

  $.ajax({
    url: `http://localhost:3000/comments/${articleId}`,
    type: "POST",
    contentType: "application/json",
    dataType: 'json',
    data : JSON.stringify(comment),
    
    // handle success messages
    success: function(res, status, xhr) {

      // remove previous class of alert 
      $("#comment-alert").removeClass("alert-danger");

      // Set class of alert
      $("#comment-alert").addClass("alert-success");
      
      // Set error message 
      $('#comment-alert').text(res.message);

      // Make message textarea empty
      $('#message').val('');
    
    },

    // handle error messages
    error: function (jqXHR, textStatus, errorThrown) {
      
		  // remove previous class of alert 
      $("#comment-alert").removeClass("alert-success");

      // Set class of alert
      $("#comment-alert").addClass("alert-danger");
      
      // Set error message 
      $('#comment-alert').text(jqXHR.responseText);
  
      
    }
  });

  

    
    


}



function commentValidationWithAlertMessages() {
  
  // Get message (comment content in backend)
  let message = $("#message").val();


  // Display the alert
  $('#comment-alert').css('display', 'block');



  // check it's not empty 
  // if it's empty display comment-alert
  if (message === "") {

    // remove previous class of alert 
    $("#comment-alert").removeClass("alert-success");

    // Set class of alert
    $("#comment-alert").addClass("alert-danger");
    
    // Set error message 
    $('#comment-alert').text("Your comment can't be empty");

    
  }

  else {
    postComment();
  }
}

// jQuery document ready
$(document).ready(function() {

  $("#add-comment-form").submit(function(e){
    e.preventDefault();
    commentValidationWithAlertMessages();
  }); 

  

});