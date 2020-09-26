$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html =
        `<div class="messages"data-message-id=${message.id}>
          <div class="upper-message">
            ${message.user_name}
            <div class="date">
              ${message.created_at}
            </div>
          </div>
          <div class="lower-message">
            <p class="chat-main__message-form__form__text_form">
            ${message.content}
            </p>
          <img class="lower-message__image" src="${message.image}">
          </div>
        </div>`
    return html;
    } else {
      let html =
      `<div class="messages" data-message-id=${message.id}>
        <div class="upper-message">
          ${message.user_name}
        
          <div class="date">
            ${message.created_at}
          </div>
        </div>
        <div class="lower-message">
          <p class="chat-main__message-form__form__text_form">
            ${message.content}
          </p>
        </div>
      </div>`
    return html;
    };
  }

  $('.form').on('submit', function(e) {
    e.preventDefault()
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.chat-main__message').append(html);
      $('.chat-main__message').animate({ scrollTop: $('.chat-main__message')[0].scrollHeight});
      $('form')[0].reset();
      $('.submit').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    })
  });  
});


