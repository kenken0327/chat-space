$(document).on('turbolinks:load', function(){

  function buildMessage(message){
     image = (message.image !== null) ? `<img class= "message__text__image" src=${message.image}>`: "";
    var html = `<div class="message" data-id = ${message.id}>
                    <div class="message__upper-info">
                      <div class="message__upper-info__talker">
                        ${message.user_name}
                      </div>
                      <div class="message__upper-info__date">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="message__text">
                      <p>
                      ${message.content}
                      </p>
                      <img class="message__text__image">
                        ${image}
                      </div>
                    </div>
                </div>`
    return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildMessage(data);
      $('.messages').append(html);
      $("form")[0].reset();
      $('.messages').animate({ 
        scrollTop: $('.messages')[0].scrollHeight
      }, 'fast');
      $(".submit-btn").prop('disabled', false);
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
      $(".submit-btn").prop('disabled', false);
    })
  })
  
  function reloadMessages() {
    if(document.URL.match("/message")) {
      last_message_id = $(".message:last").data('id');
      $.ajax({
        url: "api/messages",
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages) {
        messages.forEach(function(message){
          var insertHTML = buildMessage(message);
          $('.messages').append(insertHTML);
        })
      })
      .fail(function() {
        alert('error');
      });
    };
  };
    setInterval(reloadMessages, 5000);
});