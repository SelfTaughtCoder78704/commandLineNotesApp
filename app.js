//BUILT-IN MODULES
const fs = require('fs')
const _ = require('lodash')
const yargs = require('yargs')

//NOTES.JS MODULE I CREATED
const notes = require('./notes')

//OPTIONS FOR YARGS AND HELP
const titleOptions =  {
    describe: 'Title of note goes here.',
    demand: true,
    alias: 't'
}

const bodyOptions = {
    describe: "Body of your note goes here.",
    demand: true,
    alias: 'b'
}

// COMMAND-LINE VARIABLE 
const argv = yargs
    .command('add', 'Add a new note', {
        title: titleOptions,
        body: bodyOptions
    })
    .command('list', 'List all notes')
    .command('read', "Read a note", {
        title: titleOptions
    })
    .command('remove', "Remove a Note", {
        title: titleOptions
    })
    .help()
    .argv

let command = argv._[0]
console.log('Command: ' +command)

//COMMAND SUPPORT
if(command === 'add'){
   let note =  notes.add_note(argv.title, argv.body)
   if(note){
       console.log('Note Created')
       console.log('---------')
       console.log(`Title: ${note.title}`)
       console.log(`Body: ${note.body}`)
   } else{
       console.log('Title already exists')
   }
}else if (command === 'list'){
    let allNotes = notes.getAll()
    console.log(`Printing ${allNotes.length} note(s)`)
    console.log(allNotes)
}else if(command === 'read'){
   let indiNote = notes.readNote(argv.title)
   if(indiNote){
    console.log(`Title: ${argv.title.toUpperCase()} `)
    console.log('--------------------------')
    console.log(` Body: ${indiNote}`)
   }else {
       console.log("TITLE NOT RECOGNIZED!")
   }
} else if (command === 'remove'){
   let removedNotes =   notes.removeNote(argv.title)
   let message = removedNotes ? 'Note Removed' : 'Note not found'
   console.log(message)
} else {
    console.log("Command not recognized")
}

