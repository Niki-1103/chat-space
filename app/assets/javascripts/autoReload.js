$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html =
        `<div class="messages"date-message-id=${message.id}>
          <div class="upper-message">
            ${message.user_name}
          </div>
            <div class="date">
              ${message.created_at}
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
      `<div class="messages" date-message-id=${message.id}>
        <div class="upper-message">
          ${message.user_name}
        </div>
          <div class="date">
            ${message.created_at}
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

  let reloadMessages = function(){
    let last_message_id = $('.messages:last').data("message-id") || 0;
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType:'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        
        let insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.chat-main__message').append(insertHTML);
        $('.chat-main__message').animate({ scrollTop: $('.chat-main__message')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  setInterval(reloadMessages, 7000);
});