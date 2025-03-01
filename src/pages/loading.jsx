export default function Loading() {
  function* generateSkeletons(count) {
    for (let i = 0; i < count; i++) {
      yield (
        <div className="flex w-54 flex-col gap-4 mt-5 mx-auto" key={i}>
          <div className="skeleton h-32 w-full"></div>
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
      );
    }
  }
  const skeletons = [...generateSkeletons(20)];
  return (
    <>
      <div className="skeleton h-4 w-[70%] text-4xl p-1.5 mt-10"></div>
      <div className="content mt-10 gap-5 columns-1 md:columns-2 lg:columns-4 ">
        {skeletons.map((skeleton) => skeleton)}
      </div>
    </>
  );
}
