import parser from '../src'
import fs from 'fs'

it('can parse xmltv string', () => {
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
        start: '20080715003000 -0600',
        stop: '20080715010000 -0600',
        channel: 'I10436.labs.zap2it.com',
        title: [{ lang: 'en', value: 'NOW on PBS' }],
        desc: [
          {
            lang: 'en',
            value:
              "Jordan's Queen Rania has made job creation a priority to help curb the staggering unemployment rates among youths in the Middle East."
          }
        ],
        date: ['20080711'],
        category: [
          { lang: 'en', value: 'Newsmagazine' },
          { lang: 'en', value: 'Interview' }
        ],
        episodeNum: [
          { system: 'dd_progid', value: 'EP01006886.0028' },
          { system: 'onscreen', value: '427' }
        ],
        previouslyShown: [{ start: '20080711000000' }],
        subtitles: [{ type: 'teletext' }],
        rating: [
          {
            system: 'VCHIP',
            value: 'TV-G'
          }
        ],
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
        icon: [
          'http://imageswoapi.whatsonindia.com/WhatsOnTV/images/ProgramImages/xlarge/38B4DE4E9A7132257749051B6C8B4F699DB264F4V.jpg'
        ],
        audio: [
          {
            stereo: 'stereo'
          }
        ]
      },
      {
        start: '20080715010000 -0600',
        stop: '20080715023000 -0600',
        channel: 'I10759.labs.zap2it.com',
        title: [],
        desc: [],
        date: [],
        category: [],
        episodeNum: [],
        previouslyShown: [],
        subtitles: [],
        rating: [],
        credits: [],
        audio: [],
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
