App.bootstrap = function() {

    $.ajax({
        url: "/bootstrap",

        dataType: "json",

        success: function(data, textStatus, jqXHR) {
            App.Widget.setBackground(data.background);
            console.log(data);
        },

        error: function(jqXHR, textStatus, errorThrown) {
            console.log(data);
            alert("BOOTSTRAP ERROR! mail@minecraft.pt");
        }
    });
};

App.saveState()
App.bootstrap();