import type { AxiosResponse } from 'axios';
import { api } from '../../api/api';
import { GenerateImageBody, GenerateImageSuccessResponse } from './types';

export function generateImageReq(body: GenerateImageBody) {
  return api
    .post('/text2img', body)
    .then((response: AxiosResponse<GenerateImageSuccessResponse>) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
}

export function fetchQueuedImagesReq({
  body,
  id,
}: {
  body: { key: string };
  id: number;
}) {
  return api
    .post(`/fetch/${id}`, body)
    .then((response: AxiosResponse<GenerateImageSuccessResponse>) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
}
