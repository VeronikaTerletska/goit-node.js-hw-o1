const contactsOperation = require("./contacts");

const { Command } = require("commander");
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
      const contacts = await contactsOperation.listContacts();
      console.table(contacts);
      break;

    case "get":
      const contact = await contactsOperation.getContactById(id);
      if (!contact) {
        throw new Error(`Contact with id=${id} not found`);
      }
      console.log(contact);
      break;

    case "add":
      const newContact = await contactsOperation.addContact(name, email, phone);
      if (!newContact) {
        throw new Error(`Contact didn't create`);
      }
      console.log(newContact);
      break;

    case "remove":
      const delContact = await contactsOperation.removeContact(id);
      if (!delContact) {
        throw new Error(`Contact with id=${id} not found`);
      }
      console.log(delContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
