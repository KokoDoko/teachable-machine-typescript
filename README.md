# Teachable Machine Typescript

This is a code snippet that allows you to train and use your [Teachable Machine](https://teachablemachine.withgoogle.com/train/image) model in a Typescript project. This is a work in progress! 

⚠️ typescript types for Tensorflow functions are currently not checked by the compiler! You can use your Teachable Machine model by ignoring Type checking for Tensorflow.

Press CMD/CTRL + SHIFT + B to build the .ts files into .js files. 

This example model is trained on "Rock, Paper, Scissors"

<br>
<br>
<br>

## 🤖 Using Type declaration files

Sadly there is no `types.d.ts` file for Teachable Machine. You can still find the declarations by installing the actual modules:

```bash
npm i @tensorflow/tfjs
npm i @teachablemachine/image
```

<br>
<br>

## 💀💀💀 Compiling tensorflow

Sadly the `.d.ts` files from the **node_modules** folder are **not** automatically used if you don't import the modules.
So we have to import the actual tensorflow library and leave out the `<script>` tags from `index.html`. 
```typescript
import * as tf from '@tensorflow/tfjs';
import * as tmImage from '@teachablemachine/image';
```
It may be needed to use [ParcelJS](https://parceljs.org) to compile all modules. See the **MatterJS** or **ThreeJS** repositories for examples on using Parcel.

Once you get type information working, you should remove this line from app.ts: 
```typescript
declare let tmImage:any
``` 
And you should set the `any` checks to **true** in `tsconfig.json`:
```json
"noImplicitAny": true,
```
## 💀💀💀 TODO

Find a way to use the `.d.ts` declaration files without compiling modules.

<br>
<br>

## Links

- [Teachable Machine](https://teachablemachine.withgoogle.com/train/image)
- [TensorFlow Image Documentation](https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image).
