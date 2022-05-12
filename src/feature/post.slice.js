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

    // DELETE
    deletePost: (state, { payload }) => {
      // Le state est filtré et est gardé dans le state tous les élements qui ne sont pas dans le payload
      state.posts = state.posts.filter((element) => element.id !== payload);
    },

    // CREATE COMMENTS
    addComment: (state, { payload }) => {
      // chaque élement est appelé individuellement dans le map (post)
      state.posts = state.posts.map((post) => {
        // il faut trouver dans quel post placer le commentaire
        // si l'id du post est egal à l'id envoyé dans le payload alors le commentaire lui sera ajouté
        if (post.id === payload[0]) {
          // il faura donc retourné toute la base de donnée
          return {
            ...post,
            // et sera ajouté le payload 1, qui est la data envoyé avec le dispatch
            comments: payload[1]
          }
        } else {
          return post
        }
      })
    },
	},
});

// EXPORT DES SLICES
export const { getPosts, addPost, deletePost, addComment } = postSlice.actions;
export default postSlice.reducer;
