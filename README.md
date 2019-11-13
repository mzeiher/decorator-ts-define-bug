typescript `"useDefineForClassFields": true` breaks decorators which extend a property

I have the following decorator
```
export function Decorator() {
    return function (target, propKey, descriptor) {
        const symbol = Symbol();
        target.constructor.prototype[symbol] = descriptor ? typeof descriptor.initializer !== 'undefined' ? descriptor.initializer() : undefined : undefined; // for babel
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
```

which just extends the property which gets decorated with a getter/setter pair which just appends "decorated" to the value.

I use the decorator the following way:
```
import { Decorator } from './decorator.js';

export class Test {
    @Decorator()
    myProp = "test";
}

console.log(new Test().myProp);
```

expected result is `"testdecorated"`

I get the following output for different compilations:
 * babel + babel-plugin-proposal-decorators (legacy) `"testdecorated"`
 * typescript [[Set]] semantic (default) `"testdecorated"`
 * typescript [[Define]] semantic `"useDefineForClassFields": true` `"test"` ⚠

Typescript with useDefineForClassFields redefines the property in the constructor thus breaking the property defined by the decorator, babel works because in also uses [[Define]] but passes the PropertyDescriptor into the decorator for evaluation and uses the returned PoropertyDescriptor on the target

Expected behaviour for Typescript:
for class fields also pass the property descriptor into the decorator which the can be augmented/replaced by a new PropertyDescriptor

## How to reproduce:
* clone https://github.com/mzeiher/decorator-ts-define-bug.git
* run `yarn install`
* run `yarn build`
* run `yarn serve`
* open `127.0.0.1:3333`
* take a look at the console output