"use client";
import { Word, WordCloud, WordCloudProps } from "@isoterik/react-word-cloud";

const words: Word[] = [
  {
    text: "徹底的に我を消す | 薫る花は凛と咲く | チーフ",
    value: 50,
  },
  {
    text: "行動基準は店のため | 薫る花は凛と咲く | チーフ",
    value: 10,
  },
  {
    text: "道草を楽しめ 大いにな | HxH | zin",
    value: 10,
  },
  {
    text: "少しだけ君のため生きてみますか | webkuso | life",
    value: 10,
  },
  {
    text: "重厚なバックボーン | はじめの一歩 | ホークのセコンド",
    value: 10,
  },
  {
    text: "ところで平凡な俺よ 下を向いている暇はあるのか | ハイキュー! | 田中龍之介",
    value: 10,
  },
  {
    text: "プライド以外に何が要るんだ!! | ハイキュー! | 山口忠",
    value: 10,
  },
  {
    text: "“ムリ”ではなく“ムズカシイ”である！！ | ハイキュー! | bokuto",
    value: 10,
  },
  {
    text: "この恐怖が俺をここまで連れてきたんだ | フリーれん | ",
    value: 10,
  },
  {
    text: "必要なものは覚悟だけだったのです。必死に積み上げてきたものは決して裏切りません。 |  | ",
    value: 20,
  },
];

function App() {
  const noRotate: WordCloudProps["rotate"] = () => 0;
  return (
    <div className="flex justify-center items-center h-screen">
      <WordCloud
        words={words}
        width={300}
        height={200}
        enableTooltip
        rotate={noRotate}
      />
    </div>
  );
}

export default App;
