import express from 'express'
import ContactsController from '../controllers/contacts.js'
import validateBody from '../helpers/validateBody.js'
import { createContactSchema, updateContactSchema } from '../schemas/contactSchemas.js'

const router = express.Router()


router.get('/', ContactsController.getContacts)
router.get('/:id', ContactsController.getOneContact)
router.post('/', validateBody(createContactSchema), ContactsController.createContact)
router.put('/:id', validateBody(updateContactSchema), ContactsController.updateContact)
router.delete('/:id', ContactsController.deleteContact)


export default router