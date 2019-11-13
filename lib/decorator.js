export function Decorator() {
    return function (target, propKey, descriptor) {
        const symbol = Symbol();
        target.constructor.prototype[symbol] = descriptor ? typeof descriptor.initializer !== 'undefined' ? descriptor.initializer() : undefined : undefined;
        return {
            configurable: true,
            enumerable: true,
            set(value) {
                this[symbol] = value;
            },
            get() {
                return this[symbol] + 'decorated';
            }
        }
    }
}