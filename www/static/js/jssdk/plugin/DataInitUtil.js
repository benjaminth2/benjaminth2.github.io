var DataInitUtil = {}
DataInitUtil.dbName='encrypted.db';
DataInitUtil.initTestData = function (dataReturnCallBack) {
    var qrcodeTestData = ["M", [["龍門第一城:City One Dragon", ["第1座:Block 1", ["1號機:Lift 1", "B3,B2,B1,G,1,2,3,5,10,11,12,13,14,15,16,17", "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16", "103", "1577808000", ""]]]], [44, 45]];
    if (dataReturnCallBack) {
        dataReturnCallBack(qrcodeTestData);
    }
}
DataInitUtil.initButtonConfigData = function () {
    //控制弹出是否保存对话框的数据
    var buttonConfigData = {};
    var buttonConfigDataM = { saveButton: false, callButton: true };
    var buttonConfigDataR1 = { saveButton: true, callButton: false };
    var buttonConfigDataR2 = { saveButton: false, callButton: true };
    var buttonConfigData = {};
    buttonConfigData["M"] = buttonConfigDataM;
    buttonConfigData["R1"] = buttonConfigDataR1;
    buttonConfigData["R2"] = buttonConfigDataR2;
    if(window){
        if(window.app){
            window.app.ButtonConfigData=buttonConfigData
        }
    }


}
DataInitUtil.initData = function () {


    var parent = window.cordova.platformId == 'android' ? window.cordova.file.applicationStorageDirectory : window.cordova.file.documentsDirectory;
    console.log(parent);
    window.resolveLocalFileSystemURL(parent, function (parentEntry) {
        parentEntry.getDirectory('databases', {
            create: true
        }, function (subDirEntry) {
            DataInitUtil.copyDatabase();
        }, function () {
            console.log('error creating directory');
        });
    }, function () { });
}
DataInitUtil.copyDatabase = function () {

    var target = window.cordova.platformId == 'android' ? window.cordova.file.applicationStorageDirectory : window.cordova.file.documentsDirectory;
    // var target = window.cordova.platformId == 'android' ? cordova.file.dataDirectory+'Documents/' : cordova.file.documentsDirectory;
    window.resolveLocalFileSystemURL(target + 'databases/'+DataInitUtil.dbName, function () {
        // console.log('nothing todo');
        app.devCount();
    }, function () {
        window.resolveLocalFileSystemURL(window.cordova.file.applicationDirectory + 'www/data/'+DataInitUtil.dbName, function (fileEntry) {
            window.resolveLocalFileSystemURL(target, function (targetEntry) {
                fileEntry.copyTo(targetEntry, DataInitUtil.dbName, function () {
                    console.log('database copied');
                    //DataInitUtil.devCount();
                }, function () {
                    console.log('database copy ignored');
                }, false);
            }, function () {
                console.log('target unresolved');
            });
        }, function () {
            console.log('database missing');
        });
    });
}

DataInitUtil.devCount = function () {
    var db = window.sqlitePlugin.openDatabase({
        name: DataInitUtil.dbName,//'unencrypted.db',
        key: 'encrypted',
        location: 0
    });
    db.executeSql('SELECT count(*) AS devCount FROM dev', [], function (rs) {
        var str = 'Record count (expected to be n): ' + rs.rows.item(0).devCount;
        console.log(str);
    }, function (error) {
        console.log(error.message);
    });
}
