import { useState, type ReactNode } from "react";

export async function getServerSideProps() {
  return {
    props: {
      now: new Date().toISOString(),
    },
  };
}

export default function Home({ now }: { now: string }) {
  return (
    <div style={{ padding: 20 }}>
      <h1>SSR Sample (Next.js 12)</h1>
      <p>このページはリクエストごとにサーバーで描画されています。</p>
      <p>Server Time: {now}</p>
      <Button
        clickHandler={() => {
          console.log("Clicked!");
        }}
      >
        console log
      </Button>
      <Counter />
    </div>
  );
}

const Counter = () => {
  const [count, setCount] = useState<number>(0);
  return (
    <div>
      <p>現在のcount: {count}</p>
      <Button
        clickHandler={() => {
          setCount((prev) => prev + 1);
        }}
      >
        increment
      </Button>
    </div>
  );
};

type ButtonProps = {
  children: ReactNode;
  clickHandler: () => void;
};

const Button = ({ children, clickHandler }: ButtonProps) => {
  return (
    <button type="button" onClick={clickHandler}>
      {children}
    </button>
  );
};
