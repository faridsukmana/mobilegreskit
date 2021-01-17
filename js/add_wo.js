$('#addwo').on('click',function(){
	$('#refresh').hide();
	$('#cam_inv').hide();
	$('#back').show();
	$('#save').show();
	$('#data_content').empty();
	
	$.ajax({
        type: "POST",
        url:glo_url+"form_request.php",
        data:{'form':'wo'},
        crossDomain:true,
        cache:false,
        beforeSend: function(){
            loading('Please wait...');
        },
        success:function(data){
            closeLoading();
            $("#data_content").append(data);
        }
    })
})