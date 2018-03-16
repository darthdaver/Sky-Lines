/*@@@@@@@@@@ PASSWORD PLACEHOLDER @@@@@@@@@@*/

function set_placeholder(inputId,place_str,style_color){

  var len = document.getElementById(inputId).value.length;

  if(len > 0){

    document.getElementById(inputId).removeAttribute('placeholder');
    document.getElementById(inputId).style.color = style_color;
  }

  else{

    document.getElementById(inputId).setAttribute('placeholder',place_str);
  }
}

function set_placeholder_after_change(inputId,place_str,style_color){

  var len = document.getElementById(inputId).value.length;

  if(place_str == 'Fullname'){

    document.getElementById(inputId).classList.remove("std_ph_red_0");
    document.getElementById(inputId).classList.add("std_ph_blue_0");
    document.getElementById(inputId).style.color = style_color;

    if(len == 0){

      document.getElementById(inputId).setAttribute('placeholder',place_str);
    }
  }

  else if (place_str == 'Password') {

    document.getElementById(inputId).classList.remove("std_ph_red_2");
    document.getElementById(inputId).classList.add("std_ph_blue_2");
    document.getElementById(inputId).style.color = style_color;


    if(len == 0){

      document.getElementById(inputId).setAttribute('placeholder',place_str);
    }
  }

  else if (place_str == 'Username') {

    document.getElementById(inputId).classList.remove("std_ph_red_1");
    document.getElementById(inputId).classList.add("std_ph_blue_1");
    document.getElementById(inputId).style.color = style_color;

    if(len == 0){

      document.getElementById(inputId).setAttribute('placeholder',place_str);
    }
  }
}


/*@@@@@@@@@@ SIGN UP PLACEHOLDERS @@@@@@@@@@*/

function sign_up_set_placeholder_red(ids,placeholders){

  var fullname_len = document.getElementById(ids['fullname']).innerHTML.length;
  var username_len = document.getElementById(ids['username']).innerHTML.length;
  var password_len = document.getElementById(ids['password']).innerHTML.length;

  if(fullname_len > 0){

    document.getElementById("sign-up-form_field_0").classList.remove("sign_up_ph_blue_0");
    document.getElementById("sign-up-form_field_0").classList.add("sign_up_ph_red_0");
    document.getElementById("sign-up-form_field_0").style.color = "#c40000";
  }

  else{

    document.getElementById("sign-up-form_field_0").classList.remove("sign_up_ph_red_0");
    document.getElementById("sign-up-form_field_0").classList.add("sign_up_ph_blue_0");
    document.getElementById("sign-up-form_field_0").style.color = "#020037";
  }

  if(password_len > 0){

    document.getElementById("sign-up-form_field_2").classList.remove("sign_up_ph_blue_2");
    document.getElementById("sign-up-form_field_2").classList.add("sign_up_ph_red_2");
    document.getElementById("sign-up-form_field_2").style.color = "#c40000";
  }

  else{

    document.getElementById("sign-up-form_field_2").classList.remove("sign_up_ph_red_2");
    document.getElementById("sign-up-form_field_2").classList.add("sign_up_ph_blue_2");
    document.getElementById("sign-up-form_field_2").style.color = "#020037";
  }

  if(username_len > 0){

    document.getElementById("sign-up-form_field_1").classList.remove("sign_up_ph_blue_1");
    document.getElementById("sign-up-form_field_1").classList.add("sign_up_ph_red_1");
    document.getElementById("sign-up-form_field_1").style.color = "#c40000";
  }

  else{

    document.getElementById("sign-up-form_field_1").classList.remove("sign_up_ph_red_1");
    document.getElementById("sign-up-form_field_1").classList.add("sign_up_ph_blue_1");
    document.getElementById("sign-up-form_field_1").style.color = "#020037";
  }
}


function set_placeholder_after_change_sign(inputId,place_str,style_color){

  var len = document.getElementById(inputId).value.length;

  if(place_str == 'Fullname'){

    document.getElementById(inputId).classList.remove("sign_up_ph_red_0");
    document.getElementById(inputId).classList.add("sign_up_ph_blue_0");
    document.getElementById(inputId).style.color = style_color;


    if(len == 0){

      document.getElementById(inputId).setAttribute('placeholder',place_str);
    }
  }

  else if (place_str == 'Password') {

    document.getElementById(inputId).classList.remove("sign_up_ph_red_2");
    document.getElementById(inputId).classList.add("sign_up_ph_blue_2");
    document.getElementById(inputId).style.color = style_color;

    if(len == 0){

      document.getElementById(inputId).setAttribute('placeholder',place_str);
    }
  }

  else if (place_str == 'Username') {

    document.getElementById(inputId).classList.remove("sign_up_ph_red_1");
    document.getElementById(inputId).classList.add("sign_up_ph_blue_1");
    document.getElementById(inputId).style.color = style_color;

    if(len==0) {

      document.getElementById(inputId).setAttribute('placeholder',place_str);
    }
  }
}


/*@@@@@@@@@@ LOG IN PLACEHOLDERS @@@@@@@@@@*/

function log_in_set_placeholder_red(ids,placeholders){

  var username_len = document.getElementById(ids['username']).innerHTML.length;
  var password_len = document.getElementById(ids['password']).innerHTML.length;

  if(username_len > 0){

    document.getElementById("log-in-form_field_1").classList.remove("log_in_ph_white_1");
    document.getElementById("log-in-form_field_1").classList.add("log_in_ph_red_1");
    document.getElementById("log-in-form_field_1").style.color = "#c40000";
  }

  else{

    document.getElementById("log-in-form_field_1").classList.remove("log_in_ph_red_1");
    document.getElementById("log-in-form_field_1").classList.add("log_in_ph_white_1");
    document.getElementById("log-in-form_field_1").style.color = "#fff";
  }

  if(password_len > 0){

    document.getElementById("log-in-form_field_2").classList.remove("log_in_ph_white_2");
    document.getElementById("log-in-form_field_2").classList.add("log_in_ph_red_2");
    document.getElementById("log-in-form_field_2").style.color = "#c40000";
  }

  else{

    document.getElementById("log-in-form_field_2").classList.remove("log_in_ph_red_2");
    document.getElementById("log-in-form_field_2").classList.add("log_in_ph_white_2");
    document.getElementById("log-in-form_field_2").style.color = "#fff";
  }
}


function set_placeholder_after_change_log(inputId,place_str,style_color){

  var len = document.getElementById(inputId).value.length;

  if(place_str == 'Username'){

    document.getElementById(inputId).classList.remove("log_in_ph_red_1");
    document.getElementById(inputId).classList.add("log_in_ph_white_1");
    document.getElementById(inputId).style.color = style_color;

    if(len == 0) {

      document.getElementById(inputId).setAttribute('placeholder',place_str);
    }
  }

  else if (place_str == 'Password') {

    document.getElementById(inputId).classList.remove("log_in_ph_red_2");
    document.getElementById(inputId).classList.add("log_in_ph_white_2");
    document.getElementById(inputId).style.color = style_color;

    if(len == 0){

      document.getElementById(inputId).setAttribute('placeholder',place_str);
    }
  }
}


/*@@@@@@@@@@ CREATE CAMPAIGN PLACEHOLDERS @@@@@@@@@@*/

function create_campaign_set_placeholder_red(ids,placeholders){

  var ann_rep_len = document.getElementById(ids['annotation_replica']).innerHTML.length;
  var ann_size_len = document.getElementById(ids['annotation_size']).innerHTML.length;
  var name_len = document.getElementById(ids['name']).innerHTML.length;
  var sel_rep_len = document.getElementById(ids['selection_replica']).innerHTML.length;
  var threshold_len = document.getElementById(ids['threshold']).innerHTML.length;

  if(ann_rep_len > 0){

    document.getElementById("master-create-campaign-form_field_0").classList.remove("std_ph_blue_0");
    document.getElementById("master-create-campaign-form_field_0").classList.add("std_ph_red_0");
    document.getElementById("master-create-campaign-form_field_0").style.color = "#c40000";
  }

  else{

    document.getElementById("master-create-campaign-form_field_0").classList.remove("std_ph_red_0");
    document.getElementById("master-create-campaign-form_field_0").classList.add("std_ph_blue_0");
    document.getElementById("master-create-campaign-form_field_0").style.color = "#020037";
  }

  if(ann_size_len > 0){

    document.getElementById("master-create-campaign-form_field_1").classList.remove("std_ph_blue_1");
    document.getElementById("master-create-campaign-form_field_1").classList.add("std_ph_red_1");
    document.getElementById("master-create-campaign-form_field_1").style.color = "#c40000";
  }

  else{

    document.getElementById("master-create-campaign-form_field_1").classList.remove("std_ph_red_1");
    document.getElementById("master-create-campaign-form_field_1").classList.add("std_ph_blue_1");
    document.getElementById("master-create-campaign-form_field_1").style.color = "#020037";
  }

  if(name_len > 0){

    document.getElementById("master-create-campaign-form_field_2").classList.remove("std_ph_blue_2");
    document.getElementById("master-create-campaign-form_field_2").classList.add("std_ph_red_2");
    document.getElementById("master-create-campaign-form_field_2").style.color = "#c40000";
  }

  else{

    document.getElementById("master-create-campaign-form_field_2").classList.remove("std_ph_red_2");
    document.getElementById("master-create-campaign-form_field_2").classList.add("std_ph_blue_2");
    document.getElementById("master-create-campaign-form_field_2").style.color = "#020037";
  }

  if(sel_rep_len > 0){

    document.getElementById("master-create-campaign-form_field_3").classList.remove("std_ph_blue_3");
    document.getElementById("master-create-campaign-form_field_3").classList.add("std_ph_red_3");
    document.getElementById("master-create-campaign-form_field_3").style.color = "#c40000";
  }

  else{

    document.getElementById("master-create-campaign-form_field_3").classList.remove("std_ph_red_3");
    document.getElementById("master-create-campaign-form_field_3").classList.add("std_ph_blue_3");
    document.getElementById("master-create-campaign-form_field_3").style.color = "#020037";
  }

  if(threshold_len > 0){

    document.getElementById("master-create-campaign-form_field_4").classList.remove("std_ph_blue_4");
    document.getElementById("master-create-campaign-form_field_4").classList.add("std_ph_red_4");
    document.getElementById("master-create-campaign-form_field_4").style.color = "#c40000";
  }

  else{

    document.getElementById("master-create-campaign-form_field_4").classList.remove("std_ph_red_4");
    document.getElementById("master-create-campaign-form_field_4").classList.add("std_ph_blue_4");
    document.getElementById("master-create-campaign-form_field_4").style.color = "#020037";
  }
}


function set_placeholder_after_change_create(inputId,place_str,style_color){

  var len = document.getElementById(inputId).value.length;

  if(place_str == 'Annotation Replica'){

    document.getElementById(inputId).classList.remove("std_ph_red_0");
    document.getElementById(inputId).classList.add("std_ph_blue_0");
    document.getElementById(inputId).style.color = style_color;

    if(len == 0){

      document.getElementById(inputId).setAttribute('placeholder',place_str);
    }
  }

  else if (place_str == 'Annotation Size') {

    document.getElementById(inputId).classList.remove("std_ph_red_1");
    document.getElementById(inputId).classList.add("std_ph_blue_1");
    document.getElementById(inputId).style.color = style_color;

    if(len == 0){

      document.getElementById(inputId).setAttribute('placeholder',place_str);
    }
  }

  else if (place_str == 'Name') {

    document.getElementById(inputId).classList.remove("std_ph_red_2");
    document.getElementById(inputId).classList.add("std_ph_blue_2");
    document.getElementById(inputId).style.color = style_color;

    if(len == 0){

      document.getElementById(inputId).setAttribute('placeholder',place_str);
    }
  }

  else if (place_str == 'Selection Replica') {

    document.getElementById(inputId).classList.remove("std_ph_red_3");
    document.getElementById(inputId).classList.add("std_ph_blue_3");
    document.getElementById(inputId).style.color = style_color;

    if(len == 0){

      document.getElementById(inputId).setAttribute('placeholder',place_str);
    }
  }

  else if (place_str == 'Threshold') {

    document.getElementById(inputId).classList.remove("std_ph_red_4");
    document.getElementById(inputId).classList.add("std_ph_blue_4");
    document.getElementById(inputId).style.color = style_color;

    if(len == 0){

      document.getElementById(inputId).setAttribute('placeholder',place_str);
    }
  }
}


/*@@@@@@@@@@ EDIT CAMPAIGN PLACEHOLDERS @@@@@@@@@@*/

function edit_campaign_set_placeholder_red(ids,placeholders){

  var ann_rep_len = document.getElementById(ids['annotation_replica']).innerHTML.length;
  var ann_size_len = document.getElementById(ids['annotation_size']).innerHTML.length;
  var name_len = document.getElementById(ids['name']).innerHTML.length;
  var sel_rep_len = document.getElementById(ids['selection_replica']).innerHTML.length;
  var threshold_len = document.getElementById(ids['threshold']).innerHTML.length;

  if(ann_rep_len > 0){

    document.getElementById("edit-campaign-form_field_0").classList.remove("std_ph_blue_0");
    document.getElementById("edit-campaign-form_field_0").classList.add("std_ph_red_0");
    document.getElementById("edit-campaign-form_field_0").style.color = "#c40000";
  }

  else{

    document.getElementById("edit-campaign-form_field_0").classList.remove("std_ph_red_0");
    document.getElementById("edit-campaign-form_field_0").classList.add("std_ph_blue_0");
    document.getElementById("edit-campaign-form_field_0").style.color = "#020037";
  }

  if(ann_size_len > 0){

    document.getElementById("edit-campaign-form_field_1").classList.remove("std_ph_blue_1");
    document.getElementById("edit-campaign-form_field_1").classList.add("std_ph_red_1");
    document.getElementById("edit-campaign-form_field_1").style.color = "#c40000";
  }

  else{

    document.getElementById("edit-campaign-form_field_1").classList.remove("std_ph_red_1");
    document.getElementById("edit-campaign-form_field_1").classList.add("std_ph_blue_1");
    document.getElementById("edit-campaign-form_field_1").style.color = "#020037";
  }

  if(name_len > 0){

    document.getElementById("edit-campaign-form_field_2").classList.remove("std_ph_blue_2");
    document.getElementById("edit-campaign-form_field_2").classList.add("std_ph_red_2");
    document.getElementById("edit-campaign-form_field_2").style.color = "#c40000";
  }

  else{

    document.getElementById("edit-campaign-form_field_2").classList.remove("std_ph_red_2");
    document.getElementById("edit-campaign-form_field_2").classList.add("std_ph_blue_2");
    document.getElementById("edit-campaign-form_field_2").style.color = "#020037";
  }

  if(sel_rep_len > 0){

    document.getElementById("edit-campaign-form_field_3").classList.remove("std_ph_blue_3");
    document.getElementById("edit-campaign-form_field_3").classList.add("std_ph_red_3");
    document.getElementById("edit-campaign-form_field_3").style.color = "#c40000";
  }

  else{

    document.getElementById("edit-campaign-form_field_3").classList.remove("std_ph_red_3");
    document.getElementById("edit-campaign-form_field_3").classList.add("std_ph_blue_3");
    document.getElementById("edit-campaign-form_field_3").style.color = "#020037";
  }

  if(threshold_len > 0){

    document.getElementById("edit-campaign-form_field_4").classList.remove("std_ph_blue_4");
    document.getElementById("edit-campaign-form_field_4").classList.add("std_ph_red_4");
    document.getElementById("edit-campaign-form_field_4").style.color = "#c40000";
  }

  else{

    document.getElementById("edit-campaign-form_field_4").classList.remove("std_ph_red_4");
    document.getElementById("edit-campaign-form_field_4").classList.add("std_ph_blue_4");
    document.getElementById("edit-campaign-form_field_4").style.color = "#020037";
  }
}


function set_placeholder_after_change_edit(inputId,place_str,style_color){

  var len = document.getElementById(inputId).value.length;

  if(place_str == 'Annotation Replica'){

    document.getElementById(inputId).classList.remove("std_ph_red_0");
    document.getElementById(inputId).classList.add("std_ph_blue_0");
    document.getElementById(inputId).style.color = style_color;

    if(len == 0){

      document.getElementById(inputId).setAttribute('placeholder',place_str);
    }
  }

  else if (place_str == 'Annotation Size') {

    document.getElementById(inputId).classList.remove("std_ph_red_1");
    document.getElementById(inputId).classList.add("std_ph_blue_1");
    document.getElementById(inputId).style.color = style_color;

    if(len == 0){

      document.getElementById(inputId).setAttribute('placeholder',place_str);
    }
  }

  else if (place_str == 'Name') {

    document.getElementById(inputId).classList.remove("std_ph_red_2");
    document.getElementById(inputId).classList.add("std_ph_blue_2");
    document.getElementById(inputId).style.color = style_color;

    if(len == 0){

      document.getElementById(inputId).setAttribute('placeholder',place_str);
    }
  }

  else if (place_str == 'Selection Replica') {

    document.getElementById(inputId).classList.remove("std_ph_red_3");
    document.getElementById(inputId).classList.add("std_ph_blue_3");
    document.getElementById(inputId).style.color = style_color;

    if(len == 0){

      document.getElementById(inputId).setAttribute('placeholder',place_str);
    }
  }

  else if (place_str == 'Threshold') {

    document.getElementById(inputId).classList.remove("std_ph_red_4");
    document.getElementById(inputId).classList.add("std_ph_blue_4");
    document.getElementById(inputId).style.color = style_color;

    if(len == 0){

      document.getElementById(inputId).setAttribute('placeholder',place_str);
    }
  }
}


/*@@@@@@@@@@ EDIT ACCOUNT PLACEHOLDERS @@@@@@@@@@*/

function edit_account_set_placeholder_red(ids,placeholders){

  var fullname_len = document.getElementById(ids['fullname']).innerHTML.length;
  var password_len = document.getElementById(ids['password']).innerHTML.length;

  if(localStorage.getItem('type_of_account') == 'master'){

    if(fullname_len > 0){

      document.getElementById("edit-account-form_field_0").classList.remove("std_ph_blue_0");
      document.getElementById("edit-account-form_field_0").classList.add("std_ph_red_0");
      document.getElementById("edit-account-form_field_0").style.color = "#c40000";
    }

    else{

      document.getElementById("edit-account-form_field_0").classList.remove("std_ph_red_0");
      document.getElementById("edit-account-form_field_0").classList.add("std_ph_blue_0");
      document.getElementById("edit-account-form_field_0").style.color = "#020037";
    }

    if(password_len > 0){

      document.getElementById("edit-account-form_field_2").classList.remove("std_ph_blue_2");
      document.getElementById("edit-account-form_field_2").classList.add("std_ph_red_2");
      document.getElementById("edit-account-form_field_2").style.color = "#c40000";
    }

    else{

      document.getElementById("edit-account-form_field_2").classList.remove("std_ph_red_2");
      document.getElementById("edit-account-form_field_2").classList.add("std_ph_blue_2");
      document.getElementById("edit-account-form_field_2").style.color = "#020037";
    }
  }

  else {

    if(fullname_len > 0){

      document.getElementById("worker-account-form_field_0").classList.remove("std_ph_blue_0");
      document.getElementById("worker-account-form_field_0").classList.add("std_ph_red_0");
      document.getElementById("worker-account-form_field_0").style.color = "#c40000";
    }

    else{

      document.getElementById("worker-account-form_field_0").classList.remove("std_ph_red_0");
      document.getElementById("worker-account-form_field_0").classList.add("std_ph_blue_0");
      document.getElementById("worker-account-form_field_0").style.color = "#020037";
    }

    if(password_len > 0){

      document.getElementById("worker-account-form_field_1").classList.remove("std_ph_blue_2");
      document.getElementById("worker-account-form_field_1").classList.add("std_ph_red_2");
      document.getElementById("worker-account-form_field_1").style.color = "#c40000";
    }

    else{

      document.getElementById("worker-account-form_field_1").classList.remove("std_ph_red_2");
      document.getElementById("worker-account-form_field_1").classList.add("std_ph_blue_2");
      document.getElementById("worker-account-form_field_1").style.color = "#020037";
    }
  }
}
