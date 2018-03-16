function store_token(token){

  if (typeof(Storage) !== "undefined") {
      // Store
      localStorage.setItem('token', token);
  }
}


function store_username(username){

  if (typeof(Storage) !== "undefined") {
      // Store
      localStorage.setItem('username', username);
  }
}


function store_pwd(pwd){

  if (typeof(Storage) !== "undefined") {
      // Store
      localStorage.setItem('pwd', pwd);
  }
}



function store_type_of_account(type){

  if (typeof(Storage) !== "undefined") {
      // Store
      localStorage.setItem('type_of_account', type);
  }
}


function set_campaigns_flag(bool){

  if (typeof(Storage) !== "undefined") {
      // Store
      localStorage.setItem('campaigns_flag', bool);
  }
}


function set_new_images_flag(url,bool){

  if (typeof(Storage) !== "undefined") {
      // Store
      localStorage.setItem(url, bool);
  }
}
