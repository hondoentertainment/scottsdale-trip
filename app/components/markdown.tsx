"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function MarkdownRenderer({ content }: { content: string }) {
  // Strip the first H1 since we render it in the page header
  const lines = content.split("\n");
  const firstH1Index = lines.findIndex((line) => /^# /.test(line));
  const trimmedContent =
    firstH1Index >= 0
      ? [...lines.slice(0, firstH1Index), ...lines.slice(firstH1Index + 1)].join("\n")
      : content;

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        input: ({ node, ...props }) => {
          if (props.type === "checkbox") {
            return (
              <input
                {...props}
                type="checkbox"
                disabled={false}
                className="w-4 h-4 rounded border-desert-300 text-terracotta-500 mr-2 accent-terracotta-500 cursor-pointer"
              />
            );
          }
          return <input {...props} />;
        },
        table: ({ node, ...props }) => (
          <div className="overflow-x-auto rounded-lg border border-sand-200 mb-6">
            <table {...props} />
          </div>
        ),
      }}
    >
      {trimmedContent}
    </ReactMarkdown>
  );
}
