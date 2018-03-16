function enable_button(type) {

  if(type = "workers"){

    $("#enable_selector_btn").prop("disable",false);
    $("#disable_selector_btn").prop("disable",false);
    $("#enable_annotator_btn").prop("disable",false);
    $("#disable_annotator_btn").prop("disable",false);
  }

  else if(type = "images"){

    $("#form_btn").prop("disable",false);
  }
}

function disable_button(type) {

  if(type = "workers"){

    $("#enable_selector_btn").prop("disable",true);
    $("#disable_selector_btn").prop("disable",true);
    $("#enable_annotator_btn").prop("disable",true);
    $("#disable_annotator_btn").prop("disable",true);
  }

  else if(type = "images"){

    $("#form_btn").prop("disable",true);
  }
}

function close_modal() {

  $('#edit_modal').modal('toggle');
}

function disable(id){

  document.getElementById(id).disabled = true;
}
