jQuery(document).ready(function() {

   "use strict";

   //添加项目团队信息
   $("#addProject").submit(function(){
      $(this).ajaxSubmit({
         type:"POST",
         url: "/project/add_ajax",
         dataType: "JSON",
         beforeSubmit:validFormProject,
         success:callBackProject
      });
      return false;
   });

   //Check
  jQuery('.ckbox input').click(function(){
      var t = jQuery(this);
      if(t.is(':checked')){
          t.closest('tr').addClass('selected');
      } else {
          t.closest('tr').removeClass('selected');
      }
  });

  //读取提醒
  setTimeout(function () {
    $.ajax({
      type: "GET",
      url: "/dashboard/get_notify",
      dataType: "JSON",
      success: function(data){
        if (data.total) {
          blink('#bell');
          $("#notify-total").append('<span class="badge">'+data.total+'</span>');
          var notify_list = '';
          for(var p in data.datas){
            notify_list += '<li class="new"><span class="thumb"><img src="http://avatar.cits.gongchang.net/'+data.datas[p].log_sender_username+'.jpg" alt="发送者：'+data.datas[p].log_sender_realname+'" /></span><span class="desc"><span class="name">'+data.datas[p].log_sender_realname+' <span class="badge badge-success">未读</span></span><span class="msg"><a href="'+data.datas[p].log_url+'">'+data.datas[p].log_action+'了一个'+data.datas[p].log_target_type+'#'+data.datas[p].log_subject+'</a></span></span></li>';
          }
          $("#notify-content").append('<div class="dropdown-menu dropdown-menu-head pull-right"><h5 class="title">你有'+data.total+'个新提醒</h5><ul class="dropdown-list gen-list">'+notify_list+'<li class="new"><a href="/notify">查看所有通知</a></li></ul></div>');
        }
      }
    });
  }, 0);

});

//验证项目表单
function validFormProject(formData,jqForm,options){
  return $("#addProject").valid();
}

//项目表单回调函数
function callBackProject(data) {
  $("#btnSubmit-project").attr("disabled", true);
  if(data.status){
    jQuery.gritter.add({
      title: '提醒',
      text: data.message,
        class_name: 'growl-success',
      sticky: false,
      time: ''
    });
    setTimeout(function(){
      location.href = window.location.href;
    }, 1000);
  } else {
    jQuery.gritter.add({
      title: '提醒',
      text: data.message,
        class_name: 'growl-danger',
      sticky: false,
      time: ''
    });
    setTimeout(function(){
      location.href = window.location.href;
    }, 3000);
  }
}

function blink(selector){
  $(selector).fadeOut('slow', function(){
    $(this).fadeIn('slow', function(){
      blink(this);
    });
  });
}