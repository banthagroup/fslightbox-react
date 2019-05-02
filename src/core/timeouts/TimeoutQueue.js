/**
 * @constructor
 */
export function TimeoutQueue() {
    const queue = [];
    this.time = 0;
    this.actionCallConditionFunc = () => true;
    this.action = null;

    this.startTimeout = () => {
        queue.push(true);
        setTimeout(() => {
            queue.pop();
            if (queue.length === 0 && this.actionCallConditionFunc()) {
                this.action();
            }
        }, this.time);
    };
}