"use client";
import { Word, WordCloud } from "@isoterik/react-word-cloud";

const words: Word[] = [
  {
    text: "徹底的に我を消す | 薫る花は凛と咲く | チーフ",
    value: 100
  },
  {
    text: "行動基準は店のため | 薫る花は凛と咲く | チーフ",
    value: 100
  },
  {
    text: "道草を楽しめ 大いにな | HxH | zin",
    value: 100
  },
  {
    text: "少しだけ君のため生きてみますか | webkuso | life",
    value: 100
  },
  {
    text: "重厚なバックボーン | はじめの一歩 | ホークのセコンド",
    value: 100
  },
  {
    text: "ところで平凡な俺よ 下を向いている暇はあるのか | ハイキュー! | 田中龍之介",
    value: 100
  },
  {
    text: "プライド以外に何が要るんだ!! | ハイキュー! | 山口忠",
    value: 100
  },
  {
    text: "“ムリ”ではなく“ムズカシイ”である！！ | ハイキュー! | bokuto",
    value: 100
  },
  {
    text: "この恐怖が俺をここまで連れてきたんだ | フリーれん | ",
    value: 100
  },
  {
    text: "必要なものは覚悟だけだったのです。必死に積み上げてきたものは決して裏切りません。 |  | ",
    value: 100
  }
];


function App() {
  return (
    <div
    >
      <WordCloud words={words} width={300} height={200} />
    </div>
  );
}

export default App;
