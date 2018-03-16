function get_campaigns_flag() {

    return new Promise(function (solve,reject, onCancel){

        var bool = localStorage.getItem('campaigns_flag') == 'true';

        solve(bool);
    });
}

function get_new_images_flag(url) {

        var bool = localStorage.getItem(url) == 'true';

        return bool;
}
