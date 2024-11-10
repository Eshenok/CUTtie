![Cuttie](/asset/cuttie_b.png)

## Documentation;

> First you need to create empty Cuttie

```
const cuttie = new Cuttie();
```

> The next step is to initialize Cuttie with params
>> **parent** - accepts the parent element in which the cropping window will be embedded
>> 
>> **params** - accepts insertion and viewport parameters
>> 
>> **url** - image url

```
cuttie.initCanvas(
    parent, 
    params,
    url
  );
```

> Now about **params**
>> **bounds** - optional; Set the size of the editing window. If the field is missing it will adjust to the size of the parent.
>> 
>> **viewport** - required; Set the initial dimensions of the cropping window. **isChanged** and **aspect-ratio** are optional fields.
If you specify aspect-ration, then the height of the viewport will not be taken into account, it will be calculated from the width.
>> 
>> **background** - optional; 
You can set the background of the container (the image will be adjusted to the size of the container and if they do not match, then the gaps can be filled in as desired).
Default background is white.
>>> Priority: 1 - image; 2 - parentImage; 3 - color;

```
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

> Get cropped image
>> method **getCrop** return url string;
```
cuttie.getCrop();
```