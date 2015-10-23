# block : 'youtube'

## Usage
Simply invoke block in bemjson, add to deps, and pass options to `js` field if necessary.
You can pass videoId as strictly videoId, iframe or short share code.

## Docs
YouTube API Docs:
[iFrame API Reference](https://developers.google.com/youtube/iframe_api_reference)
[Player Parameters](https://developers.google.com/youtube/player_parameters?playerVersion=HTML5)

```javascript
{
    block : 'youtube',
    js : {
        width : '640',
        height : '390',
        videoId : 'ghbZADQWG2U',
        playerVars : {
            autoplay : true
        }
    }
}
```