import { CollectionConfig } from 'payload/types';
import { Gender } from '../database/model/AccountType';
import { categoryProject } from '../database/model/ProjectType';
import { getEnumValues } from '../helpers/utils';

enum userAll {
  ALL = "Tous"
}

const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      label: 'Titre',
      required: true,
      type: 'text',
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      required: true,
      maxLength: 450
    },
    {
      type: 'row',
      fields: [
        {
          label: "Date début",
          name: 'date_start',
          type: 'date',
          required: true,
          admin: {
            width: '50%'
          }
        },
        {
          label: "Date fin",
          name: 'date_end',
          type: 'date',
          required: true,
          admin: {
            width: '50%'
          }
        },

      ],
    },
    {
      label: 'Illustrations',
      name: 'pictures',
      type: 'relationship',
      relationTo: 'medias',
      hasMany: true,
    },
    {
      label: "Renuméré ?",
      name: 'paid',
      type: 'checkbox'
    },
    {
      label: "Collaborateur",
      name: 'collaborator',
      type: 'group',
      fields: [
        {
          name: 'specifies',
          label: 'Spécifités',
          type: 'select',
          options: [
            ...getEnumValues(categoryProject)
          ],
        },
        {
          name: 'gender',
          label: 'Genre',
          type: 'select',
          required: false,
          hasMany: false,
          options: [
            ...getEnumValues({ ...Gender, ...userAll })
          ],
        },
        {
          label: 'Ville',
          name: 'city',
          type: 'text',
        },
        {
          label: 'Tranche d\'age',
          name: 'age',
          type: 'group',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  label: 'Portée de départ',
                  name: 'range_start',
                  type: 'number',
                  admin: {
                    width: '50%'
                  }
                },
                {
                  label: 'Portée de fin',
                  name: 'range_end',
                  type: 'number',
                  admin: {
                    width: '50%'
                  }
                }
              ],

            },


          ],

        }
      ]
    }

  ],
}

export default Projects;