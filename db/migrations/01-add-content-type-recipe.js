const { CONTENT_TYPES } = require('../constants')

module.exports = async function (migration, { makeRequest }) {
  try {
    await makeRequest({
      method: 'GET',
      url: `/content_types/${CONTENT_TYPES.RECIPE}`
    })
  } catch (e) {
    const recipe = migration.createContentType(CONTENT_TYPES.RECIPE, {
      name: 'Recipe',
      displayField: 'title'
    })

    recipe.createField('title', {
      name: 'Title',
      type: 'Symbol',
      required: true
    })

    recipe.createField('slug', {
      name: 'Slug',
      type: 'Symbol',
      validations: [
        {
          unique: true
        },
        {
          regexp: {
            pattern: '^[a-z0-9]+(?:-[a-z0-9]+)*$'
          }
        }
      ]
    })

    recipe.createField('link', {
      name: 'Title',
      type: 'Symbol',
      validations: [
        {
          regexp: {
            pattern: '(ftp|http|https):\\/\\/(\\w+:{0,1}\\w*@)?(\\S+)(:[0-9]+)?(\\/|\\/([\\w#!:.?+=&%@!\\-/]))?$'
          }
        }
      ]
    })

    recipe.createField('ingredients', {
      name: 'Ingredients',
      type: 'RichText',
      validations: [
        {
          enabledMarks: []
        },
        {
          enabledNodeTypes: ['unordered-list']
        }
      ]
    })

    recipe.createField('steps', {
      name: 'Steps',
      type: 'RichText',
      validations: [
        {
          enabledMarks: []
        },
        {
          enabledNodeTypes: ['ordered-list']
        }
      ]
    })
  }

}
