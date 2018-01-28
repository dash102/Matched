


function getPrediction(){
    console.log('about to ajax');
    var json = {
        'hi': 'there'
    };
    $.ajax({
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(json),
        url: '/injuries/',
        success: function(data){
            console.log('success function running in frontend');
            console.log(data);
            $('#result').html(data.Prediction.predictedValue);
        },
        failure: function(result){
            console.log('error');
        error();
        }
    });
    // redirect to thank you
    // window.location.href = '/thanks';
}
$(document).ready(function(){
    document.getElementById("predict").onclick = function(){
        getPrediction()
    };
})
