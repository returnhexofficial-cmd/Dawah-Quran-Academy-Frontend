import { IconType } from "react-icons";

type TEmptyStateProps = {
  /** Icon shown in the circle, e.g. FaBookOpen. */
  icon: IconType;
  /** Short reason the list is empty. */
  title: string;
  /** What the visitor can expect or do next. */
  description: string;
};

/**
 * Shared "nothing here yet" panel. Pairs with LoadingSpinner so every list
 * page (books, courses, teachers) resolves to the same three states.
 */
const EmptyState = ({ icon: Icon, title, description }: TEmptyStateProps) => {
  return (
    <div className="fade-up flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white py-20 text-center">
      <div className="mb-6 rounded-full bg-primary/10 p-6">
        <Icon className="text-5xl text-primary" />
      </div>

      <h3 className="mb-2 text-2xl font-bold text-primary">{title}</h3>

      <p className="max-w-md px-6 text-gray-500 leading-7">{description}</p>
    </div>
  );
};

export default EmptyState;
