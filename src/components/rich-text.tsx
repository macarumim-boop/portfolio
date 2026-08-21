import { Fragment } from "react";

/**
 * Renders a string with **double-asterisk** spans as bold, so case-study copy
 * can emphasise the data that matters (numbers, key phrases) inline without
 * turning the body into a markdown pipeline.
 */
export function Rich({
  text,
  strongClass = "font-semibold text-ink",
}: {
  text: string;
  strongClass?: string;
}) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith("**") && p.endsWith("**") ? (
          <strong key={i} className={strongClass}>
            {p.slice(2, -2)}
          </strong>
        ) : (
          <Fragment key={i}>{p}</Fragment>
        ),
      )}
    </>
  );
}
