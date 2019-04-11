const { ObjectID } = require('mongodb');

module.exports = {
    findOne: async (req, res, next, id) => {
        const note = await  req.app.database.collection('advert').findOne({ _id: ObjectID(req.params.id)});

        if (!note) return res.redirect('/');

        req.note = note;

        next();
    } ,

    showIndex:  async (req, res) => {
        const notes = await req.app.database.collection('advert').find().toArray()
        
        res.render('notes/views/index', { notes });
    },

    showView: async (req, res) => {
        res.render('notes/views/view', { note : req.note });        
    },

    showCreate: (req, res) => {  
        res.render('notes/views/create');
    },
    showUpdate: (req, res) => {  
        res.render('notes/views/update', { note : req.note });
    },
    showDelete: (req, res) => {  
        res.render('notes/views/delete', { note : req.note });
    },
    
    create:  async (req, res) => {  

        await req.app.database.collection('advert').insertOne(req.body);
     
        res.redirect('/');
     },

     update:  async (req, res) => {  
   
        await req.app.database.collection('advert').updateOne({_id: ObjectID(req.params.id)}, {$set: req.body });
     
        res.redirect(`/notes/${req.params.id}`);
     }, 

     delete:  async (req, res) => {  

        await req.app.database.collection('advert').deleteOne({_id: ObjectID(req.params.id)});
     
        res.redirect('/notes');
     }
}