export const checkIfUserIsOnMobileDevice = () => {
    return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
};