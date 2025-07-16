import { configureStore } from "@reduxjs/toolkit";
import slicer1 from "./slice1.js";

const stores = configureStore({

reducer:{
      // sliceName:sliceVarName.reducer
         "slice1":slicer1,
}
      
    
   
})

export default stores;