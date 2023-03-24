import { publicRequest, userPublicRequest } from "../axiosRequest";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const api_key = import.meta.env.VITE_API_KEY;

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    likedMovies: [],
    genres: [],
    isLoading: false,
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getGenres.fulfilled, (state, action) => {
      state.genres = action.payload;
    })
    builder.addCase(fetchDataByGenre.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(fetchDataByGenre.fulfilled, (state, action) => {
      state.movies = action.payload
      state.isLoading = false
    })
    builder.addCase(fetchDataByGenre.rejected, (state, action) => {
      state.movies = []
    })
    builder.addCase(getUserLikedMovies.fulfilled, (state, action) => {
      state.likedMovies = action.payload;
    })
    builder.addCase(addtoLikedMovies.fulfilled, (state, action) => {
      state.likedMovies = action.payload;
    })
    builder.addCase(removeFromLikedMovies.fulfilled, (state, action) => {
      state.likedMovies = action.payload;
    })
    builder.addCase(sign_Out.fulfilled, (state, action) => {
      state.likedMovies = []
    })

  },
});

export const getUserLikedMovies = createAsyncThunk(
  "disney/user/likedMovies",
  async ({ email }) => {
    const {
      data: { movies },
    } = await userPublicRequest.get(`/user/likedMovies/${email}`);
    return movies;
  }
);

export const addtoLikedMovies = createAsyncThunk(
  "disney/user/add/movie",
  async ({ email, data }) => {
    let { backdrop_path, genres, original_title, overview, poster_path, runtime, title, id } = data;
    const movieData = { backdrop_path, genres, original_title, overview, poster_path, runtime, title, id }
    const {
      data: { movies },
    } = await userPublicRequest.post("/user/add/movie", {
      email,
      movieData 
    });
    return movies.payload;
  }
);

export const removeFromLikedMovies = createAsyncThunk(
  "disney/user/remove/movie",
  async ({ email, movieId }) => {
    const {
      data: { movies },
    } = await userPublicRequest.put("/user/remove/movie", {
      email,
      movieId,
    });
    return movies.payload;
  }
);

export const sign_Out = createAsyncThunk(
  "user/signOut",
  async (thunkAPI) => {
    try {
      
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const getTrendingOrDiscover = createAsyncThunk(
  "movies/trending",
  async ({ media_type: media_type, genre: genre }, thunkAPI) => {
    try {
      if (media_type) {
        const res = await publicRequest.get(
          `/trending/${media_type}/week?api_key=${api_key}`
        );
        return res.data.results;
      } else if (genre) {
        const res = await publicRequest.get(
          `/discover/movie?api_key=${api_key}&with_genres=${genre}`
        );
        return res.data.results;
      }
    } catch (err) {
      thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const getGenres = createAsyncThunk(
  "media/genres",
  async (_, thunkAPI) => {
    try {
      const {
        data: { genres },
      } = await publicRequest.get(`/genre/movie/list?api_key=${api_key}`);
      return genres;
    } catch (err) {
      thunkAPI.rejectWithValue(err.message);
    }
  }
);

const createArrayFromRawData = (array, moviesArray, genres) => {
  array.forEach((movie) => {
    if(movie.backdrop_path){
      moviesArray.push(movie)
    }
  });
};

const getRawData = async (api, paging = false) => {
  const moviesArray = [];
  for (let i = 1; moviesArray.length < 100 && i < 10; i++) {
    const {
      data: { results },
    } = await publicRequest.get(`${api}${paging ? `&page=${i}` : ""}`);
    createArrayFromRawData(results, moviesArray);
  }
  return moviesArray;
};

export const fetchDataByGenre = createAsyncThunk(
  "media/discover",
  async ({ type, genre }, thunkAPI) => {
    return getRawData(
      `/discover/${type}?api_key=${api_key}&with_genres=${genre ? `${genre}` : "28"}`,
      true
    );
  }
);

export default movieSlice.reducer;
