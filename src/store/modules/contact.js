import { contactService } from '@/services/contact.service.js'
export default {
    state: {
        contacts: []
    },
    mutations: {
        setContacts(state, { contacts }) {
            state.contacts = contacts
        },
        addNewContact(state, { newContact }) {
            state.contacts.push(newContact)
        },
        removeContact(state, { contactId }) {
            const idx = state.contacts.findIndex(contact => contact._id === contactId)
            state.contacts.splice(idx, 1)
            console.log(state)
        },

    },
    actions: {
        async loadContacts(context) {
            const contacts = await contactService.query()
            context.commit({ type: 'setContacts', contacts })
        },
        async saveContact(context, { contact }) {
            const newContact = await contactService.save(contact)
            context.commit({ type: 'addNewContact', newContact })
        },
        async removeContact(context, { contactId }) {
            await contactService.remove(contactId);
            context.commit({ type: 'removeContact', contactId })

        }
    },
    getters: {
        contacts(state) { return state.contacts }
    }
}