import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import './CodeBlock.css';

/**
 * Reusable Functional Component: CodeBlock
 * Demonstrates:
 * 1. Rendering preformatted code blocks
 * 2. Interactive clipboard copy using browser API
 * 3. State-driven icon toggle (Check vs Copy)
 */
export const CodeBlock = ({ code, language = 'jsx', filename = '' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  return (
    <div className="code-block-container">
      <div className="code-block-header">
        <span className="code-language-tag">{filename || language.toUpperCase()}</span>
        <button
          className="code-copy-btn"
          onClick={handleCopy}
          title="Copy code to clipboard"
        >
          {copied ? (
            <>
              <Check size={14} className="copied-icon" /> Copied!
            </>
          ) : (
            <>
              <Copy size={14} /> Copy Code
            </>
          )}
        </button>
      </div>
      <pre className="code-content">
        <code>{code.trim()}</code>
      </pre>
    </div>
  );
};
