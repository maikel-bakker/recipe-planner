import { createClient } from 'contentful-management'

const {
  CONTENTFUL_MANAGEMENT_ACCESS_TOKEN
} = process?.env

const ContentfulManagementClient = CONTENTFUL_MANAGEMENT_ACCESS_TOKEN && createClient({
  accessToken: CONTENTFUL_MANAGEMENT_ACCESS_TOKEN
})

export default ContentfulManagementClient

