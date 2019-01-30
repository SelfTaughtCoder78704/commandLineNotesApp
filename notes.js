console.log('Starting notes.js')
const fs = require('fs')

let fetchNotes = () => {
    try{
        //fetch notes
        notesString = fs.readFileSync('notes-data.json')
        return  JSON.parse(notesString)
   }catch(err){
        return []
   }
}

let saveNotes = (notes) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes))
}

let add_note = (title, body) => {
   let  notes = fetchNotes()
   let oneNote = {
       title,
       body
   }
   //check duplicates
   let duplicateNotes = notes.filter((note) => note.title === title)
   if(duplicateNotes.length === 0){
        //push new note
        notes.push(oneNote)
       saveNotes(notes)
       return oneNote
   }
}



let getAll = () => {
   console.log(fetchNotes())

}

let readNote = (title) => {
    let allnotes = fetchNotes()
   
    for(let i = 0; i < allnotes.length; i++ ){
        if(allnotes[i].title === title) {
           return allnotes[i].body
        }
    }
   // let filteredNotes = allnotes.filter((note) => note.title === title)
   // return filteredNotes[0]
}

let removeNote = (title) => {
   let notes = fetchNotes()
   let filteredNotes = notes.filter((note) => note.title !== title) 
   saveNotes(filteredNotes)
   return notes.length !== filteredNotes.length

}

module.exports = {
    add_note,
    getAll,
    readNote,
    removeNote
}