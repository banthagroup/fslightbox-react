import {
    LINUX_DEVICE_TYPE,
    MOBILE_OR_UNKNOWN_DEVICE_TYPE,
    WINDOWS_DEVICE_TYPE
} from "../constants/DeviceTypeConstants";

export const getDeviceType = () => {
    if(navigator.platform.includes('Win'))
        return WINDOWS_DEVICE_TYPE;
    if(navigator.platform.includes('Linux'))
        return LINUX_DEVICE_TYPE;
    return MOBILE_OR_UNKNOWN_DEVICE_TYPE;
};