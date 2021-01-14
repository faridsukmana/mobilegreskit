var form_list = false;

$(document).ready(function(){
	$("#data_content").empty();
	list_checklist('');
})

$('#refresh').on('click',function(){
	$("#data_content").empty();
	list_checklist('');
})

//===========Tombol Back============//
$('#back').on('click',function(){
	$("#data_content").empty();
	list_checklist('');	
})

//==========Tombol Save ===============//
$('#save').on('click',function(){
	var total_list = $('#listcount').val();
	var list=new Array();
	var value=new Array();
	//alert($('#list_'+1).attr('name'));
	for(var i=0; i<total_list; i++){
		list[i]=$('#list_'+i).attr('name');
		value[i]=$('#list_'+i).val();
	}
	var id_checklist = JSON.stringify(list);
	var id_value = JSON.stringify(value);
	var id_history = $('#history').val();
	var type = $('#type').val();
	var dataHis = {'id_checklist':id_checklist, 'id_value':id_value, 'id_history':id_history, 'type':type}; //alert(id_checklist);
	
	$.ajax({
        type: "POST",
        url:glo_url+"update_daily_checklist.php",
        data:dataHis,
        crossDomain:true,
        cache:false,
        beforeSend: function(){
            loading('Please wait...');
        },
        success:function(data){
            closeLoading();
            alert(data);
        }
    })
	
})

//==============Form PM==================
$('#form').on('click',function(){
	get_form_data();
})

//=============Daftar Checklist=================
function list_checklist(assetid){
	$('#cam_inv').show();
	$('#back').hide();
	$('#form').hide();
	$('#save').hide();
	var assetid = assetid;
	$.ajax({
        type: "POST",
        url:glo_url+"checklist.php",
        data:{'assetid':assetid},
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

//===============From Checklist=====================
function form_checklist(id,asset){
	$('#cam_inv').hide();
	$('#back').show();
	$('#save').show(); 
	var dataString = 'id='+id+'&asset='+asset;  
    //--------Hapus id list WO--------------
    $("#data_content").empty();
	
    $.ajax({
        type: "POST",
        url:glo_url+"form_checklist.php",
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

function form_checklist_asset(asset){
	$('#cam_inv').hide();
	$('#back').show();
	$('#save').show(); 
	var dataString = 'id=no&asset='+asset;  
    //--------Hapus id list WO--------------
    $("#data_content").empty();
	
    $.ajax({
        type: "POST",
        url:glo_url+"form_checklist.php",
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
        //form_checklist_asset('AS000568');
		/*scanner plugin*/
		$("#data_content").empty();
		cordova.plugins.barcodeScanner.scan(
            function(result){ 
                if(!result.cancelled){
                    var id = result.text; 
					$('#assetid').val(id);
                    form_checklist_asset(id);       
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