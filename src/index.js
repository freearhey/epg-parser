const convert = require('xml-js')
const dayjs = require('dayjs')
const _ = require('lodash')
const customParseFormat = require('dayjs/plugin/customParseFormat')

dayjs.extend(customParseFormat)

function parseTime(time) {
  return dayjs(time, 'YYYYMMDDHHmmss ZZ')
}

function parseElement(el) {
  const textElement =
    el.elements && el.elements.length ? el.elements.find(el => el.type === 'text') : null
  const value = textElement ? { value: textElement.text } : {}

  let elements =
    el.elements && el.elements.length ? el.elements.filter(el => el.type === 'element') : []

  let attrs = {}
  for (let el of elements) {
    const textElement =
      el.elements && el.elements.length ? el.elements.find(el => el.type === 'text') : null

    if (textElement) {
      attrs[el.name] = textElement.text
    } else if (el.attributes) {
      if (!attrs[el.name]) attrs[el.name] = []

      attrs[el.name].push(el.attributes)
    }
  }

  return { ...el.attributes, ...attrs, ...value }
}

class Model {
  constructor(data) {
    this._attributes = data.attributes || {}
    this._elements = data.elements || []
  }

  _get(name) {
    return this._elements.filter(el => el.name === name).map(parseElement)
  }

  toObject() {
    const channel = this
    delete channel._attributes
    delete channel._elements

    return JSON.parse(JSON.stringify(channel))
  }
}

class Channel extends Model {
  constructor(data) {
    super(data)

    this.id = this._attributes.id
    this.name = this._get('display-name')
    this.icon = this._get('icon').map(el => el.src)
    this.url = this._get('url').map(el => el.value)
  }
}

class Programme extends Model {
  constructor(data) {
    super(data)

    this.start = parseTime(this._attributes.start)
    this.stop = parseTime(this._attributes.stop)
    this.channel = this._attributes.channel

    this.title = this._get('title')
    this.subTitle = this._get('sub-title')
    this.desc = this._get('desc')
    this.category = this._get('category')
    this.date = this._get('date')
    this.episodeNum = this._get('episode-num')
    this.previouslyShown = this._get('previously-shown')
    this.icon = this._get('icon')
    this.image = this._get('image')
    this.url = this._get('url')
    this.review = this._get('review')
    this.premiere = this._get('premiere')
    this.country = this._get('country')
    this.origLanguage = this._get('orig-language')
    this.language = this._get('language')
    this.length = this._get('length')
    this.lastChance = this._get('last-chance')
    this.keyword = this._get('keyword')
    this.video = this._get('video')
    this.audio = this._get('audio')
    this.rating = this._get('rating')
    this.starRating = this._get('star-rating')
    this.subtitles = this._get('subtitles')

    const credits = this._elements.find(el => el.name === 'credits')
    this.credits =
      credits && credits.elements.length
        ? credits.elements
            .map(el => {
              if (!el.elements) return

              return {
                type: el.name,
                role: el.attributes.role,
                name: el.elements[0].text
              }
            })
            .filter(Boolean)
        : []
  }
}

module.exports = {
  parse(source) {
    source = source.toString().replace(/&/g, '&amp;')
    const obj = convert.xml2js(source, { compact: false, trim: true })
    let tv = {}
    if (Array.isArray(obj.elements)) tv = obj.elements.find(el => el.name === 'tv')
    let channels = []
    let programs = []
    if (Array.isArray(tv.elements)) {
      channels = tv.elements
        .filter(el => el.name === 'channel')
        .map(el => new Channel(el).toObject())
      programs = tv.elements
        .filter(el => el.name === 'programme')
        .map(el => new Programme(el).toObject())
    }

    return {
      channels,
      programs
    }
  }
}
