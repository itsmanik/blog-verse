const Engagements = ({ blogs }) => {
  return (
    <div>
      <div className="overflow-x-auto mx-12 mt-10">
        <table className="w-full border table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                Sl. No
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                Blog Title
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                Views
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                Likes
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                Score
              </th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog, index) => {
              // Convert index to letter
              const slNo = String.fromCharCode(65 + index); // 65 is the ASCII code for 'A'
              return (
                <tr key={index} className="border-b hover:bg-primaryColor">
                  <td className="px-4 py-2 text-sm">{slNo}</td>
                  <td className="px-4 py-2 text-sm">
                    {blog.title.length > 50
                      ? `${blog.title.slice(0, 50)}...`
                      : blog.title}
                  </td>
                  <td className="px-4 py-2 text-sm">{blog.views || 0}</td>
                  <td className="px-4 py-2 text-sm">{blog.likes || 0}</td>
                  <td className="px-4 py-2 text-sm">
                    {blog.views > 0
                      ? Math.floor((blog.likes / blog.views) * 100)
                      : 0}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Engagements;
