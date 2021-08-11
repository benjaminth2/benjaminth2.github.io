var OtherUtil = {}

OtherUtil.openQrCodeScanner = function (winObj, successResultCallBackFn, errResultCallBackFn) {
    if (winObj) {
        var cordova = winObj.cordova;
        if (cordova) {
            if (cordova.plugins) {
                QRScanner.prepare(function(err, status){
                if (err) {
                   // here we can handle errors and clean up any loose ends.
                   console.error(err);
                }
                if (status.authorized) {
                    // W00t, you have camera access and the scanner is initialized.
                    // QRscanner.show() should feel very fast.
                    
                    // alert(11);
                    // alert(document);
                    // alert(document.getElementById('content-frame'));
                    // alert(document.getElementById('content-frame').src);

                    document.getElementById('content-frame').src = 'content-frame.html#/scan';

                    QRScanner.scan(function(err, text){
                        if(err){
                          // an error occurred, or the scan was canceled (error code `6`)
                          if (err.name === 'SCAN_CANCELED') {
                            QRScanner.hide(function(status){
                                QRScanner.destroy(function(status){
                                    if (errResultCallBackFn) {
                                        errResultCallBackFn(err.name);
                                    }
                                });
                            });
                          }
                        } else {
                          // The scan completed, display the contents of the QR code:
                          QRScanner.hide(function(status){
                              QRScanner.destroy(function(status){});
                          });
                          if (successResultCallBackFn) {
                              successResultCallBackFn(text);
                          }
                        }
                    });
                    QRScanner.show();
                } else if (status.denied) {
                    // The video preview will remain black, and scanning is disabled. We can
                    // try to ask the user to change their mind, but we'll have to send them
                    // to their device settings with `QRScanner.openSettings()`.
                    QRScanner.openSettings()
                } else {
                    // we didn't get permission, but we didn't get permanently denied. (On
                    // Android, a denial isn't permanent unless the user checks the "Don't
                    // ask again" box.) We can ask again at the next relevant opportunity.
                }
              });
            }
        }
    }
}
