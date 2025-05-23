import Link from "next/link";

function Breadcrumb({ items }) {
  return (
    <div className="border-t border-gray-100 py-6 flex flex-row-reverse items-center gap-x-1 text-gray-500 font-medium">
      {items.map((item, i) => (
        <div
          key={item.href}
          className="flex flex-row-reverse items-center gap-x-1"
        >
          <Link
            href={item.href}
            className={`transition-colors duration-200 hover:text-[#44e4d1] ${
              i + 1 === items.length ? "text-green-600 font-semibold" : ""
            }`}
          >
            {item.text}
          </Link>
          {i + 1 !== items.length && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={16}
              height={16}
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M15 18L9 12L15 6"
                stroke="#44e4d1"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
}

export default Breadcrumb;
