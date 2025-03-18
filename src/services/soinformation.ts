export const getOSAndBrowser = () => {
    const userAgent = navigator.userAgent;
    let os = "Desconhecido";
    let browser = "Desconhecido";

    if (userAgent.includes("Windows NT 10.0")) os = "Windows 10";
    else if (userAgent.includes("Mac OS X")) os = "MacOS";
    else if (userAgent.includes("Linux")) os = "Linux";

    if (userAgent.includes("Edg/")) browser = "Edge";
    else if (userAgent.includes("Chrome/") && !userAgent.includes("Edg/")) browser = "Chrome";
    else if (userAgent.includes("Firefox/")) browser = "Firefox";
    else if (userAgent.includes("Safari/") && !userAgent.includes("Chrome/")) browser = "Safari";

    const browserCode = {
        Chrome: "1",
        Edge: "2",
        Firefox: "3",
        Safari: "4",
        Desconhecido: "0",
    };

    type BrowserName = keyof typeof browserCode;

    return { os, browser, browserId: browserCode[browser as BrowserName] ?? "0" };

};

export const getIPAddress = async () => {
    const resp = await fetch("https://api.ipify.org?format=json");
    const data = await resp.json();
    return data.ip;
};