




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
          // lead = $('#plead').val(),
          institute = $('#pinstitute').val(),
          description = $('#pdescription').val(),
          short_description = $('#pshort_description').val(),
          repoURL = $('#prepo').val(),
          project_url = $('#pproject_url').val(),
          info = $('#plinks').children(),
          g = $('#pgoals').find('input'),
          wanted = $('#pwanted').val().split(', '),
          active = $('#pactive').prop('checked'),
          links = [],
          goals = [];
      $(this).text('Saving...');

      $.map(info, function(val, i){
        var values = $(val).children('input'),
            title = $(values[0]).val();
        if(title){
          links.push({
            link: $(values[1]).val(),
            title: title
          });
        }
      });
      g.each(function(){
        if($(this).val()){
          goals.push($(this).val());
        }
      })
      $.ajax({
        url: $(this).data('href'),
        type:'POST',
        data: {
          project: {
            title: title,
            subjects: subjects,
            languages: languages,
            institute: institute,
            description: description,
            short_description: short_description,
            repoURL: repoURL,
            project_url: project_url,
            links: links,
            goals: goals,
            wanted: wanted
          }
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

