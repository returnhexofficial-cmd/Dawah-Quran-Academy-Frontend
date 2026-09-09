import { ImSpinner2 } from "react-icons/im";

type TLoadingSpinnerProps = {
  /** Wrapper spacing/layout classes. Override to fit the spinner in a smaller area. */
  className?: string;
  /** Size classes for the spinner icon itself. */
  iconClassName?: string;
  /** Optional text shown under the spinner. */
  label?: string;
};

const LoadingSpinner = ({
  className = "py-40",
  iconClassName = "w-20 h-20",
  label,
}: TLoadingSpinnerProps) => {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className={`flex flex-col justify-center items-center gap-4 text-primary ${className}`}
    >
      <ImSpinner2 className={`animate-spin ${iconClassName}`} />
      {label ? <p className="text-gray-600">{label}</p> : null}
      <span className="sr-only">লোড হচ্ছে...</span>
    </div>
  );
};

export default LoadingSpinner;
