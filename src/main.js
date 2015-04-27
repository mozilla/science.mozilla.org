




(function(window, document, undefined){


  function slugify(text) {

    return text.toString().toLowerCase()
      .replace(/\s+/g, '-')        // Replace spaces with -
      .replace(/[^\w\-]+/g, '')   // Remove all non-word chars
      .replace(/\-\-+/g, '-')      // Replace multiple - with single -
      .replace(/^-+/, '')          // Trim - from start of text
      .replace(/-+$/, '');         // Trim - from end of text
  }

  function s3_upload(){
      var status_elem = document.getElementById("status");
      var url_elem = document.getElementById("pimage_url");
      var preview_elem = document.getElementById("preview");
      var s3upload = new S3Upload({
          file_dom_selector: 'files',
          s3_sign_put_url: '/sign_s3',
          s3_object_name: 'project_img',
          onProgress: function(percent, message) {
              status_elem.innerHTML = 'Upload progress: ' + percent + '% ' + message;
          },
          onFinishS3Put: function(public_url) {
              status_elem.innerHTML = 'Upload completed.';
              url_elem.value = public_url;
              preview_elem.innerHTML = '<img src="'+public_url+'" style="width:300px;" />';
          },
          onError: function(status) {
              status_elem.innerHTML = 'Upload error: ' + status;
          }
      });
  }

  $(document).ready(function(){

    var input_element = document.getElementById("files");
    if(input_element) input_element.onchange = s3_upload;

    $('#menu-button').click(function(){
      $('.pure-menu ul').toggleClass('display');
    })

    if(window.location.href.indexOf('#register') != -1) {
      $('#register').modal('show');
    }
    $('#githubModal').modal('show');
    $('#collaborate-admin-table').dataTable();
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

    $('#createaccount').click(function(){
      var tos = $('#tos');
      if(tos.prop('checked') === false){
        tos.parent().addClass('error');
        tos.focus();
      } else {
        var bio = $('#ubio').val();
        var return_to = $(this).data('return-to');
        $.ajax({
          url: $(this).data('href'),
          type:'POST',
          data: {
            bio: bio,
          },
          success: function(msg){
            // window.location.href = 'http://forum.mozillascience.org/session/sso?return_path=' + return_to;
            // window.location.href = return_to;
            window.location.href = '/auth/github';
          },
          error: function(xhr,status,error) {
            console.log(xhr);
          }
        });
      }
    })


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

    $('#delete').click(function(){
      var redirect = $(this).data('redirect') || "/collaborate";
      $.ajax({
        url: $(this).data('href'),
        type:'DELETE',
        success: function(msg){
          window.location.href = redirect;
        },
        error: function(xhr,status,error) {
          console.log(xhr);
        }
      });
    });

    $('#save-profile').click(function(){
      var bio = $('#bio').val(),
          user = $(this).data('person'),
          redirect = $(this).data('redirect') || "/";

      user.bio = bio;

      $.ajax({
        url: $(this).data('href'),
        type:'PUT',
        data: {
          user: user
        },
        success: function(msg){
          window.location.href = redirect;
        },
        error: function(xhr,status,error) {
          console.log(xhr);
        }
      });
    });


    $('#save-project').click(function(){
      var title = $('#ptitle').val(),
          subjects = $('#psubjects').val().split(', '),
          languages = $('#planguages').val().split(', '),
          institute = $('#pinstitute').val(),
          description = $('#pdescription').val(),
          short_description = $('#pshort_description').val(),
          project_url = $('#pproject_url').val(),
          status = $(this).data('value');
          info = $('#plinks').children(),
          g = $('#pgoals').find('textarea'),
          wanted = $('#pwanted').val().split(', '),
          active = $('#pactive').prop('checked'),
          links = [],
          image_url = $('#pimage_url').val(),
          repo = $('#prepo').val().split('/'),
          slug = $('#pslug') ? $('#pslug').val() : undefined,
          github = { user: repo[repo.length-2], repo: repo[repo.length-1] },
          redirect = "",
          license = $('input[name="license"]:checked').val(),
          hours = $('input[name="hours"]:checked').val(),
          scientific_need = $('#pscientific_need').val(),
          events = $('input[name="events"]:checked'),
          learning = $('#plearning').val(),
          goals = [];
      $(this).text('Saving...');

      if(!slug){
        slug = slugify(title);
        redirect = '/projects/' + slug + '/edit';
      }

      if(license === "Other") license = $('#license').val();

      if(status == "created") status = "submitted";
      status = $('input[name="status"]:checked').val() || status;

      events = $.map(events, function(val, i){
        return $(val).val();
      });


      $.map(info, function(val, i){
        var values = $(val).children('input'),
            title = $(values[1]).val();
        if(title){
          links.push({
            link: $(values[0]).val(),
            title: title
          });
        }
      });
      g.each(function(){
        if($(this).val()){
          goals.push($(this).val());
        }
      })

      var project = {
            title: title,
            subjects: subjects,
            languages: languages,
            institute: institute,
            description: description,
            short_description: short_description,
            github: github,
            project_url: project_url,
            links: links,
            goals: goals,
            image_url: image_url,
            wanted: wanted,
            scientific_need: scientific_need,
            learning: learning,
            hours: hours,
            license: license,
            slug: slug
      };

      if(status) {
        project['status'] = status;
      }

      if(events){
        project['events'] = events;
      }

      $.ajax({
        url: $(this).data('href'),
        type:'POST',
        data: {
          project: project
        },
        success: function(msg){
          redirect ? window.location.href = redirect : window.location.reload();
        },
        error: function(xhr,status,error) {
          console.log(xhr);
        }
      });
    })


  });

})(window, document);

