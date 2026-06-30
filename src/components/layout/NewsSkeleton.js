import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const NewsSkeleton = ({ darkMode }) => {
  return (
    <div className="card news-card h-100">
      <Skeleton height={240} />

      <div className="card-body">
        <Skeleton height={30} width="80%" />

        <Skeleton count={3} />

        <div className="mt-4">
          <Skeleton height={45} />
        </div>

        <div className="d-flex justify-content-end mt-3">
          <Skeleton circle width={20} height={20} />
          <Skeleton circle width={20} height={20} className="ms-3" />
        </div>
      </div>

      <div className="card-footer">
        <Skeleton width={120} />
      </div>
    </div>
  );
};

export default NewsSkeleton;