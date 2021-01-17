$(document).ready(function(){
	$("#data_content").empty();
	list_wo('');
})

$('#refresh').on('click',function(){
	$("#data_content").empty();
	list_wo('');
})

$('#back').on('click',function(){
	$("#refresh").show();
	$("#data_content").empty();
	var assetid='';
	assetid = $('#assetid').val();
	list_wo('');
})

function list_wo(assetid){
	$('#cam_inv').show();
	$('#back').hide();
	$('#save').hide();
	var assetid = assetid;
	$.ajax({
        type: "POST",
        url:glo_url+"wo.php",
        data:{'assetid':assetid,'wo':'wo'},
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
}

function update_state_wo(wo){
	$('#cam_inv').hide();
	$('#back').show();
	var dataString = 'woid='+wo; 
    //--------Hapus id list WO--------------
    $("#data_content").empty();
    $.ajax({
        type: "POST",
        url:glo_url+"detail_wo.php",
        data:dataString,
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
}

//========Ketika scan qr code diaktifkan------
$("#cam_inv").click(function(){
        /*scanner plugin*/
		$("#data_content").empty();
		cordova.plugins.barcodeScanner.scan(
            function(result){ 
                if(!result.cancelled){
                    var id = result.text; 
					$('#assetid').val(id);
                    list_wo(id);        
                }
                else{
                    alert("You have cancelled scan");	
                }
            },
            function(error){
                    alert("Scanning failed: "+error);
            }
		)
})