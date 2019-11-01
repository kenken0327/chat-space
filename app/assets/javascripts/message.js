$(function(){

  function buildMessage(message){
    var image = (message.image !== null) ? `<img class= "message__text__image" src="${message.image}">`: "";
    var html = `<div class="message">
                    <div class="message__upper-info">
                      <div class="message__upper-info__talker">
                        ${message.user_name}
                      </div>
                      <div class="message__upper-info__date">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="message__text">
                      ${message.content}
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
      $('.messages').animate({ 
        scrollTop: $('.messages')[0].scrollHeight
      }, 'fast');
      $(".submit-btn").prop('disabled', false);
      $('#message_content').val("")
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
    })
  })
});