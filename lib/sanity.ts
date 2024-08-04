import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, useCdn } from './env'
import ImageUrlBuilder  from "@sanity/image-url"

export const client = createClient({
  apiVersion : "v2022-03-07",
  dataset : "production",
  projectId : "fdzd1u12" ,
  useCdn : false,
})


const builder = ImageUrlBuilder(client)
export const urlFor =(source :any) => {
  return builder.image(source)
}
