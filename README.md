# epg-parser [![Build Status](https://app.travis-ci.com/freearhey/epg-parser.svg?branch=master)](https://app.travis-ci.com/freearhey/epg-parser)

It parses EPG XMLTV files and converts it to a regular JavaScript object.

## Installation

```sh
npm install epg-parser
```

## Usage

```js
import fs from 'fs'
import parser from 'epg-parser'

const epg = fs.readFileSync('./epg.xml', { encoding: 'utf-8' })
const result = parser.parse(epg)

console.log(result)
```

## Example

Input:

```xml
<?xml version="1.0" encoding="ISO-8859-1" ?>
<!DOCTYPE tv SYSTEM "xmltv.dtd">
<tv
  source-info-url="http://www.schedulesdirect.org/"
  source-info-name="Schedules Direct"
  generator-info-name="XMLTV/$Id: tv_grab_na_dd.in,v 1.70 2008/03/03 15:21:41 rmeden Exp $"
  generator-info-url="http://www.xmltv.org/"
>
  <channel id="I10436.labs.zap2it.com">
    <display-name lang="fr">13 KERA</display-name>
    <display-name lang="ar">13</display-name>
    <url>http://www.whatsonarabia.com</url>
    <icon src="https://i.imgur.com/kJCjeQ4.png" />
  </channel>
  <programme
    start="20080715003000 -0600"
    stop="20080715010000 -0600"
    channel="I10436.labs.zap2it.com"
  >
    <title lang="en">NOW on PBS</title>
    <desc
      lang="en"
    >Jordan's Queen Rania has made job creation a priority to help curb the staggering unemployment rates among youths in the Middle East.</desc>
    <date>20080711</date>
    <category lang="en">Newsmagazine</category>
    <category lang="en">Interview</category>
    <episode-num system="dd_progid">EP01006886.0028</episode-num>
    <episode-num system="onscreen">427</episode-num>
    <audio>
      <stereo>stereo</stereo>
    </audio>
    <previously-shown start="20080711000000" />
    <subtitles type="teletext" />
    <rating system="VCHIP">
      <value>TV-G</value>
    </rating>
    <credits>
      <actor>Peter Bergman</actor>
      <actor>Eric Braeden</actor>
      <director>Bart Eskander</director>
      <producer>Roger Dobkowitz</producer>
      <presenter>Drew Carey</presenter>
    </credits>
    <icon
      src="http://imageswoapi.whatsonindia.com/WhatsOnTV/images/ProgramImages/xlarge/38B4DE4E9A7132257749051B6C8B4F699DB264F4V.jpg"
    />
  </programme>
</tv>
```

Output:

```js
{
  channels: [
    {
      id: 'I10436.labs.zap2it.com',
      name: [
        {
          lang: 'fr',
          value: '13 KERA'
        },
        {
          lang: 'ar',
          value: '13'
        }
      ],
      icon: ['https://i.imgur.com/kJCjeQ4.png'],
      url: ['http://www.whatsonarabia.com']
    }
  ],
  programs: [
    {
      start: '20080715003000 -0600',
      stop: '20080715010000 -0600',
      channel: 'I10436.labs.zap2it.com',
      title: [ { lang: 'en', value: 'NOW on PBS' } ],
      desc:
       [ { lang: 'en',
           value:
            'Jordan\'s Queen Rania has made job creation a priority to help curb the staggering unemployment rates among youths in the Middle East.' } ],
      date: ['20080711'],
      category:
       [ { lang: 'en', value: 'Newsmagazine' },
         { lang: 'en', value: 'Interview' } ],
      episodeNum:
       [ { system: 'dd_progid', value: 'EP01006886.0028' },
         { system: 'onscreen', value: '427' } ],
      previouslyShown: [{ start: '20080711000000' }],
      subtitles: [{ type: 'teletext' }],
      rating: [{
        system: 'VCHIP',
        value: 'TV-G'
      }],
      credits: [
        {
          role: 'actor',
          name: 'Peter Bergman'
        },
        {
          role: 'actor',
          name: 'Eric Braeden'
        },
        {
          role: 'director',
          name: 'Bart Eskander'
        },
        {
          role: 'producer',
          name: 'Roger Dobkowitz'
        },
        {
          role: 'presenter',
          name: 'Drew Carey'
        }
      ],
      icon: ['http://imageswoapi.whatsonindia.com/WhatsOnTV/images/ProgramImages/xlarge/38B4DE4E9A7132257749051B6C8B4F699DB264F4V.jpg'],
      audio: [{
        stereo: 'stereo'
      }]
    }
  ]
}
```

## Testing

```sh
npm test
```

## Contribution

If you find a bug or want to contribute to the code or documentation, you can help by submitting an [issue](https://github.com/freearhey/epg-parser/issues) or a [pull request](https://github.com/freearhey/epg-parser/pulls).

## License

[MIT](LICENSE)
