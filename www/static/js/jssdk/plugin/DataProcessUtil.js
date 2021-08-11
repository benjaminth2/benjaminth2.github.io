var DataProcessUtil = {}

//处理qrCode扫描结果
DataProcessUtil.processQrCodeScanResultData = function (windowObj, qrCodeScanResultData, processDataResultCallBack) {
    if(qrCodeScanResultData != null && typeof(qrCodeScanResultData) == "string"){
        var jsonData=JSON.parse(qrCodeScanResultData);
        var outData = {};
        var estates=[]
        if (jsonData&&Array.isArray(jsonData)) {
            var data0 = jsonData[0];
            console.log(data0);
            if (data0 == "M" || data0 == "R2") {
                console.log(typeof(jsonData[1]));
                console.log(JSON.stringify(jsonData[1]))
                var data=jsonData[1][0];
                var estateName=data[0] //"龍門第一城:City One Dragon"
                var buildingData=data[1]
                var buildName=buildingData[0]//"第1座:Block 1"
                console.log(typeof(buildingData))
                for (let i = 1; i < buildingData.length; i++) {
                    let buildMap = {};
                    const element = buildingData[i];
                    console.log(element);
                    let Machine = element[0];
                    console.log(Machine);
                    let Button = element[1];
                    let OutPut = element[2];
                    let DeviceID = element[3];
                    let Password = element[6];
                    if (Password == null) {
                        Password = "";
                    }
                    buildMap.Machine = Machine;
                    buildMap.Button = Button;
                    buildMap.OutPut =OutPut;
                    buildMap.DevId = DeviceID;
                    buildMap.Password = Password;
                    buildMap.Building = buildName;
                    buildMap.Estate = estateName;
                    buildMap.Building=buildName;
                    buildMap.Type=data0;
                    estates.push(buildMap);
                }
            }
            outData.BtnList = jsonData[2];
            outData.EstateData=estates;
         }
         console.log("processQrCodeScanResultData completed");
         if (processDataResultCallBack) {
            processDataResultCallBack(outData);
         } else {
            console.log("!processDataResultCallBack");
         }
    } else {
        throw new Error("in data is null");
    }
}
