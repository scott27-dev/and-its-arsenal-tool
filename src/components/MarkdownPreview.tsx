import { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownPreviewProps {
  content: string;
}

/**
 * Strips unfilled template placeholder variables (e.g. [VENUE], [BROADCASTER], [24HR TIME])
 * so they do not appear in the rendered markdown preview.
 * Preserves standard markdown links like [Title](url).
 */
export function stripPlaceholderVariables(rawMarkdown: string): string {
  if (!rawMarkdown) {
    return '';
  }

  return rawMarkdown
    // Strip template placeholders like [VENUE], [BROADCASTER] (excluding markdown links with URLs)
    .replace(/\[[A-Z0-9_\s]+\](?!\()/g, '')
    // Fix opening bold delimiters with trailing horizontal spaces created by stripped placeholders: ** Team News:** -> **Team News:**
    .replace(/(^|[ \t]+)\*\*[ \t]+([A-Za-z0-9])/gm, '$1**$2')
    // Remove leading horizontal spaces before ** if a leading placeholder was stripped
    .replace(/^[ \t]+\*\*/gm, '**')
    // Collapse consecutive horizontal whitespace left behind
    .replace(/[ \t]{2,}/g, ' ')
    // Remove trailing horizontal spaces on lines
    .replace(/[ \t]+$/gm, '');
}

export default function MarkdownPreview({ content }: MarkdownPreviewProps) {
  const displayContent = useMemo(() => stripPlaceholderVariables(content), [content]);

  return (
    <section className="preview" aria-label="Markdown preview">
      {displayContent.trim() ? (
        <div className="md">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              a: ({ node: _node, ...props }) => (
                <a {...props} target="_blank" rel="noreferrer" />
              ),
            }}
          >
            {displayContent}
          </ReactMarkdown>
        </div>
      ) : (
        <p className="preview-empty">Markdown preview will appear here as you type...</p>
      )}
    </section>
  );
}
