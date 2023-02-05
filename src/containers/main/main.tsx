import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Loading from '../../components/Loading/Loading';
import { selectState, setLoading } from '../../features/counter/counterSlice';
import tagObj from '../../assets/data/tags.json';
import sampleImg from '../../assets/images/sampleImg.jpeg';

interface Tag {
  group: string;
  tagnNames: string[];
}

interface SelectedTag {
  group: string;
  tagnName: string;
}

const defaultTags: SelectedTag[] = [
  { group: 'Base', tagnName: 'woman' },
  { group: 'Clothing', tagnName: 'nude' },
  { group: 'Number of people', tagnName: 'one' },
];

const MainContainer = () => {
  const [selectedTags, setSelectedTags] = React.useState<SelectedTag[] | []>([
    { group: 'Base', tagnName: 'woman' },
    { group: 'Clothing', tagnName: 'nude' },
    { group: 'Number of people', tagnName: 'one' },
  ]);
  const [generatedImg, setGeneratedImg] = React.useState<string | null>(null);
  const [isGenerateClicked, setIsGenerateClicked] =
    React.useState<boolean>(false);
  const state = useAppSelector(selectState);
  const dispatch = useAppDispatch();
  const { loading } = state;
  console.log({ isGenerateClicked, loading });

  const handleTagClick = (tag: Tag, selectedTagName: string) => {
    const { group } = tag;

    const isSameType = selectedTags.some((obj) => obj.group === group);
    const isSameTag = selectedTags.some(
      (obj) => obj.tagnName === selectedTagName
    );
    const isInDefaultTags = defaultTags.some(
      (obj) => obj.tagnName === selectedTagName
    );
    const isInDefaultTagGroup = defaultTags.some(
      (obj) => obj.group === group && obj.tagnName !== selectedTagName
    );

    if (isSameType && !isSameTag) {
      const newSelectedTags = selectedTags.filter((obj) => obj.group !== group);
      setSelectedTags([
        ...newSelectedTags,
        { group: group, tagnName: selectedTagName },
      ]);
    } else if (isSameTag) {
      if (isInDefaultTags) return;
      if (isInDefaultTagGroup) {
        // replace it with default tag in the same group
        const defaultTag = defaultTags.find((obj) => obj.group === group);

        setSelectedTags((prev) => [
          ...prev.filter((obj) => obj.group !== group),
          defaultTag as SelectedTag,
        ]);
        return;
      }

      const newSelectedTags = selectedTags.filter(
        (obj) => obj.tagnName !== selectedTagName
      );

      setSelectedTags([...newSelectedTags]);
    } else {
      setSelectedTags((prev) => [
        ...prev,
        { group: group, tagnName: selectedTagName },
      ]);
    }
  };

  const handleClearTags = () => {
    setSelectedTags(defaultTags);
  };

  useEffect(() => {
    // if isGenerateClicked is true, set loading to true for 5 seconds
    if (isGenerateClicked) {
      dispatch(setLoading(true));
      setTimeout(() => {
        dispatch(setLoading(false));
        setGeneratedImg(sampleImg);
      }, 5000);
    }

    return () => {
      setIsGenerateClicked(false);
    };
  }, [isGenerateClicked, dispatch]);

  // is tag selected
  const isSelected = (selectedTagName: string) => {
    return selectedTags.some(
      (obj: SelectedTag) => obj.tagnName === selectedTagName
    );
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center max-w-2xl">
        <div className="my-8 flex justify-center items-center flex-col">
          <div className="text-center text-white pb-2">
            Choose some tags and click generate
          </div>
          <div className="flex flex-col">
            <button
              className="bg-blue-600 text-white px-8 py-4 rounded-lg disabled:opacity-70 mb-4"
              onClick={() => setIsGenerateClicked(true)}
            >
              Generate
            </button>
          </div>
          <div>
            {/* TODO: Disable buttons on loading */}
            <button
              className="bg-green-600 text-white px-4 py-2 rounded-lg disabled:opacity-70 mx-2"
              onClick={handleClearTags}
            >
              Clear Tags
            </button>
            <button
              className="bg-gray-600 text-white px-4 py-2 rounded-lg disabled:opacity-70 mx-2"
              disabled
            >
              Copy Tags
            </button>
          </div>
          {/*
        Todo: This is loading state. User will see an image after clicking generate. The compopnent will be replaced with the image container.
         */}
        </div>
        <Loading loading={loading} />
        {generatedImg && !loading && (
          <div className="flex flex-row w-full overflow-auto mb-8 justify-center">
            <div>
              <div className="text-white text-center underline m-auto">
                <img
                  src={generatedImg}
                  alt=""
                  className="m-auto max-w-sm sm:max-w-lg"
                />
              </div>
            </div>
          </div>
        )}

        {/* tags */}
        <div className="flex flex-col items-start">
          {tagObj.tags.map((tag: Tag) => {
            return (
              <div className="mb-4" key={Math.random() * 1000}>
                <div className="ml-4 font-bold text-white">{tag.group}</div>
                <div className="flex col flex-wrap">
                  {tag.tagnNames.map((tagName: string) => (
                    <div
                      className={`
                      text-base cursor-pointer px-4 py-2 m-2 border rounded-lg text-white select-none relative ${
                        isSelected(tagName)
                          ? 'bg-green-700  border-transparent'
                          : ''
                      }
                      `}
                      key={Math.random() * 10040}
                      onClick={() => handleTagClick(tag, tagName)}
                    >
                      {tagName}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        {/* tags end */}
      </div>
    </>
  );
};

export default MainContainer;
