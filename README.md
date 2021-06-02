# Teachable Machine Typescript

This is a code snippet that allows you to train and use your [Teachable Machine](https://teachablemachine.withgoogle.com/train/image) model in a Typescript project. This is a work in progress! 

⚠️ typescript types for Tensorflow functions are currently not checked by the compiler! You can use your Teachable Machine model by ignoring Type checking for Tensorflow.

Press CMD/CTRL + SHIFT + B to build the .ts files into .js files. 

This example model is trained on "Rock, Paper, Scissors"

<br>
<br>

## 🤖 TODO Add Type information

Install `tfjs` and `tensorflow image` in **node_modules** *just to get better type checking*. Visual Studio Code should automatically pick up the type information in the `.d.ts` files. You don't actually compile the libraries.

```bash
npm i @tensorflow/tfjs
npm i @teachablemachine/image
```

Once you get type information working, you should remove this line from app.ts: 
```typescript
declare let tmImage:any
``` 
And you should set the `any` checks to **true** in `tsconfig.json`:
```json
"noImplicitAny": true,
```

<br>
<br>

## 💀 Compiling tensorflow

If the `.d.ts` files are **not** automatically found, you can try importing the actual tensorflow library. In that case you can leave out the `<script>` tags from `index.html`. 
```typescript
import * as tf from '@tensorflow/tfjs';
import * as tmImage from '@teachablemachine/image';
```
It may be needed to use [ParcelJS](https://parceljs.org) to compile all modules. See the **MatterJS** or **ThreeJS** repositories for examples on using Parcel.

<br>
<br>

## Links

- [Teachable Machine](https://teachablemachine.withgoogle.com/train/image)
- [TensorFlow Image Documentation](https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image).