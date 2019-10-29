$(document).on('turbolinks:load', function() { 
  function buildHTML(message){
    
    var message_image = message.image !== null?
                `<img src= "${message.image}", class: 'lower-message__image'>`: "";
    var html = `<div class="message" data-message-id="${message.id}">
                  <div class="upper-message__user-name">
                    ${message.user_name}
                  </div>
                  <div class="upper-message__date">
                    ${message.date}
                  </div>
                  <div class="lower-message">
                      <p class="lower-message__content">
                        ${message.content}
                      </p>
                        ${message_image}
                  </div></div></div>`
    return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      type: "POST" ,
      url: url ,
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html)
      $('.form__submit').prop('disabled',false)
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      $('#new_message')[0].reset();
    })
    .fail(function(){
      alert('error');
    })
  });

  var reloadMessages = function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      var href = 'api/messages'
      var last_message_id = $('.message:last').data('message-id');
   
      $.ajax({
        url:  href,
        type: 'GET',
        data: {id: last_message_id},
        dataType: 'json'
      })
    
    .done(function(messages){
      var insertHTML='';
        messages.forEach(function(message){
          insertHTML = buildHTML(message);
          $('.messages').append(insertHTML);
          $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
        });
    })
    .fail(function() {
      alert("自動更新に失敗しました")
      });
    };
  };
  setInterval(reloadMessages, 5000);
});