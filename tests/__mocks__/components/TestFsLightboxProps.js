import { testUrls } from "../../schemas/testVariables";

/**
 * @class
 */
export function TestFsLightboxProps() {
    let numberOfUrls;
    const urls = [];

    const generateUrls = () => {
        for (let i = 0; i < numberOfUrls; i++) {
            const urlIndex = Math.floor(Math.random() * 4);
            urls.push(testUrls[urlIndex])
        }
    };

    return {
        withNumberOfUrls: (value) => {
            numberOfUrls = value;
            generateUrls();

            return {
                isOpen: true,
                urls: urls
            }
        }
    }
}