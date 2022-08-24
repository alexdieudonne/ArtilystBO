import { CollectionConfig } from 'payload/types';

// Example Collection - For reference only, this must be added to payload.config.ts to be used.
const UserPanel: CollectionConfig = {
    slug: 'userpanel',
    admin: {
        useAsTitle: 'firstname',
    },
    auth: {
        tokenExpiration: 7200, // How many seconds to keep the user logged in
        verify: true, // Require email verification before being allowed to authenticate
        maxLoginAttempts: 5, // Automatically lock a user out after X amount of failed logins
        lockTime: 600 * 1000, // Time period to allow the max login attempts
        // More options are available
    },
    fields: [
        {
            name: 'firstname',
            label: 'Nom de famille',
            type: 'text',
            required: false,
        },
        {
            name: 'lastname',
            label: 'Prénom',
            type: 'text',
            required: false
        },
        {
            name: 'roles',
            type: 'relationship',
            relationTo: 'roles',
            hasMany: true,
        },
    ],
}

export default UserPanel;