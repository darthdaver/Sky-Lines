/*jslint node: true, nomen: true */
"use strict";

exports.createEvent = function () { // add "options" parameter if needed
    return function (context, data) {
        data = data || {};
        var packet = {
            'password' : data['password']
            ,'username' : data['username']
        };
        var promise = context.actions['log-in-action']({filters: packet});
        context.runningActionsByContainer['log-in-form-container'].push(promise);
        promise.then(function (result) {
            //console.log(result.event);
            //console.log(typeof(result.event));
            if(result.event == "log-in-ok"){
              setTimeout(function(){
                  context.runningActionsByContainer['log-in-form-container'].splice(
                    context.runningActionsByContainer['log-in-form-container'].indexOf(promise), 1
                  );

                  if (result.event) {

                    context.events[result.event](context, result.data);
                  }
              },1000);

              resize_logo();
            }

            else{

              context.runningActionsByContainer['log-in-form-container'].splice(
                context.runningActionsByContainer['log-in-form-container'].indexOf(promise), 1
              );

              if (result.event) {

                context.events[result.event](context, result.data);
              }
            }
        });
    };
};
