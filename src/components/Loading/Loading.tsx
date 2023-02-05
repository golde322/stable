import React from 'react';

interface LoadingProps {
  loading: boolean;
}

const Loading = ({ loading }: LoadingProps) => {
  return (
    <>
      {loading && (
        <div className="text-white text-center mb-8">
          <div className="animate-pulse max-w-sm sm:max-w-lg max-h-[512px] w-screen aspect-square bg-zinc-500 flex justify-center items-center flex-col">
            <div className="font-bold">
              Generating results, this might take up to 5 minutes.
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Loading;
