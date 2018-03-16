function selected(self) {

    id = "#" + self.id;

    $(id).addClass("selected").siblings().removeClass("selected");
};

function selected_sel_ann(self) {

    id = "#" + self.id;

    $(".selected").removeClass("selected");

    $(id).addClass("selected").siblings().removeClass("selected");

    $("#task_img").attr('src', '');
};
