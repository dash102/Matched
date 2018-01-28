
function isAuthorized(){
    return ((getPerpetrator() != '') &
            (getName() != '') &
            (getEmail() != '') &
            (getSituation() != ''));
}

function getPerpetrator(){
    return $('#perpetrator-description').val();
}

function getEvidence(){
    return $('#evidence-description').val();
}

function getSituation(){
    return $('#situation-description').val();
}

function getName(){
    return $('#name').val();
}

function getEmail(){
    return $('#email').val();
}

function getNumber(){
    return $('#number').val();
}

function getAdditional(){
    return $('#additional').val();
}

permissions = {
    'police': false,
    'harvard': false,
    'employers': false
}

function toggle(input){
    console.log('toggle called')
    permissions[input] = !permissions[input]
}


function formSubmit(){
    console.log('about to ajax');
    if (isAuthorized()){
        var json = {
            accuser: getName(),
            email: getEmail(),
            situation: getSituation(),
            evidence: getEvidence(),
            perpetrator: getPerpetrator(),
            police: permissions['police'],
            harvard: permissions['harvard'],
            employers: permissions['employers']
        };
        $.ajax({
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(json),
            url: '/accuse/',
            success: function(data){},
            failure: function(result){
            error();
            }
        });
        // redirect to thank you
        window.location.href = '/thanks';
    }
    else {
        // TODO: Say with whom the conversation was.
        $('.error-warn').html('All fields must be filled out.');
    }
}
$(document).ready(function(){
    document.getElementById("submit").onclick = function (){
        formSubmit()
    };
})
