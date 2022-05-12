import { configureStore } from "@reduxjs/toolkit";
import postSlice from "../feature/post.slice";

export default configureStore({
	reducer: {
		posts: postSlice,
	},
});
