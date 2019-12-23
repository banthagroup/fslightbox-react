export function resolvePropertyChainAtObject(propertyChain, object) {
    return propertyChain.split('.').reduce(function (prev, curr) {
        return prev ? prev[curr] : null
    }, object)
}
