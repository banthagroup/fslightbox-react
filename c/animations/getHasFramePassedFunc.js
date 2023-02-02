export function getHasFramePassedFunc() {
    let isAnimationRunning = false;

    return () => {
        if (isAnimationRunning) {
            return false;
        }

        isAnimationRunning = true;

        requestAnimationFrame(() => {
            isAnimationRunning = false;
        });

        return true;
    }
}
