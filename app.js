//BUILT-IN MODULES
const fs = require('fs')
const _ = require('lodash')
const yargs = require('yargs')

//NOTES.JS MODULE I CREATED
const notes = require('./notes')

// COMMAND-LINE VARIABLE 
const argv = yargs.argv

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
    notes.getAll()
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

