import { User } from './../payload-types';
import payload from 'payload';
import { CollectionConfig } from 'payload/types';

// Example Collection - For reference only, this must be added to payload.config.ts to be used.
const Medias: CollectionConfig = {
  slug: 'medias',
  fields: [],
  access: {
    create: () => true,
    read: () => true
  },
  upload: {
    staticURL: '/medias',
    staticDir: 'medias',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        crop: 'center'
      }
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*']
  }
}

export default Medias;