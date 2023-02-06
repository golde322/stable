import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { generateImageReq, fetchQueuedImagesReq } from './generateAPI';
import {
  GenerateImageBody,
  GenerateImageProcessingResponse,
  GenerateImageSuccessResponse,
} from './types';

export interface GenerateImageState {
  loading: boolean;
  generatedImageData:
    | GenerateImageSuccessResponse
    | GenerateImageProcessingResponse
    | null;
  error: string | undefined | null;
}

const initialState: GenerateImageState = {
  loading: false,
  generatedImageData: null,
  error: null,
};

export const generateImage = createAsyncThunk(
  'generateImage/generateImage',
  async (body: GenerateImageBody) => {
    const response = await generateImageReq(body);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const generateQueuedImage = createAsyncThunk(
  'generateImage/generateQueuedImage',
  async ({ body, id }: { body: { key: string }; id: number }) => {
    const response = await fetchQueuedImagesReq({ body, id });
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const generateImageSlice = createSlice({
  name: 'generateImage',
  initialState,

  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(generateImage.pending, (state) => {
        state.loading = true;
      })
      .addCase(generateImage.fulfilled, (state, action) => {
        if (action.payload.status === 'processing') {
          state.loading = false;
          state.generatedImageData = null;
          state.error = 'Try again in a few seconds';
          return;
        }
        if (action.payload.status === 'error') {
          state.loading = false;
          state.generatedImageData = null;
          state.error = action.payload.message;
          return;
        }
        state.loading = false;
        state.generatedImageData = action.payload;
        state.error = null;
      })
      .addCase(generateImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(generateQueuedImage.pending, (state) => {
        state.loading = true;
      })
      .addCase(generateQueuedImage.fulfilled, (state, action) => {
        state.loading = false;
        state.generatedImageData = action.payload;
      })
      .addCase(generateQueuedImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const generateImageSliceSelector = (
  state: RootState
): GenerateImageState => state.generateImage;

export default generateImageSlice.reducer;
