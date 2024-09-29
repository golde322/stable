interface Meta {
  prompt: string;
  H: string;
  W: string;
  enable_attention_slicing: 'true' | 'false';
  file_prefix: string;
  guidance_scale: number;
  model: string;
  n_samples: number;
  negative_prompt: string;
  outdir: string;
  revision: string;
  safety_checker: string;
  seed: number;
  steps: number;
  vae: string;
}

export interface GenerateImageBody {
  key?: string | null;
  model_id?: string;
  prompt: string;
  samples: string;
  negative_prompt: string;
  width: string;
  height: string;
  num_inference_steps: string;
  guidance_scale: number;
  seed: null;
  safety_checker: string;
  webhook: null;
  track_id: string | null;
}

export interface GenerateImageSuccessResponse {
  status: string;
  message?: string;
  generationTime: number;
  id: number;
  output: string[] | null;
  meta: Meta;
}

export interface GenerateImageProcessingResponse {
  status: string;
  tip: string;
  message?: string;
  eta: number;
  messege: string;
  fetch_result: string;
  id: number;
  output: [];
  meta: Meta;
}
