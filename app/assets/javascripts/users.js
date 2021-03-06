$(document).on('turbolinks:load', function(){
  function addUser(user) {
    let html = `
      <div class="chat-group-user clearfix">
        <p class="chat-group-user__name">${user.name}</p>
        <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
      </div>
    `;
    $("#user-search-result").append(html);
  }

  function addNoUser() {
    let html = `
      <div class="chat-group-user clearfix">
        <p class="chat-group-user__name">ユーザーが見つかりません</p>
      </div>
    `;
    $("#user-search-result").append(html);
  }
  function addDeleteUser(name, id) {
    let html = `
    <div class="ChatMember clearfix" id="${id}">
      <p class="ChatMember__name">${name}</p>
      <div class="ChatMember__remove ChatMember__btn" data-user-id="${id}" data-user-name="${name}">削除</div>
    </div>`;
    $(".js-add-user").append(html);
  }
  function addMember(userId) {
    let html = `<input value="${userId}" name="group[user_ids][]" type="hidden" id="group_user_ids_${userId}" />`;
    $(`#${userId}`).append(html);
  }
  $("#user-search-field").on("keyup", function(){
    var input = $("#user-search-field").val()  //フォームの値を取得して変数に代入する
    $.ajax({
      type: 'GET',
      url: '/users',
      dataType: 'json',
      data: {keyword: input}
    })
    .done(function(users){
      $("#user-search-result").empty();
        if (users.length !== 0) {
          users.forEach(function(user) {
            addUser(user);
          });
        } else if (input.length == 0) {
          return false;
        } else {
          addNoUser();
        }
    })
    .fail(function(){
      alert("通信エラーです。ユーザーが表示できません。")
    })
  });
  $(document).off('click','.chat-group-user__btn--add');
  $(document).on('click','.chat-group-user__btn--add', function(){
    const userName = $(this).attr("data-user-name");
    const userId = $(this).attr("data-user-id");
    $('#user-search-field').val('');
    console.log(this);
    $(this)
      .parent()
      .remove();
    addDeleteUser(userName, userId);
    addMember(userId);
  })
  $(document).on('click','.ChatMember__btn, .chat-group-user__btn',function(){
    console.log(this);
    $(this)
      .parent()
      .remove();
  });
});