type TSectionHeadingProps = {
  /** Small uppercase label above the title. */
  eyebrow?: string;
  /** Main heading text. */
  title: string;
  /** Trailing part of the title, underlined in the accent colour. */
  accent?: string;
  /** Supporting line under the heading. */
  description?: string;
  /** Extra wrapper classes (spacing overrides). */
  className?: string;
};

/**
 * The one section header used across every public page, so the eyebrow,
 * title, accent underline and description keep the same rhythm everywhere.
 */
const SectionHeading = ({
  eyebrow,
  title,
  accent,
  description,
  className = "",
}: TSectionHeadingProps) => {
  return (
    <div className={`text-center mb-10 lg:mb-12 ${className}`}>
      {eyebrow ? (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[3px] text-accent">
          {eyebrow}
        </p>
      ) : null}

      <h2 className="text-3xl md:text-4xl font-bold text-primary">
        {title}
        {accent ? (
          <>
            {" "}
            <span className="relative inline-block whitespace-nowrap">
              {accent}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 -bottom-1 h-[3px] rounded-full bg-accent"
              />
            </span>
          </>
        ) : null}
      </h2>

      {description ? (
        <p className="mx-auto mt-5 max-w-2xl text-gray-600 leading-8">
          {description}
        </p>
      ) : null}
    </div>
  );
};

export default SectionHeading;
