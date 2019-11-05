$(document).on('turbolinks:load', function(){

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
  
  function reloadMessages() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    last_message_id =  $('.message').last().data('message-id');
    $.ajax({
      //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
      url: "api/messages",
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function(messages) {

      messages.forEach(function(message){
        var insertHTML = buildMessage(message);
        $('.messages').append(insertHTML);
      });
    })
    .fail(function() {
      console.log('error');
    });
  };
});