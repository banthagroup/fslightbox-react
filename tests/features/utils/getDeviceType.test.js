import { getDeviceType } from "../../../src/utils/getDeviceType";
import { MOBILE_OR_UNKNOWN_DEVICE_TYPE } from "../../../src/constants/DeviceTypeConstants";

// navigator is untestable component so i can only test if it will return undefined
// which default value in jest
describe('detecting correct user device', () => {
    it('should detect windows type', () => {
        expect(getDeviceType()).toEqual(MOBILE_OR_UNKNOWN_DEVICE_TYPE);
    });
});