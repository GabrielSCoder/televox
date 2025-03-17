import FingerPrintJs from "@fingerprintjs/fingerprintjs";
import { getOSAndBrowser } from "./soinformation";


export const getFingerPrint = async () => {
    const fp = await FingerPrintJs.load();
    const result = await fp.get();
    
    const {browserId} = getOSAndBrowser()

    return `${result.visitorId}-${browserId}`;
};