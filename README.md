![Cuttie](/src/asset/cuttie_w.png)

Photo cropper in JS with quick settings. You can embed it into any of your projects.

## Documentation 📖

> ### First you need to install and create empty Cuttie 💿
```
npm install cuttie
```

``` javascript
const cuttie = new Cuttie();
```

> ### The next step is to initialize Cuttie with params 🖥️
>> **parent** - accepts the parent element in which the cropping window will be embedded
>> 
>> **params** - accepts insertion and viewport parameters
>> 
>> **url** - image url

``` javascript
cuttie.initCanvas(
  parent, 
  params,
  url
);
```

> ### Now about **params** 🔎
>> **bounds** - optional; Set the size of the editing window. If the field is missing it will adjust to the size of the parent.
>> 
>> **viewport** - required; Set the initial dimensions of the cropping window. **isChanged** and **aspect-ratio** are optional fields.
If you specify aspect-ration, then the height of the viewport will not be taken into account, it will be calculated from the width.
>> 
>> **background** - optional; 
You can set the background of the container (the image will be adjusted to the size of the container and if they do not match, then the gaps can be filled in as desired).
Default background is white.
>>> Priority: 1 - image; 2 - parentImage; 3 - color;

``` javascript
{
      bounds: {
        width: 650,
        height: 200,
      },
      viewport: {
        width: 750,
        height: 200,
        isChanged: true,
        'aspect-ratio': 16/9,
      },
      background: {
        image: background,
        parentImage: true,
        color: 'red',
      }
    }
```

> ### Get cropped image 💾
>> method **getCrop** return url string;
>> without params **getCrop** return scaled crop by current aspect-ratio 
>> or you can add params:
 ``` javascript
 // return scaled crop by current aspect-ratio
 cuttie.getCrop(); 
 ```
``` typescript
// If the width and height do not match the aspect-ratio, 
// will fill the problems with black
cuttie.getCrop({width: number, height: number})
``` 

> ### Get current viewport position 🧭
>> method **getPosition** returns an object of the form:
``` typescript
{
  x: number,
  y: number,
  width: number,
  height: number
}
```

> ### You can directly change viewport values 🔢
>> method **updatePosition** takes 4 parameters as input:
``` typescript
cuttie.updatePosition(
  x: number,y: number, width: number, height: number
  )
```
>> This method works very carefully, it does not take into account aspect-ratio and viewport size, it interacts directly with the viewport