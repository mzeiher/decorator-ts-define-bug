import { TestBabel } from './babel.out.js';
import { TestTSDefine} from './tsdefine.js';
import { TestTSLegacy } from './tslegacy.js';

console.log(`Babel ${new TestBabel().myProp}`);
console.log(`TSDefine ${new TestTSDefine().myProp}`);
console.log(`TSLegacy ${new TestTSLegacy().myProp}`);