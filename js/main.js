$(document).ready(function(){
  // send msg by click btn
  $('.send-btn').click(function(){
    sendMsg();
  })

  // send msg by enter key
  $('.msg-input').keypress(function(e){
    if(e.which == 13){
      sendMsg();
    }
  })

  // send msg function
  function sendMsg(){
    var msg = $('.msg-input').val();
    // check if msg is empty
    if(msg){
      createMsg(msg);
      highlightMsg(msg);
      addEmoji(msg);

      // scroll to the bottom
      $('.content-body').animate({ scrollTop: $('.content-body')[0].scrollHeight}, "slow");
      // empty input
      $('.msg-input').val("");
    }else{
      $('.tooltip').show();
      setTimeout(function(){
        $('.tooltip').hide();
      },2000)
    }
  }

  function createMsg(msg){
    // msg text
    var msgText = '<div class="msg-text">' + msg + '</div>';

    // msg meta
    var now = new Date(Date.now());
    var hours = now.getHours();
    var minutes = now.getMinutes();
    if (hours < 10){
      hours = "0" + hours;
    }
    if (minutes < 10){
      minutes = "0" + minutes;
    }
    var formattedTime = hours + ":" + minutes;
    var msgMeta = '<div class="msg-meta">' + formattedTime +'</div>';

    // append msg content
    var msgContainer = '<div class="msg-container">' + msgText + msgMeta + '</div>';
    $('.content-body').append(msgContainer);
    $('.msg-container').last().show('slow');
  }

  function highlightMsg(msg){
    // check if msg surrounding by #
    if (msg.match('^#') && msg.match('#$')){
      msg = msg.slice(0,-1).substring(1);
      $('.msg-container').last().css('background','#e9b9ba');
      $('.msg-text').last().html(msg);
      $('.msg-meta').last().css('color','#FFDDCC');
    }
  }

  function addEmoji(msg){
    var msgTextHtml = $('.msg-text').last().html();
    var newText = msgTextHtml.replace(':smile','<img src="img/smile.svg">').replace(':+1','<img src="img/thumbup.svg">');
    $('.msg-text').last().html(newText);
  }

  // change input placeholder
  var count = 0
  setInterval(function(){
    count++;
    switch (count%3) {
      case 1:
        $('.msg-input').attr('placeholder', 'Hint: Type :smile to add smile emoji');
        break;
      case 2:
        $('.msg-input').attr('placeholder', 'Hint: Type :+1 to add thumb up emoji');
        break;
      default:
        $('.msg-input').attr('placeholder', 'Hint: Surround your text with # to highlight the msg, e.g. #text#');
    }
  }, 2000);

})
