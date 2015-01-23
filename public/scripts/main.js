




(function(window, document, undefined){



  $(document).ready(function(){
    $('#menu-button').click(function(){
      $('.pure-menu ul').toggleClass('display');
    })




    $('#leave').click(function(){
      $.ajax({
        url: $(this).data('href'),
        type:'GET',
        success: function(msg){
          window.location.reload();
        },
        error: function(xhr,status,error) {
          console.log(xhr);
        }
      })
    });


    $('#join').click(function(){
      $('#join-project').show();
      $(this).hide();
    });


    $('#submit-project').click(function(){
      var text = $('#helptext').val(),
          fork = $('#fork').prop('checked'),
          star = $('#star').prop('checked');
      $.ajax({
        url: $(this).data('href'),
        type:'POST',
        data: {
          text: text,
          fork: fork,
          star: star
        },
        success: function(msg){
          window.location.reload();
        },
        error: function(xhr,status,error) {
          console.log(xhr);
        }
      });
    })


    $('#save-project').click(function(){
      var title = $('#ptitle').val(),
          subjects = $('#psubjects').val().split(', '),
          languages = $('#planguages').val().split(', '),
          lead = $('#plead').val(),
          institute = $('#pinstitute').val(),
          who = $('#pwho').val(),
          what = $('#pwhat').val(),
          tweetable = $('#ptweetable').val(),
          repoURL = $('#prepo').val(),
          pageURL = $('#ppage').val(),
          info = $('#pmoreinfo').children(),
          g = $('#pgoals').find('input'),
          wanted = $('#pwanted').val().split(', '),
          active = $('#pactive').prop('checked'),
          moreInfo = [],
          goals = [];
      $(this).text('Saving...');

      $.map(info, function(val, i){
        var values = $(val).children('input'),
            title = $(values[0]).val();
        if(title){
          moreInfo.push({
            link: $(values[1]).val(),
            title: title
          });
        }
      });
      g.each(function(){
        goals.push($(this).val());
      })
      $.ajax({
        url: $(this).data('href'),
        type:'POST',
        data: {
          title: title,
          subjects: subjects,
          languages: languages,
          lead: lead,
          institute: institute,
          who: who,
          what: what,
          tweetable: tweetable,
          repoURL: repoURL,
          pageURL: pageURL,
          moreInfo: moreInfo,
          goals: goals,
          wanted: wanted,
          inactive: (!active)
        },
        success: function(msg){
          window.location.reload();
        },
        error: function(xhr,status,error) {
          console.log(xhr);
        }
      });
    })


  });

})(window, document);

