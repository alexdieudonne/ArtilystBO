import { buildConfig } from 'payload/config';
import path from 'path';
// import Examples from './collections/Examples';
import Users from './collections/Users';
import Roles from './collections/Roles';
import Medias from './collections/Medias';
import Projects from './collections/Projects';
import Matches from './collections/Matches';
import UserPanel from './collections/UserPanel';
import app from './app';


export default buildConfig({
  serverURL: 'http://localhost:3000',
  admin: {
    user: UserPanel.slug,
    css: path.resolve(__dirname, './core/admin/scss/global.scss'),
  },
  collections: [
    Users,
    Roles,
    Medias,
    Projects,
    Matches,
    UserPanel
    // Add Collections here
    // Examples,
  ],
  upload: {
    // limits: {
    //   fileSize: 5000000, // 5MB, written in bytes
    // },
  },
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
});
