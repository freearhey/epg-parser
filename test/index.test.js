import parser from '../src'
import fs from 'fs'

fit('can parse xmltv string', () => {
  let content = fs.readFileSync('test/data/basic.xml')
  let result = parser.parse(content)

  expect(result).toEqual({
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
      },
      {
        id: 'I10759.labs.zap2it.com',
        name: [
          {
            value: '11 KTVT'
          }
        ],
        icon: [],
        url: []
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
        date: [{ value: '20080711' }],
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
        video: [
          {
            present: 'yes',
            colour: 'no',
            aspect: '16:9',
            quality: 'HDTV'
          }
        ],
        audio: [{ present: 'yes', stereo: 'Dolby Digital' }],
        episodeNum: [
          { system: 'dd_progid', value: 'EP01006886.0028' },
          { system: 'onscreen', value: '427' }
        ],
        previouslyShown: [{ start: '20080711000000', channel: 'channel-two.tv' }],
        premiere: [{ value: 'First time on British TV' }],
        lastChance: [{ lang: 'en', value: 'Last time on this channel' }],
        new: true,
        subtitles: [
          { type: 'teletext', language: 'English' },
          { type: 'onscreen', language: 'Spanish' }
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
        credits: [
          {
            type: 'actor',
            role: 'Walter Johnson',
            name: 'David Thompson'
          },
          {
            type: 'actor',
            role: 'Karl James',
            guest: 'yes',
            name: 'Ryan Lee',
            image: [{ type: 'person', value: 'https://example.com/xxx.jpg' }],
            url: [{ system: 'moviedb', value: 'https://example.com/person/204' }]
          },
          {
            type: 'director',
            name: 'Bart Eskander'
          },
          {
            type: 'producer',
            name: 'Roger Dobkowitz'
          },
          {
            type: 'presenter',
            name: 'Drew Carey'
          }
        ],
        icon: [
          {
            width: '100',
            height: '100',
            src: 'http://imageswoapi.whatsonindia.com/WhatsOnTV/images/ProgramImages/xlarge/38B4DE4E9A7132257749051B6C8B4F699DB264F4V.jpg'
          }
        ]
      },
      {
        start: '2008-07-15T07:00:00.000Z',
        stop: '2008-07-15T08:30:00.000Z',
        channel: 'I10759.labs.zap2it.com',
        title: [],
        subTitle: [],
        desc: [],
        date: [],
        category: [],
        episodeNum: [],
        previouslyShown: [],
        subtitles: [],
        rating: [],
        starRating: [],
        review: [],
        url: [],
        image: [],
        credits: [],
        audio: [],
        video: [],
        country: [],
        keyword: [],
        lastChance: [],
        language: [],
        length: [],
        origLanguage: [],
        premiere: [],
        icon: []
      }
    ]
  })
})

it('can parse really big file', () => {
  let content = fs.readFileSync('test/data/large.xml')
  let result = parser.parse(content)

  expect(result.channels.length).toEqual(85)
})

it('return empty array if file is empty', () => {
  let content = fs.readFileSync('test/data/empty.xml')
  let result = parser.parse(content)

  expect(result.channels.length).toEqual(0)
})
