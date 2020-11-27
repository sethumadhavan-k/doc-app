



function init(){
    $('.showModalEle').off('click').on('click',function () {
        let ele = $(this);
        let url = $(ele).data('url');
        let title = $(ele).data('title');
        let size = $(ele).data('size') == undefined ?'default':$(ele).data('size');
        //let callback = $(ele).data('callback') == undefined ?null:$(ele).data('callback');
        showModal(url,null,title,size);
    });

    $('.ajaxEle').off('click').on('click',function () {
        let ele = $(this);
        let url = $(ele).data('url');
        let callback = $(ele).data('callback') == undefined ?null:$(ele).data('callback');
        ajaxCall(url,'GET',null,function(response){
            if(callback)
                window[callback](response);
        });

    });

    $('.ajaxConfirmEle').off('click').on('click',function () {
        let ele = $(this);
        let url = $(ele).data('url');
        let title = $(ele).data('title')?$(ele).data('title'):"Are You Sure";
        let type = $(ele).data('method')?$(ele).data("method"):'GET';
        let callback = $(ele).data('callback') == undefined ?null:$(ele).data('callback');
        if(confirm(title)){
        //confirmBox(title,"",function () {
            ajaxCall(url,type,null,function(response){
                if(callback)
                    window[callback](response);
            });
        }
      });

    $('#country').off('change').on('change',function(){
        let value = $(this).val();
        ajaxCall('https://api.wetradeapps.com/v1/country/'+value+'/state','GET','',function(response){
            let states = response.data;
            $('#state').find('option').remove();  
            $('#country').select2();
            for(state of states) {
               $('#state').append('<option value="'+state.id+'">'+state.name+'</option>')
            }
        })
    })

    $('form').off('submit').on('submit',function (e) {
        e.preventDefault();
        let url = $(this).attr('action');
        let type = $(this).attr('method');
        let callback = $(this).data('callback') == undefined ?null:$(this).data('callback');
        let data = $(this).serialize();
        var reload = true;
        var thisform = this;
        var formData = new FormData(this);
        if($(this).data('reload') != undefined)
            if($(this).data('reload') == true)
                reload = true
            else
                reload = false
        else
            reload = true
    
        console.log(reload)
        console.log('formdata',formData)
        console.log('formdata-2',formData.entries())
        console.log('formdata-3',Object.fromEntries(formData.entries()))
        data = Object.fromEntries(formData.entries())
        ajaxCall(url,type, data ,function (response,status,xhr) {
            //response = JSON.parse(response);
            // console.log(response)
            if (response.status === true){
                if(callback)
                    window[callback](response);
                successMessage(response)
                location.reload()
            }
            else if(response.status === "invalid")
                console.log(response.data);
            else
                errorMessage(response.message)
        });
    
    })
    $('.remove-ajax').off('submit');

    $('a.loader').on('click',function(){
        showLoader();
    });
}
init();

function showLoader() {
    $('body').addClass('loading')
    $('#loader').show();
}

function hideLoader() {
    $('#loader').hide();
    $('body').removeClass('loading')
}


function slientAjaxCall(url, type, data, callback = false) {
    showLoader();
    url = url.replace(/\/$/, '');
    $.ajax({
        url : url,
        type : type,
        data : data,
        processData: false,
        contentType: false,
        success : function (response,status,xhr) {
            hideLoader();
            if(callback)
                callback(response,status,xhr);
        },
        error : function (response,status,xhr) {
            hideLoader();
            console.log(response);
            errorMessage(response.statusText)
        }
    })

}


function ajaxCall(url, type, data, callback) {
    showLoader();
    console.log(url)
    url = url.replace(/\/$/, '');
    $.ajax({
        url : url,
        type : type,
        data : data,
        // processData: false,
        // contentType : "application/json",
        success : function (response,status,xhr) {
            hideLoader();
            if(typeof(callback) === "undefined")
                if(response.status === "success")
                    successMessage(response);
                else
                    errorMessage(response);
            else
                callback(response,status,xhr);
        },
        error : function (response,status,xhr) {
            hideLoader();
            console.log(response);
            errorMessage(response.statusText)
        }
    })

}

function showModal(url=null,callback=null,title='Modal',size) {
    if(url == null)
        return "URL not given";

    showLoader();
    $('#modal_header').text(title);
    $('.modal-dialog').removeClass('modal-lg');
    $('#body_content').load(url,function (response,status,xhr) {
        if(size != "default")
            $('.modal-dialog').addClass('modal-lg');
        $('#modal').modal({backdrop: 'static',});
        if(callback !== null)
            callback();
        hideLoader();
        load();
    })

}

function errorMessage(message){
    tata.error('Error',message)
}

function successMessage(res){
    tata.success('Success',res.message)
}


$(document).ready(function(){
   hideLoader(); 
})
