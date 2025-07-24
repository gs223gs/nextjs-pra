export interface Blog {
  id: string;
  title: string;
  content: string;
  date: string;
}

export const blogs: Blog[] = [
  {
    id: "nextjs-getting-started",
    title: "Next.js入門ガイド",
    content: "Next.jsは、Reactベースのフルスタックフレームワークです。サーバーサイドレンダリング（SSR）や静的サイト生成（SSG）をサポートし、高速なWebアプリケーションを構築できます。App Routerの導入により、より直感的なルーティングが可能になりました。",
    date: "2024-01-15"
  },
  {
    id: "typescript-best-practices",
    title: "TypeScriptのベストプラクティス",
    content: "TypeScriptを使用することで、JavaScriptに型安全性をもたらすことができます。適切な型定義により、バグの早期発見や開発効率の向上が期待できます。interfaceとtypeの使い分けや、ジェネリクスの活用法について解説します。",
    date: "2024-01-20"
  },
  {
    id: "react-hooks-deep-dive",
    title: "React Hooksを深く理解する",
    content: "React Hooksは、関数コンポーネントで状態管理やライフサイクルメソッドを使用するための機能です。useState、useEffect、useContextなどの基本的なHooksから、カスタムHooksの作成方法まで詳しく解説します。",
    date: "2024-01-25"
  },
  {
    id: "web-performance-optimization",
    title: "Webパフォーマンス最適化テクニック",
    content: "Webサイトのパフォーマンス最適化は、ユーザー体験の向上に直結します。画像の最適化、コード分割、キャッシュ戦略、Core Web Vitalsの改善方法など、実践的なテクニックを紹介します。",
    date: "2024-02-01"
  },
  {
    id: "modern-css-techniques",
    title: "モダンCSSテクニック集",
    content: "CSS Grid、Flexbox、カスタムプロパティ（CSS変数）、コンテナクエリなど、最新のCSS機能を活用した効率的なスタイリング方法を解説します。レスポンシブデザインの実装もより簡単になりました。",
    date: "2024-02-05"
  }
];

export function getBlogByTitle(id: string): Blog | undefined {
  return blogs.find(blog => blog.id === id);
}

export function getAllBlogs(): Blog[] {
  return blogs;
}