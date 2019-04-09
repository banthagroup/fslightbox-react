/**
 * @class
 */
export function Test() {
    let testSetter;

    this.setSetter = (setter) => {
          testSetter = setter;
    };

    this.callTest = () => {
        testSetter('43');
    };
}