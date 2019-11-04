$(function(){
  function searchUser(user){
    var html = `<div class="chat-group-user clearfix">
          <p class="chat-group-user__name">${user.name}</p>
            <a class="user-search-add
             chat-group-user__btn
             chat-group-user__btn--add"
             data-user-id= ${user.id}
             data-user-name=${user.name}>追加</a>
        </div>`
        $('#user-search-result').append(html)
  }
  function addNoUser() {
    let html = `
      <div class="chat-group-user clearfix">
        <p class="chat-group-user__name">ユーザーが見つかりません</p>
      </div>`;
    $("#user-search-result").append(html);
  }

  $("#user-search-field").on("keyup", function() {
      var input = $("#user-search-field").val();

      $.ajax({
        url: '/users',
        type: "GET",
        data: { keyword: input },
        dataType: 'json'
      })
    .done(function(users) {
      $('#user-search-result').empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          searchUser(user);
        });
      } else if (input.length == 0) {
        return false;
      } else {
        addNoUser();
      }
    })
      .fail(function() {
      alert('ユーザー検索に失敗しました');
    });
  });
});
$(function(){


  $("#user-search-result").on("click", ".chat-group-user__btn--add", function(){
    
  })
})