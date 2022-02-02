$(document).ready(function() {
    var yerler  = $.getJSON("/api/yerler");

    yerler
    .then(yerlerEkle);

    $('#ourInput').keypress((e) => {
        if(e.which == 13){
            yeniSehirEkle();
        }
    })

    $('.places').on('click','.far', function() {
        var clicked = $(this).parent().parent();

        var deletedURL = '/api/yerler/' + clicked.data('id');

        $.ajax({
            method:'DELETE',
            url:deletedURL
        })
        .then((deletedData) => {
            console.log(deletedData)
            clicked.remove();
        })
    });

    $('.places').on('click','li',function() {
        ziyaretDurumuGuncelle($(this))
    });
});

function yerlerEkle(yerler) {
    yerler.forEach(yer => {
        yerEkle(yer)
    });
}

function yerEkle(yer) {
    var yeniYer = $('<li class="ourPlaces">' + yer.isim +  '<span> <i class="far fa-trash-alt" aria-hidden="true"></i></span> </li>')

    //Silinmesi için gereken gizli bir id
    yeniYer.data('id',yer._id);

    //Ziyaret edilme durumu kontrol
    yeniYer.data('visitingStatus',yer.ziyaret);

    if (yer.ziyaret == true) {
        $(yeniYer).addClass('visited');
    }

    $('.places').append(yeniYer);
}

function yeniSehirEkle() {
    var yeniSehir = $('#ourInput').val();
   
    $.post('/api/yerler',{isim: yeniSehir})
    .then((yeniEklenenSehir) => {
        yerEkle(yeniEklenenSehir);
        $('#ourInput').val('');
    })
}

function ziyaretDurumuGuncelle(yer) {
    var updatedURL = '/api/yerler/' + yer.data('id');
    var visitingStatus = yer.data('visitingStatus');

    var update = {ziyaret: !visitingStatus};

    $.ajax({
        method:'PUT',
        url:updatedURL,
        data:update
    }) 
    .then((updatedPlace) => {
        console.log(updatedPlace);
        yer.toggleClass('visited');
        yer.data('visitingStatus',!visitingStatus)
    });
}