// Connect to MongoDB using Mongoose
const mongoose = require("mongoose");

// Load environment variables
require("dotenv").config();
const dbURL = process.env.MONGO_URI;

// Connecting to the database
mongoose.connect(dbURL);

// Define a Mongoose schema for the 'Person' model
const personSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  age: { type: Number, max: 150, min: 5 },
  favoriteFoods: [String],
});

// Create a Mongoose model for the 'Person' collection
const Person = mongoose.model("Person", personSchema);

//_________________________________________________________________________________________

// Create an instance of a new person model and save it as new document
const person = new Person({
  name: "Ibrahim",
  age: 27,
  favoriteFoods: [
    "Spaghetti alla carbonara",
    "Fettuccine Alfredo",
    "Lasagne",
    "Pesto pasta",
    "Bolognese",
  ],
});

person
  .save()
  .then((personDetails) => {
    console.log("The new person has been saved : " + personDetails);
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

//_________________________________________________________________________________________

// Create an array of people and insert them into the 'People' collection
const arrayOfPeople = [
  {
    name: "John Doe",
    age: 25,
    favoriteFoods: ["Pizza", "Burger"],
  },
  {
    name: "Jane Smith",
    age: 30,
    favoriteFoods: ["Sushi", "Pasta"],
  },
  {
    name: "Jane Dickson",
    age: 25,
    favoriteFoods: ["Pizza", "Sushi", "Burgers"],
  },
];

Person.create(arrayOfPeople)
  .then((createdPeople) => {
    console.log("People created:", createdPeople);
    process.exit(0);
  })
  .catch((err) => {
    console.error("Error creating people:", err);
    process.exit(1);
  });

//_________________________________________________________________________________________

// Find people with the name 'John Doe'
Person.find({ name: "John Doe" })
  .then((people) => {
    console.log(`People with the name John Doe `, people);
    process.exit(0);
  })
  .catch((err) => {
    console.error("Error finding people:", err);
    process.exit(1);
  });

//_________________________________________________________________________________________

// Find a person based on their favorite food ('Pizza')
const food = "Pizza";

Person.findOne({ favoriteFoods: food })
  .then((person) => {
    if (person) {
      console.log(`Person with '${food}' in their favorite foods:`, person);
    } else {
      console.log(`No person found with '${food}' in their favorite foods.`);
    }
    process.exit(0);
  })
  .catch((err) => {
    console.error("Error finding person:", err);
    process.exit(1);
  });

//_________________________________________________________________________________________

// Find a person by ID
const personId = "65bbbffec337a2ce04033414";

Person.findById(personId)
  .then((person) => {
    if (person) {
      console.log(`Person found by ID '${personId}':`, person);
    } else {
      console.log(`No person found with ID '${personId}'.`);
    }
    process.exit(0);
  })
  .catch((err) => {
    console.error("Error finding person by ID:", err);
    process.exit(1);
  });

//_________________________________________________________________________________________

// Update a person's favorite foods by ID
Person.findById(personId)
  .then((person) => {
    if (!person) {
      console.log(`No person found with ID '${personId}'.`);
      process.exit(0);
    }
    person.favoriteFoods.push("hamburger");
    person
      .save()
      .then((updatedPerson) => {
        console.log(
          `Person with ID '${personId}' updated with favorite food 'hamburger':`,
          updatedPerson
        );
        process.exit(0);
      })
      .catch((saveError) => {
        console.error("Error saving updated person:", saveError);
        process.exit(1);
      });
  })
  .catch((findError) => {
    console.error("Error finding person by ID:", findError);
    process.exit(1);
  });

//_________________________________________________________________________________________

// Update a person's age by name
const personName = "John Doe";

Person.findOneAndUpdate({ name: personName }, { age: 20 }, { new: true })
  .then((person) => {
    console.log(`${personName}'s age has been updated to 20: ` + person);
    process.exit(0);
  })
  .catch((error) => {
    console.log(`couldn't find ${personName}`);
    console.error(error);
    process.exit(1);
  });

//_________________________________________________________________________________________

// Delete a person by ID
Person.findByIdAndDelete(personId)
  .then((removedPerson) => {
    if (removedPerson) {
      console.log("Person removed:", removedPerson);
    } else {
      console.log("No person found to remove.");
    }
    process.exit(0);
  })
  .catch((error) => {
    console.error("Error removing person:", error);
    process.exit(1);
  });

//_________________________________________________________________________________________

// Delete multiple people by name ('Mary')
Person.deleteMany({ name: "Mary" })
  .then((result) => {
    console.log(
      `Number of people with name "Mary" deleted: ${result.deletedCount}`
    );
    process.exit(0);
  })
  .catch((error) => {
    console.error("Error deleting people:", error);
    process.exit(1);
  });

//_________________________________________________________________________________________

// Find people with favorite food 'burritos', sort by name, limit them to 2 and exclude age field
Person.find({ favoriteFoods: "burritos" })
  .sort({ name: 1 })
  .limit(2)
  .select("-age")
  .exec()
  .then((data) => {
    console.log("People:", data);
    process.exit(0);
  })
  .catch((err) => {
    console.error("Error:", err);
    process.exit(1);
  });
