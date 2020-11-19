const { CONTENT_TYPES } = require('../constants')

const days = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
]

module.exports = async function (migration, { makeRequest }) {
  try {
    await makeRequest({
      method: 'GET',
      url: `/content_types/${CONTENT_TYPES.WEEK_PLANNING}`
    })
  } catch (e) {
    const weekPlanning = migration.createContentType(CONTENT_TYPES.WEEK_PLANNING, {
      name: 'Week Planning',
      displayField: 'title',
    })

    weekPlanning.createField('title', {
      name: 'Title',
      type: 'Symbol',
      required: true
    })

    weekPlanning.createField('weekNumber', {
      name: 'Week Number',
      type: 'Integer',
      validations: [
        {
          unique: true
        }
      ]
    })

    days.forEach((day) => {
      weekPlanning.createField(day.toLowerCase(), {
        name: day,
        type: 'Link',
        validations: [
          {
            linkContentType: [ CONTENT_TYPES.RECIPE ]
          }
        ],
        linkType: 'Entry'
      })
    })
  }
}
