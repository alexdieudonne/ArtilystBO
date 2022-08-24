import { CollectionConfig } from 'payload/types';

const Roles: CollectionConfig = {
    slug: 'roles',
    admin: {
        useAsTitle: 'name',
    },
    fields: [
        {
            name: 'name',
            label: 'Nom du role',
            type: 'text',
            required: true
        },
        {
            name: 'description',
            label: 'Description',
            type: 'text',
            required: true
        },
        {
            name: 'rights',
            label: 'Droits',
            type: 'select',
            hasMany: true,
            options: [
                {
                    label: 'Voir',
                    value: 'read'
                },
                {
                    label: 'Mettre à jour',
                    value: 'update'
                },
                {
                    label: 'Supprimer',
                    value: 'delete'
                },
                {
                    label: 'Créer',
                    value: 'create'
                }
            ]
        },
    ],
}

export default Roles;