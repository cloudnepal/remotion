import { Composition, staticFile } from "remotion";
import { Main } from "./Main";
import "./style.css";
import { audiogramSchema } from "./schema";
import { getAudioDurationInSeconds } from "@remotion/media-utils";
import { getSubtitles } from "./fetch-subtitles";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Audiogram"
        component={Main}
        width={1080}
        height={1080}
        schema={audiogramSchema}
        defaultProps={{
          // Audio settings
          audioOffsetInSeconds: 6.9,

          // Title settings
          audioFileName: staticFile("audio1.mp3"),
          coverImgFileName: staticFile("cover.jpg"),
          titleText:
            "#234 – Money, Kids, and Choosing Your Market with Justin Jackson of Transistor.fm",
          titleColor: "rgba(186, 186, 186, 0.93)",

          // Subtitles settings
          subtitlesFileName: staticFile("captions1.srt"),
          onlyDisplayCurrentSentence: true,
          subtitlesTextColor: "rgba(255, 255, 255, 0.93)",
          subtitlesLinePerPage: 4,
          subtitlesZoomMeasurerSize: 10,
          subtitlesLineHeight: 98,

          // Wave settings
          waveColor: "#a3a5ae",
          waveFreqRangeStartIndex: 7,
          waveLinesToDisplay: 29,
          waveNumberOfSamples: "256", // This is string for Remotion controls and will be converted to a number
          mirrorWave: true,
          captions: null,
        }}
        // Determine the length of the video based on the duration of the audio file
        calculateMetadata={async ({ props }) => {
          const fps = 30;
          const captions = await getSubtitles(props.subtitlesFileName);
          const durationInSeconds = await getAudioDurationInSeconds(
            props.audioFileName,
          );

          return {
            durationInFrames: Math.round(durationInSeconds * fps),
            props: {
              ...props,
              captions,
            },
            fps,
          };
        }}
      />
    </>
  );
};
