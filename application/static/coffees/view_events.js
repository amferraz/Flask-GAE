// Generated by CoffeeScript 1.5.0
(function() {
  var ViewEventChat, ViewEvents, ViewEventsPost;

  ViewEventsPost = (function() {
    /*
    event of views /posts
    */

    function ViewEventsPost() {
      this.create_post();
      this.delete_post();
      return this;
    }

    ViewEventsPost.prototype.create_post = function() {
      /*
      create a post
      :param url: $(@).attr('action')
      :param data: $(@).serialize()
      */
      return $(document).on('submit', 'form#form_create_post', function() {
        if (!core.validation($(this))) {
          return false;
        }
        $.ajax({
          type: 'post',
          url: $(this).attr('action'),
          data: $(this).serialize(),
          dataType: 'json',
          cache: false,
          beforeSend: function() {
            return core.loading_on();
          },
          error: function() {
            core.loading_off();
            return core.error_message();
          },
          success: function(result) {
            core.loading_off();
            if (result.success) {
              return core.miko({
                href: location.href
              }, false);
            } else {
              return KNotification.pop({
                title: 'Failed',
                message: 'Please check again.'
              });
            }
          }
        });
        return false;
      });
    };

    ViewEventsPost.prototype.delete_post = function() {
      /*
      delete the post
      :param url: $(@).attr('href')
      */
      return $(document).on('click', 'a.delete_post', function() {
        $.ajax({
          type: 'delete',
          url: $(this).attr('href'),
          dataType: 'json',
          cache: false,
          beforeSend: function() {
            return core.loading_on();
          },
          error: function() {
            core.loading_off();
            return core.error_message();
          },
          success: function(result) {
            core.loading_off();
            if (result.success) {
              return core.miko({
                href: location.href
              }, false);
            } else {
              return KNotification.pop({
                title: 'Failed!',
                message: 'You could not delete this post.'
              });
            }
          }
        });
        return false;
      });
    };

    return ViewEventsPost;

  })();

  ViewEventChat = (function() {
    /*
    event of views /chat
    */

    function ViewEventChat() {
      this.send_msg();
      return this;
    }

    ViewEventChat.prototype.send_msg = function() {
      return $(document).on('submit', 'form#form_chat_input', function() {
        var chat_token;
        chat_token = window.sessionStorage['chat_token'];
        $.ajax({
          type: 'post',
          url: $(this).attr('action'),
          dataType: 'json',
          cache: false,
          data: {
            token: chat_token,
            msg: $('#chat_msg').val(),
            name: $('#chat_name').val()
          },
          success: function(result) {
            if (result.success) {
              return $('#chat_msg').val('');
            }
          }
        });
        return false;
      });
    };

    return ViewEventChat;

  })();

  ViewEvents = (function() {

    function ViewEvents() {
      new ViewEventsPost();
      new ViewEventChat();
      return this;
    }

    return ViewEvents;

  })();

  $(function() {
    core.setup_nav();
    core.setup_link();
    core.setup_enter_submit();
    window.onpopstate = function(e) {
      return core.pop_state(e.state);
    };
    new ViewEvents();
    return core.after_page_loaded();
  });

}).call(this);
