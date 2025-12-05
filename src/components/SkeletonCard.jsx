import "./Skeleton.css";

const SkeletonCard = () => {
  return (
    <div className="skeleton-card">
      <div className="skeleton-img shimmer"></div>
      <div className="skeleton-text shimmer"></div>
    </div>
  );
};

export default SkeletonCard;
