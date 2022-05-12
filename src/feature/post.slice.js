import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
	// 1) UN NOM
	name: 'posts',
	// 2) UN STATE DE BASE
	initialState: {
		posts: null,
	},
	// 3) REDUCERS
	reducers: {
		// GET

		// Quand l'action est appelée, le state est récupéré (la data, au début de base nul)
		// action.payload = { payload } sont les données que l'on récupère en paramètre
		// le payload est tout le paramètre qui est donné dans App.js : (dispatch(getPosts(res.docs.map(doc => ({ ...doc.data(), id: doc.id }))))
		getPosts: (state, { payload }) => {
			state.posts = payload;
		},

		// CREATE

		addPost: (state, { payload }) => {
      // push ajoute l'action que l'on récupère en paramètre avec le dispatch dans
			state.posts.push(payload);
		},
	},
});

// EXPORT DES SLICES
export const { getPosts, addPost } = postSlice.actions;
export default postSlice.reducer;
