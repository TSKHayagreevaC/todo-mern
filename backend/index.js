
const express = require('express') 
const mongoose = require('mongoose') 
const cors = require('cors') 
const TodoModel = require("./models/todoList") 

var app = express(); 
app.use(cors()); 
app.use(express.json()); 


let client = null;

const initializeDbAndServer = async () => {
        const uri = "mongodb+srv://<username>:<password>@cluster0.7tovgdc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

        // Connect to your MongoDB database (replace with your database URL) 
        // mongoose.connect("mongodb://127.0.0.1/todo"); 
        
        // Check for database connection errors 
        // mongoose.connection.on("error", (error) => { 
        //     console.error("MongoDB connection error:", error); 
        // }); 

        // Create a MongoClient with a MongoClientOptions object to set the Stable API version
        const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
        });

        try {
            // Connect the client to the server	(optional starting in v4.7)
            await client.connect();
            // Send a ping to confirm a successful connection
            await client.db("admin").command({ ping: 1 });
            console.log("Pinged your deployment. You successfully connected to MongoDB!");
        } finally {
            // Ensures that the client will close when you finish/error
            await client.close();
        }

        return client;
};

// Get Todos
app.get("/todos", (req, res) => { 
    const client = initializeDbAndServer();
    if (client) {
        TodoModel.find({}) 
            .then((todoList) => res.json(todoList)) 
            .catch((err) => res.json(err)) 
    } else {
        // res.son(err)
        // res.status(400)

        res.json({todos: ['Open', 'Close']})
        res.status(200)

    }
}); 

// Add todo 
app.post("/todos/new", (req, res) => { 
    if (client) {
        TodoModel.create({ 
            task: req.body.task, 
            status: req.body.status, 
            deadline: req.body.deadline, 
        }) 
            .then((todo) => res.json(todo)) 
            .catch((err) => res.json(err)); 
    } else {
        // res.son(err)
        // res.status(400)
        
        res.status
        res.status(200)    
    }
}); 

// Update todo
app.post("/todo/update/:id", (req, res) => { 
	const id = req.params.id; 
	const updateData = { 
		task: req.body.task, 
		status: req.body.status, 
		deadline: req.body.deadline, 
	}; 
	TodoModel.findByIdAndUpdate(id, updateData) 
		.then((todo) => res.json(todo)) 
		.catch((err) => res.json(err)); 
}); 

// Delete todo
app.delete("/todo/delete/:id", (req, res) => { 
	const id = req.params.id; 
	TodoModel.findByIdAndDelete({ _id: id }) 
		.then((todo) => res.json(todo)) 
		.catch((err) => res.json(err)); 
}); 

app.listen(3005, () => { 
	console.log('Server running on 3005'); 
}); 
