export function NavegatorUserAndDevice(){

    let sBrowser, sUsrAg = navigator.userAgent,
        sDevice = "";


if(sUsrAg.indexOf("Chrome") > -1) {
    sBrowser = "Google Chrome";
} else if (sUsrAg.indexOf("Safari") > -1) {
    sBrowser = "Apple Safari";
} else if (sUsrAg.indexOf("Opera") > -1) {
    sBrowser = "Opera";
} else if (sUsrAg.indexOf("Firefox") > -1) {
    sBrowser = "Mozilla Firefox";
} else if (sUsrAg.indexOf("MSIE") > -1) {
    sBrowser = "Microsoft Internet Explorer";
} 

if(sUsrAg.includes("Mobile")){
    sDevice = "Mobile"
}else {
    sDevice = "Window"
}

    return {sBrowser, sDevice};
}