const express = require("express");
const fs = require("fs");
const { dirname } = require("path");

const app = express();
app.use(express.json()); // Middleware to parse JSON request bodies

// Load data
const trip = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// Controller functions
const getAllTours = (req, res) => {
  res.json({
    status: "success",
    data: {
      tours: trip
    },
  });
};

const getTour = (req, res) => {
  const id = req.params.id * 1; // Convert string ID to number
  const tour = trip.find((el) => el.id === id);
  if (!tour) {
    return res.status(404).json({
      status: "fail",
      message: "Tour not found",
    });
  }
  res.json({
    status: "success",
    data: {
      tours: tour
    },
  });
};

const createTour = (req, res) => {
  const newId = trip[trip.length - 1].id + 1;
  const newData = Object.assign({ id: newId }, req.body);
  trip.push(newData);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(trip),
    (err) => {
      if (err) {
        return res.status(500).json({
          status: "error",
          message: "Failed to create tour",
        });
      }
      res.status(201).json({
        status: "success",
        data: {
          tour: newDat
        },
      });
    }
  );
};

const updateTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = trip.find((el) => el.id === id);
  if (!tour) {
    return res.status(404).json({
      status: "fail",
      message: "Tour not found",
    });
  }
  Object.assign(tour, req.body);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(trip),
    (err) => {
      if (err) {
        return res.status(500).json({
          status: "error",
          message: "Failed to update tour",
        });
      }
      res.status(200).json({
        status: "success",
        data: {
          tours: tour,
        },
      });
    }
  );
};

const deleteTour = (req, res) => {
  const id = req.params.id * 1;
  const tourIndex = trip.findIndex((el) => el.id === id);
  if (tourIndex === -1) {
    return res.status(404).json({
      status: "fail",
      message: "Tour not found",
    });
  }
  trip.splice(tourIndex, 1);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(trip),
    (err) => {
      if (err) {
        return res.status(500).json({
          status: "error",
          message: "Failed to delete tour",
        });
      }
      res.status(204).json({
        status: "success",
        data: null,
      });
    }
  );
};

// we can write it like this 
app.get("/api/v1/tours",getAllTours);
app.post("/api/v1/tours",createTour);
app.get("/api/v1/tours/:id",getTour);
app.patch("/api/v1/tours/:id",updateTour);
app.delete("/api/v1/tours/:id",deleteTour);

// or 
// we can write the below ones
// Routes
const tourRouter = express.Router();
tourRouter.
	route("/")
	.get(getAllTours)
	.post(createTour);
tourRouter.
	 route("/:id")
	.get(getTour)
	.patch(updateTour)
	.delete(deleteTour);

// Mount router
app.use("/api/v1/tours", tourRouter);

// Start server
const port = 3000;
app.listen(port, () => {
  console.log(`App is running on ${port}`);
});
