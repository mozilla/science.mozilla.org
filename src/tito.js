 var myData;

  Tito.on('registration:complete', function(data){
    var github;
    data.tickets[0].answers.map(
      function(item){
        if (item.question == 'GitHub id')
          github = item.response;
    });
    $.ajax({
      url: '/api/events/toronto-open-science-code-sprint-2015/register',
      type:'POST',
      data: {
        github_id: github
      },
      success: function(msg){
        window.location.reload();
      },
      error: function(xhr,status,error) {
        console.log(xhr);
      }
    });

  })