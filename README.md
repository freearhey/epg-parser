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
<?xml version="1.0" encoding="ISO-8859-1"?>
<!DOCTYPE tv SYSTEM "xmltv.dtd">
<tv source-info-url="http://www.schedulesdirect.org/" source-info-name="Schedules Direct" generator-info-name="XMLTV/$Id: tv_grab_na_dd.in,v 1.70 2008/03/03 15:21:41 rmeden Exp $" generator-info-url="http://www.xmltv.org/">
  <channel id="I10436.labs.zap2it.com">
    <display-name lang="fr">13 KERA</display-name>
    <display-name lang="ar">13</display-name>
    <icon src="https://example.com/channel_one_icon.jpg" width="100" height="100" />
    <url system="example">https://example.com/channel_one</url>
    <url system="other_system">https://example.com/channel_one_alternate</url>
    <lcn>36</lcn>
  </channel>
  <programme start="20080715003000 -0600" stop="20080715010000 -0600" channel="I10436.labs.zap2it.com">
    <title lang="en">NOW on PBS</title>
    <sub-title lang="en">Pilot</sub-title>
    <desc lang="en">Jordan's Queen Rania has made job creation a priority to help curb the staggering unemployment rates among youths in the Middle East.</desc>
    <date>20080711</date>
    <category lang="en">Newsmagazine</category>
    <category lang="en">Interview</category>
    <keyword lang="en">physical-comedy</keyword>
    <keyword lang="en">romantic</keyword>
    <language>English</language>
    <orig-language lang="en">French</orig-language>
    <length units="minutes">60</length>
    <url system="imdb">https://example.com/programme_one</url>
    <url>https://example.com/programme_one_2</url>
    <country>US</country>
    <episode-num system="dd_progid">EP01006886.0028</episode-num>
    <episode-num system="onscreen">427</episode-num>
    <video>
      <present>yes</present>
      <colour>no</colour>
      <aspect>16:9</aspect>
      <quality>HDTV</quality>
    </video>
    <audio>
      <present>yes</present>
      <stereo>Dolby Digital</stereo>
    </audio>
    <previously-shown start="20080711000000" channel="channel-two.tv" />
    <premiere>First time on British TV</premiere>
    <last-chance lang="en">Last time on this channel</last-chance>
    <new />
    <subtitles type="teletext">
      <language>English</language>
    </subtitles>
    <subtitles type="onscreen">
      <language lang="en">Spanish</language>
    </subtitles>
    <rating system="BBFC">
      <value>15</value>
    </rating>
    <rating system="MPAA">
      <value>NC-17</value>
      <icon src="NC-17_symbol.png" />
    </rating>
    <star-rating system="TV Guide">
      <value>4/5</value>
      <icon src="stars.png" />
    </star-rating>
    <star-rating system="IMDB">
      <value>8/10</value>
    </star-rating>
    <review type="text" source="Rotten Tomatoes" reviewer="Joe Bloggs" lang="en">This is a fantastic show!</review>
    <review type="text" source="IDMB" reviewer="Jane Doe" lang="en">I love this show!</review>
    <review type="url" source="Rotten Tomatoes" reviewer="Joe Bloggs" lang="en">https://example.com/programme_one_review</review>
    <image type="poster" size="1" orient="P" system="tvdb">https://tvdb.com/programme_one_poster_1.jpg</image>
    <image type="poster" size="2" orient="P" system="tmdb">https://tmdb.com/programme_one_poster_2.jpg</image>
    <image type="backdrop" size="3" orient="L" system="tvdb">https://tvdb.com/programme_one_backdrop_3.jpg</image>
    <image type="backdrop" size="3" orient="L" system="tmdb">https://tmdb.com/programme_one_backdrop_3.jpg</image>
    <credits>
      <actor></actor>
      <actor role="Walter Johnson">David Thompson</actor>
      <actor role="Karl James" guest="yes">
        Ryan Lee
        <image type="person">https://example.com/xxx.jpg</image>
        <url system="moviedb">https://example.com/person/204</url>
      </actor>
      <director>Bart Eskander</director>
      <producer>Roger Dobkowitz</producer>
      <presenter>Drew Carey</presenter>
    </credits>
    <icon src="http://imageswoapi.whatsonindia.com/WhatsOnTV/images/ProgramImages/xlarge/38B4DE4E9A7132257749051B6C8B4F699DB264F4V.jpg" width="100" height="100" />
  </programme>
</tv>
```

Output:

```js
{
    channels: [
      {
        id: 'I10436.labs.zap2it.com',
        displayName: [
          {
            lang: 'fr',
            value: '13 KERA'
          },
          {
            lang: 'ar',
            value: '13'
          }
        ],
        icon: [{ src: 'https://example.com/channel_one_icon.jpg', width: '100', height: '100' }],
        url: [
          { system: 'example', value: 'https://example.com/channel_one' },
          { system: 'other_system', value: 'https://example.com/channel_one_alternate' }
        ],
        lcn: [{ value: '36' }]
      }
    ],
    programs: [
      {
        start: '2008-07-15T06:30:00.000Z',
        stop: '2008-07-15T07:00:00.000Z',
        channel: 'I10436.labs.zap2it.com',
        title: [{ lang: 'en', value: 'NOW on PBS' }],
        subTitle: [{ lang: 'en', value: 'Pilot' }],
        desc: [
          {
            lang: 'en',
            value:
              "Jordan's Queen Rania has made job creation a priority to help curb the staggering unemployment rates among youths in the Middle East."
          }
        ],
        date: '20080711',
        category: [
          { lang: 'en', value: 'Newsmagazine' },
          { lang: 'en', value: 'Interview' }
        ],
        keyword: [
          { lang: 'en', value: 'physical-comedy' },
          { lang: 'en', value: 'romantic' }
        ],
        language: [{ value: 'English' }],
        origLanguage: [{ lang: 'en', value: 'French' }],
        length: [{ units: 'minutes', value: '60' }],
        url: [
          { system: 'imdb', value: 'https://example.com/programme_one' },
          { value: 'https://example.com/programme_one_2' }
        ],
        country: [{ value: 'US' }],
        video: {
          present: 'yes',
          colour: 'no',
          aspect: '16:9',
          quality: 'HDTV'
        },
        audio: {
          present: 'yes',
          stereo: 'Dolby Digital'
        },
        episodeNum: [
          { system: 'dd_progid', value: 'EP01006886.0028' },
          { system: 'onscreen', value: '427' }
        ],
        previouslyShown: [{ start: '20080711000000', channel: 'channel-two.tv' }],
        premiere: [{ value: 'First time on British TV' }],
        lastChance: [{ lang: 'en', value: 'Last time on this channel' }],
        new: true,
        subtitles: [
          { type: 'teletext', language: [{ value: 'English' }] },
          { type: 'onscreen', language: [{ lang: 'en', value: 'Spanish' }] }
        ],
        rating: [
          {
            system: 'BBFC',
            value: '15'
          },
          {
            system: 'MPAA',
            value: 'NC-17',
            icon: [{ src: 'NC-17_symbol.png' }]
          }
        ],
        starRating: [
          {
            system: 'TV Guide',
            value: '4/5',
            icon: [{ src: 'stars.png' }]
          },
          {
            system: 'IMDB',
            value: '8/10'
          }
        ],
        review: [
          {
            type: 'text',
            source: 'Rotten Tomatoes',
            reviewer: 'Joe Bloggs',
            lang: 'en',
            value: 'This is a fantastic show!'
          },
          {
            type: 'text',
            source: 'IDMB',
            reviewer: 'Jane Doe',
            lang: 'en',
            value: 'I love this show!'
          },
          {
            type: 'url',
            source: 'Rotten Tomatoes',
            reviewer: 'Joe Bloggs',
            lang: 'en',
            value: 'https://example.com/programme_one_review'
          }
        ],
        image: [
          {
            type: 'poster',
            size: '1',
            orient: 'P',
            system: 'tvdb',
            value: 'https://tvdb.com/programme_one_poster_1.jpg'
          },
          {
            type: 'poster',
            size: '2',
            orient: 'P',
            system: 'tmdb',
            value: 'https://tmdb.com/programme_one_poster_2.jpg'
          },
          {
            type: 'backdrop',
            size: '3',
            orient: 'L',
            system: 'tvdb',
            value: 'https://tvdb.com/programme_one_backdrop_3.jpg'
          },
          {
            type: 'backdrop',
            size: '3',
            orient: 'L',
            system: 'tmdb',
            value: 'https://tmdb.com/programme_one_backdrop_3.jpg'
          }
        ],
        credits: {
          actor: [
            {},
            {
              role: 'Walter Johnson',
              value: 'David Thompson'
            },
            {
              role: 'Karl James',
              guest: 'yes',
              value: 'Ryan Lee',
              image: [{ type: 'person', value: 'https://example.com/xxx.jpg' }],
              url: [{ system: 'moviedb', value: 'https://example.com/person/204' }]
            }
          ],
          director: [
            {
              value: 'Bart Eskander'
            }
          ],
          producer: [
            {
              value: 'Roger Dobkowitz'
            }
          ],
          presenter: [{ value: 'Drew Carey' }]
        },
        icon: [
          {
            width: '100',
            height: '100',
            src: 'http://imageswoapi.whatsonindia.com/WhatsOnTV/images/ProgramImages/xlarge/38B4DE4E9A7132257749051B6C8B4F699DB264F4V.jpg'
          }
        ]
      }
    ]
  }
```

## Upgrading to v0.3.0 from v0.2.\*

To get the same result as in previous versions you need to modify some queries:

- `channel.name` => `channel.displayName`
- `channel.icon[0]` => `channel.icon[0].src`
- `channel.url[0]` => `channel.url[0].value`
- `program.icon[0]` => `program.icon[0].src`
- `program.date[0]` => `program.date`
- `program.credits[0].name` => `program.credits.actor[0].name`

## Testing

```sh
npm test
```

## Contribution

If you find a bug or want to contribute to the code or documentation, you can help by submitting an [issue](https://github.com/freearhey/epg-parser/issues) or a [pull request](https://github.com/freearhey/epg-parser/pulls).

## License

[MIT](LICENSE)
