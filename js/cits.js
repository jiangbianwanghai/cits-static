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