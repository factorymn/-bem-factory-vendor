# block : 'slider'

## Usage with engine
NB: `Flickity` is thicker than `Slick` by ~90Kb (versions 1.1.1 / 1.5.8).

JS hash here is engine options/settings.
See:
[Slick options](http://kenwheeler.github.io/slick/#settings)
[Flickity options](http://flickity.metafizzy.co/options.html)

```javascript
{
    block : 'slider',
    mods : { engine : 'slick' },
    js : {
        infinite : false,
        slidesToShow : 2,
        prevArrow : '.button_theme_arrow.button_arrow_right',
        nextArrow : '.button_theme_arrow.button_arrow_left'
    },
    slides : [
        {
            block : 'image',
            url : 'i/test.png'
        },
        {
            block : 'image',
            url : 'i/test.png'
        }
    ],
    controlPrev : [
        {
            block : 'button',
            mods : { theme : 'arrow', arrow : 'right' }
        }
    ],
    controlNext : [
        {
            block : 'button',
            mods : { theme : 'arrow', arrow : 'left' }
        }
    ]
}
```