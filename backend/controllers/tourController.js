import Tour from "../models/Tour.js";

//create new tour
export const createTour = async (req, res) => {
    const newTour = new Tour(req.body);

    try {
        const asavedTour = await newTour.save();
        res.status(200).json({
            success: true,
            messege: "Successfully created",
            data: newTour,
        });
    } catch (error) {
        res.status(500).json({ success: false, messege: "Failed to create" });
    }
};

//update tour
export const updateTour = async (req, res) => {
    const id = req.params.id;
    try {
        const updatedTour = await Tour.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true }
        );

        res.status(200).json({
            success: true,
            messege: "Successfully updated",
            data: updatedTour,
        });
    } catch (error) {
        res.status(500).json({ success: false, messege: "Failed to update" });
    }
};
//delete tour
export const deleteTour = async (req, res) => {
    const id = req.params.id;
    try {
        await Tour.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            messege: "Successfully deleted",
        });
    } catch (error) {
        res.status(500).json({ success: false, messege: "Failed to delete" });
    }
};
//get single tour
export const getSingleTour = async (req, res) => {
    const id = req.params.id;
    try {
        const singleTour = await Tour.findById(id);

        res.status(200).json({
            success: true,
            messege: "Successfully found",
            data: singleTour,
        });
    } catch (error) {
        res.status(404).json({ success: false, messege: "Not found" });
    }
};
//get all tour
export const getAllTour = async (req, res) => {
    //for pagination
    const page = parseInt(req.query.page);

    try {
        const tours = await Tour.find({})
            .skip(page * 8)
            .limit(8);
        res.status(200).json({
            success: true,
            messege: "Successfully found",
            data: tours,
        });
    } catch (error) {
        res.status(404).json({ success: false, messege: "Not found" });
    }
};
