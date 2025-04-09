import Service from "../../models/Service.js";
import connectDB from "../../config/db.js";
import Place from "../../models/Place.js";



export const addNewService = async (req, res) => {
   try {
      await connectDB();
      const id = req.params.id;
      const place = await Place.findById(id)
      const services = await Service.find({ placeId: id })

      // the the service
      const newService = new Service()
      newService.placeId = id;
      newService.nameAr = req.body.serviceAr;
      newService.nameEn = req.body.serviceEn;
      await newService.save();


      res.render('admin/places/edit', { place: place, services: services})


   } catch (error) {
      console.log(error)
   }
}


// **************************************** Delete Existing Service *********************************************
export const delete_service = async (req, res) => {

   try {
      const id = req.params.id;
      await connectDB();
      await Service.findByIdAndDelete(id)
      res.redirect(`/places/places`)

   } catch (error) {

   }
}