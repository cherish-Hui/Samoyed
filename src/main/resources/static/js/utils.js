
//客户端域名
var webUrl = 'http://localhost:8090';

//服务端域名
var serverUrl = 'http://localhost:8091';

//SSO域名
var ssoUrl = 'http://localhost:8888';

//SSO注销地址
var ssoLogout = ssoUrl + '/sso/logout?callBackUrl=' + webUrl;

//服务支持邮箱
var supportMail = '1191837698@qq.com';

//设置全局AJAX配置（跨域支持,携带cookie）
$.ajaxSetup({
    xhrFields: {
        withCredentials: true
    },
    crossDomain: true,
});

// 常规浏览器语言和IE浏览器
String.prototype.orEnglish = function (en) {
    var lang = navigator.language || navigator.userLanguage;
    lang = lang.substr(0, 2);
    return (lang === 'zh') ? this.toString() : en;
};

// 跳转页面
function jumpToURL(URL) {
    window.location.href = URL;
}

// 这个接口用来保存永久数据(localStorage)
function saveData(key, value) {
    localStorage.setItem(key, JSON.stringify({ value: value }));
}

function loadData(key) {
    var data = localStorage.getItem(key);
    return data ? JSON.parse(data).value : null;
}

// 这个接口用来保存临时数据，浏览器关闭时会清空(sessionStorage)
function saveCache(key, value) {
    sessionStorage.setItem(key, JSON.stringify({ value: value }));
}

function loadCache(key) {
    var data = sessionStorage.getItem(key);
    return data ? JSON.parse(data).value : null;
}

//翻译数字
function getSequence(num) {
    if (isNaN(num)) {
        return num;
    }
    return (num == 1) ? '1st' : (num == 2) ? '2nd' : (num == 3) ? '3rd' : (num > 3) ? (num + 1) + 'th' : num;
}

//获取用户信息
function getUserInfo() {
    var cacheKey = 'user';
    var result;
    sessionStorage.removeItem(cacheKey);
    $.ajax({
        url: serverUrl + '/api/user/info',
        type: 'GET',
        async: false,   // 同步获取数据
        dataType: "json",
        success: function (result) {
            result = result;
            saveCache(cacheKey, result);
        },
    });
    result = loadCache(cacheKey);
    return result;
}

//获取所有供应商
function getSuppliers() {
    var cacheKey = 'suppliers';
    var result = loadCache(cacheKey);
    if (result) {
        console.log('Find suppliers in cache.');
    } else {
        $.ajax({
            url: serverUrl + '/api/basic/supplier/all',
            type: 'GET',
            async: false,   // 同步获取数据
            dataType: "json",
            success: function (result) {
                result = result;
                saveCache(cacheKey, result);
            },
        });
    }
    result = loadCache(cacheKey);
    return result;
}

//获取所有产品
function getProduces() {
    var cacheKey = 'produces';
    var result = loadCache(cacheKey);
    if (result) {
        console.log('Find produces in cache.');
    } else {
        $.ajax({
            url: serverUrl + '/api/basic/produce/all',
            type: 'GET',
            async: false,   // 同步获取数据
            dataType: "json",
            success: function (result) {
                result = result;
                saveCache(cacheKey, result);
            },
        });
    }
    result = loadCache(cacheKey);
    return result;
}

//获取采购订单(分页获取)
function getPurchaseOrders(statusId, pageNum, pageSize) {
    var statusId = statusId;
    var pageNum = pageNum;
    var pageSize = pageSize;
    var result;
    var cacheKey = 'purchaseOrders';
    sessionStorage.removeItem(cacheKey);
    $.ajax({
        url: serverUrl + '/api/purchase/order/all?statusId=' + statusId + '&pageNum=' + pageNum + '&pageSize=' + pageSize,
        data: {},
        type: 'GET',
        cache: false,    //关闭缓存
        async: false,   // 同步获取数据
        dataType: "json",
        success: function (result) {
            result = result;
            saveCache(cacheKey, result);
        },
    });
    result = loadCache(cacheKey);
    return result;
}

//获取生产订单(分页获取)
function getProduceOrders(statusId, pageNum, pageSize) {
    var statusId = statusId;
    var pageNum = pageNum;
    var pageSize = pageSize;
    var result;
    var cacheKey = 'produceOrders';
    sessionStorage.removeItem(cacheKey);
    $.ajax({
        url: serverUrl + '/api/produce/order/all?statusId=' + statusId + '&pageNum=' + pageNum + '&pageSize=' + pageSize,
        data: {},
        type: 'GET',
        cache: false,    //关闭缓存
        async: false,   // 同步获取数据
        dataType: "json",
        success: function (result) {
            result = result;
            saveCache(cacheKey, result);
        },
    });
    result = loadCache(cacheKey);
    return result;
}

//获取销售订单(分页获取)
function getSaleOrders(statusId, pageNum, pageSize) {
    var statusId = statusId;
    var pageNum = pageNum;
    var pageSize = pageSize;
    var result;
    var cacheKey = 'saleOrders';
    sessionStorage.removeItem(cacheKey);
    $.ajax({
        url: serverUrl + '/api/sale/order/all?statusId=' + statusId + '&pageNum=' + pageNum + '&pageSize=' + pageSize,
        data: {},
        type: 'GET',
        cache: false,    //关闭缓存
        async: false,   // 同步获取数据
        dataType: "json",
        success: function (result) {
            result = result;
            saveCache(cacheKey, result);
        },
    });
    result = loadCache(cacheKey);
    return result;
}

/** ---------------------------------------------------------------------采购订单-------------------------------------------------------------------------- */

//获取待付款订单-采购订单(分页获取)
function getToPayOrders(pageNum, pageSize) {
    var pageNum = pageNum;
    var pageSize = pageSize;
    var result;
    var cacheKey = 'toPayOrders';
    sessionStorage.removeItem(cacheKey);
    $.ajax({
        url: serverUrl + '/api/purchase/order/toPay?pageNum=' + pageNum + '&pageSize=' + pageSize,
        data: {},
        type: 'GET',
        cache: false,    //关闭缓存
        async: false,   // 同步获取数据
        dataType: "json",
        success: function (result) {
            result = result;
            saveCache(cacheKey, result);
        },
    });
    result = loadCache(cacheKey);
    return result;
}

//获取已付款订单-采购订单(分页获取)
function getAlreadyToPayOrders(pageNum, pageSize) {
    var pageNum = pageNum;
    var pageSize = pageSize;
    var result;
    var cacheKey = 'alreadyPayOrders';
    sessionStorage.removeItem(cacheKey);
    $.ajax({
        url: serverUrl + '/api/purchase/order/alreadyPay?pageNum=' + pageNum + '&pageSize=' + pageSize,
        data: {},
        type: 'GET',
        cache: false,    //关闭缓存
        async: false,   // 同步获取数据
        dataType: "json",
        success: function (result) {
            result = result;
            saveCache(cacheKey, result);
        },
    });
    result = loadCache(cacheKey);
    return result;
}

//获取待收款订单-采购订单(分页获取)
function getIsPayOrders(pageNum, pageSize) {
    return getPurchaseOrders(5, pageNum, pageSize);
}

//获取已收款订单-采购订单(分页获取)
function getAlreadyIsPayOrders(pageNum, pageSize) {
    return getPurchaseOrders(8, pageNum, pageSize);
}

/** -----------------------------------------------------------------生产订单------------------------------------------------------------------------------ */

//获取待出库订单-生产订单(分页获取)
function getIsIssueOrders(pageNum, pageSize) {
    var pageNum = pageNum;
    var pageSize = pageSize;
    var result;
    var cacheKey = 'toIssueOrders';
    sessionStorage.removeItem(cacheKey);
    $.ajax({
        url: serverUrl + '/api/produce/order/toIssue?pageNum=' + pageNum + '&pageSize=' + pageSize,
        data: {},
        type: 'GET',
        cache: false,    //关闭缓存
        async: false,   // 同步获取数据
        dataType: "json",
        success: function (result) {
            result = result;
            saveCache(cacheKey, result);
        },
    });
    result = loadCache(cacheKey);
    return result;
}

//获取已出库订单-生产订单(分页获取)
function getAlreadyIssueOrders(pageNum, pageSize) {
    var pageNum = pageNum;
    var pageSize = pageSize;
    var result;
    var cacheKey = 'alreadyIssueOrders';
    sessionStorage.removeItem(cacheKey);
    $.ajax({
        url: serverUrl + '/api/produce/order/alreadyIssue?pageNum=' + pageNum + '&pageSize=' + pageSize,
        data: {},
        type: 'GET',
        cache: false,    //关闭缓存
        async: false,   // 同步获取数据
        dataType: "json",
        success: function (result) {
            result = result;
            saveCache(cacheKey, result);
        },
    });
    result = loadCache(cacheKey);
    return result;
}

//判断生产明细是否存在
function actualIsExist(orderNumber) {
    var orderNumber = orderNumber;
    var result;
    var cacheKey = 'actualIsExist';
    sessionStorage.removeItem(cacheKey);
    $.ajax({
        url: 'http://localhost:8091/api/produce/order/actual/isExist?orderNumber=' + orderNumber,
        data: {},
        type: 'GET',
        cache: false,    //关闭缓存
        async: false,   // 同步获取数据
        dataType: "json",
        success: function (result) {
            result = result;
            saveCache(cacheKey, result);
        },
    });
    result = loadCache(cacheKey);
    return result;
}

//获取待入库订单-生产订单(分页获取)
function getIsStorageOrders(pageNum, pageSize) {
    return getProduceOrders(12, pageNum, pageSize);
}

//获取已入库订单-生产订单(分页获取)
function getAlreadyStorageOrders(pageNum, pageSize) {
    return getProduceOrders(13, pageNum, pageSize);
}

/** --------------------------------------------------------------------销售订单--------------------------------------------------------------------------- */

//获取待收款(定金)订单-销售订单(分页获取)
function getIsPayDepositOrders(pageNum, pageSize) {
    var pageNum = pageNum;
    var pageSize = pageSize;
    var result;
    var cacheKey = 'isPayDepositOrders';
    sessionStorage.removeItem(cacheKey);
    $.ajax({
        url: serverUrl + '/api/sale/order/isPayDeposit?pageNum=' + pageNum + '&pageSize=' + pageSize,
        data: {},
        type: 'GET',
        cache: false,    //关闭缓存
        async: false,   // 同步获取数据
        dataType: "json",
        success: function (result) {
            result = result;
            saveCache(cacheKey, result);
        },
    });
    result = loadCache(cacheKey);
    return result;
}

//获取待收款(尾款)订单-销售订单(分页获取)
function getIsPayFinalOrders(pageNum, pageSize) {
    var pageNum = pageNum;
    var pageSize = pageSize;
    var result;
    var cacheKey = 'isPayFinalOrders';
    sessionStorage.removeItem(cacheKey);
    $.ajax({
        url: serverUrl + '/api/sale/order/isPayFinal?pageNum=' + pageNum + '&pageSize=' + pageSize,
        data: {},
        type: 'GET',
        cache: false,    //关闭缓存
        async: false,   // 同步获取数据
        dataType: "json",
        success: function (result) {
            result = result;
            saveCache(cacheKey, result);
        },
    });
    result = loadCache(cacheKey);
    return result;
}

//获取已收款订单-销售订单(分页获取)
function getIsSuccessOrders(pageNum, pageSize) {
    var pageNum = pageNum;
    var pageSize = pageSize;
    var result;
    var cacheKey = 'isSuccessOrders';
    sessionStorage.removeItem(cacheKey);
    $.ajax({
        url: serverUrl + '/api/sale/order/isSuccess?pageNum=' + pageNum + '&pageSize=' + pageSize,
        data: {},
        type: 'GET',
        cache: false,    //关闭缓存
        async: false,   // 同步获取数据
        dataType: "json",
        success: function (result) {
            result = result;
            saveCache(cacheKey, result);
        },
    });
    result = loadCache(cacheKey);
    return result;
}

//获取待付款订单-销售订单(分页获取)
function getToPend(pageNum, pageSize) {
    return getSaleOrders(5, pageNum, pageSize);
}

//获取已付款订单-销售订单(分页获取)
function getIsPend(pageNum, pageSize) {
    return getSaleOrders(7, pageNum, pageSize);
}

/** ---------------------------------------------------------------------采购对账-------------------------------------------------------------------------- */

function getPurchasePayRecord(pageNum, pageSize){
    var pageNum = pageNum;
    var pageSize = pageSize;
    var result;
    var cacheKey = 'purchasePayRecord';
    sessionStorage.removeItem(cacheKey);
    $.ajax({
        url: serverUrl + '/api/finance/purchasePayRecord?pageNum=' + pageNum + '&pageSize=' + pageSize,
        data: {},
        type: 'GET',
        cache: false,    //关闭缓存
        async: false,   // 同步获取数据
        dataType: "json",
        success: function (result) {
            result = result;
            saveCache(cacheKey, result);
        },
    });
    result = loadCache(cacheKey);
    return result;
}

function getPurchaseReceivableRecord(pageNum, pageSize){
    var pageNum = pageNum;
    var pageSize = pageSize;
    var result;
    var cacheKey = 'purchaseReceivableRecord';
    sessionStorage.removeItem(cacheKey);
    $.ajax({
        url: serverUrl + '/api/finance/purchaseReceivableRecord?pageNum=' + pageNum + '&pageSize=' + pageSize,
        data: {},
        type: 'GET',
        cache: false,    //关闭缓存
        async: false,   // 同步获取数据
        dataType: "json",
        success: function (result) {
            result = result;
            saveCache(cacheKey, result);
        },
    });
    result = loadCache(cacheKey);
    return result;
}

function getSaleReceivableRecord(pageNum, pageSize){
    var pageNum = pageNum;
    var pageSize = pageSize;
    var result;
    var cacheKey = 'saleReceivableRecord';
    sessionStorage.removeItem(cacheKey);
    $.ajax({
        url: serverUrl + '/api/finance/saleReceivableRecord?pageNum=' + pageNum + '&pageSize=' + pageSize,
        data: {},
        type: 'GET',
        cache: false,    //关闭缓存
        async: false,   // 同步获取数据
        dataType: "json",
        success: function (result) {
            result = result;
            saveCache(cacheKey, result);
        },
    });
    result = loadCache(cacheKey);
    return result;
}

function getSalePayRecord(pageNum, pageSize){
    var pageNum = pageNum;
    var pageSize = pageSize;
    var result;
    var cacheKey = 'salePayRecord';
    sessionStorage.removeItem(cacheKey);
    $.ajax({
        url: serverUrl + '/api/finance/salePayRecord?pageNum=' + pageNum + '&pageSize=' + pageSize,
        data: {},
        type: 'GET',
        cache: false,    //关闭缓存
        async: false,   // 同步获取数据
        dataType: "json",
        success: function (result) {
            result = result;
            saveCache(cacheKey, result);
        },
    });
    result = loadCache(cacheKey);
    return result;
}


/** ---------------------------------------------------------------------仓储明细-------------------------------------------------------------------------- */

//获取所有仓储原材料
function getAllWaseHouseMaterial() {
    var result;
    var cacheKey = 'waseHouseMaterials';
    sessionStorage.removeItem(cacheKey);
    $.ajax({
        url: serverUrl + '/api/warehouse/getAllMaterial',
        data: {},
        type: 'GET',
        cache: false,    //关闭缓存
        async: false,   // 同步获取数据
        dataType: "json",
        success: function (result) {
            result = result;
            saveCache(cacheKey, result);
        },
    });
    result = loadCache(cacheKey);
    return result;
}

//获取所有仓储产品
function getAllWaseHouseProduce() {
    var result;
    var cacheKey = 'waseHouseProduces';
    sessionStorage.removeItem(cacheKey);
    $.ajax({
        url: serverUrl + '/api/warehouse/getAllProduce',
        data: {},
        type: 'GET',
        cache: false,    //关闭缓存
        async: false,   // 同步获取数据
        dataType: "json",
        success: function (result) {
            result = result;
            saveCache(cacheKey, result);
        },
    });
    result = loadCache(cacheKey);
    return result;
}

//获取所有仓储废料
function getAllWaseHouseWaste() {
    var result;
    var cacheKey = 'waseHouseWastes';
    sessionStorage.removeItem(cacheKey);
    $.ajax({
        url: serverUrl + '/api/warehouse/getAllWaste',
        data: {},
        type: 'GET',
        cache: false,    //关闭缓存
        async: false,   // 同步获取数据
        dataType: "json",
        success: function (result) {
            result = result;
            saveCache(cacheKey, result);
        },
    });
    result = loadCache(cacheKey);
    return result;
}

/** ---------------------------------------------------------------------报表中心-------------------------------------------------------------------------- */
function getPurchaseNumber(){
    var result;
    var cacheKey = 'purchaseNumber';
    sessionStorage.removeItem(cacheKey);
    $.ajax({
        url: serverUrl + '/api/report/purchase/number',
        data: {},
        type: 'GET',
        cache: false,    //关闭缓存
        async: false,   // 同步获取数据
        dataType: "json",
        success: function (result) {
            result = result;
            saveCache(cacheKey, result);
        },
    });
    result = loadCache(cacheKey);
    return result;
}

function getProduceNumber(){
    var result;
    var cacheKey = 'produceNumber';
    sessionStorage.removeItem(cacheKey);
    $.ajax({
        url: serverUrl + '/api/report/produce/number',
        data: {},
        type: 'GET',
        cache: false,    //关闭缓存
        async: false,   // 同步获取数据
        dataType: "json",
        success: function (result) {
            result = result;
            saveCache(cacheKey, result);
        },
    });
    result = loadCache(cacheKey);
    return result;
}

function getSaleNumber(){
    var result;
    var cacheKey = 'saleNumber';
    sessionStorage.removeItem(cacheKey);
    $.ajax({
        url: serverUrl + '/api/report/sale/number',
        data: {},
        type: 'GET',
        cache: false,    //关闭缓存
        async: false,   // 同步获取数据
        dataType: "json",
        success: function (result) {
            result = result;
            saveCache(cacheKey, result);
        },
    });
    result = loadCache(cacheKey);
    return result;
}

function getFinanceNumber(){
    var result;
    var cacheKey = 'financeNumber';
    sessionStorage.removeItem(cacheKey);
    $.ajax({
        url: serverUrl + '/api/report/finance/number',
        data: {},
        type: 'GET',
        cache: false,    //关闭缓存
        async: false,   // 同步获取数据
        dataType: "json",
        success: function (result) {
            result = result;
            saveCache(cacheKey, result);
        },
    });
    result = loadCache(cacheKey);
    return result;
}

function getWareHouseNumber(){
    var result;
    var cacheKey = 'warehouseNumber';
    sessionStorage.removeItem(cacheKey);
    $.ajax({
        url: serverUrl + '/api/report/warehouse/number',
        data: {},
        type: 'GET',
        cache: false,    //关闭缓存
        async: false,   // 同步获取数据
        dataType: "json",
        success: function (result) {
            result = result;
            saveCache(cacheKey, result);
        },
    });
    result = loadCache(cacheKey);
    return result;
}





















function checkManifestFile(vueComponent, file) {
    var fileName = file.name;
    var fileSuffix = fileName.substring(fileName.lastIndexOf('.') + 1);
    if (fileSuffix != 'xml') {
        vueComponent.$message.error('请选择xml格式的manifest文件。'.orEnglish('Please select a xml format file.'));
        return false;
    }
    var MAX_SIZE = 3 * 100 * 1024; //max manifest file size is 300kb.
    if (file.size > MAX_SIZE) {
        vueComponent.$message.error('上传文件的大小不要超过300kb。'.orEnglish('Upload file size should not exceed 300kb.'));
        return false;
    }
    return true;
}

Array.prototype.expandParams = function () {
    for (var i = 0; i < this.length; i++) {
        var params = this[i].parameters;
        for (var j = 0; j < params.length; j++) {
            var key = params[j].name;
            this[i][key] = params[j].value;
        }
    }
};