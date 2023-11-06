import * as contactService from "./contact.js";
import { Command } from "commander";
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const listContacts = await contactService.listContacts();
      return console.log(listContacts);

    case "get":
      const contact = await contactService.getContactById(id);
      return console.log(contact);

    case "add":
      const newContacts = await contactService.addContact({
        name,
        email,
        phone,
      });
      return console.log(newContacts);

    case "remove":
      const updateContacts = await contactService.removeContact(id);
      return console.log(updateContacts);

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}
invokeAction(argv);
