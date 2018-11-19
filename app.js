
//app js is the back end, what is gonna be printed has to be put on the ejs files

const express = require('express');
const app = express();
const Sequelize = require('sequelize');
const fs = require('fs');

//------ express settings -----//
app.set("view engine", "ejs");

//----- sequelize settings ------//
const sequelize = new Sequelize('db_text', 'clarapasteau', 'tootsie', {
    host: 'localhost',
    dialect: 'postgres',
  define: {
    timestamps: false // without this, "created_at" and "updated_at" will get generated on all tables by sequelize by default
  }
});

//------bodyparser-----//
app.use(express.json());
app.use(express.urlencoded({extended:false}));



// WE START OF WITH A MODEL(OUR TABLE)
const Messages = sequelize.define('messages', {
    title: Sequelize.TEXT,
    body: Sequelize.TEXT
});


//won't update the data at every restart (will keeep the original)
sequelize.sync({force:false});



 app.get("/", function (req, res){ 
 	res.render ("index");	
 })



app.post("/", (req,res)=>{ //user posts data on the index page
	// console.log(req.body) // to receive data on the terminal
	//require the body, create message

	//Messages.create

				Messages.create({
			 	title: req.body.title,
			 	body: req.body.body
				 })
				 
				   res.redirect('secondpage'); //which redirects to the secondpage
})




app.get("/secondpage", (req,res)=> { //you need to get the secondpage, you user asks for it
	Messages.findAll({raw : true}).then((values =>{			
				//console.log(values)				

		 res.render('secondpage', { posted: values} ); //renders on the same page itself
	})
	);
	

})



app.listen(3000, function () {
   console.log('Example app listening on port 3000!')
 })
