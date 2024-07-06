import { isValidObjectId } from 'mongoose'
import Contact from '../modules/contactModule.js'


async function getContacts(req, res, next){
    try {
        const id = req.user.id
        const contacts = await Contact.find({owner: id})

        res.status(201).send(contacts)
    } catch (error){
        next(error)
    }
}

async function createContact(req, res, next){
    try {
        const {name , email, phone} = req.body

        const test = await Contact.findOne({email})
        if(test){
            return res.status(401).send({message: "This contact is already taken"})
        }

        const contact = { name, email, phone, owner: req.user.id}
        const newContact = await Contact.create(contact)
        res.status(201).json(newContact)
    } catch (error){
        next(error)
    }
}

async function getOneContact(req, res, next){
    try{
        const {id} = req.params
        if(!isValidObjectId(id)) return res.status(404).send({message: "This contact is not defined"})
        const contact = await Contact.findOne({_id: id, owner: req.user.id})
        if(!contact) return res.status(401).send({message: "This contact is not found"})
        res.status(201).send(contact)
    } catch (error){
        next(error)
    }
}

async function deleteContact(req, res, next){
    try{
        const {id} = req.params;
        if(!isValidObjectId(id)) return res.status(404).send({message: "This contact is not defined"})
        const contact = await Contact.findOneAndDelete({_id: id, owner: req.user.id})
        if(!contact) return res.status(401).send({message: "contact is not defined"})
        res.status(201).send(contact)
    } catch (error){
        next(error)
    }
}

async function updateContact(req, res, next){
    try{
        const {id} = req.params;
        if(!isValidObjectId(id)) return res.status(404).send({message: "Your id is not defined"})
        
        const {name, email, phone} = req.body;
        const contact = await Contact.findOneAndUpdate({_id: id, owner: req.user.id }, { name, email, phone}, {new: true})

        res.status(201).send(contact)
    } catch (error){
        next(error)
    }
}

export default {
    createContact,
    getContacts,
    getOneContact,
    deleteContact,
    updateContact
}