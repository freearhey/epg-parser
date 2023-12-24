const convert = require('xml-js')
const dayjs = require('dayjs')
const _ = require('lodash')
const customParseFormat = require('dayjs/plugin/customParseFormat')

dayjs.extend(customParseFormat)

function parseTime(time) {
  return dayjs(time, 'YYYYMMDDHHmmss ZZ')
}

function parseElement(el) {
  let output = { ...el.attributes }

  if (!Array.isArray(el.elements)) return output

  const textElement = el.elements.find(el => el.type === 'text')
  if (textElement) {
    output.value = textElement.text
  }

  const valueElement = el.elements.find(el => el.name === 'value')
  if (!textElement && valueElement && Array.isArray(valueElement.elements)) {
    output.value = valueElement.elements[0].text
  }

  let nestedElements = el.elements.filter(el => el.type !== 'text' && el.name !== 'value') || []
  nestedElements = _.groupBy(nestedElements, 'name')
  for (let name in nestedElements) {
    output[name] = nestedElements[name].map(parseElement)
  }

  return output
}

class Model {
  constructor(data) {
    this._attributes = data.attributes || {}
    this._elements = data.elements || []
  }

  _getArray(name) {
    return this._elements.filter(el => el.name === name).map(parseElement)
  }

  _getObject(name) {
    const found = this._elements.find(el => el.name === name)

    return found ? parseElement(found) : {}
  }

  _getFlatObject(name) {
    const found = this._elements.find(el => el.name === name)
    if (!found) return {}
    const element = parseElement(found)
    const output = {}
    for (let name in element) {
      output[name] = element[name][0].value
    }

    return output
  }

  _getString(name) {
    const el = this._elements.find(el => el.name === name)
    if (!el || !Array.isArray(el.elements)) return null
    const textElement = el.elements.find(el => el.type === 'text')
    if (!textElement) return null

    return textElement.text
  }

  _getBoolean(name) {
    const found = this._elements.find(el => el.name === name)

    return found ? true : false
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
    this.displayName = this._getArray('display-name')
    this.icon = this._getArray('icon')
    this.url = this._getArray('url')
    this.lcn = this._getArray('lcn')
  }
}

class Programme extends Model {
  constructor(data) {
    super(data)

    this.start = parseTime(this._attributes.start)
    this.stop = parseTime(this._attributes.stop)
    this.channel = this._attributes.channel

    this.title = this._getArray('title')
    this.subTitle = this._getArray('sub-title')
    this.desc = this._getArray('desc')
    this.category = this._getArray('category')
    this.date = this._getString('date')
    this.episodeNum = this._getArray('episode-num')
    this.previouslyShown = this._getArray('previously-shown')
    this.icon = this._getArray('icon')
    this.image = this._getArray('image')
    this.url = this._getArray('url')
    this.review = this._getArray('review')
    this.premiere = this._getArray('premiere')
    this.country = this._getArray('country')
    this.origLanguage = this._getArray('orig-language')
    this.language = this._getArray('language')
    this.length = this._getArray('length')
    this.lastChance = this._getArray('last-chance')
    this.keyword = this._getArray('keyword')
    this.video = this._getFlatObject('video')
    this.audio = this._getFlatObject('audio')
    this.rating = this._getArray('rating')
    this.starRating = this._getArray('star-rating')
    this.subtitles = this._getArray('subtitles')
    this.credits = this._getObject('credits')
    this.new = this._getBoolean('new')
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
