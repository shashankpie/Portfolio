import type { MDXComponents } from 'mdx/types';
import { highlight } from 'sugar-high';

function Code({ children, ...props }: React.HTMLProps<HTMLElement>) {
  const codeHTML = highlight(String(children || ''));
  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
}

function Pre({ children, ...props }: React.HTMLProps<HTMLPreElement>) {
  return (
    <pre className="overflow-x-auto p-4 rounded-lg bg-muted border" {...props}>
      {children}
    </pre>
  );
}

function H1({ children, ...props }: React.HTMLProps<HTMLHeadingElement>) {
  return (
    <h1 
      className="text-3xl font-bold mt-8 mb-4 text-foreground border-b border-border pb-2" 
      {...props}
    >
      {children}
    </h1>
  );
}

function H2({ children, ...props }: React.HTMLProps<HTMLHeadingElement>) {
  return (
    <h2 
      className="text-2xl font-semibold mt-6 mb-3 text-foreground" 
      {...props}
    >
      {children}
    </h2>
  );
}

function H3({ children, ...props }: React.HTMLProps<HTMLHeadingElement>) {
  return (
    <h3 
      className="text-xl font-medium mt-5 mb-2 text-foreground" 
      {...props}
    >
      {children}
    </h3>
  );
}

function P({ children, ...props }: React.HTMLProps<HTMLParagraphElement>) {
  return (
    <p className="mb-4 text-foreground leading-relaxed" {...props}>
      {children}
    </p>
  );
}

function Ul({ children, ...props }: React.HTMLProps<HTMLUListElement>) {
  return (
    <ul className="mb-4 ml-6 list-disc space-y-1 text-foreground" {...props}>
      {children}
    </ul>
  );
}

function Ol({ children, ...props }: Omit<React.HTMLProps<HTMLOListElement>, 'type'>) {
  return (
    <ol className="mb-4 ml-6 list-decimal space-y-1 text-foreground" {...props}>
      {children}
    </ol>
  );
}

function Li({ children, ...props }: React.HTMLProps<HTMLLIElement>) {
  return (
    <li className="text-foreground" {...props}>
      {children}
    </li>
  );
}

function Blockquote({ children, ...props }: React.HTMLProps<HTMLQuoteElement>) {
  return (
    <blockquote 
      className="border-l-4 border-blue-500 pl-4 my-4 italic text-muted-foreground bg-muted/50 pt-2 rounded-r-lg" 
      {...props}
    >
      {children}
    </blockquote>
  );
}

function A({ children, href, ...props }: React.HTMLProps<HTMLAnchorElement>) {
  return (
    <a
      href={href}
      className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline transition-colors"
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      {...props}
    >
      {children}
    </a>
  );
}

function Strong({ children, ...props }: React.HTMLProps<HTMLElement>) {
  return (
    <strong className="font-semibold text-foreground" {...props}>
      {children}
    </strong>
  );
}

function Em({ children, ...props }: React.HTMLProps<HTMLElement>) {
  return (
    <em className="italic text-foreground" {...props}>
      {children}
    </em>
  );
}

function Hr({ ...props }: React.HTMLProps<HTMLHRElement>) {
  return (
    <hr className="my-8 border-t border-border" {...props} />
  );
}

function Table({ children, ...props }: React.HTMLProps<HTMLTableElement>) {
  return (
    <div className="overflow-x-auto my-4">
      <table className="w-full border-collapse border border-border" {...props}>
        {children}
      </table>
    </div>
  );
}

function Th({ children, ...props }: React.HTMLProps<HTMLTableCellElement>) {
  return (
    <th className="border border-border bg-muted px-4 py-2 text-left font-medium" {...props}>
      {children}
    </th>
  );
}

function Td({ children, ...props }: React.HTMLProps<HTMLTableCellElement>) {
  return (
    <td className="border border-border px-4 py-2" {...props}>
      {children}
    </td>
  );
}

export const mdxComponents: MDXComponents = {
  code: Code,
  pre: Pre,
  h1: H1,
  h2: H2,
  h3: H3,
  p: P,
  ul: Ul,
  ol: Ol,
  li: Li,
  blockquote: Blockquote,
  a: A,
  strong: Strong,
  em: Em,
  hr: Hr,
  table: Table,
  th: Th,
  td: Td,
};
