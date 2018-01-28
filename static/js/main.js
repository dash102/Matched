


function getPrediction(){
    console.log('about to ajax');
    var json = {
        'hi': 'there'
    };
    $.ajax({
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(json),
        url: '/injuries/',
        success: function(data){
            $('#result').html(data);
        },
        failure: function(result){
        error();
        }
    });
    // redirect to thank you
    window.location.href = '/thanks';
}
$(document).ready(function(){
    document.getElementById("predict").onclick = function(){
        getPrediction()
    };
})
