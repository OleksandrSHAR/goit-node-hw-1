import fs from "fs/promises";
import { nanoid } from "nanoid";
import path from "path";
const contactsPath = path.resolve("db", "contacts.json");
const updateContacts = (contactsList) =>
  fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));
export async function listContacts() {
  const result = await fs.readFile(contactsPath);
  return JSON.parse(result);
}

export async function getContactById(contactId) {
  const contactsList = await listContacts();
  const result = contactsList.find((item) => item.id === contactId);
  return result || null;
}

export async function addContact({ name, email, phone }) {
  const contactsList = await listContacts();
  const newContacts = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contactsList.push(newContacts);
  await updateContacts(contactsList);
  return newContacts;
}

export async function removeContact(contactId) {
  const contactsList = await listContacts();
  const index = contactsList.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = contactsList.splice(index, 1);
  await updateContacts(contactsList);
  return result;
}
